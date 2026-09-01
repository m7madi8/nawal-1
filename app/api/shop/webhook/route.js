import { createHmac, timingSafeEqual } from 'crypto';
import { getShopOrder, markOrderPaid, updateShopOrder } from '@/lib/shop';

function verifyStripeSignature(payload, header, secret) {
  if (!payload || !header || !secret) return false;
  const parts = {};
  header.split(',').forEach((part) => {
    const [key, value] = part.split('=');
    if (key && value) parts[key] = value;
  });
  if (!parts.t || !parts.v1) return false;
  const expected = createHmac('sha256', secret).update(`${parts.t}.${payload}`).digest('hex');
  const a = Buffer.from(parts.v1);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const payload = await request.text();
  if (secret) {
    const header = request.headers.get('stripe-signature') || '';
    if (!verifyStripeSignature(payload, header, secret)) {
      return Response.json({ error: 'Invalid signature' }, { status: 400 });
    }
  }

  let event;
  try {
    event = JSON.parse(payload);
  } catch {
    return Response.json({ error: 'Invalid payload' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return Response.json({ received: true });
  }

  const session = event.data?.object || {};
  const orderId = session.metadata?.orderId || session.client_reference_id;
  const paid = session.payment_status === 'paid' || session.status === 'complete';
  if (orderId && paid) {
    const row = await getShopOrder(orderId);
    if (row) await updateShopOrder(orderId, markOrderPaid(row, session.id));
  }

  return Response.json({ received: true });
}
