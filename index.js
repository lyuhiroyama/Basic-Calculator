class Calculator {
    constructor(outputMain, outputHistory){
        this.outputMain = outputMain;
        this.outputHistory = outputHistory;
        this.clear();
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operator = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0,-1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    addOperator(operator) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operator = operator
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        let prev = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)

        if(isNaN(prev)||isNaN(current)) return

        switch (this.operator) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
        }
        
        this.currentOperand = computation
        this.previousOperand = ''
        this.operator = undefined
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]

        let integerDisplay

        if(isNaN(integerDigits)) {
            return integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if(decimalDigits != undefined) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.outputMain.innerText = this.getDisplayNumber(this.currentOperand)

        if(this.operator != null) {
            this.outputHistory.innerText =
                 `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`
        } else {
            this.outputHistory.innerText = ''
        }
    }
}


let clearButton = document.querySelector('[data-clear]')
let numberButtons = document.querySelectorAll('[data-number]')
let operatorButton = document.querySelectorAll('[data-operator')
let deleteButton = document.querySelector('[data-delete]');
let equalButton = document.querySelector('[data-equals]')

let outputMain = document.querySelector('[data-output]');
let outputHistory = document.querySelector('[data-history]')




const calculator = new Calculator(outputMain, outputHistory);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addOperator(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', () =>{
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', () =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () =>{
    calculator.delete()
    calculator.updateDisplay()
})