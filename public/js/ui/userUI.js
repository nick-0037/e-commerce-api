export function renderUser(user) {
  if (user) {
    return `  
    <p class="user__message">Welcome, ${user.username}!</p>
    <div class="user__actions">
      <a class="user__link user__link--logout" href="/">Logout</a>
      ${
        user.role === "admin"
          ? '<a class="user__link user__link--admin" href="/admin">Admin</a>'
          : ""
      }
      <a class="user__link user__link--cart">🛒</a>
    </div>
  `;
  }
  return `  
    <div class="user__actions">
      <a class="user__link user__link--register" href="/register">Register</a>
      <a class="user__link user__link--login" href="/login">Sign in</a>
    </div>
  `;
}