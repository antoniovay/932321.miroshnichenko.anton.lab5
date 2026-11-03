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

document.addEventListener("DOMContentLoaded", function () {
    const paletteGrid = document.getElementById("palette-grid");
    const addButton = document.getElementById("add-color");
    const clearButton = document.getElementById("clear-palette");
    const togglePaletteButton = document.getElementById("toggle-palette");
    const toggleThemeButton = document.getElementById("toggle-theme");
    const paletteSection = document.querySelector("#palettes");
    const paletteCards = document.querySelectorAll(".palette-card");
    const message = document.getElementById("palette-message");

    if (!paletteGrid || !addButton || !clearButton || !togglePaletteButton || !toggleThemeButton || !paletteSection || !message || paletteCards.length === 0) {
        console.error("Не найдены необходимые элементы палитры.");
        return;
    }

    function savePalette() {
        const colors = [];
        paletteGrid.querySelectorAll(".custom-swatch").forEach(function (item) {
            colors.push({
                name: item.querySelector("span").textContent,
                color: item.querySelector(".swatch").style.backgroundColor
            });
        });
        localStorage.setItem("designerPalette", JSON.stringify(colors));
    }

    function createColorTile(color, colorName) {
        const item = document.createElement("div");
        item.className = "swatch-item custom-swatch";

        const swatch = document.createElement("div");
        swatch.className = "swatch";
        swatch.style.backgroundColor = color;
        swatch.setAttribute("aria-label", colorName);

        const title = document.createElement("span");
        title.textContent = `${colorName} (${color})`;
        swatch.appendChild(title);

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "swatch-delete";
        deleteButton.textContent = "Удалить";
        deleteButton.addEventListener("click", function () {
            item.remove();
            savePalette();
            message.textContent = "Цвет удалён.";
        });

        item.append(swatch, deleteButton);
        let customCard = paletteGrid.querySelector(".custom-palette-card");
        if (!customCard) {
            customCard = document.createElement("article");
            customCard.className = "palette-card custom-palette-card";
            const heading = document.createElement("h3");
            heading.textContent = "Мои цвета";
            const swatches = document.createElement("div");
            swatches.className = "swatches";
            customCard.append(heading, swatches);
            paletteGrid.appendChild(customCard);
        }
        customCard.querySelector(".swatches").appendChild(item);
    }

    function restorePalette() {
        const savedColors = JSON.parse(localStorage.getItem("designerPalette") || "[]");
        savedColors.forEach(function (item) {
            createColorTile(item.color, item.name);
        });

        if (localStorage.getItem("paletteHidden") === "true") {
            paletteGrid.classList.add("palette-hidden");
            togglePaletteButton.textContent = "Показать палитру";
        }

        if (localStorage.getItem("designerTheme") === "dark") {
            document.body.classList.add("dark-theme");
            toggleThemeButton.textContent = "Светлая тема";
        }
    }

    addButton.addEventListener("click", function () {
        const color = prompt("Введите HEX-код цвета (например, #AABBCC):");
        if (color === null) return;
        const normalizedColor = color.trim();
        if (!/^#[0-9A-Fa-f]{6}$/.test(normalizedColor)) {
            message.textContent = "Ошибка: введите HEX-код в формате #RRGGBB.";
            return;
        }

        const colorName = prompt("Введите название цвета:");
        if (colorName === null) return;
        if (!colorName.trim()) {
            message.textContent = "Ошибка: название цвета не может быть пустым.";
            return;
        }

        createColorTile(normalizedColor, colorName.trim());
        savePalette();
        message.textContent = "Цвет добавлен.";
    });

    clearButton.addEventListener("click", function () {
        const customCard = paletteGrid.querySelector(".custom-palette-card");
        if (customCard) customCard.remove();
        savePalette();
        message.textContent = "Добавленные цвета удалены.";
    });

    togglePaletteButton.addEventListener("click", function () {
        const isHidden = paletteGrid.classList.toggle("palette-hidden");
        togglePaletteButton.textContent = isHidden ? "Показать палитру" : "Скрыть палитру";
        localStorage.setItem("paletteHidden", String(isHidden));
    });

    toggleThemeButton.addEventListener("click", function () {
        const isDark = document.body.classList.toggle("dark-theme");
        toggleThemeButton.textContent = isDark ? "Светлая тема" : "Тёмная тема";
        localStorage.setItem("designerTheme", isDark ? "dark" : "light");
    });

    restorePalette();
});
