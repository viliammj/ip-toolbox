// ============================================================
//  ذخیره‌سازی خودکار (localStorage)
//  برای افزودن یک تب جدید به این ذخیره‌سازی، فقط id فیلد
//  ورودی موردنظر را به آرایه‌ی persistedFields اضافه کنید.
// ============================================================
const STORAGE_KEY = 'textToolsState_v1';
const persistedFields = [
    'fixedText', 'startNumber', 'inputText1',
    'delimiterInput', 'inputText2',
    'portDelimiter', 'inputText3'
];

function saveState() {
    try {
        const state = {};
        persistedFields.forEach(id => {
            const el = getEl(id);
            if (el) state[id] = el.value;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* localStorage در دسترس نیست، نادیده گرفته می‌شود */ }
}

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const state = JSON.parse(raw);
        persistedFields.forEach(id => {
            const el = getEl(id);
            if (el && typeof state[id] === 'string' && state[id] !== '') {
                el.value = state[id];
            }
        });
    } catch (e) { /* داده ذخیره‌شده خراب یا در دسترس نیست */ }
}
