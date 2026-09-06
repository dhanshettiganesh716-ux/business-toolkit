let totalSales = 0;
let totalExpenses = 0;
let totalCustomers = 0;

function addSale() {

    let amount = Number(
        document.getElementById("saleAmount").value
    );

    if (amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    totalSales = totalSales + amount;

    updateDashboard();

    document.getElementById("saleAmount").value = "";
}

function addExpense() {

    let amount = Number(
        document.getElementById("expenseAmount").value
    );

    if (amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    totalExpenses = totalExpenses + amount;

    updateDashboard();

    document.getElementById("expenseAmount").value = "";
}

function addCustomer() {

    totalCustomers = totalCustomers + 1;

    updateDashboard();
}

function updateDashboard() {

    let profit = totalSales - totalExpenses;

    document.getElementById("sales").innerText =
        "₹" + totalSales;

    document.getElementById("expenses").innerText =
        "₹" + totalExpenses;

    document.getElementById("profit").innerText =
        "₹" + profit;

    document.getElementById("customers").innerText =
        totalCustomers;
}
