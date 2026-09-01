export const SHOP_WHATSAPP = '972522496366';

export const SHOP_PRODUCTS = {
  mat: {
    id: 'mat',
    nameEn: 'Yoga Mat',
    nameAr: 'سجادة اليوغا',
    priceUsd: 128,
    priceCents: 12800,
  },
  block: {
    id: 'block',
    nameEn: 'Yoga Block',
    nameAr: 'بلوك اليوغا',
    priceUsd: 48,
    priceCents: 4800,
  },
};

export const SHOP_COLORS = {
  black: { id: 'black', en: 'Black', ar: 'أسود' },
  pink: { id: 'pink', en: 'Soft Pink', ar: 'وردي هادئ' },
};

export const PAYMENT_METHODS = {
  whatsapp: 'WhatsApp',
  cash: 'Cash on delivery',
  stripe: 'Visa · Mastercard',
  paypal: 'PayPal',
};

const SUPABASE_URL = (process.env.SUPABASE_URL || 'https://xzxyskufrqansbhsbdkt.supabase.co').replace(/\/+$/, '');
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || 'sb_publishable_V9_4QWGDFv6Vm-4DQifYGA_1xdoKkph';
const SUPABASE_TABLE = process.env.SUPABASE_TABLE || 'retreat_requests';

export function getShopProduct(id) {
  return SHOP_PRODUCTS[id] || null;
}

export function getShopColor(id) {
  return SHOP_COLORS[id] || SHOP_COLORS.black;
}

export function paymentLabel(method) {
  return PAYMENT_METHODS[method] || method || '—';
}

export function buildShopOrderRow({
  product,
  color,
  qty,
  fullName,
  phone,
  city,
  payment,
  stripeSessionId,
}) {
  const now = new Date().toISOString();
  const quantity = Math.min(5, Math.max(1, Number(qty) || 1));
  const amountUsd = product.priceUsd * quantity;
  const note = {
    productId: product.id,
    productName: product.nameEn,
    color: color.en,
    colorId: color.id,
    qty: quantity,
    priceUsd: product.priceUsd,
    amountUsd,
    payment,
    paid: false,
    stripeSessionId: stripeSessionId || '',
  };

  return {
    id: `req-shop-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    source: 'shop-order',
    retreatType: `${product.nameEn} · ${color.en}`,
    submittedAt: now,
    fullName,
    phone,
    city: city || '',
    age: '',
    reason: `${paymentLabel(payment)} · $${amountUsd} · ${product.nameEn} · ${color.en} × ${quantity}`,
    expectation: '',
    yogaExperience: 'unpaid',
    healthStatus: payment,
    healthDetails: stripeSessionId || '',
    activities: [],
    freeNote: JSON.stringify(note),
    status: 'pending',
    createdAt: now,
  };
}

export function whatsappOrderUrl({ product, color, qty, fullName, phone, city, amountUsd }) {
  const lines = [
    "Hi Nawal, I'd like to order from the shop.",
    '',
    `${product.nameEn} · ${color.en} × ${qty}`,
    `Total: $${amountUsd}`,
    `Name: ${fullName}`,
    `Phone: ${phone}`,
    city ? `City: ${city}` : '',
    'Payment: WhatsApp',
  ].filter(Boolean);
  return `https://wa.me/${SHOP_WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function supabaseHeaders(prefer) {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    Prefer: prefer,
  };
}

export async function insertShopOrder(row) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${encodeURIComponent(SUPABASE_TABLE)}`, {
    method: 'POST',
    headers: supabaseHeaders('return=representation'),
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to save order');
  }
  const list = await res.json();
  return Array.isArray(list) ? list[0] : list;
}

export async function updateShopOrder(id, patch) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${encodeURIComponent(SUPABASE_TABLE)}?id=eq.${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      headers: supabaseHeaders('return=representation'),
      body: JSON.stringify(patch),
    },
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to update order');
  }
  const list = await res.json();
  return Array.isArray(list) ? list[0] : list;
}

export async function getShopOrder(id) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${encodeURIComponent(SUPABASE_TABLE)}?id=eq.${encodeURIComponent(id)}&select=*`,
    {
      method: 'GET',
      headers: supabaseHeaders('return=representation'),
    },
  );
  if (!res.ok) return null;
  const list = await res.json();
  return Array.isArray(list) ? list[0] : null;
}

export function parseShopNote(row) {
  const raw = row?.freeNote;
  if (raw && raw !== '-') {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed;
    } catch {
      /* ignore */
    }
  }
  return {};
}

export function markOrderPaid(row, stripeSessionId) {
  const note = parseShopNote(row);
  note.paid = true;
  note.stripeSessionId = stripeSessionId || note.stripeSessionId || '';
  return {
    yogaExperience: 'paid',
    healthDetails: stripeSessionId || row.healthDetails || '',
    freeNote: JSON.stringify(note),
  };
}

export function siteUrlFromRequest(request) {
  const env = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL;
  if (env) return env.startsWith('http') ? env.replace(/\/+$/, '') : `https://${env.replace(/\/+$/, '')}`;
  const origin = request.headers.get('origin');
  if (origin) return origin.replace(/\/+$/, '');
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  const proto = request.headers.get('x-forwarded-proto') || 'http';
  return host ? `${proto}://${host}` : 'http://localhost:3000';
}

export async function createStripeCheckoutSession({
  product,
  color,
  qty,
  orderId,
  successUrl,
  cancelUrl,
}) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    const error = new Error('Stripe is not configured');
    error.code = 'STRIPE_MISSING';
    throw error;
  }

  const body = new URLSearchParams();
  body.set('mode', 'payment');
  body.set('success_url', successUrl);
  body.set('cancel_url', cancelUrl);
  body.set('client_reference_id', orderId);
  body.set('metadata[orderId]', orderId);
  body.set('metadata[productId]', product.id);
  body.set('line_items[0][quantity]', String(qty));
  body.set('line_items[0][price_data][currency]', 'usd');
  body.set('line_items[0][price_data][unit_amount]', String(product.priceCents));
  body.set('line_items[0][price_data][product_data][name]', `${product.nameEn} · ${color.en}`);
  body.set('line_items[0][price_data][product_data][description]', 'Nawal Yoga shop');

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  const data = await res.json();
  if (!res.ok || !data.url) {
    const error = new Error(data?.error?.message || 'Could not start card payment');
    error.code = 'STRIPE_FAILED';
    throw error;
  }
  return data;
}

export async function retrieveStripeSession(sessionId) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret || !sessionId) return null;
  const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
    headers: { Authorization: `Bearer ${secret}` },
  });
  if (!res.ok) return null;
  return res.json();
}
