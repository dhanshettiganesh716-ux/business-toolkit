/* =========================
   BUSINESS TOOLKIT
========================= */

let bills =
  JSON.parse(localStorage.getItem("bills")) || [];

let stocks =
  JSON.parse(localStorage.getItem("stocks")) || [];

let expenses =
  JSON.parse(localStorage.getItem("expenses")) || [];

let udhars =
  JSON.parse(localStorage.getItem("udhars")) || [];

let nextBill =
  Number(localStorage.getItem("nextBill")) || 1;


/* =========================
   PAGE NAVIGATION
========================= */

function openPage(page) {

  document.querySelectorAll(".page").forEach(p => {
    p.classList.add("hidden");
  });

  document.getElementById(page).classList.remove("hidden");

  refreshAll();
}


/* =========================
   INVOICE ITEMS
========================= */

function addItem(
  name = "",
  qty = 1,
  rate = 0
) {

  const container =
    document.getElementById("itemContainer");

  const row =
    document.createElement("div");

  row.className = "item-row";

  row.innerHTML = `

    <input
      class="item-name"
      placeholder="Item"
      value="${name}">

    <input
      class="item-qty"
      type="number"
      min="1"
      value="${qty}">

    <input
      class="item-rate"
      type="number"
      min="0"
      value="${rate}">

    <span class="item-amount">
      ₹0
    </span>

    <button
      class="delete-item"
      type="button">
      🗑️
    </button>

  `;

  container.appendChild(row);


  row.querySelector(".delete-item")
    .addEventListener("click", function() {

      row.remove();

      calculateInvoice();

    });


  row.querySelectorAll("input")
    .forEach(input => {

      input.addEventListener(
        "input",
        calculateInvoice
      );

    });


  calculateInvoice();
}


/* =========================
   CALCULATE INVOICE
========================= */

function calculateInvoice() {

  const rows =
    document.querySelectorAll(".item-row");

  let subtotal = 0;


  rows.forEach(row => {

    const qty =
      Number(
        row.querySelector(".item-qty").value
      ) || 0;

    const rate =
      Number(
        row.querySelector(".item-rate").value
      ) || 0;

    const amount = qty * rate;

    row.querySelector(".item-amount")
      .innerText =
      "₹" + amount.toFixed(2);

    subtotal += amount;

  });


  const gst = 0;

  const total = subtotal + gst;


  document.getElementById("formSubtotal")
    .innerText =
    "₹" + subtotal.toFixed(2);

  document.getElementById("formGST")
    .innerText =
    "₹" + gst.toFixed(2);

  document.getElementById("formTotal")
    .innerText =
    "₹" + total.toFixed(2);
}


/* =========================
   CREATE INVOICE
========================= */

function createInvoice() {

  const shopName =
    document.getElementById("shopName").value.trim();

  const shopAddress =
    document.getElementById("shopAddress").value.trim();

  const shopMobile =
    document.getElementById("shopMobile").value.trim();

  const customerName =
    document.getElementById("customerName").value.trim();

  const customerMobile =
    document.getElementById("customerMobile").value.trim();

  const payment =
    document.getElementById("paymentMethod").value;


  if (!shopName) {

    alert("Shop Name टाका.");

    return;
  }


  const rows =
    document.querySelectorAll(".item-row");

  const items = [];

  let subtotal = 0;


  rows.forEach(row => {

    const name =
      row.querySelector(".item-name").value.trim();

    const qty =
      Number(
        row.querySelector(".item-qty").value
      ) || 0;

    const rate =
      Number(
        row.querySelector(".item-rate").value
      ) || 0;


    if (name && qty > 0) {

      const amount = qty * rate;

      items.push({
        name,
        qty,
        rate,
        amount
      });

      subtotal += amount;

    }

  });


  if (items.length === 0) {

    alert("किमान एक वस्तू Add करा.");

    return;
  }


  const billNo =
    String(nextBill).padStart(5, "0");

  const date =
    new Date().toLocaleDateString("en-IN");


  const bill = {

    billNo,
    date,

    shopName,
    shopAddress,
    shopMobile,

    customerName,
    customerMobile,

    items,

    subtotal,
    gst: 0,

    total: subtotal,

    payment

  };


  bills.push(bill);

  localStorage.setItem(
    "bills",
    JSON.stringify(bills)
  );


  nextBill++;

  localStorage.setItem(
    "nextBill",
    nextBill
  );


  showReceipt(bill);

  refreshAll();

  alert(
    "Invoice तयार झाले. Bill No: " +
    billNo
  );
}


