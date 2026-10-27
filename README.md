# Interior Motives

Move the furniture, paint individual wall sections and see what changes with the light. Built with Three.js and Vite; deployed as a static GitHub Pages site. No account or backend is needed. The deployed website is public; personal layouts remain in the browser unless exported.

## Use

- Select the entrance, living floor or upper floor.
- Drag furniture or select it from the list to move, resize, rotate, recolour, duplicate or delete it.
- Click individual wall sections to paint them independently. Palettes apply to the selected section; clear the selection to style room surfaces.
- Far-side walls are the default: near-side walls disappear as the camera orbits. Choose full, cutaway or hidden walls instead.
- Add translucent context floors under Visible floors.
- Change the time of day to preview illustrative sunlight and shadows.
- Open References for all three supplied measured floor plans and interior/terrace photographs.
- Changes save automatically to this browser. Export/import JSON to keep or transfer layouts. Undo/redo covers layout and paint edits. The camera image button downloads a PNG.

## Run locally

```sh
npm ci
npm run dev
```

Open the HTTP URL printed by Vite. Do not open HTML directly using `file://`.

```sh
npm test
npm run build
```

Browser interaction checks (with the dev server running):

```sh
node tests/browser.mjs
node tests/walls.mjs
```

Set `CHROME_PATH` to a Chrome executable on other platforms, `TEST_URL` to a different HTTP origin, and `TMPDIR` to a scratch directory. The browser checks cover rendering, drag, move, rotation, history, persistence, export/import, reference images, per-section paint, light controls, floor visibility, and mobile overflow.

## Model fidelity

The three supplied plans determine room dimensions, floor outlines and the L-shaped terrace. Wall thickness, door openings, stair geometry, furnishings and small details are simplified. Roof pitch is not specified by the plans; low eaves are indicated without inventing a pitch. This is a design visualisation, not a surveyed architectural model. Furniture boundaries are checked against room outlines; overlaps with other furniture and fixed kitchen fittings are permitted so clearances must be checked manually. Lighting is a visual approximation, not a location-, date- or weather-calibrated sun study.

## Privacy and media

No street address, listing URLs, street photographs or location metadata are included in the app. Interior photographs and supplied floor plans are retained as design references; their original creators retain rights. Floor plans preserve the original attribution. Browser storage is device-specific and can be cleared by the browser; export layouts you want to retain.

## Deployment

Push to `main` to run tests, build and deploy through GitHub Actions. GitHub Pages must use the Actions source. The custom domain is specified in `public/CNAME` and in the repository Pages settings. Configure the `interior-motives` DNS CNAME to `0xdeafcafe.github.io`. HTTPS becomes available after DNS validation and certificate issuance.
