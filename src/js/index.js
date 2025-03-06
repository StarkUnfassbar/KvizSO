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



function createPPTX(rows){
    let pptx = new PptxGenJS();

    let slide = pptx.addSlide();
    slide.background = { fill: "EE6984" };

    const columns = ["Место", "Название команды", "Раунд 1", "Раунд 2", "Раунд 3", "Раунд 4", "Раунд 5", "Раунд 6", "Результат"];
    
    const columnStyles = [
        { fill: "FFA8A8", color: "000000", align: 'center' }, // Красный
        { fill: "FFC5C4", color: "000000", align: 'left' }, // Бежевый
        { fill: "FCECE8", color: "000000", align: 'center' }, // Бежевый
        { fill: "FCECE8", color: "000000", align: 'center' }, // Бежевый
        { fill: "FCECE8", color: "000000", align: 'center' }, // Бежевый
        { fill: "FCECE8", color: "000000", align: 'center' }, // Бежевый
        { fill: "FCECE8", color: "000000", align: 'center' }, // Бежевый
        { fill: "FCECE8", color: "000000", align: 'center' }, // Бежевый
        { fill: "FFC5C4", color: "000000", align: 'center' }
    ];
    
    const tableData = [];
    
    const headerRow = columns.map((col, colIndex) => {
        const style = columnStyles[colIndex];
        return {
            text: col,
            options: {
                fill: style.fill,
                color: style.color,
                align: 'center',
                fontFace: "Cocomat Pro",
                fontSize: 12,
                bold: true
            }
        };
    });
    tableData.push(headerRow);
    
    rows.forEach((row, rowIndex) => {
        const styledRow = row.map((cell, colIndex) => {
            const style = columnStyles[colIndex];

            // if (rowIndex === 0 && colIndex === 0) {
            //     return {
            //         text: cell.toString(),
            //         options: {
            //             fill: style.fill,
            //             color: "ffd700",
            //             align: style.align,
            //             fontFace: "Cocomat Pro",
            //             fontSize: 12,
            //             bold: true
            //         }
            //     };
            // }

            if (rowIndex === 0 && colIndex === 0) {
                return {
                    text: cell.toString(),
                    options: {
                        fill: style.fill,
                        color: style.color,
                        align: style.align,
                        fontFace: "Cocomat Pro",
                        fontSize: 10,
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
                        fontFace: "Cocomat Pro",
                        fontSize: 10,
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
                        fontFace: "Cocomat Pro",
                        fontSize: 10,
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
                    fontFace: "Cocomat Pro",
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
        border: { pt: 1, color: 'ED7D31' },
        colW: [0.8, 2.2, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 1.3]
    });
    
    pptx.writeFile("TeamResultsStyledBoldHeaders.pptx").then(() => {
        console.log("Файл сохранен как TeamResultsStyledBoldHeaders.pptx");
    });    
};
