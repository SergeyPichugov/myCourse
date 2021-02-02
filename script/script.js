'use strict';

const money = +prompt('Ваш месячный доход?'),
      income = '49550',
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
      deposit = confirm('Есть ли у вас депозит в банке?'),
      expenses1 = prompt('Введите обязательную статью расходов?'),
      amount1 = +prompt('Во сколько это обойдется?'),
      expenses2 = prompt('Введите обязательную статью расходов?'),
      amount2 = +prompt('Во сколько это обойдется?'),
      budgetMonth = +income + money - amount1 - amount2,
      mission = 350000,
      period = Math.ceil(mission / budgetMonth),
      budgetDay = Math.floor(budgetMonth / 30);
      
if (budgetDay > 1200) {
   console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay <= 1200) {
   console.log('У вас средний уровень дохода');
} else if (budgetDay > 0 && budgetDay <= 600) {
   console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay <= 0) {
   console.log('Что то пошло не так');
}

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log('Цель заработать ' + mission + ' рублей');
console.log('Цель будет достигнута за ' + period + ' месяцев(-а)');
console.log(addExpenses.toLowerCase().split(','));
console.log('Бюджет на месяц: ', budgetMonth);
console.log('Бюджет на день: ', budgetDay);



