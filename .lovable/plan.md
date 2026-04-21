

## Make the ball draggable with the mouse

Add click-and-drag interaction to the gradient-descent ball so you can grab it, fling it, or place it anywhere on the loss landscape.

### How it will feel
- Hover the ball → cursor changes to `grab`
- Press and drag → cursor becomes `grabbing`, the ball follows your mouse across the surface (its height snaps to the landscape under the cursor)
- Release → the ball resumes physics from that point. If you were moving when you let go, that motion becomes its initial velocity (a "fling"), so you can launch it over ridges into different valleys
- While dragging, the auto-respawn / fade-out timer is paused so the ball won't disappear under your cursor
- The colorful trail keeps drawing during the drag, so you see the path you traced

### Technical approach (one file: `src/components/LossLandscape.tsx`)
- Flip the hero overlay so the Canvas can receive pointer events: remove `pointer-events-none` from the wrapping `div`, but keep the two gradient overlay `div`s as `pointer-events-none` so text and CTAs above stay clickable. The Canvas itself sits behind hero content (z-index unchanged); only the ball mesh will actually consume events.
- Add an invisible **drag plane** (a large horizontal `<mesh>` at y≈0 with `visible={false}`) used purely for raycasting the mouse into world XZ coordinates while dragging.
- On the ball `<mesh>`:
  - `onPointerOver` → `document.body.style.cursor = 'grab'`
  - `onPointerOut` → reset cursor (unless dragging)
  - `onPointerDown` → start drag: `e.stopPropagation()`, `e.target.setPointerCapture(e.pointerId)`, set `dragging = true`, cursor `grabbing`, zero velocity, record timestamp + position
- On the Canvas (or the drag plane) while `dragging`:
  - `onPointerMove` → raycast pointer against the drag plane → get `(x, z)` → update `state.x`, `state.y` to that point (clamped to `±SIZE/2 - 0.3`); compute instantaneous velocity from delta-position / delta-time and store as `lastDragVx/Vy` (smoothed with a small EMA) so release feels natural
  - `onPointerUp` / `onPointerLeave` → end drag: set `vx = lastDragVx`, `vy = lastDragVy` (clamped to a max so flings stay reasonable), reset cursor, resume physics
- In the existing `useFrame` ball update: if `dragging` is true, skip gravity/integration but still update the trail and the ball's Y from `loss(x, y)` so it hugs the surface; also reset the `settledFrames` counter so it can't fade out mid-drag
- `prefers-reduced-motion` users: dragging still works (it's user-initiated); only the autonomous physics stays paused — on release, velocity is applied normally so they can flick it once and watch it glide
- Touch support comes for free since R3F pointer events cover touch + mouse; pointer capture ensures the drag continues even if the cursor leaves the ball

### Files
- Edit: `src/components/LossLandscape.tsx` (add drag state, drag plane, pointer handlers, integrate with existing physics loop)
- Edit: `src/components/sections/Hero.tsx` — none needed; the LossLandscape wrapper handles its own pointer-events scoping internally

