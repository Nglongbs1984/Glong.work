const SUPABASE_URL = "https://ypsailqkizgspfhdwdml.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwc2FpbHFraXpnc3BmaGR3ZG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1MTQzMjgsImV4cCI6MjA4MTA5MDMyOH0.YpaHJg6EBbPlZcfjbS13oVRQ1btnuwgN2OLc65xgOyM";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// -------- REGISTER --------
async function register() {
    const nickname = nicknameEl.value;
    const email = emailEl.value;
    const password = passwordEl.value;

    const password_hash = await hashPassword(password);

    const { error } = await supabase.rpc("register_user", {
        p_nickname: nickname,
        p_email: email,
        p_password_hash: password_hash
    });

    if (error) {
        alert(error.message);
    } else {
        alert("Đăng ký thành công");
        location.href = "index.html";
    }
}

// -------- LOGIN --------
async function login() {
    const email = emailEl.value;
    const password = passwordEl.value;
    const password_hash = await hashPassword(password);

    const { data, error } = await supabase
        .rpc("login_user", {
            p_email: email,
            p_password_hash: password_hash
        })
        .single();

    if (error || !data) {
        alert("Sai email hoặc mật khẩu");
        return;
    }

    localStorage.setItem("user", JSON.stringify(data));
    location.href = "dashboard.html";
}

// -------- LOGOUT --------
function logout() {
    localStorage.removeItem("user");
    location.href = "index.html";
}

// -------- CHECK LOGIN --------
function requireLogin() {
    const u = localStorage.getItem("user");
    if (!u) location.href = "index.html";
    return JSON.parse(u);
}
