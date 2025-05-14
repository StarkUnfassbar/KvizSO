let table = document.querySelector("#table");
let tableHead = table.querySelector("thead")
let tableBody = table.querySelector("tbody");

let listenerInputFocus;

let buttonStart = document.querySelector("#button-start");
let buttonAddTr = document.querySelector("#button-add-tr");
let buttonRemoveTr = document.querySelector("#button-remove-tr");
let buttonRemoveFullTr = document.querySelector("#button-remove-full-tr");

let countTr = 0;



window.onload = loadTbodyFromCache;



document.addEventListener('click', function(e) {
    const isInputClicked = e.target.tagName.toLowerCase() === 'input';

    if(isInputClicked){
        moveNextInput(e.target);
        changedInputNumber(e.target);
    }
});



buttonStart.addEventListener("click", () => {
    countTr++;

    tableBody.innerHTML = `
		<tr>
			<td>${countTr}</td>
			<td><input type="text" placeholder="Команда ${countTr}"></td>
			<td><input type="text" placeholder="0" class="input_number"></td>
			<td><input type="text" placeholder="0" class="input_number"></td>
			<td><input type="text" placeholder="0" class="input_number"></td>
			<td><input type="text" placeholder="0" class="input_number"></td>
			<td>0</td>
		</tr>
    `;

    let inputForFocus = tableBody.querySelector("tr:last-child input");

    inputForFocus.focus();
    moveNextInput(inputForFocus);
    changedInputNumber(inputForFocus);


    buttonStart.classList.add("none");
    buttonAddTr.classList.remove("none");
    buttonRemoveTr.classList.remove("none");
    buttonRemoveFullTr.classList.remove("none");

    saveTbodyToCache();
});

buttonAddTr.addEventListener("click", () => {
    countTr++;

    if(countTr === 1){
        tableBody.innerHTML = `
			<tr>
				<td>${countTr}</td>
				<td><input type="text" placeholder="Команда ${countTr}"></td>
				<td><input type="text" placeholder="0" class="input_number"></td>
				<td><input type="text" placeholder="0" class="input_number"></td>
				<td><input type="text" placeholder="0" class="input_number"></td>
				<td><input type="text" placeholder="0" class="input_number"></td>
				<td>0</td>
			</tr>
        `;
    } else{
        tableBody.insertAdjacentHTML("beforeend", `
			<tr>
				<td>${countTr}</td>
				<td><input type="text" placeholder="Команда ${countTr}"></td>
				<td><input type="text" placeholder="0" class="input_number"></td>
				<td><input type="text" placeholder="0" class="input_number"></td>
				<td><input type="text" placeholder="0" class="input_number"></td>
				<td><input type="text" placeholder="0" class="input_number"></td>
				<td>0</td>
			</tr>
        `);
    }


    let inputForFocus = tableBody.querySelector("tr:last-child input");

    inputForFocus.focus();
    moveNextInput(inputForFocus);
    changedInputNumber(inputForFocus);

    saveTbodyToCache();
});


buttonRemoveTr.addEventListener("click", () => {
    if(countTr > 1){
        let removeObj = table.querySelector("tbody tr:last-child");
        tableBody.removeChild(removeObj);     
        
        countTr--;
        
        saveTbodyToCache();
    } else if(countTr === 1){
        tableBody.innerHTML = `
			<tr class="null_tr">
				<td>0</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
			</tr>
        `;

        countTr = 0;

        buttonStart.classList.remove("none");
        buttonAddTr.classList.add("none");
        buttonRemoveTr.classList.add("none");
        buttonRemoveFullTr.classList.add("none");

        removeTbodyToCache();
    }
});

buttonRemoveFullTr.addEventListener("click", () => {
    if(countTr > 0){
        tableBody.innerHTML = `
            <tr class="null_tr">
				<td>0</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
			</tr>
        `;

        countTr = 0;
    }

    buttonStart.classList.remove("none");
    buttonAddTr.classList.add("none");
    buttonRemoveTr.classList.add("none");
    buttonRemoveFullTr.classList.add("none");

    removeTbodyToCache();
});



