const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -1000 },
  { id: 4, text: "Camera", amount: 150 },
];

let transactions = dummyTransactions;

// Add transactions to DOM list
function addTransactionToDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income, and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  console.log(amounts);
  // calculate balance
  const balanceTotal = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);

  // calculate income
  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, val) => acc + val, 0);

  // calculate expense
  const expense = amounts
    .filter((amount) => amount < 0)
    .reduce((acc, val) => acc + val, 0);

  money_plus.innerHTML = `+$${income}`;
  money_minus.innerHTML = `-$${Math.abs(expense)}`;
  balance.innerHTML = `$${balanceTotal}`;
}

// Add New Transaction
function addTransaction(e) {
  e.preventDefault();

  // add to transactions array
  addToHistory(text.value, amount.value);
  text.value = "";
  amount.value = 0;
}

function addToHistory(text, amount) {
  amount = parseInt(amount);
  text = text.charAt(0).toUpperCase() + text.slice(1);
  let transaction = {
    id: dummyTransactions.length + 1,
    text,
    amount,
  };
  transactions.push(transaction);

  updateValues();
  addTransactionToDOM(transaction);
}

// Init app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionToDOM);
  updateValues();
}

init();

// Event Listeners

form.addEventListener("submit", addTransaction);
