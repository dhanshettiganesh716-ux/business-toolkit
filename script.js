// ================================
// SECTION CHANGE
// ================================

function showSection(sectionId) {

  // Hide all sections
  const sections = document.querySelectorAll(".section");

  sections.forEach(function(section) {
    section.classList.remove("active-section");
  });


  // Show selected section
  document.getElementById(sectionId)
    .classList.add("active-section");


  // Remove active from buttons
  const buttons = document.querySelectorAll(".nav-btn");

  buttons.forEach(function(button) {
    button.classList.remove("active");
  });


  // Active button
  event.currentTarget.classList.add("active");

}


// ================================
// SALES
// ================================

let totalSales = 0;

function addSale() {

  const amount =
    Number(document.getElementById("saleAmount").value);

  if (amount <= 0) {
    alert("कृपया Sales Amount टाका.");
    return;
  }

  totalSales += amount;

  document.getElementById("salesList").innerHTML +=
    `<p>💰 Sale: ₹${amount.toFixed(2)}</p>`;

  document.getElementById("saleAmount").value = "";

  updateDashboard();
}


// ================================
// EXPENSES
// ================================

let totalExpenses = 0;

function addExpense() {

  const name =
    document.getElementById("expenseName").value;

  const amount =
    Number(document.getElementById("expenseAmount").value);

  if (!name || amount <= 0) {
    alert("Expense Name आणि Amount टाका.");
    return;
  }

  totalExpenses += amount;

  document.getElementById("expensesList").innerHTML +=
    `<p>💸 ${name} — ₹${amount.toFixed(2)}</p>`;

  document.getElementById("expenseName").value = "";

  document.getElementById("expenseAmount").value = "";

  updateDashboard();
}


// ================================
// CUSTOMER
// ================================

let totalCustomers = 0;

function addCustomer() {

  const name =
    document.getElementById("customerName").value;

  const amount =
    Number(document.getElementById("udhaarAmount").value);

  if (!name) {
    alert("Customer Name टाका.");
    return;
  }

  totalCustomers++;

  document.getElementById("customersList").innerHTML +=
    `<p>👤 ${name} — Udhaar ₹${amount.toFixed(2)}</p>`;

  document.getElementById("customerName").value = "";

  document.getElementById("udhaarAmount").value = "";

  updateDashboard();
}


// ================================
// STOCK
// ================================

function addStock() {

  const name =
    document.getElementById("stockName").value;

  const qty =
    Number(document.getElementById("stockQty").value);

  if (!name || qty <= 0) {
    alert("Product आणि Quantity टाका.");
    return;
  }

  document.getElementById("stockList").innerHTML +=
    `<p>📦 ${name} — Quantity: ${qty}</p>`;

  document.getElementById("stockName").value = "";

  document.getElementById("stockQty").value = "";

}


// ================================
// GST
// ================================

function calculateGST() {

  const amount =
    Number(document.getElementById("gstAmount").value);

  const rate =
    Number(document.getElementById("gstRate").value);

  if (amount <= 0) {
    alert("Amount टाका.");
    return;
  }

  const gst = amount * rate / 100;

  const total = amount + gst;

  document.getElementById("gstResult").innerHTML = `

    <div class="profit-card">

      <p>Amount: ₹${amount.toFixed(2)}</p>

      <p>GST (${rate}%): ₹${gst.toFixed(2)}</p>

      <h3>Total: ₹${total.toFixed(2)}</h3>

    </div>

  `;
}


// ================================
// INVOICE
// ================================

function createInvoice() {

  const customer =
    document.getElementById("invoiceCustomer").value;

  const product =
    document.getElementById("invoiceProduct").value;

  const qty =
    Number(document.getElementById("invoiceQty").value);

  const price =
    Number(document.getElementById("invoicePrice").value);

  if (!customer || !product || qty <= 0 || price <= 0) {

    alert("सर्व Invoice details भरा.");

    return;
  }

  const total = qty * price;

  document.getElementById("invoiceResult").innerHTML = `

    <div class="profit-card">

      <h3>🧾 Invoice</h3>

      <p>Customer: ${customer}</p>

      <p>Product: ${product}</p>

      <p>Quantity: ${qty}</p>

      <p>Price: ₹${price.toFixed(2)}</p>

      <h2>Total: ₹${total.toFixed(2)}</h2>

    </div>

  `;
}


// ================================
// DASHBOARD
// ================================

function updateDashboard() {

  const profit = totalSales - totalExpenses;

  document.getElementById("totalSales")
    .innerText = "₹" + totalSales.toFixed(2);

  document.getElementById("totalExpenses")
    .innerText = "₹" + totalExpenses.toFixed(2);

  document.getElementById("totalProfit")
    .innerText = "₹" + profit.toFixed(2);

  document.getElementById("totalCustomers")
    .innerText = totalCustomers;


  // Profit page

  document.getElementById("profitSales")
    .innerText = "₹" + totalSales.toFixed(2);

  document.getElementById("profitExpenses")
    .innerText = "₹" + totalExpenses.toFixed(2);

  document.getElementById("profitValue")
    .innerText = "₹" + profit.toFixed(2);
}


// ================================
// FEEDBACK
// ================================

function openFeedback() {

  window.open(
    "https://docs.google.com/forms/d/e/1FAIpQLSewOR2YdFto41kc7jZVnTLcCg5jWigSHig-rJOAgDoaL1lgCQ/viewform",
    "_blank"
  );

}
