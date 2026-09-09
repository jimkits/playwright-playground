# playwright-playground

A website with different type page objects to automate.

Modeled after [PlayLab](https://playwrightlab.github.io/), this is a personal training playground: 19 sections covering a category of UI patterns each (forms, data tables, modals, drag-and-drop, shadow DOM, flaky elements, etc.), built for practicing Playwright locators and automation techniques.

## Structure

- `playwright-playground-web/` — the training website. Plain HTML/CSS/vanilla JS, no build step. All 19 sections live on `index.html` as one long scrolling page, each reachable via an anchor link from the header's section dropdown.

## Running the site

```
cd playwright-playground-web
npx serve -l 5050 .
```

or, without Node:

```
cd playwright-playground-web
python3 -m http.server 5050
```

Then open http://localhost:5050/index.html. Log in on the Protected Content section with `admin` / `admin123`.

## Conventions

Every interactive element carries a `data-testid` attribute using the scheme `<section>-<element>-<role>`, e.g. `form-elements-input-fullname`, `shopping-add-to-cart-3`.
