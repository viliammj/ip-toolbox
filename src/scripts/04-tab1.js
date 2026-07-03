// ============================================================
//  تَب ۱ – افزودن متن ثابت و شماره (هر دو اختیاری)
// ============================================================
const input1 = getEl('inputText1');
const fixedText = getEl('fixedText');
const startNumber = getEl('startNumber');
const output1 = getEl('outputText1');

function processTab1() {
    const rawLines = input1.value.split('\n');
    // نادیده گرفتن خطوطی که کاملاً خالی هستند (فقط فاصله یا هیچ)
    const lines = rawLines.filter(line => line.trim() !== '');

    if (lines.length === 0) {
        alert('ورودی معتبری یافت نشد (همه خطوط خالی هستند).');
        output1.value = '';
        return;
    }
    if (lines.length < rawLines.length) {
        const removed = rawLines.length - lines.length;
        console.info(`${removed} خط خالی نادیده گرفته شد.`);
    }

    const fixed = fixedText.value;
    const startVal = startNumber.value.trim();

    // بررسی می‌کنیم که آیا شماره شروع معتبر وارد شده است یا خیر
    let useNumber = false;
    let start = 0;
    if (startVal !== '') {
        // فقط عدد صحیح (مثبت یا منفی) پذیرفته می‌شود؛ مقادیر اعشاری یا نامعتبر رد می‌شوند
        if (!/^-?\d+$/.test(startVal)) {
            alert('«شماره شروع» باید یک عدد صحیح باشد (اعشار مجاز نیست). لطفاً مقدار را اصلاح کنید.');
            return;
        }
        start = parseInt(startVal, 10);
        if (start < 0) {
            if (!confirm('شماره شروع منفی است. آیا مطمئن هستید که می‌خواهید ادامه دهید؟')) {
                return;
            }
        }
        useNumber = true;
    }

    const result = lines.map((line, idx) => {
        let newLine = line;
        if (fixed) newLine += fixed;
        if (useNumber) newLine += (start + idx);
        return newLine;
    });

    output1.value = result.join('\n');
}

getEl('processBtn1').addEventListener('click', processTab1);
getEl('clearBtn1').addEventListener('click', function() {
    input1.value = '';
    fixedText.value = '';
    startNumber.value = '';
    output1.value = '';
    saveState();
});
getEl('copyBtn1').addEventListener('click', function() { copyOutput(output1); });
input1.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); processTab1(); }
});
