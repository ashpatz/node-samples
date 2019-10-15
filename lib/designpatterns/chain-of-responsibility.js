'use strict';

const MoneyStack = function (billAmount) {
    this.billAmount = billAmount;
    this.next = null;
};

MoneyStack.prototype.setNext = function (moneyStack) {
    this.next = moneyStack;
};

MoneyStack.prototype.withdraw = function (amount) {
    const noOfBills = Math.floor(amount/this.billAmount);

    if(noOfBills > 0) {
        this.pickBills(noOfBills);
        amount -= (noOfBills * this.billAmount);
    }

    if(amount > 0 && this.next) {
        this.next.withdraw(amount);
    }
};

MoneyStack.prototype.pickBills = function (noOfBills) {
    console.log(`${noOfBills} bills of denomination ${this.billAmount} have been picked`);
};

const ATM = function() {
    const stackOf100 = new MoneyStack(100);
    const stackOf50 = new MoneyStack(50);
    stackOf100.setNext(stackOf50);
    const stackOf20 = new MoneyStack(20);
    stackOf50.setNext(stackOf20);
    const stackOf10 = new MoneyStack(10);
    stackOf20.setNext(stackOf10);
    const stackOf5 = new MoneyStack(5);
    stackOf10.setNext(stackOf5);
    const stackOf1 = new MoneyStack(1);
    stackOf5.setNext(stackOf1);

    return stackOf100;
};


const atm = new ATM();
// atm.withdraw(186);
atm.withdraw(77);



