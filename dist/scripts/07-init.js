// ============================================================
//  راه‌اندازی نهایی — بازیابی وضعیت ذخیره‌شده و اتصال listenerهای ذخیره
//  این فایل باید همیشه آخرین اسکریپت بارگذاری‌شده باشد.
// ============================================================

// ابتدا مقادیر ذخیره‌شده قبلی (در صورت وجود) را بازیابی می‌کنیم
loadState();

// پس از هر تغییر در فیلدهای ورودی، وضعیت را ذخیره می‌کنیم
persistedFields.forEach(id => {
    const el = getEl(id);
    if (el) el.addEventListener('input', saveState);
});

// اگر جداکننده تب ۳ از حالت ذخیره‌شده بازیابی شد، دکمه میان‌بر متناظر را هم فعال می‌کنیم
document.querySelectorAll('.port-quick').forEach(b => b.classList.remove('selected'));
const savedPortDelim = portDelimiter.value;
const matchingPortBtn = document.querySelector(`.port-quick[data-char="${CSS.escape(savedPortDelim)}"]`);
if (matchingPortBtn) matchingPortBtn.classList.add('selected');

document.querySelectorAll('.quick-btn:not(.port-quick)').forEach(b => b.classList.remove('selected'));
const savedDelim = delimiterInput.value;
if (savedDelim) {
    const matchingBtn = document.querySelector(`.quick-btn:not(.port-quick)[data-char="${CSS.escape(savedDelim)}"]`);
    if (matchingBtn) matchingBtn.classList.add('selected');
}
