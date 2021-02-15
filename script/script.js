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

const appData = {
   budget: 0,
   budgetDay: 0,
   budgetMonth: 0,
   expensesMonth: 0,
   income: {},
   incomeMonth: 0,
   addIncome: [],
   expenses: {},
   addExpenses: [],
   deposit: false,
   percentDeposit: 0,
   moneyDeposit: 0,
   start: function () { 
      
      this.budget = +salaryAmount.value; 

      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncom();
      this.getBudget();

      this.showResult();
      this.blockInputFunction();
   },
   reset: function(){

      let inputAll = document.querySelectorAll('[type="text"]');
      inputAll.forEach(function (item) {
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
      this.deposit = false,
      this.percentDeposit = 0;
      this.moneyDeposit = 0;

      periodAmount.textContent = 1;
      periodSelect.value = 1;

      startBtn.disabled = true;

      incomeItems[1].remove();
      incomeItems[2].remove();
      incomePlus.style.display = 'inline';

      expensesItems[1].remove();
      expensesItems[2].remove();
      expensesPlus.style.display = 'inline';
   },
   showResult: function(){
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = this.getTargetMonth();
      incomePeriodValue.value = this.calcPeriod();
      periodSelect.addEventListener('input', this.showResult.bind(appData));
   },
   blockInputFunction: function () {
      let inputAll = document.querySelectorAll('[type="text"]');
      inputAll.forEach(function (item) {
         item.disabled = true;
      });

      startBtn.style.display = 'none';
      cancelBtn.style.display = 'inline';

   },
   addExpensesBlock: function(){

      let cloneExpensesItem = expensesItems[0].cloneNode(true);

      let cloneItemExpenses = cloneExpensesItem.querySelector('.expenses-title');
      let cloneCashExpenses = cloneExpensesItem.querySelector('.expenses-amount');
      cloneItemExpenses.value = '';
      cloneCashExpenses.value = '';
      
      cloneItemExpenses.addEventListener('keyup', regWord);
      cloneCashExpenses.addEventListener('keyup', regNum);

      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3){
         expensesPlus.style.display = 'none';
      }
   },
   getExpenses: function(){
      
      expensesItems.forEach(function(item){
         let itemExpenses = item.querySelector('.expenses-title').value;
         let cashExpenses = item.querySelector('.expenses-amount').value;
         if (itemExpenses !== '' && cashExpenses !== ''){
            appData.expenses[itemExpenses] = cashExpenses;
         }
      });
   },
   addIncomeBlock: function(){
      
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
   },
   getIncome: function(item){
         incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
               appData.income[itemIncome] = cashIncome;
            }
         });
         for (let key in this.income) { 
         this.incomeMonth += +this.income[key];
      }
   },
   getAddExpenses: function(){ 
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item){
         item = item.trim();
         if (item !== ''){
            appData.addExpenses.push(item);
         }
      });
   },
   getAddIncom: function(){
      additionalIncomeItem.forEach(function(item){
         let itemValue = item.value.trim();
         if (item.value !== ''){
            appData.addIncome.push(itemValue);
         }
      });
   },
   getExpensesMonth: function () {
      for (let key in this.expenses) {
         this.expensesMonth += +this.expenses[key];
      }
   },
   getBudget: function () {
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
   },
   getTargetMonth: function () { 
      return Math.ceil(targetAmount.value / this.budgetMonth);
   },
   getStatusIncome: function() {
      if (this.budgetDay > 1200) {
         return ('У вас высокий уровень дохода');
      } else if (this.budgetDay > 600 && this.budgetDay <= 1200) {
         return ('У вас средний уровень дохода');
      } else if (this.budgetDay > 0 && this.budgetDay <= 600) {
         return ('К сожалению у вас уровень дохода ниже среднего');
      } else if (this.budgetDay <= 0) {
         return ('Что то пошло не так');
      }
   },
   getInfoDeposit: function(){
      if(appData.deposit){

         do {
         this.percentDeposit = prompt('Какой годовой процент?', '10');
         }
         while (!isNumber(this.percentDeposit) || this.percentDeposit === 0 || this.percentDeposit === null);

         do {
         this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
         }
         while (!isNumber(this.moneyDeposit) || this.moneyDeposit === 0 || this.moneyDeposit === null);
      }
   },
   getPeriodSelect: function () { 
      periodAmount.textContent = periodSelect.value;
      
   },
   calcPeriod: function(){
      return this.budgetMonth * periodSelect.value;
   }
};


startBtn.disabled = true; 
salaryAmount.addEventListener('input', function () {  
   if (salaryAmount.value === '') {
      startBtn.disabled = true;
   } else {
      startBtn.disabled = false;
   }
});

startBtn.addEventListener('click', appData.start.bind(appData));
cancelBtn.addEventListener('click', appData.reset.bind(appData));

incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.getPeriodSelect);


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




function missionComplete() {
   if (appData.getTargetMonth() >= 0) {
      return ('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)');
   } else {
      return ('Цель не будет достигнута');
   }
}

