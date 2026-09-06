/* =========================
   BUSINESS TOOLKIT
========================= */


/* DATA */

let bills = JSON.parse(localStorage.getItem("bills")) || [];
let ledgers = JSON.parse(localStorage.getItem("ledgers")) || [];
let stocks = JSON.parse(localStorage.getItem("stocks")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let billNumber =
  parseInt(localStorage.getItem("billNumber")) || 1;


/* =========================
   SECTION CHANGE
========================= */

function showSection(sectionName) {

  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  document.getElementById(sectionName).classList.add("active");

  updateDashboard();
}


/* =========================
   PREMIUM
========================= */

function showPremium() {
  showSection("premium");
}


/* =========================
   TOAST MESSAGE
========================= */

function toast(message) {

  const box = document.getElementById("toast");

  box.innerText = message;
  box.style.display = "block";

  setTimeout(() => {
    box.style.display = "none";
  }, 2000);
}


/* =========================
   BILLING
========================= */

function addItem() {

  const items = document.getElementById("items");

  const row = document.createElement("div");

  row.className = "item-row";

  row.innerHTML = `
    <input
      type="text"
      placeholder="वस्तूचे नाव"
      class="item-name"
      oninput="calculateBill()"
    >

    <input
      type="number"
      placeholder="Qty"
      class="item-qty"
      min="1"
      value="1"
      oninput="calculateBill()"
    >

    <input
      type="number"
      placeholder="Price"
      class="item-price"
      min="0"
      oninput="calculateBill()"
    >

    <button
      class="remove-btn"
      onclick="this.parentElement.remove(); calculateBill()">
      ✕
    </button>
  `;

  items.appendChild(row);

  calculateBill();
}


/* DEFAULT ITEM */

addItem();


/* CALCULATE BILL */

function calculateBill() {

  const rows = document.querySelectorAll(".item-row");

  let total = 0;

  rows.forEach(row => {

    const qty =
      Number(row.querySelector(".item-qty").value) || 0;

    const price =
      Number(row.querySelector(".item-price").value) || 0;

    total += qty * price;
  });

  document.getElementById("billTotal").innerText =
    "₹" + total.toFixed(2);
}


/* CREATE BILL */

function createBill() {

  const customer =
    document.getElementById("customerName").value.trim();

  const mobile =
    document.getElementById("customerMobile").value.trim();

  if (!customer) {
    toast("कृपया ग्राहकाचे नाव टाका");
    return;
  }


  const rows = document.querySelectorAll(".item-row");

  let items = [];
  let total = 0;


  rows.forEach(row => {

    const name =
      row.querySelector(".item-name").value.trim();

    const qty =
      Number(row.querySelector(".item-qty").value) || 0;

    const price =
      Number(row.querySelector(".item-price").value) || 0;


    if (name && qty > 0 && price >= 0) {

      const amount = qty * price;

      items.push({
        name,
        qty,
        price,
        amount
      });

      total += amount;
    }

  });


  if (items.length === 0) {
    toast("किमान एक वस्तू टाका");
    return;
  }


  const number =
    String(billNumber).padStart(5, "0");


  const bill = {

    number: number,

    customer: customer,

    mobile: mobile,

    items: items,

    total: total,

    date: new Date().toLocaleString("en-IN")

  };


  bills.push(bill);

  localStorage.setItem(
    "bills",
    JSON.stringify(bills)
  );


  billNumber++;

  localStorage.setItem(
    "billNumber",
    billNumber
  );


  showBill(bill);

  updateDashboard();

  toast("Bill तयार झाले ✅");
}


/* SHOW BILL */

function showBill(bill) {

  const preview =
    document.getElementById("billPreview");

  let html = `

    <h2>BUSINESS TOOLKIT</h2>

    <p style="text-align:center">
      Smart Business Billing
    </p>

    <div class="bill-line">
      <b>Bill No:</b> ${bill.number}
    </div>

    <div class="bill-line">
      <b>Date:</b> ${bill.date}
    </div>

    <div class="bill-line">
      <b>Customer:</b> ${bill.customer}
    </div>

    <div class="bill-line">
      <b>Mobile:</b> ${bill.mobile || "-"}
    </div>

    <br>

  `;


  bill.items.forEach(item => {

    html += `

      <div class="bill-line">

        ${item.name}

        × ${item.qty}

        = ₹${item.amount.toFixed(2)}

      </div>

    `;

  });


  html += `

    <h2 style="text-align:right;margin-top:15px;">
      Total: ₹${bill.total.toFixed(2)}
    </h2>

    <button
      class="print-btn"
      onclick="window.print()">
      🖨️ Print Bill
    </button>

    <button
      class="print-btn"
      onclick="shareBill()">
      📱 WhatsApp Share
    </button>

  `;


  preview.innerHTML = html;

  preview.classList.remove("hidden");

  preview.scrollIntoView({
    behavior: "smooth"
  });
}


/* =========================
   WHATSAPP
========================= */

function shareBill() {

  const bill =
    bills[bills.length - 1];

  if (!bill) return;


  let message =
    "🧾 *BUSINESS TOOLKIT BILL*%0A%0A";

  message +=
    "Bill No: " + bill.number + "%0A";

  message +=
    "Customer: " + bill.customer + "%0A%0A";


  bill.items.forEach(item => {

    message +=
      item.name +
      " × " +
      item.qty +
      " = ₹" +
      item.amount.toFixed(2) +
      "%0A";

  });


  message +=
    "%0A*Total: ₹" +
    bill.total.toFixed(2) +
    "*";


  window.open(
    "https://wa.me/?text=" + message,
    "_blank"
  );
}


/* =========================
   LEDGER
========================= */

function addLedger() {

  const name =
    document.getElementById("ledgerCustomer")
      .value.trim();

  const amount =
    Number(
      document.getElementById("ledgerAmount").value
    );


  if (!name || amount <= 0) {

    toast("योग्य माहिती भरा");

    return;
  }


  ledgers.push({

    id: Date.now(),

    name: name,

    amount: amount,

    date: new Date().toLocaleDateString("en-IN")

  });


  localStorage.setItem(
    "ledgers",
    JSON.stringify(ledgers)
  );


  document.getElementById("ledgerCustomer").value = "";

  document.getElementById("ledgerAmount").value = "";


  renderLedger();

  toast("उधारी नोंदवली ✅");
}


/* RENDER LEDGER */

function renderLedger() {

  const list =
    document.getElementById("ledgerList");

  list.innerHTML = "";


  if (ledgers.length === 0) {

    list.innerHTML =
      "<p>अजून कोणतीही उधारी नाही.</p>";

    return;
  }


  ledgers.forEach(item => {

    list.innerHTML += `

      <div class="list-card">

        <b>👤 ${item.name}</b>

        <p>
          उधारी:
          <strong>₹${item.amount}</strong>
        </p>

        <small>${item.date}</small>

        <br>

        <button
          class="delete-btn"
          onclick="deleteLedger(${item.id})">
          Delete
        </button>

      </div>

    `;

  });
}


/* DELETE LEDGER */

function deleteLedger(id) {

  ledgers =
    ledgers.filter(item => item.id !== id);

  localStorage.setItem(
    "ledgers",
    JSON.stringify(ledgers)
  );

  renderLedger();
}


/* =========================
   STOCK
========================= */

function addStock() {

  const name =
    document.getElementById("productName")
      .value.trim();

  const qty =
    Number(
      document.getElementById("productQty").value
    );

  const price =
    Number(
      document.getElementById("productPrice").value
    );


  if (!name || qty < 0 || price < 0) {

    toast("योग्य माहिती भरा");

    return;
  }


  stocks.push({

    id: Date.now(),

    name: name,

    qty: qty,

    price: price

  });


  localStorage.setItem(
    "stocks",
    JSON.stringify(stocks)
  );


  document.getElementById("productName").value = "";

  document.getElementById("productQty").value = "";

  document.getElementById("productPrice").value = "";


  renderStock();

  toast("Stock Add झाला ✅");
}


/* RENDER STOCK */

function renderStock() {

  const list =
    document.getElementById("stockList");

  list.innerHTML = "";


  if (stocks.length === 0) {

    list.innerHTML =
      "<p>अजून Stock नाही.</p>";

    return;
  }


  stocks.forEach(item => {

    let alert = "";

    if (item.qty <= 5) {

      alert =
        `<p>⚠️ Low Stock Alert</p>`;

    }


    list.innerHTML += `

      <div class="list-card">

        <b>📦 ${item.name}</b>

        <p>
          Quantity:
          <strong>${item.qty}</strong>
        </p>

        <p>
          Price:
          ₹${item.price}
        </p>

        ${alert}

        <button
          class="delete-btn"
          onclick="deleteStock(${item.id})">
          Delete
        </button>

      </div>

    `;

  });
}


/* DELETE STOCK */

function deleteStock(id) {

  stocks =
    stocks.filter(item => item.id !== id);

  localStorage.setItem(
    "stocks",
    JSON.stringify(stocks)
  );

  renderStock();
}


/* =========================
   EXPENSE
========================= */

function addExpense() {

  const name =
    document.getElementById("expenseName")
      .value.trim();

  const amount =
    Number(
      document.getElementById("expenseAmount").value
    );


  if (!name || amount <= 0) {

    toast("योग्य माहिती भरा");

    return;
  }


  expenses.push({

    id: Date.now(),

    name: name,

    amount: amount,

    date: new Date().toLocaleDateString("en-IN")

  });


  localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
  );


  document.getElementById("expenseName").value = "";

  document.getElementById("expenseAmount").value = "";


  renderExpenses();

  updateDashboard();

  toast("खर्च Add झाला ✅");
}


