# تشغيل المشروع محلياً

عند ظهور **ERR_CONNECTION_REFUSED** اتبع التالي:

## 1. تشغيل الخادم من الطرفية

- في Cursor: اضغط **Ctrl+`** لفتح الطرفية (Terminal).
- أو من القائمة: **Terminal → New Terminal**.

ثم نفّذ:

```bash
cd "c:\Users\eslam\Desktop\My projects\nowal aom"
npm run dev
```

- انتظر حتى تظهر رسالة مثل:
  - `Local: http://localhost:3000/`
  - أو `Local: http://localhost:3002/` إذا كان المنفذ 3000 مستخدماً.

## 2. فتح الموقع في المتصفح

- افتح Chrome (أو أي متصفح).
- في شريط العنوان اكتب الرابط الذي ظهر في الطرفية، مثلاً:
  - **http://localhost:3000**
  - أو **http://localhost:3002**

## إيقاف الخادم

في نفس نافذة الطرفية اضغط **Ctrl+C**.
