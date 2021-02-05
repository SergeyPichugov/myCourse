'use strict';

const isNumber = function(n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

const start = function() {
   
   do {
      money = prompt('Ваш месячный доход?');
   }
   while (!isNumber(money));
};

start();

const appData = {
   budget: money,
   budgetDay: 0,
   budgetMonth: 0,
   expensesMonth: 0,
   income: {},
   addIncome: [],
   expenses: {},
   addExpenses: [],
   deposit: false,
   mission: 350000,
   asking: function(){
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
         appData.addExpenses = addExpenses.toLowerCase().split(',');
         appData.deposit = confirm('Есть ли у вас депозит в банке?');
         appData.getExpensesMonth = function () {
            
            for (let i = 0; i < 2; i++) {
         
               let keyMass = prompt('Введите обязательную статью расходов?');
         
               let tmp = +prompt('Во сколько это обойдется?');
         
               appData.expenses[keyMass] = tmp;
         
               while (!isNumber(tmp) || tmp === 0) {
                  tmp = +prompt('Во сколько это обойдется?');
                  appData.expenses[keyMass] = tmp;
               }
         
            }
            for (let key in appData.expenses) {
               appData.expensesMonth += appData.expenses[key];
            }
            console.log(appData.expenses);
         };
   },
   getBudget: function () {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
   
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
   },
   getTargetMonth: function () {
      return Math.ceil(appData.mission / appData.budgetMonth);
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
   }

};

appData.asking();

appData.getExpensesMonth();

appData.getBudget();


function missionComplete() {
   if (appData.getTargetMonth() >= 0) {
      return ('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)');
   } else {
      return ('Цель не будет достигнута');
   }
}


console.log('Pacходы за месяц: ' + appData.expensesMonth);
console.log(missionComplete());
console.log(appData.getStatusIncome());

for (let key in appData) {
   console.log('Наша программа включает в себя данные: ' + key + "  =  " + appData[key]);

}