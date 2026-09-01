import LegacyPage from '@/components/LegacyPage';

export const metadata = {
  title: 'Order received',
  description: 'Your Nawal Yoga shop order has been received.',
};

const thanksScript = `(function(){
  var params = new URLSearchParams(window.location.search);
  var sessionId = params.get('session_id');
  var via = params.get('via') || '';
  var title = document.getElementById('shop-thanks-title');
  var lead = document.getElementById('shop-thanks-lead');
  var isAr = document.documentElement.getAttribute('lang') === 'ar';

  function setCopy(en, ar) {
    if (title) {
      title.setAttribute('data-en', en.title);
      title.setAttribute('data-ar', ar.title);
      title.textContent = isAr ? ar.title : en.title;
    }
    if (lead) {
      lead.setAttribute('data-en', en.lead);
      lead.setAttribute('data-ar', ar.lead);
      lead.textContent = isAr ? ar.lead : en.lead;
    }
  }

  if (via === 'whatsapp') {
    setCopy(
      { title: 'WhatsApp is open', lead: 'Your order is with us. Finish the conversation on WhatsApp and we will confirm colour, delivery, and timing.' },
      { title: 'واتساب مفتوح', lead: 'طلبك وصلنا. أكملي المحادثة على واتساب وسنؤكّد اللون والتوصيل والتوقيت.' }
    );
    return;
  }
  if (via === 'cash') {
    setCopy(
      { title: 'Order received', lead: 'We will contact you to confirm delivery. You can pay in cash when the piece arrives.' },
      { title: 'تم استلام الطلب', lead: 'سنتواصل معكِ لتأكيد التوصيل. يمكنكِ الدفع نقداً عند وصول القطعة.' }
    );
    return;
  }
  if (via === 'paypal') {
    setCopy(
      { title: 'PayPal request next', lead: 'Your order is saved. We will send a PayPal payment request and confirm delivery once it is paid.' },
      { title: 'طلب بايبال في الطريق', lead: 'طلبك محفوظ. سنرسل لكِ طلب دفع عبر بايبال ونؤكّد التوصيل بعد الدفع.' }
    );
    return;
  }
  if (!sessionId) return;

  fetch('/api/shop/confirm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ sessionId: sessionId })
  }).then(function(res){ return res.json(); }).then(function(data){
    if (data && data.paid) {
      setCopy(
        { title: 'Payment received', lead: 'Thank you. Your card payment is confirmed and we will prepare the order with care.' },
        { title: 'تم استلام الدفع', lead: 'شكراً لكِ. تم تأكيد دفع البطاقة وسنجهّز الطلب بعناية.' }
      );
    } else {
      setCopy(
        { title: 'Payment pending', lead: 'We have the order. If the card payment did not finish, you can return to the shop and try again.' },
        { title: 'الدفع معلّق', lead: 'الطلب محفوظ. إن لم يكتمل دفع البطاقة يمكنكِ العودة للمتجر والمحاولة مرة أخرى.' }
      );
    }
  }).catch(function(){});
})();`;

const html = `
<main class="ny-inner shop-page-inner shop-thanks">
  <section class="section shop-thanks__hero">
    <div class="container shop-thanks__inner">
      <p class="eyebrow" data-en="The shop" data-ar="المتجر">The shop</p>
      <h1 id="shop-thanks-title" class="display-l" data-en="Order received" data-ar="تم استلام الطلب">Order received</h1>
      <p id="shop-thanks-lead" class="body-l text-muted" data-en="Thank you. We have your order and will be in touch shortly." data-ar="شكراً لكِ. طلبك وصلنا وسنتواصل معكِ قريباً.">Thank you. We have your order and will be in touch shortly.</p>
      <a href="/shop" class="btn btn--primary" data-en="Back to the shop" data-ar="العودة للمتجر">Back to the shop</a>
    </div>
  </section>
</main>
`;

export default function Page() {
  return (
    <LegacyPage
      lang="en"
      dir="rtl"
      bodyClassName="shop-page"
      styles={['/css/shop.css']}
      scripts={[]}
      inlineScripts={[thanksScript]}
      currentNav="shop"
      splitHeadings={false}
      html={html}
    />
  );
}
