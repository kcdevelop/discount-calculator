import DiscountCalculator from './discount-calculator-class.js';
import { form } from './variables.js';

//Initialize instance of "DiscountCalculator" class
const calculator = new DiscountCalculator();

//Add form "submit" eventListener
form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculator.getInputNumbers();
});