## الخطة: إضافة Light Mode للموقع

### 1. توليد نسخة داكنة من اللوجو
- استخدام `imagegen--edit_image` لإنشاء `src/assets/logo-dark.png` (نفس اللوجو بألوان داكنة تظهر على خلفية بيضاء)

### 2. إضافة Theme Provider
- إنشاء `src/components/theme-provider.tsx` — Context بسيط يدير `theme: "light" | "dark"`
- يحفظ الاختيار في `localStorage`
- يضيف/يشيل `class="dark"` على `<html>`
- الافتراضي: dark (زي دلوقتي)

### 3. تحديث `src/styles.css`
- نقل الـ tokens الحالية من `:root` لـ `.dark`
- إضافة tokens جديدة لـ `:root` (light mode) — خلفية بيضاء، نص داكن، نفس الـ primary/accent بس متظبطين للوايت
- الـ navy-deep و gradients تتظبط للوضعين

### 4. تحديث Navbar
- إضافة زرار Toggle (أيقونة Sun/Moon من lucide-react) جنب زرار اللغة
- عرض `logo-dark.png` لما `theme === "light"`، و `logo.png` لما dark
- نفس الشيء في Footer

### 5. تطبيق الـ Provider
- لف الـ app في `src/routes/__root.tsx` بـ `<ThemeProvider>`

### ملاحظات تقنية
- ما فيش حاجة backend
- مفيش breaking changes — الافتراضي يفضل dark
- كل الألوان في الكود بتستخدم semantic tokens فبتشتغل تلقائي في الوضعين