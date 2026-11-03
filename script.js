const layoutWidths = [1280, 1920, 2560, 1024, 3440, 1600];

function findMax(numbers) {
    return Math.max(...numbers);
}

function filterWideLayouts(numbers) {
    return numbers.filter(width => width > 1920);
}

function calculateSum(numbers) {
    return numbers.reduce((sum, number) => sum + number, 0);
}

const name = prompt("Введите ваше имя:");
const maxWidth = findMax(layoutWidths);
const wideLayouts = filterWideLayouts(layoutWidths);
const totalWidth = calculateSum(layoutWidths);
const averageWidth = totalWidth / layoutWidths.length;

let narrowLayoutsCount = 0;

for (const width of layoutWidths) {
    if (width <= 1200) {
        narrowLayoutsCount++;
    }
}

const narrowLayoutsShare = (narrowLayoutsCount / layoutWidths.length) * 100;

alert(`Привет, ${name}! Средняя ширина – ${averageWidth.toFixed(2)} px, ${wideLayouts.length} макетов – сверхширокие.`);

console.log(`Доля узких макетов: ${narrowLayoutsShare.toFixed(2)}%`);
console.log(`Количество узких макетов: ${narrowLayoutsCount}`);

if (maxWidth > 2560) {
    console.log("Такой макет лучше разбить на несколько экранов");
}