/* =========================
   SHOW RECEIPT
========================= */

function showReceipt(bill) {

  document.getElementById("rShopName")
    .innerText = bill.shopName;

  document.getElementById("rShopAddress")
    .innerText = bill.shopAddress;

  document.getElementById("rShopMobile")
    .innerText = bill.shopMobile;


  document.getElementById("rBillNo")
    .innerText = bill.billNo;

  document.getElementById("rDate")
    .innerText = bill.date;

  document.getElementById("rCustomer")
    .innerText = bill.customerName || "--";

  document.getElementById("rCustomerMobile")
    .innerText =
    bill.customerMobile || "--";


  const receiptItems =
    document.getElementById("receiptItems");

  receiptItems.innerHTML = "";


  bill.items.forEach(item => {

    const row =
      document.createElement("div");

    row.className = "receipt-item";

    row.innerHTML = `

      <span>${escapeHTML(item.name)}</span>

      <span>${item.qty}</span>

      <span>₹${item.rate.toFixed(2)}</span>

      <span>₹${item.amount.toFixed(2)}</span>

    `;

    receiptItems.appendChild(row);

  });


  document.getElementById("rSubtotal")
    .innerText =
    "₹" + bill.subtotal.toFixed(2);

  document.getElementById("rGST")
    .innerText =
    "₹" + bill.gst.toFixed(2);

  document.getElementById("rTotal")
    .innerText =
    "₹" + bill.total.toFixed(2);

  document.getElementById("rPayment")
    .innerText =
    bill.payment;
}


/* =========================
   NEW BILL
========================= */

function newBill() {

  document.getElementById("customerName").value = "";

  document.getElementById("customerMobile").value = "";

  document.getElementById("itemContainer").innerHTML = "";

  addItem();

  calculateInvoice();
}


/* =========================
   PRINT
========================= */

function printReceipt() {

  window.print();

}


/* =========================
   WHATSAPP
========================= */

function shareWhatsApp() {

  if (bills.length === 0) {

    alert("आधी Invoice तयार करा.");

    return;
  }


  const bill =
    bills[bills.length - 1];


  let text =
    `🧾 ${bill.shopName}\n\n`;

  text +=
    `Bill No: ${bill.billNo}\n`;

  text +=
    `Date: ${bill.date}\n`;

  text +=
    `Customer: ${bill.customerName || "--"}\n\n`;


  bill.items.forEach(item => {

    text +=
      `${item.name} × ${item.qty} = ₹${item.amount}\n`;

  });


  text +=
    `\nTOTAL: ₹${bill.total}`;

  text +=
    `\nPayment: ${bill.payment}`;

  text +=
    `\n\nThank You! Visit Again`;


  window.open(
    "https://wa.me/?text=" +
    encodeURIComponent(text),
    "_blank"
  );
}


/* =========================
   CALCULATOR
========================= */

function calcInput(value) {

  const display =
    document.getElementById("calcDisplay");

  display.value += value;
}


function calcClear() {

  document.getElementById("calcDisplay")
    .value = "";

}


function calcResult() {

  const display =
    document.getElementById("calcDisplay");

  try {

    display.value =
      Function(
        "return " + display.value
      )();

  } catch {

    display.value = "Error";

  }
}


/* =========================
   GST
========================= */

function calculateGST() {

  const amount =
    Number(
      document.getElementById("gstAmount").value
    ) || 0;

  const rate =
    Number(
      document.getElementById("gstRate").value
    ) || 0;


  const gst =
    amount * rate / 100;

  const total =
    amount + gst;


  document.getElementById("gstResult")
    .innerHTML = `

      <div class="list-card">

        Amount: ₹${amount.toFixed(2)}<br><br>

        GST (${rate}%):
        ₹${gst.toFixed(2)}<br><br>

        <b>Total: ₹${total.toFixed(2)}</b>

      </div>

    `;
}


/* =========================
   EXPENSES
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

    alert("Expense माहिती भरा.");

    return;
  }


  expenses.push({

    id: Date.now(),

    name,
    amount,

    date:
      new Date().toLocaleDateString("en-IN")

  });


  localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
  );


  document.getElementById("expenseName")
    .value = "";

  document.getElementById("expenseAmount")
    .value = "";


  refreshAll();

  alert("Expense Add झाला.");
}


/* =========================
   STOCK
========================= */

