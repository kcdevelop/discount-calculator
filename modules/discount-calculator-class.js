export default class DiscountCalculator {
    constructor() {
        this.displayDiscount = document.querySelector('.display');
        this.formValues = document.querySelectorAll('[data-calc="numbers"]');
        this.retailPrice = '';
        this.percentOff = '';
        this.discountPrice = '';
        this.centsUSD = '';
        this.errors = [];
    }

    //Get and check that "retailPrice" and "percentOff" inputs
    getInputNumbers = () => {
        this.retailPrice = parseInt(this.formValues[0].value), 
        this.percentOff = parseInt(this.formValues[1].value);

        this.resetError();

        if(this.retailPrice != '' && Number.isInteger(this.retailPrice) && Number.isInteger(this.percentOff)) {
            this.addCents(
                this.calculateDiscount(
                    this.retailPrice,
                    this.percentOff
                )
            );
        } else {
            this.addError('Enter a dollar amount.');
        }
    }

    //Calculate the discount price
    calculateDiscount = (retailPrice, percentOff) => {
        return retailPrice - (retailPrice * (percentOff / 100));
    }

    //Add zeros to discount price where appropriate
    addCents = (discountPrice) => {
        this.centsUSD = discountPrice.toString().split('.');
            
        if(this.centsUSD[1] == '' || this.centsUSD[1] == undefined) {
            this.discountPrice = discountPrice + '.00';
        }
        if(this.centsUSD[1].length == 1) {
            this.discountPrice = discountPrice + '0';
        }
        if(this.centsUSD[1].length == 2) {
            this.discountPrice = discountPrice;
        }
        this.setScreenDisplay('ok');
    }

    //Display calculated results or error
    setScreenDisplay = (status) => {
        if(status != 'error' && this.errors.length == 0) {
            this.discountPrice = `
                ✅ &thinsp;${this.percentOff}% OFF $${this.retailPrice}<br />
                Discounted Price: $${this.discountPrice}&nbsp;
            `;
            this.displayDiscount.innerHTML = this.discountPrice;
        }

        if(status == 'error' && this.errors.length > 0) {
            this.displayDiscount.innerHTML = this.errors[0];
        }
    }

    //Set error
    addError = (error) => {
        this.errors[0] = error;
        this.displayDiscount.classList.add('error');
        this.setScreenDisplay('error');
    }

    //Clear error
    resetError = () => {
        this.displayDiscount.classList.remove('error');
        this.errors.length = 0;
    }
}