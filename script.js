// -------------------------
// DATE
// -------------------------

function setDate() {

  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  document.getElementById("date").textContent =
    `${day}/${month}/${year}`;
}

setDate();


// -------------------------
// CALCULATE ITEMS
// -------------------------

function calculate() {

  let subtotal = 0;

  const rows = document.querySelectorAll(".item-row");

  rows.forEach(row => {

    const qty =
      Number(row.querySelector(".item-qty").value) || 0;

    const rate =
      Number(row.querySelector(".item-rate").value) || 0;

    const amount = qty * rate;

    row.querySelector(".item-amount").value =
      amount.toFixed(0);

    subtotal += amount;
  });

  const gstRate = 0;
  const gst = subtotal * gstRate / 100;

  const total = subtotal + gst;

  document.getElementById("subtotal").textContent =
    "₹" + subtotal.toFixed(0);

  document.getElementById("gst").textContent =
    "₹" + gst.toFixed(0);

  document.getElementById("total").textContent =
    "₹" + total.toFixed(0);

  updateReceipt(subtotal, gst, total);
}


// -------------------------
// UPDATE RECEIPT
// -------------------------

function updateReceipt(subtotal, gst, total) {

  document.getElementById("rShopName").textContent =
    document.getElementById("shopName").value;

  document.getElementById("rAddress").textContent =
    document.getElementById("shopAddress").value;

  document.getElementById("rShopMobile").textContent =
    document.getElementById("shopMobile").value;

  document.getElementById("rCustomer").textContent =
    document.getElementById("customerName").value;

  document.getElementById("rCustomerMobile").textContent =
    document.getElementById("customerMobile").value;

  document.getElementById("rSubtotal").textContent =
    "₹" + subtotal.toFixed(0);

  document.getElementById("rGst").textContent =
    "₹" + gst.toFixed(0);

  document.getElementById("rTotal").textContent =
    "₹" + total.toFixed(0);

  document.getElementById("rPayment").textContent =
    document.getElementById("payment").value;


  const receiptItems =
    document.getElementById("receiptItems");

  receiptItems.innerHTML = "";

  document.querySelectorAll(".item-row").forEach(row => {

    const name =
      row.querySelector(".item-name").value;

    const qty =
      row.querySelector(".item-qty").value;

    const rate =
      row.querySelector(".item-rate").value;

    const amount =
      row.querySelector(".item-amount").value;

    if (name.trim() !== "") {

      const div = document.createElement("div");

      div.className = "receipt-item";

      div.innerHTML = `
        <span>${name}</span>
        <span>${qty}</span>
        <span>${rate}</span>
        <span>${amount}</span>
      `;

      receiptItems.appendChild(div);
    }
  });
}


// -------------------------
// INPUT AUTO CALCULATION
// -------------------------

document.addEventListener("input", function(e) {

  if (
    e.target.classList.contains("item-qty") ||
    e.target.classList.contains("item-rate") ||
    e.target.classList.contains("item-name") ||
    e.target.id === "shopName" ||
    e.target.id === "shopAddress" ||
    e.target.id === "shopMobile" ||
    e.target.id === "customerName" ||
    e.target.id === "customerMobile"
  ) {
    calculate();
  }

});


// PAYMENT CHANGE

document.getElementById("payment").addEventListener("change", calculate);


// -------------------------
// ADD ITEM
// -------------------------

function addItem() {

  const items = document.getElementById("items");

  const row = document.createElement("div");

  row.className = "item-row";

  row.innerHTML = `
    <input class="item-name" placeholder="Item">

    <input
      class="item-qty"
      type="number"
      value="1"
      placeholder="Qty">

    <input
      class="item-rate"
      type="number"
      value="0"
      placeholder="Rate">

    <input
      class="item-amount"
      value="0"
      readonly>

    <button
      class="delete"
      onclick="deleteItem(this)">
      🗑
    </button>
  `;

  items.appendChild(row);

  calculate();
}


// -------------------------
// DELETE ITEM
// -------------------------

function deleteItem(button) {

  button.parentElement.remove();

  calculate();
}


