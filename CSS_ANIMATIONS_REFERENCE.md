# New CSS Classes & Animations Reference

This document lists all the new CSS classes and animations added to your website.

## 🎨 Glass Morphism Effects

### `.glass`
Creates a frosted glass effect with white background and blur.
```html
<div class="glass rounded-xl p-4">Content here</div>
```
- Background: `rgba(255, 255, 255, 0.7)`
- Backdrop Filter: `blur(12px)`
- Border: Semi-transparent white

### `.glass-dark`
Dark glass effect for dark backgrounds.
```html
<div class="glass-dark rounded-xl p-4">Content here</div>
```
- Background: `rgba(26, 54, 93, 0.8)` (navy)
- Backdrop Filter: `blur(12px)`
- Perfect for dark modals or overlays

### `.glass-sm`
Subtle glass effect with less blur.
```html
<div class="glass-sm rounded-lg p-2">Short tooltip</div>
```
- Background: `rgba(255, 255, 255, 0.5)`
- Backdrop Filter: `blur(8px)`

---

## ✨ Animation Classes

### `.animate-glow-pulse`
Soft pulsing glow effect in teal color.
```html
<button class="animate-glow-pulse">Important Button</button>
```
Duration: 2s infinite

### `.animate-bounce-in`
Element bounces in with scale and fade animation.
```html
<div class="animate-bounce-in">Bouncy content</div>
```
Duration: 0.6s, cubic-bezier easing

### `.animate-rotate-in`
Element rotates in while fading.
```html
<icon class="animate-rotate-in">🎯</icon>
```
Duration: 0.5s, starts rotated -10deg

### `.animate-flip`
3D flip animation around Y axis.
```html
<card class="animate-flip">Flip me!</card>
```
Duration: 0.8s

### `.animate-gradient`
Animated gradient background shift.
```html
<div class="animate-gradient bg-gradient-to-r from-teal-400 to-blue-500">Shifting gradient</div>
```
Duration: 3s infinite (requires gradient background)

### `.animate-slide-up`
Element slides up while fading in.
```html
<section class="animate-slide-up">Content slides up</section>
```
Duration: 0.5s

### `.hover-lift`
Creates a lifting effect on hover with shadow.
```html
<button class="hover-lift">Hover me</button>
```
- Moves up 4px on hover
- Adds box-shadow: `0 12px 24px rgba(0,0,0,0.15)`

---

## 🎬 Existing Animations (Reference)

These were already in the codebase and still work:

- `.animate-logo-pulse` - Soft pulse with opacity
- `.animate-fade-in-up` - Fade in with upward movement
- `.animate-fade-in` - Simple opacity fade
- `.animate-slide-in-right` - Slide from right with fade
- `.animate-slide-in-left` - Slide from left with fade
- `.animate-scale-in` - Scale up from 0.9
- `.animate-float` - Floating motion
- `.animate-shimmer` - Shimmer/shine effect
- `.animate-cart-bounce` - Cart icon bounce on item add
- `.animate-count-up` - Number counting up animation
- `.animate-slide-down` - Menu/dropdown slide down
- `.animate-whatsapp-pulse` - WhatsApp button pulsing glow
- `.stagger-1` through `.stagger-8` - Animation delays

---

## 🎯 Usage Examples

### Glass Card Component
```html
<div class="glass rounded-xl p-6 shadow-lg">
  <h3 class="text-xl font-bold">Glass Card</h3>
  <p>This card floats over the background with blur.</p>
</div>
```

### Animated Button
```html
<button class="hover-lift animate-fade-in bg-[var(--navy)] text-white px-6 py-3 rounded-lg">
  <i class="fa-solid fa-sparkles animate-rotate-in"></i>
  Click Me
</button>
```

### Animated Section
```html
<section class="animate-slide-up">
  <h2 class="text-3xl font-bold">Section Title</h2>
  <p>This section slides up when page loads.</p>
</section>
```

### Glass Dropdown
```html
<div class="glass rounded-lg p-2 animate-slide-down">
  <a href="#item1">Item 1</a>
  <a href="#item2">Item 2</a>
</div>
```

---

## 🎨 Icon Size Adjustments

Updated icon sizes throughout the app:

| Component | Old Size | New Size |
|-----------|----------|----------|
| Navbar Logo | 48px | 56px |
| Navbar Icons | text-lg (18px) | text-2xl (24px) |
| Button Icons | text-lg (18px) | text-2xl (24px) |
| Footer Logo | 44px | 52px |
| Footer Icons | default | text-lg (18px) |
| WhatsApp FAB | 14px (h-14 w-14) | 16px (h-16 w-16) |
| WhatsApp Icon | text-2xl | text-3xl |

---

## 🔧 How to Combine Classes

You can combine multiple classes for enhanced effects:

```html
<!-- Glass card that lifts on hover with bounce animation -->
<div class="glass hover-lift animate-bounce-in rounded-xl p-6">
  Hover me!
</div>

<!-- Glowing button with gradient and animation -->
<button class="bg-gradient-to-r from-teal-400 to-blue-500 animate-glow-pulse hover-lift">
  <i class="fa-solid fa-bolt animate-rotate-in"></i>
  Click
</button>

<!-- Animated glass dropdown -->
<div class="glass-dark animate-slide-down rounded-lg p-4 text-white">
  Menu Item
</div>
```

---

## ⚡ Performance Notes

- All animations use `transition` and `animation` CSS properties
- Animations respect `prefers-reduced-motion` media query (add support as needed)
- Glass effects use hardware-accelerated `backdrop-filter`
- Animations are GPU-accelerated for smooth 60fps performance

---

## 🎥 Animation Timings

| Animation | Duration | Easing |
|-----------|----------|--------|
| glow-pulse | 2s | infinite |
| bounce-in | 0.6s | cubic-bezier(0.34, 1.56, 0.64, 1) |
| rotate-in | 0.5s | ease-out |
| flip | 0.8s | ease-out |
| gradient-shift | 3s | infinite |
| slide-up | 0.5s | ease-out |
| logo-pulse | 1.5s | infinite |
| fade-in-up | 0.6s | ease-out |
| whatsapp-pulse | 2s | infinite |

---

## 🔗 Browser Support

All animations and glass effects are supported on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

For older browser support, consider adding fallbacks or using feature detection.
