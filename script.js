// ===============================
// DATA
// ===============================

let sales = JSON.parse(localStorage.getItem("sales")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let customers = JSON.parse(localStorage.getItem("customers")) || [];
let stocks = JSON.parse(localStorage.getItem("stocks")) || [];
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];


// ===============================
// SECTION NAVIGATION
// ===============================

function showSection(id) {

  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  updateDashboard();
}


// ===============================
// SAVE DATA
// ===============================

function saveData() {

  localStorage.setItem("sales", JSON.stringify(sales));
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("customers", JSON.stringify(customers));
  localStorage.setItem("stocks", JSON.stringify(stocks));
  localStorage.setItem("invoices", JSON.stringify(invoices));

  updateDashboard();
}


// ===============================
// DASHBOARD
// ===============================

function updateDashboard() {

  let totalSalesAmount = sales.reduce(
    (sum, item) => sum + Number(item.amount), 0
  );

  let totalExpenseAmount = expenses.reduce(
    (sum, item) => sum + Number(item.amount), 0
  );

  let profit = totalSalesAmount - totalExpenseAmount;

  document.getElementById("totalSales").innerText =
    "₹" + totalSalesAmount.toFixed(2);

  document.getElementById("totalExpenses").innerText =
    "₹" + totalExpenseAmount.toFixed(2);

  document.getElementById("totalProfit").innerText =
    "₹" + profit.toFixed(2);

  document.getElementById("totalCustomers").innerText =
    customers.length;
}


// ===============================
// SALES
// ===============================

function addSale() {

  let amount = Number(document.getElementById("saleAmount").value);
  let note = document.getElementById("saleNote").value;

  if (!amount) {
    alert("Enter sale amount");
    return;
  }

  sales.push({
    amount: amount,
    note: note,
    date: new Date().toLocaleString()
  });

  document.getElementById("saleAmount").value = "";
  document.getElementById("saleNote").value = "";

  saveData();
  displaySales();
}

function displaySales() {

  let list = document.getElementById("salesList");

  list.innerHTML = "";

  sales.forEach((sale, index) => {

    list.innerHTML += `
      <div class="item">
        <b>₹${sale.amount}</b>
        <br>
        ${sale.note || "Sale"}
        <br>
        <small>${sale.date}</small>

        <button class="delete"
          onclick="deleteSale(${index})">
          Delete
        </button>
      </div>
    `;
  });
}

function deleteSale(index) {

  sales.splice(index, 1);

  saveData();
  displaySales();
}


// ===============================
// EXPENSES
// ===============================

function addExpense() {

  let amount = Number(
    document.getElementById("expenseAmount").value
  );

  let note =
    document.getElementById("expenseNote").value;

  if (!amount) {
    alert("Enter expense amount");
    return;
  }

  expenses.push({
    amount: amount,
    note: note,
    date: new Date().toLocaleString()
  });

  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseNote").value = "";

  saveData();
  displayExpenses();
}

function displayExpenses() {

  let list = document.getElementById("expenseList");

  list.innerHTML = "";

  expenses.forEach((expense, index) => {

    list.innerHTML += `
      <div class="item">
        <b>₹${expense.amount}</b>
        <br>
        ${expense.note || "Expense"}
        <br>
        <small>${expense.date}</small>

        <button class="delete"
          onclick="deleteExpense(${index})">
          Delete
        </button>
      </div>
    `;
  });
}

function deleteExpense(index) {

  expenses.splice(index, 1);

  saveData();
  displayExpenses();
}


// ===============================
// CUSTOMERS
// ===============================

function addCustomer() {

  let name =
    document.getElementById("custName").value;

  let phone =
    document.getElementById("custPhone").value;

  let due =
    Number(document.getElementById("custDue").value);

  if (!name) {
    alert("Enter customer name");
    return;
  }

  customers.push({
    name: name,
    phone: phone,
    due: due
  });

  document.getElementById("custName").value = "";
  document.getElementById("custPhone").value = "";
  document.getElementById("custDue").value = "";

  saveData();
  displayCustomers();
}

function displayCustomers() {

  let list =
    document.getElementById("customerList");

  list.innerHTML = "";

  customers.forEach((customer, index) => {

    list.innerHTML += `
      <div class="item">

        <b>${customer.name}</b>

        <br>
        📞 ${customer.phone || "No phone"}

        <br>
        💰 Udhaar: ₹${customer.due || 0}

        <br>

        ${
          customer.phone
          ?
          `<button onclick="sendWhatsApp('${customer.phone}','${customer.name}',${customer.due})">
             💬 WhatsApp Reminder
           </button>`
          : ""
        }

        <button class="delete"
          onclick="deleteCustomer(${index})">
          Delete
        </button>

      </div>
    `;
  });
}

function deleteCustomer(index) {

  customers.splice(index, 1);

  saveData();
  displayCustomers();
}


// ===============================
// WHATSAPP
// ===============================

function sendWhatsApp(phone, name, due) {

  phone = phone.replace(/\D/g, "");

  if (phone.length === 10) {
    phone = "91" + phone;
  }

  let message =
    `Hello ${name}, your pending amount is ₹${due}. Please pay at your convenience. Thank you.`;

  let url =
    "https://wa.me/" +
    phone +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");
}


// ===============================
// STOCK
// ===============================

function addStock() {

  let name =
    document.getElementById("stockName").value;

  let qty =
    Number(document.getElementById("stockQty").value);

  let price =
    Number(document.getElementById("stockPrice").value);

  if (!name || !qty) {
    alert("Enter product and quantity");
    return;
  }

  stocks.push({
    name: name,
    qty: qty,
    price: price
  });

  document.getElementById("stockName").value = "";
  document.getElementById("stockQty").value = "";
  document.getElementById("stockPrice").value = "";

  saveData();
  displayStocks();
}

