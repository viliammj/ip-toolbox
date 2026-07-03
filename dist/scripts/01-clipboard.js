// ============================================================
//  کپی در کلیپ‌بورد + fallback برای مرورگرهای قدیمی/محدودشده
// ============================================================
function copyOutput(outputEl, msg) {
    if (!outputEl.value) { alert('محتوایی برای کپی وجود ندارد!'); return; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(outputEl.value)
            .then(() => alert('✅ ' + (msg || 'کپی شد!')))
            .catch(() => fallbackCopy(outputEl, msg));
    } else {
        fallbackCopy(outputEl, msg);
    }
}

function fallbackCopy(outputEl, msg) {
    try {
        outputEl.select();
        const ok = document.execCommand('copy');
        if (ok) {
            alert('✅ ' + (msg || 'کپی شد!'));
        } else {
            throw new Error('execCommand failed');
        }
    } catch (err) {
        alert('❌ کپی خودکار انجام نشد. لطفاً متن را به‌صورت دستی انتخاب و کپی کنید (Ctrl+C).');
    }
}
