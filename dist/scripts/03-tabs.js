// ============================================================
//  مدیریت تب‌ها — عمومی، نیازی به تغییر برای تب‌های جدید ندارد
//  فقط کافیست یک <button class="tab-btn" data-tab="tabX"> و
//  یک <div class="tab-panel" id="tabX"> در HTML اضافه شود.
// ============================================================
(function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            const target = document.getElementById(this.dataset.tab);
            if (target) target.classList.add('active');
        });
    });
})();
