'use strict';

const isNumber = function(n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

const income = 'фриланс',
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
      deposit = confirm('Есть ли у вас депозит в банке?'),
      mission = 350000,
      expenses = [];
let money;  

const start = function() {
   
   do {
      money = prompt('Ваш месячный доход?');
   }
   while (!isNumber(money));
};

start();


const showTypeOf = function(data) {
   console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);



const getExpensesMonth = function () {
   let sum = 0;
   
   for (let i = 0; i < 2; i++) {

      expenses[i] = prompt('Введите обязательную статью расходов?');

      let tmp = +prompt('Во сколько это обойдется?');

      while (!isNumber(tmp) || tmp === 0) {
         tmp = +prompt('Во сколько это обойдется?');
      }

      sum += tmp;
   }
   console.log(expenses);
   return sum;
};

const expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function () {
   return money - expensesAmount;
};

const accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
   return Math.ceil(mission / accumulatedMonth);
}

function missionComplete() {
   if (getTargetMonth() >= 0) {
      return ('Цель будет достигнута за ' + getTargetMonth() + ' месяцев(-а)');
   } else {
      return ('Цель не будет достигнута');
   }
}

const budgetDay = Math.floor(accumulatedMonth / 30);

const getStatusIncome = function() {
   if (budgetDay > 1200) {
      return ('У вас высокий уровень дохода');
   } else if (budgetDay > 600 && budgetDay <= 1200) {
      return ('У вас средний уровень дохода');
   } else if (budgetDay > 0 && budgetDay <= 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
   } else if (budgetDay <= 0) {
      return ('Что то пошло не так');
   }
};


console.log('Pacходы за месяц: ' + expensesAmount);
console.log(addExpenses.toLowerCase().split(','));
console.log(missionComplete());
console.log('Бюджет на день: ', budgetDay);
console.log(getStatusIncome());

