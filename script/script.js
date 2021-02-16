'use strict';

const startBtn = document.getElementById('start'),
      cancelBtn = document.getElementById('cancel'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      depositCheckbox = document.querySelector('#deposit-check'),
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
      expensesAmount = document.querySelector('.expenses-amount');
      
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


const AppData = function() {

   this.budget = 0;
   this.budgetDay = 0;
   this.budgetMonth = 0;
   this.expensesMonth = 0;
   this.income = {};
   this.incomeMonth = 0;
   this.addIncome = [];
   this.expenses = {};
   this.addExpenses = [];
   this.deposit = true;
   this.percentDeposit = 0;
   this.moneyDeposit = 0;

};

AppData.prototype.check = function () {
   if (salaryAmount.value !== '') {
      startBtn.removeAttribute('disabled');
   }
};

AppData.prototype.start = function () { 
   if (salaryAmount.value === '') {
      startBtn.removeAttribute('disabled', 'true');
      return;
   }

   this.budget = +salaryAmount.value; 
   this.getExpenses();
   this.getIncome();
   this.getExpensesMonth();
   this.getAddExpenses();
   this.getAddIncom();
   this.getBudget();
   this.showResult();
   this.blockInputFunction();
};


AppData.prototype.reset = function () {

      let inputAll = document.querySelectorAll('[type="text"]');
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
   };

   AppData.prototype.showResult = function () {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = this.getTargetMonth();
      incomePeriodValue.value = this.calcPeriod();
   };
   
   AppData.prototype.blockInputFunction = function () {
      let inputAll = document.querySelectorAll('[type="text"]');
      inputAll.forEach((item) => {
         item.disabled = true;
      });

      startBtn.style.display = 'none';
      cancelBtn.style.display = 'inline';

   };

   AppData.prototype.addExpensesBlock = function () {
      let cloneExpensesItem = expensesItems[0].cloneNode(true);

      let cloneItemExpenses = cloneExpensesItem.querySelector('.expenses-title');
      let cloneCashExpenses = cloneExpensesItem.querySelector('.expenses-amount');
      cloneItemExpenses.value = '';
      cloneCashExpenses.value = '';

      cloneItemExpenses.addEventListener('keyup', regWord);
      cloneCashExpenses.addEventListener('keyup', regNum);

      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
         expensesPlus.style.display = 'none';
      }
   };



   AppData.prototype.getExpenses = function () {
      expensesItems.forEach((item) => {
         let itemExpenses = item.querySelector('.expenses-title').value;
         let cashExpenses = item.querySelector('.expenses-amount').value;
         if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
         }
      });
   };

   AppData.prototype.addIncomeBlock = function () {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);

      let cloneItemIncome = cloneIncomeItem.querySelector('.income-title');
      let cloneCashIncome = cloneIncomeItem.querySelector('.income-amount');
      cloneItemIncome.value = '';
      cloneCashIncome.value = '';

      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');

      cloneItemIncome.addEventListener('keyup', regWord);
      cloneCashIncome.addEventListener('keyup', regNum);

      if (incomeItems.length === 3) {
         incomePlus.style.display = 'none';
      }
   };

   AppData.prototype.getIncome = function (item) {
      incomeItems.forEach((item) => {
         let itemIncome = item.querySelector('.income-title').value;
         let cashIncome = item.querySelector('.income-amount').value;
         if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
         }
      });
      for (let key in this.income) {
         this.incomeMonth += +this.income[key];
      }
   };
   
   AppData.prototype.getAddExpenses = function () {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach((item) => {
         item = item.trim();
         if (item !== '') {
            this.addExpenses.push(item);
         }
      });
   };
   AppData.prototype.getAddIncom = function () {
      additionalIncomeItem.forEach((item) => {
         let itemValue = item.value.trim();
         if (item.value !== '') {
            this.addIncome.push(itemValue);
         }
      });
   };

   AppData.prototype.getExpensesMonth = function () {
      for (let key in this.expenses) {
         this.expensesMonth += +this.expenses[key];
      }
   };

   AppData.prototype.getBudget = function () {
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
   };

   AppData.prototype.getTargetMonth = function () {
      return Math.ceil(targetAmount.value / this.budgetMonth);
   };

   AppData.prototype.getStatusIncome = function () {
      if (this.budgetDay > 1200) {
         return ('У вас высокий уровень дохода');
      } else if (this.budgetDay > 600 && this.budgetDay <= 1200) {
         return ('У вас средний уровень дохода');
      } else if (this.budgetDay > 0 && this.budgetDay <= 600) {
         return ('К сожалению у вас уровень дохода ниже среднего');
      } else if (this.budgetDay <= 0) {
         return ('Что то пошло не так');
      }
   };

   AppData.prototype.getInfoDeposit = function () {
      if (this.deposit) {
         do {
            this.percentDeposit = prompt('Какой годовой процент?', '10');
         } while (!isNumber(this.percentDeposit) || this.percentDeposit === 0 || this.percentDeposit === null);
         do {
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
         } while (!isNumber(this.moneyDeposit) || this.moneyDeposit === 0 || this.moneyDeposit === null);
      }
   };

   AppData.prototype.getPeriodSelect = function () { 
      periodAmount.textContent = periodSelect.value;
   };

   AppData.prototype.calcPeriod = function () { 
      return this.budgetMonth * periodSelect.value;
   };

   AppData.prototype.eventListener = function () {

      startBtn.addEventListener('click', this.start.bind(this));
      salaryAmount.addEventListener('keyup', this.check);
      cancelBtn.addEventListener('click', this.reset.bind(this));
      periodSelect.addEventListener('input', this.showResult.bind(this));

      incomePlus.addEventListener('click', this.addIncomeBlock);
      expensesPlus.addEventListener('click', this.addExpensesBlock);
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

   
   };
   



const appData = new AppData();

appData.eventListener();

