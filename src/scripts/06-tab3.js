// ============================================================
//  تَب ۳ – گروه‌بندی پورت‌ها بر اساس آی‌پی
// ============================================================
const input3 = getEl('inputText3');
const portDelimiter = getEl('portDelimiter');
const tableWrapper = getEl('tableWrapper');
const outputText3 = getEl('outputText3');

let lastIpMap = new Map();

document.querySelectorAll('.port-quick').forEach(btn => {
    btn.addEventListener('click', function() {
        const char = this.dataset.char;
        portDelimiter.value = char;
        document.querySelectorAll('.port-quick').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
    });
});
portDelimiter.addEventListener('input', function() {
    document.querySelectorAll('.port-quick').forEach(b => b.classList.remove('selected'));
});

function buildTable(ipMap) {
    if (ipMap.size === 0) {
        return `<div class="no-data">هیچ داده‌ای یافت نشد.</div>`;
    }
    let html = `<table>
        <thead><tr><th>آی‌پی</th><th>پورت‌ها</th></tr></thead>
        <tbody>`;
    for (const [ip, ports] of ipMap) {
        let portsHtml = '';
        ports.forEach((item, index) => {
            const portText = escapeHtml(item.port);
            const isDuplicate = item.count > 1;
            portsHtml += portText;
            if (isDuplicate) {
                portsHtml += ` <span class="duplicate-badge">🔴 تکراری (${item.count})</span>`;
            }
            if (index < ports.length - 1) {
                portsHtml += '، ';
            }
        });
        html += `<tr><td>${escapeHtml(ip)}</td><td>${portsHtml}</td></tr>`;
    }
    html += `</tbody></table>`;
    return html;
}

function processTab3() {
    const lines = input3.value.split('\n').filter(line => line.trim() !== '');
    const delimiter = portDelimiter.value;
    if (!delimiter) {
        alert('لطفاً یک کاراکتر جداکننده وارد کنید.');
        return;
    }
    const ipMap = new Map();

    for (const line of lines) {
        const parts = line.split(delimiter);
        if (parts.length < 2) continue;
        const ip = parts[0].trim();
        const port = parts.slice(1).join(delimiter).trim();
        if (!ip || !port) continue;

        if (!ipMap.has(ip)) {
            ipMap.set(ip, []);
        }
        const portsArray = ipMap.get(ip);
        const found = portsArray.find(item => item.port === port);
        if (found) {
            found.count += 1;
        } else {
            portsArray.push({ port, count: 1 });
        }
    }

    lastIpMap = ipMap;
    const tableHtml = buildTable(ipMap);
    tableWrapper.innerHTML = tableHtml;
    outputText3.value = '';
}

getEl('processBtn3').addEventListener('click', processTab3);

getEl('extractBtn').addEventListener('click', function() {
    if (lastIpMap.size === 0) {
        alert('ابتدا داده‌ها را با دکمه «گروه‌بندی» پردازش کنید.');
        return;
    }
    const lines = [];
    for (const [ip, ports] of lastIpMap) {
        for (const item of ports) {
            lines.push(ip + ':' + item.port);
        }
    }
    outputText3.value = lines.join('\n');
});

getEl('clearBtn3').addEventListener('click', function() {
    input3.value = '';
    portDelimiter.value = ':';
    tableWrapper.innerHTML = `<div class="no-data">برای مشاهده نتیجه، ورودی را وارد کرده و «گروه‌بندی» را بزنید.</div>`;
    outputText3.value = '';
    lastIpMap.clear();
    document.querySelectorAll('.port-quick').forEach(b => b.classList.remove('selected'));
    document.querySelector('.port-quick[data-char=":"]')?.classList.add('selected');
    saveState();
});

getEl('copyBtn3').addEventListener('click', function() {
    copyOutput(outputText3, 'خروجی خطی کپی شد!');
});

input3.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); processTab3(); }
});

// انتخاب پیش‌فرض جداکننده
portDelimiter.value = ':';
document.querySelector('.port-quick[data-char=":"]')?.classList.add('selected');
