#!/usr/bin/env node
/**
 * build.js
 * ------------------------------------------------------------
 * اسکریپت ساخت (بدون هیچ وابستگی npm خارجی).
 * فایل‌های src/ را می‌خواند، partialها را داخل قالب جای‌گذاری
 * می‌کند، و فایل‌های CSS/JS را به‌ترتیب به‌عنوان لینک/اسکریپت
 * جداگانه در dist/ کپی و متصل می‌کند.
 *
 * اجرا: node build.js
 * ------------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

function readFile(p) {
    return fs.readFileSync(p, 'utf8');
}

function ensureDir(p) {
    fs.mkdirSync(p, { recursive: true });
}

function copyDirFiles(srcDir, distDir) {
    ensureDir(distDir);
    const files = fs.readdirSync(srcDir).sort(); // ترتیب الفبایی = ترتیب اجرا (00-, 01-, ...)
    files.forEach(file => {
        fs.copyFileSync(path.join(srcDir, file), path.join(distDir, file));
    });
    return files;
}

function build() {
    console.log('🔨 شروع build...');

    // 1) کپی CSS ها به dist/styles و ساخت تگ‌های <link>
    const cssFiles = copyDirFiles(path.join(SRC, 'styles'), path.join(DIST, 'styles'));
    const styleLinks = cssFiles
        .map(f => `    <link rel="stylesheet" href="styles/${f}">`)
        .join('\n');
    console.log(`  ✔ ${cssFiles.length} فایل CSS کپی شد`);

    // 2) کپی JS ها به dist/scripts و ساخت تگ‌های <script>
    const jsFiles = copyDirFiles(path.join(SRC, 'scripts'), path.join(DIST, 'scripts'));
    const scriptTags = jsFiles
        .map(f => `<script src="scripts/${f}"></script>`)
        .join('\n');
    console.log(`  ✔ ${jsFiles.length} فایل JS کپی شد`);

    // 3) خواندن partialهای HTML
    const partialsDir = path.join(SRC, 'partials');
    const tabsNav = readFile(path.join(partialsDir, 'tabs-nav.html'));
    const tab1 = readFile(path.join(partialsDir, 'tab1.html'));
    const tab2 = readFile(path.join(partialsDir, 'tab2.html'));
    const tab3 = readFile(path.join(partialsDir, 'tab3.html'));
    const footer = readFile(path.join(partialsDir, 'footer.html'));

    // 4) جای‌گذاری در قالب اصلی
    let html = readFile(path.join(SRC, 'index.template.html'));
    html = html
        .replace('{{STYLES}}', styleLinks)
        .replace('{{TABS_NAV}}', tabsNav.trimEnd())
        .replace('{{TAB1}}', tab1.trimEnd())
        .replace('{{TAB2}}', tab2.trimEnd())
        .replace('{{TAB3}}', tab3.trimEnd())
        .replace('{{FOOTER}}', footer.trimEnd())
        .replace('{{SCRIPTS}}', scriptTags);

    ensureDir(DIST);
    fs.writeFileSync(path.join(DIST, 'index.html'), html, 'utf8');
    console.log('  ✔ dist/index.html ساخته شد');
    console.log('✅ build با موفقیت تمام شد → dist/index.html را در مرورگر باز کنید.');
}

build();
