if(window.innerWidth <= 1250){
    tableHead.querySelector("tr th:nth-child(1)").innerHTML = "№";

    tableHead.querySelector("tr th:nth-child(3)").innerHTML = "Р. 1";
    tableHead.querySelector("tr th:nth-child(4)").innerHTML = "Р. 2";
    tableHead.querySelector("tr th:nth-child(5)").innerHTML = "Р. 3";
    tableHead.querySelector("tr th:nth-child(6)").innerHTML = "Р. 4";
    tableHead.querySelector("tr th:nth-child(7)").innerHTML = "Р. 5";
    tableHead.querySelector("tr th:nth-child(8)").innerHTML = "Р. 6";
}

window.addEventListener("resize", () => {
    if(window.innerWidth <= 1250){
        tableHead.querySelector("tr th:nth-child(1)").innerHTML = "№";
    
        tableHead.querySelector("tr th:nth-child(3)").innerHTML = "Р. 1";
        tableHead.querySelector("tr th:nth-child(4)").innerHTML = "Р. 2";
        tableHead.querySelector("tr th:nth-child(5)").innerHTML = "Р. 3";
        tableHead.querySelector("tr th:nth-child(6)").innerHTML = "Р. 4";
        tableHead.querySelector("tr th:nth-child(7)").innerHTML = "Р. 5";
        tableHead.querySelector("tr th:nth-child(8)").innerHTML = "Р. 6";
    } else{
        tableHead.querySelector("tr th:nth-child(1)").innerHTML = "Номер";
    
        tableHead.querySelector("tr th:nth-child(3)").innerHTML = "Раунд 1";
        tableHead.querySelector("tr th:nth-child(4)").innerHTML = "Раунд 2";
        tableHead.querySelector("tr th:nth-child(5)").innerHTML = "Раунд 3";
        tableHead.querySelector("tr th:nth-child(6)").innerHTML = "Раунд 4";
        tableHead.querySelector("tr th:nth-child(7)").innerHTML = "Раунд 5";
        tableHead.querySelector("tr th:nth-child(8)").innerHTML = "Раунд 6";
    }
});