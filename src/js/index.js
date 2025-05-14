let button = document.querySelector("#button");

const fontSizeStandart = 10;


button.addEventListener("click", () => {
    const setTr = tableBody.querySelectorAll("tr:not(.null_tr)");

    if(setTr.length > 0){
        const rows = [];

        setTr.forEach((tr) => {
            const cells = tr.querySelectorAll("td");
            const lastCellValue = parseInt(cells[cells.length - 1].textContent);
            const teamName = cells[1].querySelector("input").value;
            const scores = Array.from(cells).slice(2, cells.length - 1).map(input => parseInt(input.querySelector("input").value) || 0);

            if (teamName && lastCellValue > 0) {
                rows.push([0, teamName, ...scores, lastCellValue]);
            }
        });

        if(rows.length > 0){
            rows.sort((a, b) => b[b.length - 1] - a[a.length - 1]);

            rows.forEach((row, index) => {
                row[0] = index + 1;
            });
            
            createPPTX(rows.slice(0, 20));
        }
    }
});



function createPPTX(rows) {
    let pptx = new PptxGenJS();

    let slide = pptx.addSlide();
    
    // Добавляем фоновое изображение
    slide.background = { 
        fill: "FFFFFF", // Белый фон (на всякий случай)
        path: "/src/img/bg_imgs/den_pobedi.png" // Путь к изображению
    };

    const columns = ["Место", "Название команды", "Раунд 1", "Раунд 2", "Раунд 3", "Раунд 4", "Результат"];
    
    // Общая прозрачность для всех столбцов (75%)
    const transparency = 25;
    
    // Цвета без прозрачности (убрали последние 2 символа BF из Figma-цвета)
    const colorMain = "FF4518";       // Основной цвет (1 столбец)
    const colorSecondary = "FF6B45";  // Вторичный цвет (2, 3 столбцы)
    const colorLight = "FF8D72";      // Светлый вариант (остальные столбцы)
    
	const columnStyles = [
		{ fill: { color: colorMain, transparency }, color: "000000", align: 'center' },    // 1 столбец
		{ fill: { color: colorSecondary, transparency }, color: "000000", align: 'left' }, // 2 столбец
		{ fill: { color: colorLight, transparency }, color: "000000", align: 'center' },   // 3 столбец
		{ fill: { color: colorLight, transparency }, color: "000000", align: 'center' },   // 4 столбец
		{ fill: { color: colorLight, transparency }, color: "000000", align: 'center' },   // 5 столбец
		{ fill: { color: colorLight, transparency }, color: "000000", align: 'center' },   // 6 столбец
		{ fill: { color: colorSecondary, transparency }, color: "000000", align: 'center' } // 7 столбец
	];
    
    const tableData = [];
    
    // Используем стандартные шрифты с fallback-вариантами
    const standardFont = {
        fontFace: "Arial",
        fontFallback: "Helvetica, Verdana, sans-serif",
        fontSize: 11, // Основной размер для заголовков
        bold: true
    };
    
    const headerRow = columns.map((col, colIndex) => {
        const style = columnStyles[colIndex];
        return {
            text: col,
            options: {
                fill: style.fill,
                color: style.color,
                align: style.align,
                fontFace: standardFont.fontFace,
                fontFallback: standardFont.fontFallback,
                fontSize: standardFont.fontSize,
                bold: standardFont.bold
            }
        };
    });
    tableData.push(headerRow);
    
    rows.forEach((row, rowIndex) => {
        const styledRow = row.map((cell, colIndex) => {
            const style = columnStyles[colIndex];

            if (rowIndex === 0 && colIndex === 0) {
                return {
                    text: cell.toString(),
                    options: {
                        fill: style.fill,
                        color: style.color,
                        align: style.align,
                        fontFace: standardFont.fontFace,
                        fontFallback: standardFont.fontFallback,
                        fontSize: 11, // Первое место - 11pt
                        bold: true
                    }
                };
            } else if(rowIndex === 1 && colIndex === 0){
                return {
                    text: cell.toString(),
                    options: {
                        fill: style.fill,
                        color: style.color,
                        align: style.align,
                        fontFace: standardFont.fontFace,
                        fontFallback: standardFont.fontFallback,
                        fontSize: 10, // Второе место - 10pt
                        bold: true
                    }
                };
            } else if(rowIndex === 2 && colIndex === 0){
                return {
                    text: cell.toString(),
                    options: {
                        fill: style.fill,
                        color: style.color,
                        align: style.align,
                        fontFace: standardFont.fontFace,
                        fontFallback: standardFont.fontFallback,
                        fontSize: 10, // Третье место - 9pt
                        bold: true
                    }
                };
            }

            return {
                text: cell.toString(),
                options: {
                    fill: style.fill,
                    color: style.color,
                    align: style.align,
                    fontFace: standardFont.fontFace,
                    fontFallback: standardFont.fontFallback,
                    fontSize: fontSizeStandart
                }
            };
        });
    
        tableData.push(styledRow);
    });    
    
    slide.addTable(tableData, {
        x: 0,
        y: 0,
        w: '100%',
        h: 'auto',
        border: { pt: 1, color: 'rgb(176, 85, 24)' },
        colW: [0.8, 3, 1.15, 1.15, 1.15, 1.15, 1.6]
    });
    
    pptx.writeFile("VictoryDay.pptx").then(() => {
        console.log("Файл сохранен как VictoryDay.pptx");
    });    
};