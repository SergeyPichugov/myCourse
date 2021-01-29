
const money = 150000;
const income = '49550';
const addExpenses = 'проезд, еда, интернет';
const deposit = true;
const mission = 94513548;
const period = 8;


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(' ,'));

const budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);