// -------------------------
// NEW BILL
// -------------------------

function newBill() {

  let current =
    Number(document.getElementById("billNo").textContent);

  current++;

  document.getElementById("billNo").textContent =
    String(current).padStart(5, "0");

  document.getElementById("customerName").value = "";

  document.getElementById("customerMobile").value = "";

  document.querySelectorAll(".item-row").forEach(row => {
    row.remove();
  });

  addItem();

  calculate();
}


// -------------------------
// RESET
// -------------------------

function resetBill() {

  document.getElementById("shopName").value =
    "      ";

  document.getElementById("shopAddress").value =
    "      ";

  document.getElementById("shopMobile").value =
    "        ";

  document.getElementById("customerName").value =
    "       ";

  document.getElementById("customerMobile").value =
    "        ";

  document.getElementById("payment").value =
    "     ";

  document.getElementById("items").innerHTML = `

    <div class="item-row">
      <input class="item-name" value="Sugar">
      <input class="item-qty" type="number" value="  ">
      <input class="item-rate" type="number" value="  ">
      <input class="item-amount" value="   " readonly>
      <button class="delete" onclick="deleteItem(this)">🗑</button>
    </div>

    <div class="item-row">
      <input class="item-name" value="Rice">
      <input class="item-qty" type="number" value="">
      <input class="item-rate" type="number" value="">
      <input class="item-amount" value="" readonly>
      <button class="delete" onclick="deleteItem(this)">🗑</button>
    </div>

    <div class="item-row">
      <input class="item-name" value="">
      <input class="item-qty" type="number" value="">
      <input class="item-rate" type="number" value="">
      <input class="item-amount" value="" readonly>
      <button class="delete" onclick="deleteItem(this)">🗑</button>
    </div>
  `;

  calculate();
}


// -------------------------
// CREATE INVOICE
// -------------------------

function createInvoice() {

  calculate();

  alert("Invoice created successfully! ✅");
}


// -------------------------
// PRINT
// -------------------------

.
function printBill() {

  calculate();

  const receipt = document.getElementById("receipt");

  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("Print window open होत नाही. Browser मध्ये pop-up allow करा.");
    return;
  }

  printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Invoice</title>

<style>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 20px;
  background: white;
  font-family: Arial, sans-serif;
}

.receipt {
  width: 100%;
  max-width: 390px;
  margin: auto;
  background: white;
  padding: 25px 20px;
}

.receipt-shop {
  text-align: center;
}

.shop-icon {
  font-size: 32px;
}

.receipt-shop h1 {
  font-size: 19px;
  margin: 7px 0;
}

.receipt-shop p {
  font-size: 12px;
  margin: 3px 0;
}

.receipt hr {
  border: none;
  border-top: 1px dashed #777;
  margin: 14px 0;
}

.bill-info {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  margin: 9px 0;
}

.receipt-head,
.receipt-item {
  display: grid;
  grid-template-columns: 1.6fr .55fr .7fr .8fr;
  gap: 5px;
  font-size: 11px;
  text-align: right;
}

.receipt-head b:first-child,
.receipt-item span:first-child {
  text-align: left;
}

.receipt-item {
  margin: 9px 0;
}

.receipt-total div {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  font-size: 12px;
  margin: 7px 0;
}

.receipt-total .grand {
  font-size: 16px;
  border-top: 2px solid #222;
  border-bottom: 2px solid #222;
  padding: 9px 0;
  margin-top: 10px;
}

.payment {
  text-align: center;
  font-size: 12px;
}

.thank {
  text-align: center;
  margin-top: 35px;
}

.thank strong {
  font-family: cursive;
  font-size: 25px;
}

.thank p {
  margin-top: 5px;
  font-size: 12px;
}

@media print {

  body {
    padding: 0;
  }

  .receipt {
    width: 100%;
    max-width: 390px;
    margin: auto;
  }

}

</style>

</head>

<body>

${receipt.outerHTML}

<script>

window.onload = function() {
  window.print();
};

window.onafterprint = function() {
  window.close();
};

<\/script>

</body>
</html>
  `);

  printWindow.document.close();
}
