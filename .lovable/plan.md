

## Hero 3D loss landscape — gradient descent animation

Replace the flat Gaussian curve background with an interactive 3D loss landscape where a glowing ball rolls toward local minima, evoking ML gradient descent / optimization.

### What you'll see
- A tilted 3D surface filling the hero background, rendered as a **wireframe-over-subtle-fill mesh** with a multi-well loss function (mix of gaussians giving 2–3 valleys and a couple of ridges)
- A small **glowing ball** that performs gradient descent on the surface — it starts at a random high point, rolls downhill with momentum, settles into a minimum, pauses, then respawns at a new random point to find a different valley
- A **faint trail** behind the ball (fading line of recent positions) showing the optimization path
- Soft **color gradient** mapped to height: deep teal/indigo in the valleys, warm magenta/amber on the peaks, so the landscape reads as a heatmap. Low overall opacity so the hero text stays primary
- Subtle **auto-rotation** of the camera (very slow orbit, a few degrees) so the landscape feels alive without being distracting
- Respects `prefers-reduced-motion`: ball holds still and camera stops rotating

### Tech
- Add `three@0.160`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122` (versions per project guidance for React 18)
- New component `src/components/LossLandscape.tsx` containing the R3F `<Canvas>` with:
  - `PlaneGeometry` (≈80×80 segments) whose vertex Z is displaced by a sum-of-gaussians `f(x,y)` computed once; vertex colors set from height for the heatmap fill
  - A second wireframe mesh on top (line segments) for the contour feel
  - A `<mesh>` sphere (the ball) animated each frame via `useFrame`: compute analytic gradient of `f`, update velocity `v = 0.9·v − lr·∇f`, update position, snap Y to surface height + ball radius
  - Respawn logic: when |v| < threshold for N frames, fade ball out, pick new random (x,y), fade back in
  - Trail via a small ring buffer of past positions rendered with `<Line>` from drei, opacity falloff
  - `<OrbitControls>` disabled; manual slow camera yaw in `useFrame`
  - `dpr={[1, 1.5]}`, `gl={{ antialias: true, alpha: true }}` for transparent background over the hero's dark bg
- Lighting: one directional light + low ambient; MeshStandardMaterial with vertex colors and slight emissive in the valleys

### Hero integration
- In `src/components/sections/Hero.tsx`, replace `<GaussianCurve />` with `<LossLandscape />`
- Keep `GaussianCurve.tsx` file in place (unused) so it can be reverted easily; remove its import from Hero only
- Landscape sits `absolute inset-0` behind the existing z-10 content, with a bottom-to-top dark gradient overlay so headline contrast stays strong

### Color palette (HSL, uses existing tokens + two new accents)
- Low (valleys): `hsl(var(--accent))` — existing teal
- Mid: a new violet `hsl(262 70% 60%)`
- High (peaks): a warm magenta/amber `hsl(18 85% 62%)`
- Values blended per-vertex in JS at mesh-build time; no token changes required

### Performance
- Geometry + colors computed once on mount, not per frame
- Ball + trail are the only per-frame updates; target 60fps on a laptop, throttled to 30fps on mobile via `useFrame` delta check
- Canvas is `pointer-events-none` and pauses rendering when the hero scrolls out of view (`frameloop="demand"` flip via IntersectionObserver)

### Files
- Add: `src/components/LossLandscape.tsx`
- Edit: `src/components/sections/Hero.tsx` (swap background component, add subtle overlay)
- Edit: `package.json` (three, @react-three/fiber, @react-three/drei at pinned versions)

