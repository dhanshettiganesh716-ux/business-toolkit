/* ================= NAVIGATION ================= */

function showPage(pageId) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active-page");
  });

  document.getElementById(pageId)
    .classList.add("active-page");

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  event.currentTarget.classList.add("active");
}



/* ================= INVOICE ================= */

function generateInvoice() {

  const customer =
    document.getElementById("invoiceCustomer").value;

  const mobile =
    document.getElementById("invoiceMobile").value;

  const product =
    document.getElementById("invoiceProduct").value;

  const quantity =
    Number(document.getElementById("invoiceQuantity").value) || 0;

  const price =
    Number(document.getElementById("invoicePrice").value) || 0;

  const gstRate =
    Number(document.getElementById("invoiceGST").value) || 0;

  if (!customer || !product || quantity <= 0 || price <= 0) {
    alert("Please fill all invoice details");
    return;
  }

  const sales = quantity * price;

  const gst = sales * gstRate / 100;

  const total = sales + gst;

  document.getElementById("invoiceTotal").value =
    "₹" + total.toFixed(2);


  document.getElementById("invoiceOutput").innerHTML = `

    <div class="invoice-paper">

      <h1>Business Invoice</h1>

      <p>
        <strong>Name Customer:</strong>
        ${customer}
      </p>

      <p>
        <strong>Mobile No.:</strong>
        ${mobile || "Infinity"}
      </p>

      <table class="invoice-table">

        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>

        <tr>
          <td>${product}</td>
          <td>${quantity}</td>
          <td>₹${price.toFixed(2)}</td>
          <td>₹${sales.toFixed(2)}</td>
        </tr>

      </table>

      <div class="invoice-total-box">

        <div>
          <span>Sales</span>
          <strong>₹${sales.toFixed(2)}</strong>
        </div>

        <div>
          <span>GST (${gstRate}%)</span>
          <strong>₹${gst.toFixed(2)}</strong>
        </div>

        <div class="grand-total">
          <span>Total</span>
          <strong>₹${total.toFixed(2)}</strong>
        </div>

      </div>

      <div class="thank-you">
        Thank you for your business!
      </div>

    </div>

    <button
      class="print-btn"
      onclick="printSection('invoice')">
      🖨️ Print / Save PDF
    </button>

  `;
}



/* ================= SALES ================= */

function calculateSales() {

  const quantity =
    Number(document.getElementById("salesQuantity").value) || 0;

  const price =
    Number(document.getElementById("salesPrice").value) || 0;

  const total = quantity * price;

  document.getElementById("salesTotal").value =
    "₹" + total.toFixed(2);
}



/* ================= CUSTOMERS ================= */

function saveCustomer() {

  const name =
    document.getElementById("customerName").value;

  const mobile =
    document.getElementById("customerMobile").value;

  const credit =
    Number(document.getElementById("customerCredit").value) || 0;

  if (!name) {
    alert("Enter customer name");
    return;
  }

  document.getElementById("customerList").innerHTML += `

    <div class="list-card">

      <h3>${name}</h3>

      <p>Mobile: ${mobile || "Infinity"}</p>

      <p>
        Credit / Khata:
        ₹${credit.toFixed(2)}
      </p>

    </div>

  `;
}



/* ================= PROFIT ================= */

function calculateProfit() {

  const sales =
    Number(document.getElementById("profitSales").value) || 0;

  const expenses =
    Number(document.getElementById("profitExpenses").value) || 0;

  const profit = sales - expenses;

  document.getElementById("profitResult").value =
    "₹" + profit.toFixed(2);
}



/* ================= GST ================= */

function calculateGST() {

  const amount =
    Number(document.getElementById("gstAmount").value) || 0;

  const rate =
    Number(document.getElementById("gstRate").value) || 0;

  const gst = amount * rate / 100;

  const finalAmount = amount + gst;

  document.getElementById("gstResult").value =
    "₹" + gst.toFixed(2);

  document.getElementById("gstFinal").value =
    "₹" + finalAmount.toFixed(2);
}



/* ================= STOCK ================= */

function saveStock() {

  const product =
    document.getElementById("stockProduct").value;

  const quantity =
    Number(document.getElementById("stockQuantity").value) || 0;

  const purchase =
    Number(document.getElementById("purchasePrice").value) || 0;

  const selling =
    Number(document.getElementById("sellingPrice").value) || 0;

  if (!product) {
    alert("Enter product name");
    return;
  }

  document.getElementById("stockList").innerHTML += `

    <div class="list-card">

      <h3>${product}</h3>

      <p>Quantity: ${quantity}</p>

      <p>Purchase Price: ₹${purchase.toFixed(2)}</p>

      <p>Selling Price: ₹${selling.toFixed(2)}</p>

    </div>

  `;
}



/* ================= EXPENSES ================= */

function saveExpense() {

  const name =
    document.getElementById("expenseName").value;

  const amount =
    Number(document.getElementById("expenseAmount").value) || 0;

  const date =
    document.getElementById("expenseDate").value;

  if (!name) {
    alert("Enter expense name");
    return;
  }

  document.getElementById("expenseList").innerHTML += `

    <div class="list-card">

      <h3>${name}</h3>

      <p>Amount: ₹${amount.toFixed(2)}</p>

      <p>Date: ${date || "Infinity"}</p>

    </div>

  `;
}



/* ================= PRINT / PDF ================= */

function printSection(sectionId) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active-page");
  });

  document.getElementById(sectionId)
    .classList.add("active-page");

  window.print();

}
