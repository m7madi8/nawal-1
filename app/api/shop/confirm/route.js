import { getShopOrder, markOrderPaid, retrieveStripeSession, updateShopOrder } from '@/lib/shop';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const sessionId = String(body.sessionId || '').trim();
  if (!sessionId) return Response.json({ error: 'Missing session' }, { status: 400 });

  const session = await retrieveStripeSession(sessionId);
  if (!session) return Response.json({ error: 'Payment not found' }, { status: 404 });

  const paid = session.payment_status === 'paid' || session.status === 'complete';
  const orderId = session.metadata?.orderId || session.client_reference_id;
  if (!paid || !orderId) {
    return Response.json({ ok: false, paid: false, orderId: orderId || null });
  }

  const row = await getShopOrder(orderId);
  if (row) {
    await updateShopOrder(orderId, markOrderPaid(row, sessionId));
  }

  return Response.json({
    ok: true,
    paid: true,
    orderId,
    product: session.metadata?.productId || '',
  });
}
