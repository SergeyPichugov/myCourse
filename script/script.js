'use strict';

let startBtn = document.getElementById('start'),
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
      expensesItems = document.querySelectorAll('.expenses-items'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      incomeItems = document.querySelectorAll('.income-items'),
      periodAmount = document.querySelector('.period-amount'),
      incomeAmount = document.querySelector('.income-amount'),
      expensesAmount = document.querySelector('.expenses-amount');



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
      
      appData.budget = +salaryAmount.value;

      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getAddIncom();
      appData.getBudget();

      appData.showResult();
   },
   showResult: function(){
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = appData.getTargetMonth();
      incomePeriodValue.value = appData.calcPeriod();
      periodSelect.addEventListener('input', appData.showResult);
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

      for (let key in appData.income) { 
         appData.incomeMonth += +appData.income[key];
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
      for (let key in appData.expenses) {
         appData.expensesMonth += +appData.expenses[key];
      }
   },
   getBudget: function () {
      appData.budgetMonth = appData.budget + appData.incomeMonth- appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
   },
   getTargetMonth: function () { 
      return Math.ceil(targetAmount.value / appData.budgetMonth);
   },
   getStatusIncome: function() {
      if (appData.budgetDay > 1200) {
         return ('У вас высокий уровень дохода');
      } else if (appData.budgetDay > 600 && appData.budgetDay <= 1200) {
         return ('У вас средний уровень дохода');
      } else if (appData.budgetDay > 0 && appData.budgetDay <= 600) {
         return ('К сожалению у вас уровень дохода ниже среднего');
      } else if (appData.budgetDay <= 0) {
         return ('Что то пошло не так');
      }
   },
   getInfoDeposit: function(){
      if(appData.deposit){

         do {
         appData.percentDeposit = prompt('Какой годовой процент?', '10');
         } while (!isNumber(appData.percentDeposit) || appData.percentDeposit === 0 || appData.percentDeposit === null);

         do {
         appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
         } while (!isNumber(appData.moneyDeposit) || appData.moneyDeposit === 0 || appData.moneyDeposit === null);
      }
   },
   getPeriodSelect: function () { 
      periodAmount.textContent = periodSelect.value;
   },
   calcPeriod: function(){
      return appData.budgetMonth * periodSelect.value;
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

startBtn.addEventListener('click', appData.start);
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