function moveNextInput(input){
    if(listenerInputFocus){
        listenerInputFocus.removeEventListener("keydown", handleKeyDown);
    }

    function handleKeyDown(e){
        if (e.key === 'Enter') {
            let nextInput = input.closest("td").nextElementSibling?.querySelector("input");

            if (nextInput) {
                nextInput.focus();

                listenerInputFocus = input;
                moveNextInput(nextInput);
                changedInputNumber(nextInput);
            }
        } else if(e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown'){
            const input = e.target;
            const row = input.closest('tr');
            const inputs = row.querySelectorAll('input');
            
            const inputIndex = Array.prototype.indexOf.call(inputs, input);
            let nextInput = null;

            switch (e.key) {
                case 'ArrowRight':
                    nextInput = inputs[inputIndex + 1]; // Move right
                    break;
                case 'ArrowDown':
                    const nextRow = row.nextElementSibling;
                    if (nextRow) {
                        nextInput = nextRow.querySelectorAll('input')[inputIndex]; // Move down
                    }
                    break;
                case 'ArrowLeft':
                    nextInput = inputs[inputIndex - 1]; // Move left
                    break;
                case 'ArrowUp':
                    const prevRow = row.previousElementSibling;
                    if (prevRow) {
                        nextInput = prevRow.querySelectorAll('input')[inputIndex]; // Move up
                    }
                    break;
            }

            if (nextInput) {
                e.preventDefault();
                nextInput.focus();

                moveNextInput(nextInput);
                changedInputNumber(nextInput);
            }
        }
    }

    input.addEventListener('keydown', handleKeyDown);

    input.addEventListener('blur', function() {
        input.removeEventListener('keydown', handleKeyDown);
    })
};



function changedInputNumber(input){
    if(input.classList.contains("input_number")){
        calcResult(input);

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' || e.key === 'Delete') {
                return;
            }

            const char = String.fromCharCode(e.which);
            if (!/[0-9]/.test(char)) {
                e.preventDefault();
            }

            saveTbodyToCache();
        });

        input.addEventListener('input', () => {
            const value = parseInt(input.value);
            if (value <= 0) {
                input.value = "";
            }
    
            calcResult(input);
            saveTbodyToCache();
        });
    }
};

function calcResult(input){
    const thisTr = input.closest("tr")
    const lastInput = thisTr.querySelector("td:last-child");
    const inputsThisTr = thisTr.querySelectorAll("input.input_number");
    
    let result = 0;
    
    inputsThisTr.forEach(input => {
        const value = input.value == "" ? 0 : parseInt(input.value);
        result += value;
    });

    lastInput.innerHTML = result;
};


function saveTbodyToCache(){
    const inputs = tableBody.querySelectorAll('input');
    const data = [];

    inputs.forEach(input => {
        data.push(input.value);
    });

    localStorage.setItem('cachedTbody', tableBody.innerHTML);
    localStorage.setItem('inputValues', JSON.stringify(data));
    localStorage.setItem('cachedCountTrTbody', countTr);
};

function removeTbodyToCache(){
    if(localStorage.getItem('cachedTbody')){
        localStorage.removeItem('cachedTbody');
    }

    if(localStorage.getItem('cachedTbody')){
        localStorage.removeItem('inputValues');
    }

    if(localStorage.getItem('cachedCountTrTbody')){
        localStorage.removeItem('cachedCountTrTbody');
    }
};

function loadTbodyFromCache(){
    const cachedTbody = localStorage.getItem('cachedTbody');
    const cachedInputValues = localStorage.getItem('inputValues');
    const cachedCountTrTbody = localStorage.getItem('cachedCountTrTbody');
    
    if(cachedTbody && cachedInputValues && cachedCountTrTbody) {
        tableBody.innerHTML = cachedTbody;
        countTr = cachedCountTrTbody;

        const inputValues = JSON.parse(cachedInputValues);
        const inputs = tableBody.querySelectorAll('input');

        inputs.forEach((input, index) => {
            if (inputValues[index] !== undefined) {
                input.value = inputValues[index];
            }
        });

        buttonStart.classList.add("none");
        buttonAddTr.classList.remove("none");
        buttonRemoveTr.classList.remove("none");
        buttonRemoveFullTr.classList.remove("none");
    }
};