document.addEventListener('DOMContentLoaded', () => {
	const formulaDisplay = document.getElementById('formula');
	const resultDisplay = document.getElementById('result');
	let currentInput = '';
	let operation = null;
	let previousInput = '';
	let fullFormula = '';

	const updateFormulaDisplay = () => {
		formulaDisplay.textContent = fullFormula + currentInput;
	};

	const calculateResult = () => {
		try {
			let adjustedFormula = fullFormula + currentInput;
			// Replace '^' with '**' for exponentiation
			adjustedFormula = adjustedFormula.replace(/\^/g, '**');
			let result = eval(adjustedFormula); // Using eval for simplicity
			resultDisplay.textContent = result.toString();
		} catch (e) {
			resultDisplay.textContent = 'Error';
		}
	};

	const handleNumberInput = (number) => {
		currentInput += number;
		updateFormulaDisplay();
		calculateResult();
	};

	const handleDelete = () => {
		if (currentInput.length > 0) {
			// Delete the last character from currentInput
			currentInput = currentInput.slice(0, -1);
		} else if (fullFormula.length > 0) {
			// If currentInput is empty, delete the last character from fullFormula
			fullFormula = fullFormula.trim();
			if (fullFormula.slice(-1) === ' ') {
				// Remove the last operation and its trailing space
				fullFormula = fullFormula.slice(0, -3);
			} else {
				// Remove the last number or constant
				let parts = fullFormula.split(' ');
				parts.pop();
				fullFormula = parts.join(' ');
			}
		}
		updateFormulaDisplay();
		calculateResult();
	};

	const handleOperationInput = (op) => {
		if (currentInput === '' && op === '-' && operation === null) {
			currentInput = '-';
			updateFormulaDisplay();
			return;
		}

		if (currentInput !== '' || (fullFormula !== '' && op !== '-')) {
			fullFormula += currentInput + ' ' + op + ' ';
			currentInput = '';
			operation = null;
			calculateResult();
		} else if (operation === null) {
			fullFormula = fullFormula.slice(0, -3) + op + ' ';
		}

		if (op === '^') {
			if (currentInput !== '') {
				fullFormula += currentInput + ' ^ ';
				currentInput = '';
				operation = null;
			} else if (fullFormula !== '' && !fullFormula.endsWith('^ ')) {
				fullFormula += ' ^ ';
			}
		}


		operation = op;
		updateFormulaDisplay();
	};

	const toRadians = (angle) => {
        return angle * (Math.PI / 180);
    };

	

	const countParentheses = () => {
		return (fullFormula + currentInput).split('').reduce((acc, char) => {
			if (char === '(') acc.open++;
			if (char === ')') acc.close++;
			return acc;
		}, { open: 0, close: 0 });
	};

	const isLastCharacterNumber = () => {
		const formula = fullFormula + currentInput;
		return formula.length > 0 && !isNaN(formula[formula.length - 1]);
	};

	const handleParentheses = () => {
		const { open, close } = countParentheses();
		const lastCharIsNumber = isLastCharacterNumber();

		if (open === close || "*/+-^".includes(fullFormula.slice(-1))) {
			currentInput += lastCharIsNumber ? '*(' : '(';
		} else if (open > close) {
			currentInput += ')';
		}
		updateFormulaDisplay();
		calculateResult();
	};


	const handleEqualPress = () => {
		if (operation && previousInput !== '' && currentInput !== '') {
			calculateResult();
		}
		fullFormula = resultDisplay.textContent; // Set the result as the new formula
		currentInput = '';
		operation = null;
		previousInput = '';
		updateFormulaDisplay(); // Update the display with the result
	};

	const handleClearAll = () => {
		currentInput = '';
		operation = null;
		previousInput = '';
		fullFormula = '';
		updateFormulaDisplay();
		resultDisplay.textContent = '0';
	};

	const handleConstantInput = (constant) => {
		switch (constant) {
			case 'e':
				currentInput += Math.E.toString();
				break;
			case 'π':
				currentInput += Math.PI.toString();
				break;
		}
		updateFormulaDisplay();
		calculateResult();
	};

	const handleSpecialFunction = (func) => {
		let valueToCalculate = parseFloat(currentInput) || 0;
		let result;
		if (currentInput == ''){
			return;
		}
	
		switch (func) {
			case 'sin':
				result = Math.sin(toRadians(valueToCalculate));
				break;
			case 'cos':
				result = Math.cos(toRadians(valueToCalculate));
				break;
			case 'tan':
				result = Math.tan(toRadians(valueToCalculate));
				break;

			// Add cases for other special functions if needed
		}
	
		currentInput = result.toString(); // Replace current input with the result
		fullFormula = result.toString(); // Reset the formula to just the result
		updateFormulaDisplay();
		resultDisplay.textContent = currentInput;
	};
	


	document.querySelectorAll('.btn').forEach(btn => {
		btn.addEventListener('click', () => {
			const value = btn.textContent;
			if (parseFloat(value) >= 0 || value === '.') {
				handleNumberInput(value);
			} else {
				switch (value) {
					case 'AC':
						handleClearAll();
						break;
					case '=':
						handleEqualPress();
						break;
					case '()':
						handleParentheses();
						break;
					case 'e':
						handleConstantInput(value);
						break;
					case 'π':
						handleConstantInput(value);
						break;
					case 'DEL':
						handleDelete();
						break;
					case 'sin':
						handleSpecialFunction(value);
						break;
					case 'cos':
						handleSpecialFunction(value);
						break;
					case 'tan':
						handleSpecialFunction(value);
						break;
					default:
						handleOperationInput(value);
						break;
				}
			}
		});
	});
});
