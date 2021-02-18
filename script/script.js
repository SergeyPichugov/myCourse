'use strict';

const startBtn = document.getElementById('start'),
      cancelBtn = document.getElementById('cancel'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      depositCheck = document.getElementById('deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitleItem = document.querySelector('.income-title-item'),
      expensesTtitleItem = document.querySelector('.expenses-title-item'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      incomeAmount = document.querySelector('.income-amount'),
      expensesAmount = document.querySelector('.expenses-amount'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent');
      
let expensesItems = document.querySelectorAll('.expenses-items'),
      incomeItems = document.querySelectorAll('.income-items');

const isNumber = function(n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

const regNum = function (btn) {
   if (!/[0-9]/g.test(btn.key)) {
      this.value = this.value.replace(/[^0-9]/g, '');
   }
};

const regWord = function (btn) {
   if (!/[а-я\s\.,]/ig.test(btn.key)) {
      this.value = this.value.replace(/[^а-я\s\.,]/ig, '');
   }
};


class AppData {
   constructor() {
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.expensesMonth = 0;
      this.income = {};
      this.incomeMonth = 0;
      this.addIncome = [];
      this.expenses = {};
      this.addExpenses = [];
      this.deposit = false;
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
   }


   check() {
      if (salaryAmount.value !== '') {
         startBtn.removeAttribute('disabled');
      }
   }

   start() { 
      if (salaryAmount.value === '') {
         startBtn.removeAttribute('disabled', 'true');
         return;
      }
   
      this.budget = +salaryAmount.value; 
      this.getExpInc();
      this.getExpensesMonth();
      
      this.getAddExpInc();

      this.getInfoDeposit();
      this.getBudget();
      this.showResult();
      this.blockInputFunction();
   }

   reset() {
   
         const inputAll = document.querySelectorAll('[type="text"]');
         inputAll.forEach((item) => {
            item.disabled = false;
            item.value = '';
         });
   
         startBtn.style.display = 'inline';
         cancelBtn.style.display = 'none';
   
         this.budget = 0;
         this.budgetDay = 0;
         this.budgetMonth = 0;
         this.expensesMonth = 0;
         this.income = {};
         this.incomeMonth = 0;
         this.addIncome = [];
         this.expenses = {};
         this.addExpenses = [];
         this.deposit = false;
         this.percentDeposit = 0;
         this.moneyDeposit = 0;
   
         periodAmount.textContent = 1;
         periodSelect.value = 1;
   
         startBtn.disabled = true;
         
         expensesItems = document.querySelectorAll('.expenses-items');
         incomeItems = document.querySelectorAll('.income-items');
         if (incomeItems[1]) {
            incomeItems[1].remove();
         }
         if (incomeItems[2]) {
            incomeItems[2].remove();
         }
         incomePlus.style.display = 'inline';

         if (expensesItems[1]) {
            expensesItems[1].remove();
         }
         if (expensesItems[2]) {
            expensesItems[2].remove();
         }
         expensesPlus.style.display = 'inline';

         depositBank.style.display = 'none';
         depositAmount.style.display = 'none';
         depositBank.value = '';
         depositAmount.value = '';
         depositBank.removeEventListener('change', this.changePercent);
         depositPercent.style.display = 'none';
         depositCheck.checked = false;
   }

   showResult() {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = this.getTargetMonth();
      incomePeriodValue.value = this.calcPeriod();
   }
   
   blockInputFunction() {
      const inputAll = document.querySelectorAll('[type="text"]');
      inputAll.forEach((item) => {
         item.disabled = true;
      });
   
      startBtn.style.display = 'none';
      cancelBtn.style.display = 'inline';
   }

   addExpIncBlock() {
      const expInc = this.className.split(' ')[1].split('_')[0];
      let expIncItems = document.querySelectorAll(`.${expInc}-items`);
      const cloneExpIncItem = expIncItems[0].cloneNode(true);

      const cloneItemExpInc = cloneExpIncItem.querySelector(`.${expInc}-title`);
      const cloneCashExpInc = cloneExpIncItem.querySelector(`.${expInc}-amount`);
      cloneItemExpInc.value = '';
      cloneCashExpInc.value = '';

      expIncItems[0].parentNode.insertBefore(cloneExpIncItem, this);
      expIncItems = document.querySelectorAll(`.${expInc}-items`);

      cloneItemExpInc.addEventListener('keyup', regWord);
      cloneCashExpInc.addEventListener('keyup', regNum);

      if (expIncItems.length === 3) {
         this.style.display = 'none';
      }
   }

   getExpInc() {

      const count = item => {
         const startStr = item.className.split('-')[0];
         const itemTitle = item.querySelector(`.${startStr}-title`).value;
         const itemAmount = item.querySelector(`.${startStr}-amount`).value;
         if (itemTitle !== '' && itemAmount !== '') {
            this[startStr][itemTitle] = itemAmount;
         }
      };

      incomeItems.forEach(count);
      expensesItems.forEach(count);

      for (let key in this.income) {
         this.incomeMonth += +this.income[key];
      }
   }

   getExpensesMonth() {
      for (let key in this.expenses) {
         this.expensesMonth += +this.expenses[key];
      }
   }

   getBudget() {

      const monthDeposit =this.moneyDeposit * (this.percentDeposit / 100);
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
   }

   getTargetMonth() {
      return Math.ceil(targetAmount.value / this.budgetMonth);
   }

   getStatusIncome() {
      if (this.budgetDay > 1200) {
         return ('У вас высокий уровень дохода');
      } else if (this.budgetDay > 600 && this.budgetDay <= 1200) {
         return ('У вас средний уровень дохода');
      } else if (this.budgetDay > 0 && this.budgetDay <= 600) {
         return ('К сожалению у вас уровень дохода ниже среднего');
      } else if (this.budgetDay <= 0) {
         return ('Что то пошло не так');
      }
   }

   getPeriodSelect() {
      periodAmount.textContent = periodSelect.value;
   }

   calcPeriod() {
      return this.budgetMonth * periodSelect.value;
   }

   getInfoDeposit() {
      if (this.deposit) {
         this.percentDeposit = depositPercent.value;
         this.moneyDeposit = depositAmount.value;
      }
   }

   depositWalid() {
      if (depositPercent.value < 0 || depositPercent.value > 100) {
         alert('Введите корректное значение в поле проценты');
         startBtn.disabled = true;
      } else {
         startBtn.disabled = false;
      }

   }

   changePercent() {
      let valueSelect = this.value;
      if (valueSelect === 'other') {
         depositPercent.style.display = 'inline-block';
         depositPercent.value = '';
      } else {
         depositPercent.style.display = 'none';
         depositPercent.value = valueSelect;
      }
   }

   depositHandler() {
      if (depositCheck.checked) {
         depositBank.style.display = 'inline-block';
         depositAmount.style.display = 'inline-block';
         this.deposit = true;
         depositBank.addEventListener('change', this.changePercent);

      } else {
         depositBank.style.display = 'none';
         depositAmount.style.display = 'none';
         depositBank.value = '';
         depositAmount.value = '';
         this.deposit = false;
         depositBank.removeEventListener('change', this.changePercent);

      }

   }

   eventListener() {

      startBtn.addEventListener('click', this.start.bind(this));
      salaryAmount.addEventListener('keyup', this.check);
      cancelBtn.addEventListener('click', this.reset.bind(this));
      periodSelect.addEventListener('input', this.showResult.bind(this));

      incomePlus.addEventListener('click', this.addExpIncBlock);
      expensesPlus.addEventListener('click', this.addExpIncBlock);

      periodSelect.addEventListener('input', this.getPeriodSelect);

      salaryAmount.addEventListener('keyup', regNum);
      incomeTitleItem.addEventListener('keyup', regWord);
      incomeAmount.addEventListener('keyup', regNum);

      for (let additionalIncome of additionalIncomeItem) {
         additionalIncome.addEventListener('keyup', regWord);
      }

      expensesTtitleItem.addEventListener('keyup', regWord);
      additionalExpensesItem.addEventListener('keyup', regWord);
      expensesAmount.addEventListener('keyup', regNum);
      targetAmount.addEventListener('keyup', regNum);

      depositCheck.addEventListener('change', this.depositHandler.bind(this));
      depositPercent.addEventListener('keyup', this.depositWalid);
   }

   getAddExpInc() {

      additionalIncomeItem.forEach((item) => {
         const itemValue = item.value.trim();
         if (itemValue !== '') {
            this.addIncome.push(itemValue);
         }
      });

      let addExpenses = additionalExpensesItem.value.split(',');

      addExpenses.forEach((item) => {
         item = item.trim();
         if (item !== '') {
            this.addExpenses.push(item);
         }
      });

      // let tmp = additionalExpensesItem.className.split('_')[1].split('-')[0];
      // let addIncExp = 'add' + tmp.charAt(0).toUpperCase() + tmp.slice(1); // достать слово

   }



}



const appData = new AppData();

appData.eventListener();

