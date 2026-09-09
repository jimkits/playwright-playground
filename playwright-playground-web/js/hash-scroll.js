// Native fragment scrolling happens before the page scripts finish populating
// content (selects, tables, dropdown menus, etc.), so the browser's initial
// scroll-to-anchor lands in the wrong place on first load. Re-run it once
// everything has settled.
function scrollToCurrentHash() {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (target) target.scrollIntoView();
}

window.addEventListener("load", () => {
  requestAnimationFrame(() => requestAnimationFrame(scrollToCurrentHash));
});

window.addEventListener("hashchange", scrollToCurrentHash);
