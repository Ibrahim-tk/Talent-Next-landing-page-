# Tal Orb

A self-contained animated brand orb. Two files are the component:
`tal-orb.css` and `tal-orb.js`. Everything else here is a wrapper, a demo or
this note.

No dependencies, no build step, no network requests, no fonts, no images — the
one raster in the stylesheet is an inline data-URI noise texture. The
stylesheet defines no element or global selectors and carries no reset, so it
can be dropped into an existing app without touching anything around it.

## Files

| File | What it is |
| --- | --- |
| `tal-orb.css` | The whole component's appearance. Required. |
| `tal-orb.js` | Behaviour for the `speaking` state only. Required if you use `speaking`. |
| `tal-orb.html` | The canonical markup, to copy. |
| `tal-orb.jsx` | A React wrapper around the same markup. |
| `demo.html` | Open it in a browser: every state, and the orb at four sizes. |

## Plain HTML

```html
<link rel="stylesheet" href="tal-orb.css">
<script src="tal-orb.js"></script>
```

Then paste the block from `tal-orb.html`. `tal-orb.js` is a classic script — no
`import`/`export`, the only global it sets is `window.BorbOrb` — and it picks up
every `.borb` on the page at `DOMContentLoaded`.

## React

Copy `tal-orb.jsx` and `tal-orb.css` into your app, import the stylesheet, and
load `tal-orb.js` (a `<script>` in `index.html`, or `import './tal-orb.js'` if
your bundler runs side-effect scripts).

```jsx
import TalOrb from './tal-orb';

<TalOrb state="thinking" size={288} />
```

The wrapper calls `BorbOrb.mount` once on mount and `destroy` on unmount. It
does not reimplement any of the animation.

## States

Set `data-state` on the root. The component watches the attribute with a
`MutationObserver`, so changing it from any framework is the whole of the API.

`idle` · `listening` · `thinking` · `thinking2` · `thinking3` · `speaking` ·
`loading` · `error`

Every state except `speaking` is pure CSS and works with the stylesheet alone.
`speaking` is not expressible in CSS: it interpolates each chevron's centreline
from the mark's own geometry out to a vibrating string, regenerating the SVG
paths per frame, which is what `tal-orb.js` does.

`prefers-reduced-motion: reduce` is honoured — the speaking state still morphs
but the string amplitude drops to zero.

## Size

`--borb-size` is the only dimension you set. It defaults to `288px` and every
length in the stylesheet is a `calc()` off it, so one keyframe set covers a
16px avatar and a 600px hero.

```html
<span class="borb" data-state="idle" style="--borb-size:32px">…</span>
```

**The box is larger than the sphere.** The glass body is drawn at `0.80556` of
`--borb-size`; the rest is shadow and ripple, which are meant to bleed outside
it. If you are dropping the orb into a slot that previously held a flat mark of
diameter *D*, set `--borb-size: D / 0.80556` and set the element's own
`width`/`height` to *D*. The children all centre on `inset:0;margin:auto`, so a
box smaller than `--borb-size` does not shift anything, it only lets the glow
out.

## Colour

The orb's ramp is shades of one accent red (`#f9423a` and `#d63932` are real
brand tokens), held between hue 2.5° and 12°. Two failure modes sit on either
side of that ramp and both are easy to walk into when retuning it:

- Push the light end's **hue** up and the orb reads orange.
- Lighten the light end by mixing toward **white** and it reads pink — a red's
  green and blue converge as it approaches white, and a pale desaturated red
  *is* pink.

So the light stops lighten while **holding saturation** (65% and 51%, not the
20–30% a white mix would give) and take a small warm push so green stays clear
of blue. Saturation keeps a light stop reading as the accent; green-above-blue
keeps it off magenta. Check both ends if you recolour it.

## One live orb per screen

Give a live state to the **one** orb the reader is actually talking to. An orb
in page chrome, or used as an identity mark beside the product name, stays
`idle` forever. Driving every orb on the page from one state is how the header,
the dock, the composer and every byline in a thread all start thinking at once
— and a logo that animates whenever the product is busy is noise.

## JavaScript API

```js
BorbOrb.mount(el)        // bind one .borb element added after load
BorbOrb.mountAll(scope)  // bind every .borb inside scope (default: document)
BorbOrb.destroyAll()     // unbind everything
```

`mount` returns `{ el, refresh(), destroy() }`, or `null` if the element is
already bound or its markup is incomplete. Binding is idempotent — it stamps
`data-borb-bound="1"` on the root.

## Accessibility

The markup carries `aria-hidden="true"` throughout: the orb is decoration, and
the state it shows should also be stated in text your users can read. If the
orb is the only indication that the assistant is thinking, put that in a live
region next to it.
