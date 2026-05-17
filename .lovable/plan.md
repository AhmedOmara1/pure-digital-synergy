## الخطة: إضافة Animations للهوم بيدج

### الفكرة العامة
أنيميشن خفيف وذوق — بدون مبالغة. كل سيكشن يتحرك لما يدخل في الشاشة (scroll-triggered)، و hover effects أنعم.

### التنفيذ

**1. Hook جديد `src/hooks/use-in-view.ts`**
- IntersectionObserver بسيط يرجع `ref` و `inView` boolean
- threshold: 0.15، triggerOnce: true

**2. CSS animations جديدة في `src/styles.css`**
- `fade-in-up` — يظهر من تحت لفوق (مع translate)
- `fade-in` — opacity فقط
- `scale-in` — يكبر شويه
- كلاسات utility مع `animation-delay` للـ stagger (delay-100, 200, 300, 400)

**3. تعديل `src/routes/index.tsx`**
- **Hero**: العنوان والـ subtitle والـ buttons يدخلوا بـ fade-in-up مع stagger خفيف عند load
- **Stats cards**: stagger animation لما يدخلوا في الشاشة
- **Services strip**: cards تيجي واحدة ورا التانية + hover scale أنعم
- **Why Us cards**: stagger fade-in-up عند الـ scroll
- **CTA banner**: scale-in خفيف

**4. Hover refinements**
- Service cards: shadow أقوى + lift أعلى شويه
- Buttons في الـ hero: glow pulse خفيف على الـ primary CTA

### ملاحظات
- مفيش مكتبات جديدة (لا framer-motion ولا غيرها) — CSS pure + IntersectionObserver
- بيشتغل في الـ light والـ dark mode
- بيحترم `prefers-reduced-motion` (هضيف media query يلغي الأنيميشن للمستخدمين اللي عاملين الإعداد ده)