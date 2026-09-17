# Hopfield Labs — Brand Identity & Vector Logo System

This directory contains the production vector identity assets for **Hopfield Labs**, an engineering and software studio specializing in high-performance web systems, native mobile apps (iOS & Android), GenAI integration, applied AI/ML, and academic FYP capstone builds.

---

## 1. Naming & Mathematical Foundation

"Hopfield" refers to the **Hopfield network** — a recurrent neural network with symmetric synaptic connections ($W_{ij} = W_{ji}$) and a Lyapunov energy function:

$$E = -\frac{1}{2} \sum_{i \ne j} W_{ij} s_i s_j + \sum_i \theta_i s_i$$

The network updates iteratively via the recurrence relation:

$$s_{t+1} = \text{sgn}\left(\sum_j W_{ij} s_j(t) - \theta_i\right)$$

settling monotonically into stable attractor states (local energy minima representing stored associative memories).

### The Primary Mark: "The Recurrent H"
The primary mark constructs the letter **"H"** from 6 discrete state vertices and 3 structural graph edges (left stem, right stem, and central crossbar). An orbital feedback arc loops from the output state $(31, 24.5)$ back into the primary input attractor node $(11, 11.5)$, directly visualizing recurrence ($s_{t+1} = \text{sgn}(W s_t)$).

---

## 2. Deliverables Manifest

| File | Purpose | Grid / Dimensions | Format |
| :--- | :--- | :--- | :--- |
| `logo-mark.svg` | **Primary Brand Mark** | 48×48 viewBox | SVG 1.1, `currentColor` |
| `logo-mark-mono.svg` | **Single-Path / Small Scale** | 48×48 viewBox | SVG 1.1, single `<path>` |
| `logo-lockup-horizontal.svg` | **Horizontal Lockup** (Mark + Wordmark) | 310×48 viewBox | SVG 1.1, baseline aligned |
| `logo-lockup-stacked.svg` | **Stacked Lockup** (Mark above Wordmark) | 260×120 viewBox | SVG 1.1, centered |
| `logo-wordmark.svg` | **Live Wordmark** | 240×28 viewBox | SVG 1.1, Geist Mono |
| `logo-wordmark-outlined.svg`| **Outlined Wordmark** (Zero font dependency) | 280×28 viewBox | SVG 1.1, pure paths |
| `favicon.svg` | **Browser Favicon** | 32×32 viewBox | SVG 1.1, safe margins |
| `favicon.ico` | **Multi-size Favicon** | 16×16, 32×32, 48×48 | Windows ICO container |
| `apple-touch-icon.png` | **iOS Home Screen Icon** | 180×180 px | 32-bit PNG |
| `og-image.png` | **OpenGraph / Social Preview** | 1200×630 px | 24-bit PNG |
| `explorations/` | **Design Explorations** (Directions A, B, C) | 48×48 viewBox | SVG 1.1 |

---

## 3. Usage Rules & Sizing Specifications

### Minimum Sizes
* **Logo Mark Only**: `16px` height (do not render below 16px).
* **Mono Mark (`logo-mark-mono.svg`)**: For low-resolution displays or icon fonts where rendering engines struggle with sub-pixel node circles at 12–16px.
* **Horizontal Lockup**: `90px` minimum width (`~14px` mark height).
* **Stacked Lockup**: `120px` minimum width (`~24px` mark height).

### Clear Space Rule
Maintain clear space around the logo equal to the **cap height of the mark ($X$)** on all four sides:
* For the primary mark, clear space is $X$ (the distance between top recurrence peak and bottom node edge).
* No graphic elements, typography, margins, or borders may intrude into this exclusion perimeter.

```
       +-----------------------+
       |           X           |
       |     +-----------+     |
       |  X  | LOGO MARK |  X  |
       |     +-----------+     |
       |           X           |
       +-----------------------+
```

---

## 4. Approved Color Pairings

The identity uses single-color inheritance via CSS `currentColor`:

* **Dark Mode (Default Studio Theme)**:
  * Surface: `#08090C` (Dark canvas)
  * Mark / Wordmark: `#E9ECF2` (Pure high-contrast white)
  * Accent Highlight: `#00D6A4` (Signal Green on input attractor node)
* **Light Mode (Inverted Theme)**:
  * Surface: `#FFFFFF` (Pure white)
  * Mark / Wordmark: `#08090C` (Deep rich black)
* **Technical Accents**:
  * Signal Accent: `#00D6A4` (Terminal / status dot)
  * Focus / Electric: `#4F7DFF` (Subtle energy gradients)

---

## 5. Explicit Misuse Guidelines (Brand Violations)

To preserve the geometric precision and brand integrity of Hopfield Labs, the following modifications are strictly prohibited:

1. ❌ **Do NOT rotate or tilt the mark**: The graph vertices must sit aligned to vertical/horizontal coordinates.
2. ❌ **Do NOT recolor per-element**: Do not give individual stems or nodes random rainbow/unauthorized colors (only approved single-color or the calibrated `#00D6A4` attractor node).
3. ❌ **Do NOT add drop shadows, outer glows, or 3D extrusions**: The mark is pure, unadorned structural vector geometry.
4. ❌ **Do NOT place on busy, unmasked photography**: Always place on clean dark (`#08090C`) or light (`#FFFFFF`) surfaces.
5. ❌ **Do NOT stretch, skew, or distort the aspect ratio**: Scaling must remain locked 1:1.
6. ❌ **Do NOT outline the wordmark manually with stroke**: The wordmark typography must remain crisp solid fills.
7. ❌ **Do NOT substitute fonts in the live wordmark**: Only **Geist Mono** or **JetBrains Mono** with `letter-spacing: 0.14em` is permitted. Use `logo-wordmark-outlined.svg` when web fonts are unavailable.
