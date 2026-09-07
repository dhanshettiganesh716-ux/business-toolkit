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
    "GANESH GENERAL STORES";

  document.getElementById("shopAddress").value =
    "Murum, Dharashiv";

  document.getElementById("shopMobile").value =
    "9876543210";

  document.getElementById("customerName").value =
    "Rahul";

  document.getElementById("customerMobile").value =
    "9876543210";

  document.getElementById("payment").value =
    "Cash";

  document.getElementById("items").innerHTML = `

    <div class="item-row">
      <input class="item-name" value="Sugar">
      <input class="item-qty" type="number" value="2">
      <input class="item-rate" type="number" value="50">
      <input class="item-amount" value="100" readonly>
      <button class="delete" onclick="deleteItem(this)">🗑</button>
    </div>

    <div class="item-row">
      <input class="item-name" value="Rice">
      <input class="item-qty" type="number" value="5">
      <input class="item-rate" type="number" value="60">
      <input class="item-amount" value="300" readonly>
      <button class="delete" onclick="deleteItem(this)">🗑</button>
    </div>

    <div class="item-row">
      <input class="item-name" value="Soap">
      <input class="item-qty" type="number" value="2">
      <input class="item-rate" type="number" value="35">
      <input class="item-amount" value="70" readonly>
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

function printBill() {

  calculate();

  window.print();
}


// -------------------------
// DOWNLOAD
// -------------------------

function downloadBill() {

  const receipt =
    document.getElementById("receipt");

  const content = receipt.outerHTML;

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Invoice</title>

<style>

body {
  font-family: Arial;
  background: white;
  padding: 20px;
}

.receipt {
  width: 380px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
}

.receipt-shop {
  text-align: center;
}

.bill-info {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 12px;
}

.receipt-head,
.receipt-item {
  display: grid;
  grid-template-columns:
  1.6fr .55fr .7fr .8fr;
  gap: 5px;
  font-size: 11px;
}

.receipt-item {
  margin: 8px 0;
}

hr {
  border: none;
  border-top: 1px dashed #777;
  margin: 14px 0;
}

.receipt-total div {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin: 8px;
}

.grand {
  font-size: 16px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  padding: 10px;
}

.payment,
.thank {
  text-align: center;
}

.thank {
  margin-top: 30px;
}

</style>

</head>

<body>

${content}

</body>
</html>
`;

  const blob =
    new Blob([html], {
      type: "text/html"
    });

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;

  a.download = "Invoice.html";

  a.click();

  URL.revokeObjectURL(url);
}


// -------------------------
// WHATSAPP
// -------------------------

function shareWhatsApp() {

  calculate();

  const shop =
    document.getElementById("shopName").value;

  const customer =
    document.getElementById("customerName").value;

  const total =
    document.getElementById("total").textContent;

  const bill =
    document.getElementById("billNo").textContent;

  const message =
`🧾 ${shop}

Bill No: ${bill}
Customer: ${customer}

Total: ${total}

Thank You!
Visit Again 🙏`;

  const url =
    "https://wa.me/?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");
}


// -------------------------
// NAVIGATION
// -------------------------

function showSection(sectionName) {

  document.querySelectorAll(".section")
    .forEach(section => {
      section.classList.remove("active-section");
      section.style.display = "none";
    });

  const selected =
    document.getElementById(sectionName);

  selected.style.display = "block";
  selected.classList.add("active-section");


  document.querySelectorAll("nav button")
    .forEach(button => {
      button.classList.remove("active");
    });

}


// -------------------------
// INITIAL
// -------------------------

calculate();
