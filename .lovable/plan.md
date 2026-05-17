# مراجعة الموقع مقابل ملف المحتوى

قارنت محتوى الـ DOCX بالموقع الحالي. الهيكل العام موجود (Home / About / Services / Portfolio / Testimonials / FAQ / Contact / Footer / WhatsApp Float / Sitemap / robots / Logo). لكن في حاجات ناقصة أو محتاجة تظبيط.

## ✅ موجود وشغّال
- Hero بالـ headline والـ sub والـ CTAs والـ stats (55+ / 32+ / 5 / 90%)
- Services Overview بالخدمات الـ 5
- Why Us بالـ 4 نقاط
- About: story + values + team (3 أعضاء)
- Services page بالـ 5 خدمات + "Includes"
- Portfolio بفلاتر التصنيف
- Testimonials بـ 3 آراء
- FAQ بـ 6 أسئلة
- Contact form بكل الحقول المطلوبة + معلومات التواصل
- Footer + Quick Links + Social
- WhatsApp Float + Sitemap + robots.txt + Bilingual AR/EN + RTL

## ❌ ناقص أو محتاج تعديل

### 1. صفحة الأسعار / Pricing (ناقصة بالكامل)
الـ DOCX بيذكر "الأسعار / Pricing" كصفحة من النافبار، لكن مفيش `pricing.tsx`. لازم نضيف:
- لينك في الـ Navbar والـ Footer
- صفحة `/pricing` فيها باقات (Starter / Growth / Premium مثلاً) لكل خدمة أو باقات شاملة
- المحتوى الفعلي للأسعار مش موجود في الـ DOCX، فهنحط placeholder بأرقام مقترحة بالـ AED + ملاحظة إنها تتعدل

### 2. Contact — أرقام/حسابات حقيقية
الـ DOCX حاطط placeholders (+971 XX XXX XXXX / @puredigital.ae). محتاج منك الأرقام الفعلية. الحالي عندنا قيم وهمية في الفورم — هنخليها placeholders واضحة لحد ما توفّر الحقيقية.

### 3. CTA Banner في صفحة Contact
"حضورك الرقمي يبدأ من قرار واحد — استشارة مجانية بدون التزام" — موجود في الترجمات بس محتاج نتأكد إنه ظاهر فعلاً في صفحة Contact كبانر مميز.

### 4. SEO / Meta tags
الـ DOCX بيحدد title + meta description + keywords + OG image لكل صفحة بالعربي والإنجليزي. محتاج نتأكد إن كل route فيه `head()` بالـ titles والـ descriptions المطابقة للـ DOCX (بالـ AR لما اللغة عربي).

### 5. Schema Markup
LocalBusiness أو Organization JSON-LD في `__root.tsx` — لسه مش متضاف.

### 6. Google Analytics 4 + Meta Pixel
مطلوبين في الـ brief، لسه مش مركّبين. محتاج الـ GA4 Measurement ID والـ Meta Pixel ID.

### 7. تظبيط بسيط في المحتوى
- Why Us: الـ DOCX بيقول "اللوغو في 48 ساعة، الموقع في 7 أيام" — متطابق ✅
- Stats: الترتيب والأرقام مطابقة ✅
- Footer tagline: "Where Vision Meets Execution" ✅
- Pricing payment terms (50/50) — موجودة في FAQ بس ممكن تتكرر في صفحة Pricing

## خطة التنفيذ (لما توافق)

1. **Pricing page**
   - إنشاء `src/routes/pricing.tsx` بثلاث باقات (Starter / Growth / Premium) بأرقام placeholder
   - إضافة `pricing` للترجمات (AR + EN)
   - إضافة اللينك في `Navbar.tsx` و `Footer.tsx`
   - تحديث `sitemap.xml`

2. **SEO تحسينات**
   - تحديث `head()` في كل route بالـ title/description المطابقة للـ DOCX
   - إضافة JSON-LD Organization schema في `__root.tsx`
   - إضافة OG image meta tags (هستخدم اللوجو لحد ما توفّر صورة 1200×630)

3. **Analytics (لو وفّرت الـ IDs)**
   - GA4 gtag script
   - Meta Pixel snippet
   - الاتنين في `__root.tsx`

4. **Contact CTA Banner**
   - بانر مميز في آخر صفحة Contact بالنص المطلوب

## محتاج منك قبل التنفيذ

1. هل تحب أضيف صفحة Pricing بباقات placeholder، ولا تفضّل تبعتلي الأسعار الفعلية الأول؟
2. عندك GA4 ID و Meta Pixel ID دلوقتي؟ (لو لا، هسيبهم لحد ما توفرهم)
3. الأرقام الحقيقية: WhatsApp / Email / Instagram / LinkedIn — تبعتهم؟
