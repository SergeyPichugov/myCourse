'use strict';

const isNumber = function(n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

const start = function() {
   
   do {
      money = prompt('Ваш месячный доход?', 50000);
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
   percentDeposit: 0,
   moneyDeposit: 0,
   mission: 350000,
   period: 3,
   asking: function(){

      if (confirm('Усть ли у вас дополнительный заработок?')){
         let itemIncome;
         do {
            itemIncome = prompt('Какой у вас дополнительный заработок?', 'таксую');
         } while (!isNaN(itemIncome) || itemIncome === '' || itemIncome === null);

         let cashIncome;
         do {
            cashIncome = prompt('Сколько в месяц на этом зарабатываете?', 10000);
         } while (!isNumber(cashIncome) || cashIncome === 0 || cashIncome === null);

         appData.income[itemIncome] = cashIncome;
      }

      let addExpenses;
      do {
         addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кофе,еда,такси');
      } while (isNumber(addExpenses) || addExpenses === '' || addExpenses === null);

      appData.addExpenses = addExpenses.toLowerCase().split(',');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
      appData.getExpensesMonth = function () {
         
         for (let i = 0; i < 2; i++) {
      
            let itemExpenses;
            do {
               itemExpenses = prompt('Введите обязательную статью расходов?', 'Дом');
            } while (!isNaN(itemExpenses) || itemExpenses === '' || itemExpenses === null);

            let tmp = +prompt('Во сколько это обойдется?', 5000);
      
            appData.expenses[itemExpenses] = tmp;
      
            while (!isNumber(tmp) || tmp === 0) {
               tmp = +prompt('Во сколько это обойдется?');
               appData.expenses[itemExpenses] = tmp;
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
   calcSavedMoney: function(){
      return appData.budgetMonth * appData.period;
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

// appData.getInfoDeposit();


console.log('Pacходы за месяц: ' + appData.expensesMonth);
console.log(missionComplete());
console.log(appData.getStatusIncome());

for (let key in appData) {
   console.log('Наша программа включает в себя данные: ' + key + "  =  " + appData[key]);

}


let tempArr = [];
for (let item of appData.addExpenses){
   item = item.charAt(0).toUpperCase() + item.substr(1);
   tempArr.push(item);
}

console.log(tempArr.join(', '));