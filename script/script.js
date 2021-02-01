
const money = 150000,
   income = '49550',
   addExpenses = 'проезд, еда, интернет',
   deposit = true,
   mission = 94513548,
   period = 8,
   budgetDay = money / 30;


console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(' ,'));

console.log('budgetDay: ', budgetDay);


