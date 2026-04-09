# Responsive Design Implementation Guide

## Quick Prompt to Apply Responsive Changes

Use this prompt when working on your other projects:

---

### **RESPONSIVE DESIGN CHECKLIST PROMPT**

```
Make the following component fully responsive using Tailwind CSS breakpoints (sm: 640px, md: 768px, lg: 1024px):

STEPS TO FOLLOW:

1. **Font Sizes** - Scale text for different screens
   - Mobile (base): Keep original size
   - Tablet (sm:): Increase by ~20-30%
   - Desktop (lg:): Increase by ~40-60%
   Example: className="text-[16px] sm:text-[20px] lg:text-[28px]"

2. **Spacing (Padding/Margin)** - Increase breathing room as screen grows
   - Mobile: Minimal padding (p-[16px] or px-4)
   - Tablet: Medium padding (sm:p-[20px] or sm:px-6)
   - Desktop: Generous padding (lg:p-[30px] or lg:px-[100px])
   Example: className="p-[16px] sm:p-[20px] lg:p-[30px]"

3. **Layout Direction** - Change flex direction at breakpoints
   - Mobile: Use flex-col (vertical/stacked)
   - Desktop: Use lg:flex-row (horizontal/spread)
   Example: className="flex flex-col lg:flex-row gap-4"

4. **Container Widths** - Adjust width percentages
   - Mobile: w-full (100% width)
   - Desktop: lg:w-[50%] or lg:w-[45%] (percentage-based)
   Example: className="w-full lg:w-[50%]"

5. **Gaps & Gaps** - Increase gap between items
   - Mobile base: gap-4 or gap-6
   - Tablet: sm:gap-6 or sm:gap-8
   - Desktop: lg:gap-8 or lg:gap-12
   Example: className="flex gap-4 sm:gap-6 lg:gap-8"

6. **Border Radius** - Scale rounded corners
   - Mobile: rounded-[20px]
   - Tablet: sm:rounded-[30px]
   - Desktop: lg:rounded-[40px]
   Example: className="rounded-[20px] sm:rounded-[30px] lg:rounded-[50px]"

7. **MaxWidth Container** - Use max-w-[1440px] with mx-auto
   Example: <div className="w-full max-w-[1440px] mx-auto">

8. **CSS Variables for Colors** - Define in tailwind.css
   Example: --text-primary: #03030d; --bg-dark: #171717;

BEFORE CODE:
[Paste original component code]

EXPECTED AFTER:
- All text scales proportionally
- All spacing increases at larger screens
- Layouts stack on mobile, spread on desktop
- No horizontal scrolling on any device
- Consistent padding/margins
```

---

## Common Patterns to Use

### **Text Responsive Pattern**

```jsx
className =
  'text-[24px] sm:text-[32px] lg:text-[40px] font-medium leading-[30px] sm:leading-[40px] lg:leading-[50px]';
```

### **Spacing Responsive Pattern**

```jsx
className =
  'px-4 sm:px-6 lg:px-[100px] py-6 sm:py-8 lg:py-12 mt-6 sm:mt-8 lg:mt-12 mb-4 sm:mb-6 lg:mb-8';
```

### **Layout Responsive Pattern**

```jsx
className = 'flex flex-col lg:flex-row justify-between items-center w-full gap-4 lg:gap-0';
```

### **Card Grid Pattern**

```jsx
className = 'flex flex-col lg:flex-row gap-4 justify-start items-center w-full';
```

### **Container Pattern**

```jsx
<div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">{/* Content */}</div>
```

---

## Step-by-Step Workflow

1. **Start with base styles** (mobile-first)

   ```jsx
   className = 'text-[16px] p-4 flex flex-col';
   ```

2. **Add sm: breakpoint** (tablets)

   ```jsx
   className = 'text-[16px] sm:text-[18px] p-4 sm:p-6 flex flex-col sm:...';
   ```

3. **Add lg: breakpoint** (desktops)

   ```jsx
   className =
     'text-[16px] sm:text-[18px] lg:text-[20px] p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row';
   ```

4. **Test at each breakpoint** using DevTools (F12 → responsive mode)

---

## Tools Setup (Same as RESAI Project)

### **tailwind.config.js**

```js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html,mdx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        text: { primary: 'var(--text-primary)' },
        background: { main: 'var(--bg-light)' },
      },
    },
  },
};
```

### **styles/tailwind.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --text-primary: #03030d;
    --bg-light: #f6f6f6;
    --text-white: #ffffff;
  }
}
```

---

## Quick Checklist

- [ ] All text has sm: and lg: variants
- [ ] All padding/margins have sm: and lg: variants
- [ ] Layout uses flex-col with lg:flex-row
- [ ] Container has max-w-[1440px] mx-auto
- [ ] No hardcoded px widths (use w-full or percentages)
- [ ] Border radius scales up at breakpoints
- [ ] Tested at 320px, 640px, 1024px, 1440px widths
- [ ] No horizontal scrolling on mobile
- [ ] Line heights scale with font size
- [ ] Gap between items increases at larger screens

---

## Example Component (Before & After)

### BEFORE (Not Responsive)

```jsx
const Card = () => (
  <div className="bg-white p-20 rounded-20">
    <h2 className="text-40 font-bold">Title</h2>
    <p className="text-16 mt-10">Description</p>
  </div>
);
```

### AFTER (Fully Responsive)

```jsx
const Card = () => (
  <div className="bg-white p-[16px] sm:p-[20px] lg:p-[30px] rounded-[20px] sm:rounded-[30px] lg:rounded-[40px]">
    <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-bold">Title</h2>
    <p className="text-[14px] sm:text-[16px] lg:text-[18px] mt-[10px] sm:mt-[15px] lg:mt-[20px]">
      Description
    </p>
  </div>
);
```

---

## When Stuck

Ask Claude: "Make this [component name] responsive like the RESAI project. Use Tailwind breakpoints (sm: 640px, lg: 1024px) with mobile-first approach. Ensure all text, padding, spacing, and layouts scale appropriately."