function displayStocks() {

  let list =
    document.getElementById("stockList");

  list.innerHTML = "";

  stocks.forEach((stock, index) => {

    list.innerHTML += `
      <div class="item">

        <b>${stock.name}</b>

        <br>
        📦 Quantity: ${stock.qty}

        <br>
        💰 Price: ₹${stock.price}

        <button class="delete"
          onclick="deleteStock(${index})">
          Delete
        </button>

      </div>
    `;
  });
}

function deleteStock(index) {

  stocks.splice(index, 1);

  saveData();
  displayStocks();
}


// ===============================
// INVOICE
// ===============================

function addInvoice() {

  let customer =
    document.getElementById("customerName").value;

  let phone =
    document.getElementById("customerPhone").value;

  let product =
    document.getElementById("productName").value;

  let qty =
    Number(document.getElementById("productQty").value);

  let price =
    Number(document.getElementById("productPrice").value);

  if (!customer || !product || !qty || !price) {

    alert("Please fill all invoice details");

    return;
  }

  let total = qty * price;

  invoices.push({

    customer: customer,
    phone: phone,
    product: product,
    qty: qty,
    price: price,
    total: total,
    date: new Date().toLocaleString()

  });

  sales.push({
    amount: total,
    note: "Invoice - " + product,
    date: new Date().toLocaleString()
  });

  document.getElementById("customerName").value = "";
  document.getElementById("customerPhone").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("productQty").value = "";
  document.getElementById("productPrice").value = "";

  saveData();

  displayInvoices();

  alert("Invoice created successfully!");
}

function displayInvoices() {

  let list =
    document.getElementById("invoiceList");

  list.innerHTML = "";

  invoices.forEach((invoice, index) => {

    list.innerHTML += `

      <div class="item">

        <b>🧾 Invoice #${index + 1}</b>

        <br>
        Customer: ${invoice.customer}

        <br>
        Product: ${invoice.product}

        <br>
        Qty: ${invoice.qty}

        <br>
        Total: <b>₹${invoice.total}</b>

        <br>
        <small>${invoice.date}</small>

        <br>

        <button
          onclick="printInvoice(${index})">
          🖨️ Print
        </button>

        <button class="delete"
          onclick="deleteInvoice(${index})">
          Delete
        </button>

      </div>
    `;
  });
}

function deleteInvoice(index) {

  invoices.splice(index, 1);

  saveData();
  displayInvoices();
}


// ===============================
// PRINT INVOICE
// ===============================

function printInvoice(index) {

  let invoice = invoices[index];

  let printWindow =
    window.open("", "_blank");

  printWindow.document.write(`

    <html>

    <head>

      <title>Invoice</title>

      <style>

        body {
          font-family: Arial;
          padding: 30px;
        }

        h1 {
          text-align: center;
        }

        .invoice {
          max-width: 600px;
          margin: auto;
          border: 1px solid #ddd;
          padding: 25px;
        }

      </style>

    </head>

    <body>

      <div class="invoice">

        <h1>Business Invoice</h1>

        <hr>

        <p>
          <b>Customer:</b>
          ${invoice.customer}
        </p>

        <p>
          <b>Mobile:</b>
          ${invoice.phone}
        </p>

        <p>
          <b>Product:</b>
          ${invoice.product}
        </p>

        <p>
          <b>Quantity:</b>
          ${invoice.qty}
        </p>

        <p>
          <b>Price:</b>
          ₹${invoice.price}
        </p>

        <h2>
          Total: ₹${invoice.total}
        </h2>

        <hr>

        <p>Thank you for your business!</p>

      </div>

    </body>

    </html>

  `);

  printWindow.document.close();

  printWindow.print();
}


// ===============================
// GST CALCULATOR
// ===============================

function calculateGST() {

  let amount =
    Number(document.getElementById("gstAmount").value);

  let rate =
    Number(document.getElementById("gstRate").value);

  if (!amount || rate < 0) {

    alert("Enter valid values");

    return;
  }

  let gst =
    amount * rate / 100;

  let total =
    amount + gst;

  document.getElementById("gstResult").innerHTML = `

    GST Amount: ₹${gst.toFixed(2)}

    <br><br>

    Total Amount: ₹${total.toFixed(2)}

  `;
}


// ===============================
// PROFIT CALCULATOR
// ===============================

function calculateProfit() {

  let buy =
    Number(document.getElementById("buyPrice").value);

  let sell =
    Number(document.getElementById("sellPrice").value);

  let qty =
    Number(document.getElementById("profitQty").value);

  if (!buy || !sell || !qty) {

    alert("Enter all values");

    return;
  }

  let profitPerItem =
    sell - buy;

  let totalProfit =
    profitPerItem * qty;

  if (totalProfit >= 0) {

    document.getElementById("profitResult").innerHTML = `

      🟢 Profit

      <br><br>

      Profit per item:
      ₹${profitPerItem.toFixed(2)}

      <br>

      Total Profit:
      ₹${totalProfit.toFixed(2)}

    `;

  } else {

    document.getElementById("profitResult").innerHTML = `

      🔴 Loss

      <br><br>

      Loss per item:
      ₹${Math.abs(profitPerItem).toFixed(2)}

      <br>

      Total Loss:
      ₹${Math.abs(totalProfit).toFixed(2)}

    `;
  }
}


// ===============================
// LOAD DATA
// ===============================

displaySales();
displayExpenses();
displayCustomers();
displayStocks();
displayInvoices();
updateDashboard();
