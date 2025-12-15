const user = sessionStorage.getItem("user");

if (!user) {
  window.location.href = "index.html";
}

const u = JSON.parse(user);
document.getElementById("info").textContent =
  `Xin chào ${u.nickname} | Vai trò: ${u.role}`;

document.getElementById("logout").onclick = () => {
  sessionStorage.clear();
  window.location.href = "index.html";
};