function addStock() {

  const name =
    document.getElementById("stockName")
      .value.trim();

  const qty =
    Number(
      document.getElementById("stockQty").value
    );

  const price =
    Number(
      document.getElementById("stockPrice").value
    );


  if (!name || qty < 0 || price < 0) {

    alert("Stock माहिती भरा.");

    return;
  }


  stocks.push({

    id: Date.now(),

    name,
    qty,
    price

  });


  localStorage.setItem(
    "stocks",
    JSON.stringify(stocks)
  );


  document.getElementById("stockName").value = "";

  document.getElementById("stockQty").value = "";

  document.getElementById("stockPrice").value = "";


  renderStocks();

  alert("Stock Add झाला.");
}


function renderStocks() {

  const list =
    document.getElementById("stockList");

  list.innerHTML = "";


  stocks.forEach(stock => {

    const div =
      document.createElement("div");

    div.className = "list-card";

    div.innerHTML = `

      <b>📦 ${escapeHTML(stock.name)}</b>

      <p>
        Quantity:
        <b>${stock.qty}</b>
      </p>

      <p>
        Price:
        ₹${stock.price}
      </p>

      ${
        stock.qty <= 5
        ? `<span class="low-stock">
             ⚠️ Low Stock
           </span>`
        : ""
      }

    `;

    list.appendChild(div);

  });

}


/* =========================
   UDHAR
========================= */

function addUdhar() {

  const name =
    document.getElementById("udharName")
      .value.trim();

  const amount =
    Number(
      document.getElementById("udharAmount").value
    );


  if (!name || amount <= 0) {

    alert("Udhar माहिती भरा.");

    return;
  }


  udhars.push({

    id: Date.now(),

    name,
    amount,

    date:
      new Date().toLocaleDateString("en-IN")

  });


  localStorage.setItem(
    "udhars",
    JSON.stringify(udhars)
  );


  document.getElementById("udharName").value = "";

  document.getElementById("udharAmount").value = "";


  renderUdhar();

  alert("Udhar नोंदवले.");
}


function renderUdhar() {

  const list =
    document.getElementById("udharList");

  list.innerHTML = "";


  udhars.forEach(item => {

    const div =
      document.createElement("div");

    div.className = "list-card";

    div.innerHTML = `

      <b>👤 ${escapeHTML(item.name)}</b>

      <p>
        Udhar:
        <strong>₹${item.amount}</strong>
      </p>

      <small>${item.date}</small>

    `;

    list.appendChild(div);

  });

}


/* =========================
   SALES
========================= */

function renderSales() {

  const list =
    document.getElementById("salesList");

  list.innerHTML = "";


  if (bills.length === 0) {

    list.innerHTML =
      "<p>अजून Sales नाही.</p>";

    return;
  }


  bills.slice().reverse().forEach(bill => {

    const div =
      document.createElement("div");

    div.className = "list-card";

    div.innerHTML = `

      <b>Bill #${bill.billNo}</b>

      <p>
        Customer:
        ${escapeHTML(bill.customerName || "--")}
      </p>

      <p>
        Total:
        <strong>₹${bill.total.toFixed(2)}</strong>
      </p>

      <small>${bill.date}</small>

    `;

    list.appendChild(div);

  });

}


/* =========================
   DASHBOARD
========================= */

function refreshDashboard() {

  let totalSales = 0;

  let totalExpenses = 0;


  bills.forEach(bill => {

    totalSales += bill.total;

  });


  expenses.forEach(expense => {

    totalExpenses += expense.amount;

  });


  const profit =
    totalSales - totalExpenses;


  document.getElementById("dashSales")
    .innerText =
    "₹" + totalSales.toFixed(2);

  document.getElementById("dashExpenses")
    .innerText =
    "₹" + totalExpenses.toFixed(2);

  document.getElementById("dashProfit")
    .innerText =
    "₹" + profit.toFixed(2);


  document.getElementById("profitSales")
    .innerText =
    "₹" + totalSales.toFixed(2);

  document.getElementById("profitExpenses")
    .innerText =
    "₹" + totalExpenses.toFixed(2);

  document.getElementById("profitAmount")
    .innerText =
    "₹" + profit.toFixed(2);


  let today = 0;

  const currentDate =
    new Date().toLocaleDateString("en-IN");


  bills.forEach(bill => {

    if (bill.date === currentDate) {

      today += bill.total;

    }

  });


  document.getElementById("dashToday")
    .innerText =
    "₹" + today.toFixed(2);
}


/* =========================
   REFRESH
========================= */

function refreshAll() {

  refreshDashboard();

  renderStocks();

  renderUdhar();

  renderSales();

}


/* =========================
   SECURITY
========================= */

function escapeHTML(text) {

  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* =========================
   START
========================= */

addItem();

refreshAll();
