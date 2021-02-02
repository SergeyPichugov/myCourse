'use strict';

const money = +prompt('Ваш месячный доход?'),
      income = 'фриланс',
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
      deposit = confirm('Есть ли у вас депозит в банке?'),
      expenses1 = prompt('Введите обязательную статью расходов?'),
      amount1 = +prompt('Во сколько это обойдется?'),
      expenses2 = prompt('Введите обязательную статью расходов?'),
      amount2 = +prompt('Во сколько это обойдется?'),
      mission = 350000;
      

const showTypeOf = function(data) {
   console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

const getExpensesMonth = function () {
   return amount1 + amount2;
};

const getAccumulatedMonth = function () {
   return money - amount1 - amount2;
};

const accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
   return Math.ceil(mission / accumulatedMonth);
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


console.log(getExpensesMonth());
console.log(addExpenses.toLowerCase().split(','));
console.log('Цель будет достигнута за ' + getTargetMonth() + ' месяцев(-а)');
console.log('Бюджет на день: ', budgetDay);
console.log(getStatusIncome());

