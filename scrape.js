// scrape.js
const { chromium } = require('playwright');

(async () => {
    const seeds = Array.from({ length: 10 }, (_, i) => 49 + i);
    let totalSum = 0;

    const browser = await chromium.launch();
    const page = await browser.newPage();

    for (const seed of seeds) {
        const url = `https://onecompiler.com/html/42cdk7j7y/seed/${seed}`;
        await page.goto(url, { waitUntil: 'load', timeout: 60000 });

        const numbers = await page.$$eval("table td", cells =>
            cells.map(cell => parseFloat(cell.innerText)).filter(n => !isNaN(n))
        );

        const sum = numbers.reduce((a, b) => a + b, 0);
        console.log(`Seed ${seed} sum: ${sum}`);
        totalSum += sum;
    }

    console.log(`✅ TOTAL SUM: ${totalSum}`);
    await browser.close();
})();
