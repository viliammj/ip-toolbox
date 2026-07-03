// ============================================================
//  توابع پایه — استفاده مشترک در همه تب‌ها
// ============================================================
function getEl(id) { return document.getElementById(id); }

// جلوگیری از XSS: تبدیل کاراکترهای خاص HTML قبل از درج در innerHTML
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
