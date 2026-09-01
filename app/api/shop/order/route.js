import {
  buildShopOrderRow,
  createStripeCheckoutSession,
  getShopColor,
  getShopProduct,
  insertShopOrder,
  siteUrlFromRequest,
  updateShopOrder,
  whatsappOrderUrl,
} from '@/lib/shop';

const PAYMENTS = ['whatsapp', 'cash', 'stripe', 'paypal'];

function clean(value) {
  return String(value || '').trim();
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const product = getShopProduct(clean(body.productId));
  const color = getShopColor(clean(body.colorId));
  const payment = clean(body.payment);
  const fullName = clean(body.fullName);
  const phone = clean(body.phone);
  const city = clean(body.city);
  const qty = Math.min(5, Math.max(1, Number(body.qty) || 1));

  if (!product) return Response.json({ error: 'Unknown product' }, { status: 400 });
  if (!PAYMENTS.includes(payment)) return Response.json({ error: 'Choose a payment method' }, { status: 400 });
  if (!fullName || fullName.length < 2) return Response.json({ error: 'Please enter your name' }, { status: 400 });
  if (!phone || phone.replace(/\D/g, '').length < 8) {
    return Response.json({ error: 'Please enter a valid phone number' }, { status: 400 });
  }
  if (payment === 'stripe' && !process.env.STRIPE_SECRET_KEY) {
    return Response.json(
      { error: 'Card payments are not set up yet. Please use WhatsApp or cash on delivery.' },
      { status: 503 },
    );
  }

  try {
    const row = buildShopOrderRow({
      product,
      color,
      qty,
      fullName,
      phone,
      city,
      payment,
    });
    const saved = await insertShopOrder(row);
    const orderId = saved?.id || row.id;
    const amountUsd = product.priceUsd * qty;

    if (payment === 'whatsapp') {
      return Response.json({
        ok: true,
        orderId,
        via: 'whatsapp',
        waUrl: whatsappOrderUrl({ product, color, qty, fullName, phone, city, amountUsd }),
      });
    }

    if (payment === 'cash' || payment === 'paypal') {
      return Response.json({ ok: true, orderId, via: payment });
    }

    const origin = siteUrlFromRequest(request);
    const session = await createStripeCheckoutSession({
      product,
      color,
      qty,
      orderId,
      successUrl: `${origin}/shop/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/shop?checkout=cancelled`,
    });

    await updateShopOrder(orderId, {
      healthDetails: session.id,
      freeNote: JSON.stringify({
        productId: product.id,
        productName: product.nameEn,
        color: color.en,
        colorId: color.id,
        qty,
        priceUsd: product.priceUsd,
        amountUsd,
        payment,
        paid: false,
        stripeSessionId: session.id,
      }),
    });

    return Response.json({ ok: true, orderId, via: 'stripe', url: session.url });
  } catch (error) {
    if (error.code === 'STRIPE_MISSING') {
      return Response.json(
        { error: 'Card payments are not set up yet. Please use WhatsApp or cash on delivery.' },
        { status: 503 },
      );
    }
    return Response.json({ error: error.message || 'Could not place the order' }, { status: 500 });
  }
}
