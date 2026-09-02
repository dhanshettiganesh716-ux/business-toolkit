let totalSales = 0;
let totalExpenses = 0;
let totalStock = 0;


// OPEN TOOL
function openTool(tool) {

  document.getElementById("dashboard").style.display = "none";

  document.querySelectorAll(".section").forEach(function(section) {
    section.classList.remove("active");
  });

  document.getElementById(tool).classList.add("active");
}


// GO HOME
function goHome() {

  document.querySelectorAll(".section").forEach(function(section) {
    section.classList.remove("active");
  });

  document.getElementById("dashboard").style.display = "block";
}


// BILLING
function createBill() {

  let product =
    document.getElementById("billProduct").value;

  let qty =
    Number(document.getElementById("billQty").value);

  let price =
    Number(document.getElementById("billPrice").value);

  if (!product || qty <= 0 || price <= 0) {
    alert("Please enter valid details.");
    return;
  }

  let total = qty * price;

  totalSales += total;

  document.getElementById("salesDisplay").innerText =
    "₹" + totalSales.toLocaleString("en-IN");

  updateProfit();

  document.getElementById("billResult").innerHTML =
    "Product: " + product +
    "<br>Quantity: " + qty +
    "<br>Total: ₹" + total.toLocaleString("en-IN");
}


// STOCK
function addStock() {

  let name =
    document.getElementById("stockName").value;

  let qty =
    Number(document.getElementById("stockQty").value);

  if (!name || qty <= 0) {
    alert("Please enter valid stock details.");
    return;
  }

  totalStock += qty;

  document.getElementById("stockDisplay").innerText =
    totalStock;

  document.getElementById("stockResult").innerHTML =
    "Product: " + name +
    "<br>Added Quantity: " + qty +
    "<br>Total Stock: " + totalStock;
}


// CUSTOMER KHATA
function addCredit() {

  let name =
    document.getElementById("customerName").value;

  let amount =
    Number(document.getElementById("creditAmount").value);

  if (!name || amount <= 0) {
    alert("Please enter valid customer details.");
    return;
  }

  document.getElementById("khataResult").innerHTML =
    "Customer: " + name +
    "<br>Credit Amount: ₹" +
    amount.toLocaleString("en-IN");
}


// GST CALCULATOR
function calculateGST() {

  let amount =
    Number(document.getElementById("gstAmount").value);

  let rate =
    Number(document.getElementById("gstRate").value);

  if (amount <= 0) {
    alert("Please enter amount.");
    return;
  }

  let gst = amount * rate / 100;

  let total = amount + gst;

  document.getElementById("gstResult").innerHTML =
    "GST (" + rate + "%): ₹" +
    gst.toLocaleString("en-IN") +
    "<br>Total Amount: ₹" +
    total.toLocaleString("en-IN");
}


// PROFIT CALCULATOR
function calculateProfit() {

  let buy =
    Number(document.getElementById("buyPrice").value);

  let sell =
    Number(document.getElementById("sellPrice").value);

  let qty =
    Number(document.getElementById("profitQty").value);

  if (buy <= 0 || sell <= 0 || qty <= 0) {
    alert("Please enter valid values.");
    return;
  }

  let profit = (sell - buy) * qty;

  document.getElementById("profitResult").innerHTML =
    "Total Profit: ₹" +
    profit.toLocaleString("en-IN");
}


// EXPENSE
function addExpense() {

  let name =
    document.getElementById("expenseName").value;

  let amount =
    Number(document.getElementById("expenseAmount").value);

  if (!name || amount <= 0) {
    alert("Please enter valid expense details.");
    return;
  }

  totalExpenses += amount;

  document.getElementById("expenseDisplay").innerText =
    "₹" + totalExpenses.toLocaleString("en-IN");

  updateProfit();

  document.getElementById("expenseResult").innerHTML =
    "Expense: " + name +
    "<br>Amount: ₹" +
    amount.toLocaleString("en-IN") +
    "<br>Total Expenses: ₹" +
    totalExpenses.toLocaleString("en-IN");
}


// UPDATE PROFIT
function updateProfit() {

  let profit = totalSales - totalExpenses;

  document.getElementById("profitDisplay").innerText =
    "₹" + profit.toLocaleString("en-IN");
    }
