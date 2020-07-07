console.log("This is my first Web app.");
console.log("You can find tutorial here: https://www.youtube.com/watch?v=CI2GwL--ll8");

//================================================
//Auxiliary
//This method converts number into specific representation of number like with commas or like so.
function getFormatedNumber(num) {
	let newNum = Number(num);
	return newNum.toLocaleString("en");
}

function clearOutputField() {
	document.getElementById("output-value").innerText = "";
}

function clearHistoryField() {
	document.getElementById("history-value").innerText = "";
}

//Removes last element in output field
function backspaceOutput() {
	var value = document.getElementById("output-value").innerText;
	setOutput(value.substr(0, value.length-1));
}

//Adds value to the end of the history
function pushToHistory(val) {
	document.getElementById("history-value").innerText += val;
}

//Removes last character of the history field
function backspaceHistory(val) {
	var hist = getHistory();
	setHistory(hist.substr(0, hist.length-1));
}

//Checks if there are operation in the end of the history field
function isLastOperation() {
	var hist = getHistory();
	var value = hist[hist.length-1];
	switch(value) {
		case "+":
		case "-":
		case "*":
		case "/":
		case "%":
		case "=":
			return true;
		default: false;
	}
}

//================================================
//Functionality

//This gets value from the history field of the calculator
function getHistory() {
	var history = document.getElementById("history-value").innerText;
	return (history==undefined)?"":history;
}

//This method sets val to the history field of the calculator
function setHistory(val) {
	document.getElementById("history-value").innerText = val;
}

//Gets output number from output field of the calculator
function getOutput() {
	return Number(document.getElementById("output-value").innerText.replace(/,/g,''));
}

//Sets value to the output field of the calculator
function setOutput(num) {
	if(num == "") {
		clearOutputField();
	} else {
		document.getElementById("output-value").innerText = getFormatedNumber(num);
	}
}

//================================================
//Initializing


function initializeOperators() {
	var operators = document.getElementsByClassName("operator");
	for(let i = 0; i < operators.length; i++) {
		let oper = operators[i];
		oper.addEventListener('click', () => {
			switch(oper.id) {
				case "clear":
					clearHistoryField();
					clearOutputField();
					break;
				case "backspace":
					backspaceOutput();
					break;
				case "=":
					if(getOutput() == "" && isLastOperation()) backspaceHistory();
					if(getOutput() != "") pushToHistory(getFormatedNumber(getOutput()));
					setOutput(eval(getHistory()));
					if(getOutput() == "") setOutput("0");
					clearHistoryField();
					break;
				default:
					if((getHistory() == "") && (getOutput() == "")) break;
					if((getHistory() != "") && (getOutput() == "") && isLastOperation()) {
						backspaceHistory();
						pushToHistory(oper.id);
						break;
					}
					pushToHistory(getFormatedNumber(getOutput()));
					pushToHistory(oper.id);
					clearOutputField();

			}
		});
	}
}

function initializeDigits() {
	var digits = document.getElementsByClassName("digit");
	for(let i = 0; i < digits.length; i++) {
		let d = digits[i];
		d.addEventListener('click', () => {
			setOutput(getOutput() + d.id);
		});
	}
}


//================================================
//Launch
initializeOperators();
initializeDigits();





