const usersList = document.querySelector('[data-testid="network-users-list"]');
const usersLoading = document.querySelector('[data-testid="network-fetch-users-loading"]');
const usersError = document.querySelector('[data-testid="network-fetch-users-error"]');

document.querySelector('[data-testid="network-fetch-users-btn"]').addEventListener("click", async () => {
  usersLoading.hidden = false;
  usersError.hidden = true;
  usersList.innerHTML = "";
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    const users = await response.json();
    usersList.innerHTML = users
      .map((u) => `<li data-testid="network-user-item-${u.id}">${u.name} — ${u.email}</li>`)
      .join("");
  } catch (err) {
    usersError.hidden = false;
    usersError.textContent = `Failed to load users: ${err.message}`;
  } finally {
    usersLoading.hidden = true;
  }
});

const postForm = document.querySelector('[data-testid="network-create-post-form"]');
const postLoading = document.querySelector('[data-testid="network-post-loading"]');
const postResult = document.querySelector('[data-testid="network-post-result"]');
const postError = document.querySelector('[data-testid="network-post-error"]');

postForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = document.querySelector('[data-testid="network-post-input-title"]').value;
  const body = document.querySelector('[data-testid="network-post-input-body"]').value;

  postLoading.hidden = false;
  postResult.hidden = true;
  postError.hidden = true;

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    const data = await response.json();
    postResult.hidden = false;
    postResult.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    postError.hidden = false;
    postError.textContent = `Failed to create post: ${err.message}`;
  } finally {
    postLoading.hidden = true;
  }
});
