# playwright-playground

A website with different type page objects to automate.

Modeled after [PlayLab](https://playwrightlab.github.io/), this is a personal training playground: 19 sections covering a category of UI patterns each (forms, data tables, modals, drag-and-drop, shadow DOM, flaky elements, etc.), built for practicing Playwright locators and automation techniques.

## Structure

- `playwright-playground-web/` - the training website, build using Claude Code. Plain HTML/CSS/vanilla JS, no build step. All 19 sections live on `index.html` as one long scrolling page, each reachable via an anchor link from the header's section.
- `playwright-playground-web-e2e` - The folder that hosts the playwright tests, build manually without LLM assistance. Check the `Getting started with Playwright` section bellow for assistance, for your own project.

## Running the site

### Locally

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

### Online

The website is deployed to Vercel on the address `https://playwright-playground-db.vercel.app/`

## Getting started with Playwright

### Install playwright

- Create a new top-level folder to create your framework.
- In the terminal navigate to it, using `cd [folder-name]`
- In the terminal type `npm init playwright@latest`

### Run tests

`npx playwright test`

- See the browser window: add --headed.
- Run a single project/browser: --project=chromium.
- Run one file: npx playwright test tests/example.spec.ts.
- Open testing UI: --ui.

### Configure playwright.config.ts

Update the `reporter`, `baseURL`, `projects` and `webServer`. You can check how I did it.

### Create a setup test

- Create a new file in `tests` to use as a setup. It can be as simple as checking if the website loads.
- Then create a new setup project in `/playwright.config.ts` that will only run the tests in that file.
- Finally update all the other projects in `/playwright.config.ts` to depend on the setup project, and ignore the specific test file. This will ensure the setup tests run first, before the rest of the tests. 

### Create new tests

At this point, you should be ready to start writing new tests. My suggestion is to create a new file in `\tests` per website Section. Good luck and have fun!

### Advanced techniques

- Keep the page Locators, as well as commonly used steps in seperate files, in the `/pages` folder. This will make them easilly reusable and follow coding standards.
- Register the page objects in the `/fixtures.ts` file. This way each test will only need to call the page objects it requires instead of instanting it every time.

### Troubleshooting

| Error | Fix | Notes |
| -- | -- | -- |
| Command failed: npx playwright install --with-deps | `PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=ubuntu24.04-x64 npx playwright install --with-deps` | The Linux OS is too new for this Playwright version to recognize. Override the detected platform to the closest supported release. Check which versions are supported in the official site, `https://playwright.dev/docs/intro#system-requirements` |
| Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i 
  --save-dev @types/node` and then add 'node' to the types field in your tsconfig. | Create the file `tsconfig.json`. fill in the details from this project. | process is a Node.js global, it's not part of the standard JS/DOM lib that TypeScript knows about by default. TypeScript only recognizes it when the @types/node ambient type declarations are loaded into the compilation. |