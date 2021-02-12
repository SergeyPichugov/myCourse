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
      incomeTitleItem = document.querySelector('c'),
      expensesTtitleItem = document.querySelector('.expenses-title-item'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      incomeItems = document.querySelectorAll('.income-items'),
      periodAmount = document.querySelector('.period-amount');


const isNumber = function(n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
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
   start: function () { //нажатие кнопки рассчитать
      
      appData.budget = +salaryAmount.value;//месячный доход

      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getAddIncom();
      appData.getBudget();

      appData.showResult();
   },
   showResult: function(){//выводит результаты всего
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

      // копирует строку под 'Обязательные расходы' и вставляет ниже
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3){
         expensesPlus.style.display = 'none';
      }
   },
   getExpenses: function(){
      expensesItems.forEach(function(item){
         //получить наименование и сумму обязательных расходов
         let itemExpenses = item.querySelector('.expenses-title').value;
         let cashExpenses = item.querySelector('.expenses-amount').value;
         if (itemExpenses !== '' && cashExpenses !== ''){
            appData.expenses[itemExpenses] = cashExpenses;
         }
      });
   },
   addIncomeBlock: function(){
      // получить блок Дополнительный доход. добавляет слроки на плюс
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
         incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
         incomeItems = document.querySelectorAll('.income-items');

         if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
         }
   },
   getIncome: function(item){
         ///получить наименование и сумму дополнительных доходов
         incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
               appData.income[itemIncome] = cashIncome;
            }
         });

      for (let key in appData.income) { //добавить в  incomeMonth (дополнительный доход) из полей ввода
         appData.incomeMonth += +appData.income[key];
      }
   },
   getAddExpenses: function(){ //поле возможные расходы
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item){
         item = item.trim();
         if (item !== ''){
            appData.addExpenses.push(item);
         }
      });
   },
   getAddIncom: function(){// поле Возможные доходы
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
   getBudget: function () {// поле Доход за месяц
      appData.budgetMonth = appData.budget + appData.incomeMonth- appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
   },
   getTargetMonth: function () { //поле Срок достижения цели в месяцах
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
   getPeriodSelect: function () { // изменение цифры периода расчета
      periodAmount.textContent = periodSelect.value;
   },
   calcPeriod: function(){ // поле Накопление за период
      return appData.budgetMonth * periodSelect.value;
   }
};


startBtn.disabled = true; //отключение работы кнопки Рассчитать
salaryAmount.addEventListener('input', function () {  //проверка на наличие непустого дохода
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



function missionComplete() {
   if (appData.getTargetMonth() >= 0) {
      return ('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)');
   } else {
      return ('Цель не будет достигнута');
   }
}

// appData.getInfoDeposit();

// for (let key in appData) {
//    console.log('Наша программа включает в себя данные: ' + key + "  =  " + appData[key]);

// }


// let tempArr = [];
// for (let item of appData.addExpenses){
//    item = item.charAt(0).toUpperCase() + item.substr(1);
//    tempArr.push(item);
// }

// console.log(tempArr.join(', '));