const form = document.getElementById("loginForm");
const errorEl = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.textContent = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // 🔐 Hash password (SHA-256)
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const password_hash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  console.log("HASH:", password_hash);

  const { data: user, error } = await supabase.rpc("login_user", {
    p_email: email,
    p_password_hash: password_hash
  });

  if (error) {
    errorEl.textContent = "Lỗi server: " + error.message;
    console.error(error);
    return;
  }

  if (!user || user.length === 0) {
    errorEl.textContent = "Sai email hoặc mật khẩu";
    return;
  }

  // ✅ Lưu session
  sessionStorage.setItem("user", JSON.stringify(user[0]));

  // Chuyển trang
  window.location.href = "dashboard.html";
});