/* RENDER EXPENSE */

function renderExpenses() {

  const list =
    document.getElementById("expenseList");

  list.innerHTML = "";


  if (expenses.length === 0) {

    list.innerHTML =
      "<p>अजून खर्च नाही.</p>";

    return;
  }


  expenses.forEach(item => {

    list.innerHTML += `

      <div class="list-card">

        <b>💸 ${item.name}</b>

        <p>
          ₹${item.amount}
        </p>

        <small>${item.date}</small>

        <br>

        <button
          class="delete-btn"
          onclick="deleteExpense(${item.id})">
          Delete
        </button>

      </div>

    `;

  });
}


/* DELETE EXPENSE */

function deleteExpense(id) {

  expenses =
    expenses.filter(item => item.id !== id);

  localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
  );

  renderExpenses();

  updateDashboard();
}


/* =========================
   DASHBOARD
========================= */

function updateDashboard() {

  let totalSales = 0;

  let todaySales = 0;

  let totalExpenses = 0;


  bills.forEach(bill => {

    totalSales += bill.total;


    const today =
      new Date().toLocaleDateString("en-IN");


    if (bill.date.includes(
      new Date().toLocaleDateString("en-IN")
    )) {

      todaySales += bill.total;

    }

  });


  expenses.forEach(expense => {

    totalExpenses += expense.amount;

  });


  const profit =
    totalSales - totalExpenses;


  document.getElementById(
    "todaySales"
  ).innerText =
    "₹" + todaySales.toFixed(2);


  document.getElementById(
    "totalSales"
  ).innerText =
    "₹" + totalSales.toFixed(2);


  document.getElementById(
    "totalExpenses"
  ).innerText =
    "₹" + totalExpenses.toFixed(2);


  document.getElementById(
    "profit"
  ).innerText =
    "₹" + profit.toFixed(2);
}


/* =========================
   START APP
========================= */

renderLedger();

renderStock();

renderExpenses();

updateDashboard();

calculateBill();
