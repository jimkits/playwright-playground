function openBackdrop(testid) {
  document.querySelector(`[data-testid="${testid}"]`).hidden = false;
}
function closeBackdrop(testid) {
  document.querySelector(`[data-testid="${testid}"]`).hidden = true;
}

document.querySelector('[data-testid="modals-open-standard-btn"]').addEventListener("click", () => openBackdrop("modals-standard-backdrop"));
document.querySelector('[data-testid="modals-standard-close-btn"]').addEventListener("click", () => closeBackdrop("modals-standard-backdrop"));

document.querySelector('[data-testid="modals-open-nested-btn"]').addEventListener("click", () => openBackdrop("modals-nested-backdrop"));
document.querySelector('[data-testid="modals-nested-close-btn"]').addEventListener("click", () => closeBackdrop("modals-nested-backdrop"));
document.querySelector('[data-testid="modals-nested-ok-btn"]').addEventListener("click", () => closeBackdrop("modals-nested-backdrop"));

const confirmResult = document.querySelector('[data-testid="modals-confirm-result"]');

document.querySelector('[data-testid="modals-open-confirm-btn"]').addEventListener("click", () => openBackdrop("modals-confirm-backdrop"));
document.querySelector('[data-testid="modals-confirm-cancel-btn"]').addEventListener("click", () => {
  closeBackdrop("modals-confirm-backdrop");
  confirmResult.textContent = "Deletion cancelled.";
});
document.querySelector('[data-testid="modals-confirm-delete-btn"]').addEventListener("click", () => {
  closeBackdrop("modals-confirm-backdrop");
  confirmResult.textContent = "Item deleted.";
});

const nativeResult = document.querySelector('[data-testid="modals-native-result"]');

document.querySelector('[data-testid="modals-open-alert-btn"]').addEventListener("click", () => {
  window.alert("This is a native browser alert.");
  nativeResult.textContent = "alert() dismissed.";
});

document.querySelector('[data-testid="modals-open-confirmdialog-btn"]').addEventListener("click", () => {
  const result = window.confirm("Do you confirm this action?");
  nativeResult.textContent = `confirm() returned: ${result}`;
});

document.querySelector('[data-testid="modals-open-prompt-btn"]').addEventListener("click", () => {
  const result = window.prompt("Type something:");
  nativeResult.textContent = `prompt() returned: ${result}`;
});
