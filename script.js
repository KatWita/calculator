const toggleBtns = document.querySelectorAll('.toggle-btn')
const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const deleteBtn = document.querySelector('.delete')
const equals = document.querySelector('.equals')
const reset = document.querySelector('.reset')
const output = document.querySelector('.output')
const input = document.querySelector('.input')
const inputOperator = document.querySelector('.input-operator')

const displayNumbers = btn => {
	if (btn === '.' && output.textContent.includes('.')) return
	if (btn === '.' && output.textContent === '') return (output.textContent = '0.')

	if (output.textContent === '' && inputOperator.textContent === '' && input.textContent !== '') {
		return
	}

	if (output.textContent === '0' && btn === '.') {
		output.textContent = '0.'
		return
	}

	if (output.innerHTML === '0') {
		const out = output.textContent
		output.textContent = `${out.slice(0, 1)}.${out.slice(1)}`
	}

	if (output.textContent.length >= 7) {
		return
	}

	output.textContent += btn
	if (output.textContent.includes('.')) {
		return
	} else {
		output.textContent = output.textContent
			.toString()
			.replace(/,/g, '')
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}
}

const handleOperators = btn => {
	if (
		output.textContent === '' &&
		output.textContent !== '-' &&
		input.textContent !== '' &&
		inputOperator.textContent === ''
	) {
		inputOperator.textContent = btn
		output.textContent = ''
		return
	}

	if (output.textContent === '' && btn === '-') {
		output.textContent = '-'
		return
	} else if (output.textContent === '' || output.textContent === '-') {
		return
	}

	if (inputOperator.textContent !== '') {
		showResult()
	}

	if (output.textContent.length <= 7) {
		input.textContent = output.textContent
	} else {
		input.textContent = '999,999'
	}
	inputOperator.textContent = btn
	output.textContent = ''
}

const handleDelete = () => {
	if (output.textContent.endsWith('0.')) {
		output.textContent = ''
	}
	if (output.textContent) {
		output.textContent = output.textContent.slice(0, -1)
	} else if (!output.textContent && inputOperator.textContent) {
		inputOperator.textContent = ''
	} else {
		input.textContent = ''
	}
}

const handleReset = () => {
	output.textContent = ''
	input.textContent = ''
	inputOperator.textContent = ''
	output.style.fontSize = '3.3rem'
}

const showResult = () => {
	let result = ''

	if (input.textContent === '' || output.textContent === '') return

	if (input.textContent !== '' && inputOperator.textContent === '' && output.textContent !== '') {
		output.textContent = input.textContent
		input.textContent = ''
		return
	}

	let firstNum = Number(output.textContent.replace(',', ''))
	let secondNum = Number(input.textContent.replace(',', ''))
	let oper = inputOperator.textContent

	if (oper === '+') {
		result = secondNum + firstNum
	} else if (oper === '-') {
		result = secondNum - firstNum
	} else if (oper === 'x') {
		result = secondNum * firstNum
	} else {
		result = secondNum / firstNum
	}

	if (result.toString().length >= 16) {
		output.style.fontSize = '2.8rem'
	} else {
		output.style.fontSize = '3.3rem'
	}

	if (output.textContent.includes('.') || input.textContent.includes('.')) {
		let stringResult = result.toString()
		let dotIndex = stringResult.indexOf('.')
		const beforeDotResult = stringResult
			.slice(0, dotIndex)
			.replace(/,/g, '')
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		const afterDotResult = stringResult.slice(dotIndex + 1)
		result = `${beforeDotResult}.${afterDotResult}`

		output.textContent = result
	} else {
		result = result
			.toString()
			.replace(/,/g, '')
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		output.textContent = result
	}
	input.textContent = ''
	inputOperator.textContent = ''
}

toggleBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		const body = document.body
		if (btn.value === 'second') {
			body.classList.remove('first-theme')
			body.classList.remove('third-theme')
			body.classList.add('second-theme')
		} else if (btn.value === 'third') {
			body.classList.remove('first-theme')
			body.classList.remove('second-theme')
			body.classList.add('third-theme')
		} else {
			body.classList.remove('second-theme')
			body.classList.remove('third-theme')
		}
	})
})

numbers.forEach(btn => {
	btn.addEventListener('click', () => displayNumbers(btn.textContent))
})
operators.forEach(btn => {
	btn.addEventListener('click', () => handleOperators(btn.textContent))
})
deleteBtn.addEventListener('click', handleDelete)
reset.addEventListener('click', handleReset)
equals.addEventListener('click', showResult)

document.addEventListener('keydown', e => {
	if (!isNaN(parseFloat(e.key)) || e.key === '.') {
		displayNumbers(e.key)
	} else if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') {
		handleOperators(e.key)
	} else if (e.key === 'Enter') {
		showResult()
	} else if (e.key === 'Backspace') {
		handleDelete()
	}
})
