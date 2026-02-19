# تقرير تفقد المشروع قبل الربط بمنصة فيرسل (Vercel)

## نظرة عامة على المشروع

- **الاسم:** Nawal Omar — موقع يوغا (نوال أوم)
- **التقنية:** Nuxt 3 (SSR) + Vue 3 + Tailwind CSS + GSAP + Lenis
- **الصفحات:** صفحة رئيسية واحدة (`pages/index.vue`) تتضمن: Hero, About, Video, Gallery, Workshops, Footer

---

## ما تم فحصه

### 1. البناء (Build)
- **الحالة:** يعمل بنجاح
- تم تشغيل `npm run build` واكتمل بدون أخطاء
- الإخراج في `.output/` (Nitro preset حالي: `node-server` — فيرسل يغيّره تلقائياً عند النشر)

### 2. الأصول (الصور والملفات)
- **المجلد:** `public/media/`
- **الملفات الموجودة:**  
  `1.jpg`, `4.jpg`, `5.jpg`, `6.jpg`, `7.jpg`, `9.jpg`, `10.jpg`, `11.jpg`, `13.jpg`,  
  `hero.jpg`, `Nawal_yoga_logo.png`, `nawal_aom.mp4`, `Al-Tira.jpg`, `Jiva.jpg`, `retreat.jpg`
- **ملف الخلفية:** `public/grain.svg` موجود
- **تصحيح تم:** تم توحيد أسماء صور الورش مع أسماء الملفات الفعلية (`Al-Tira.jpg`, `Jiva.jpg`) لتجنب مشاكل حساسية الأحرف على خوادم Linux

### 3. الإعداد (nuxt.config.ts)
- `ssr: true` — مناسب للنشر على فيرسل
- `@nuxtjs/tailwindcss` و `@nuxt/image` مفعّلان
- لا توجد متغيرات بيئة مطلوبة في الكود حالياً
- لا يوجد ملف `.env` — لا حاجة له للربط الأساسي

### 4. المحتوى والروابط
- لا توجد روابط ثابتة لـ `localhost`
- استخدام الصور عبر `/media/...` و `/grain.svg` صحيح للنشر

---

## خطوات الربط بمنصة فيرسل (Vercel)

1. **رفع المشروع إلى Git**
   - تأكد أن المشروع مرفوع على GitHub (أو GitLab / Bitbucket).
   - الريبو مرتبط كما في حالة الـ git الحالية.

2. **ربط المشروع من فيرسل**
   - ادخل إلى [vercel.com](https://vercel.com) وسجّل الدخول.
   - New Project → استيراد الريبو (Import Git Repository).
   - اختر الريبو الخاص بمشروع "nowal aom".

3. **إعدادات البناء (إلزامية لهذا المشروع)**
   - **Framework Preset:** Nuxt (يُختار تلقائياً).
   - **Build Command:** `npm run build` فقط (**لا تستخدم** `nuxt build` مباشرة).
   - **Output Directory:** يترك فارغاً (لا تضع `.output`).
   - **Install Command:** `npm install`.

4. **نشر المشروع**
   - اضغط Deploy.
   - بعد انتهاء البناء، فيرسل يعطيك رابطاً مثل:  
     `https://your-project.vercel.app`
   - عند تكرار خطأ سابق، استخدم **Redeploy** مع **Clear build cache**.

5. **(اختياري) نطاق مخصص**
   - من لوحة المشروع في فيرسل: Settings → Domains لإضافة دومينك الخاص.

-----

## ملاحظات مهمة

- **الصور والـ Sharp:** البناء الحالي يتضمن Sharp لـ `@nuxt/image`. فيرسل يدعم البنية الصحيحة تلقائياً؛ إذا ظهرت مشكلة في الصور، يمكن لاحقاً ضبط إعدادات الصور أو الـ provider في `nuxt.config`.
- **اللغة والاتجاه:** الموقع مضبوط في الـ head على `lang="en"` و `dir="ltr"`. إذا أردت واجهة عربية كاملة، يمكن لاحقاً تغييرها إلى `ar` و `dir="rtl"` في `nuxt.config.ts`.
- **تشغيل محلي قبل النشر:**  
  `npm run dev` ثم فتح الرابط الظاهر في الطرفية (راجع `START-SERVER.md`).

### تحقق سريع من نجاح الإصلاح (خطأ 126)

- في سجل البناء على Vercel يجب أن ترى:
  - `Running "npm run build"`
  - `node ./node_modules/nuxt/bin/nuxt.mjs build`
- يجب **ألا** يظهر:
  - `Command "nuxt build" exited with 126`
- إذا عاد نفس الخطأ:
  1. Settings → Build & Development Settings
  2. تأكد أن **Build Command** = `npm run build` (وليس `nuxt build`)
  3. **Output Directory** فارغ
  4. أعد النشر مع **Clear build cache**

---

## ملخص الحالة

| البند              | الحالة   |
|--------------------|----------|
| البناء (build)     | يعمل     |
| الأصول (صور/فيديو) | مكتملة   |
| إعداد Nuxt        | جاهز     |
| جاهزية الربط بفيرسل | جاهز     |

يمكنك ربط الريبو بفيرسل والمتابعة حسب الخطوات أعلاه.
