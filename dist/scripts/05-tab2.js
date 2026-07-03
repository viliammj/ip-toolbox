// ============================================================
//  تَب ۲ – پاک کردن از کاراکتر به بعد
// ============================================================
const input2 = getEl('inputText2');
const delimiterInput = getEl('delimiterInput');
const output2 = getEl('outputText2');

document.querySelectorAll('.quick-btn:not(.port-quick)').forEach(btn => {
    btn.addEventListener('click', function() {
        const char = this.dataset.char;
        delimiterInput.value = char;
        document.querySelectorAll('.quick-btn:not(.port-quick)').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
    });
});
delimiterInput.addEventListener('input', function() {
    document.querySelectorAll('.quick-btn:not(.port-quick)').forEach(b => b.classList.remove('selected'));
});

function processTab2() {
    const lines = input2.value.split('\n');
    const delimiter = delimiterInput.value;
    if (!delimiter) { alert('لطفاً یک کاراکتر جداکننده وارد کنید.'); return; }
    const result = lines.map(line => {
        const idx = line.indexOf(delimiter);
        return idx === -1 ? line : line.substring(0, idx);
    });
    output2.value = result.join('\n');
}
getEl('processBtn2').addEventListener('click', processTab2);
getEl('clearBtn2').addEventListener('click', function() {
    input2.value = '';
    delimiterInput.value = '';
    output2.value = '';
    document.querySelectorAll('.quick-btn:not(.port-quick)').forEach(b => b.classList.remove('selected'));
    saveState();
});
getEl('copyBtn2').addEventListener('click', function() { copyOutput(output2); });
input2.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); processTab2(); }
});
