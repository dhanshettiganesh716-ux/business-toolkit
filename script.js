let totalSales = 0;
let totalExpenses = 0;
let totalStock = 0;

let salesRecords = [];
let expenseRecords = [];
let stockRecords = [];
let customerRecords = [];


// PAGE SWITCH
function showPage(pageId, button){

  document.querySelectorAll(".page").forEach(page=>{
    page.classList.remove("active");
  });

  const page = document.getElementById(pageId);

  if(page){
    page.classList.add("active");
  }

  if(button){

    document.querySelectorAll(".menu-item").forEach(item=>{
      item.classList.remove("active");
    });

    button.classList.add("active");
  }

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
}


// FEEDBACK
function openFeedback(){

  window.open(
    "https://docs.google.com/forms/d/e/1FAIpQLSewOR2YdFto41kc7jZVnTLcCg5jWigSHig-rJOAgDoaL1lgCQ/viewform?usp=dialog",
    "_blank"
  );

}


// CREATE INVOICE
function createInvoice(){

  const customer =
    document.getElementById("customerName").value.trim();

  const mobile =
    document.getElementById("customerMobile").value.trim();

  const product =
    document.getElementById("productName").value.trim();

  const quantity =
    Number(document.getElementById("quantity").value);

  const price =
    Number(document.getElementById("price").value);

  if(!customer || !mobile || !product || quantity <= 0 || price < 0){

    alert("Please fill all invoice details correctly.");

    return;
  }

  const total = quantity * price;

  totalSales += total;

  salesRecords.push({
    customer,
    mobile,
    product,
    quantity,
    price,
    total
  });

  updateDashboard();
  displaySales();

  document.getElementById("invoiceResult").innerHTML = `

    <div class="invoice" id="currentInvoice">

      <h2>Business Invoice</h2>

      <div class="invoice-row">
        <span>Customer</span>
        <strong>${customer}</strong>
      </div>

      <div class="invoice-row">
        <span>Mobile</span>
        <strong>${mobile}</strong>
      </div>

      <div class="invoice-row">
        <span>Product</span>
        <strong>${product}</strong>
      </div>

      <div class="invoice-row">
        <span>Quantity</span>
        <strong>${quantity}</strong>
      </div>

      <div class="invoice-row">
        <span>Price</span>
        <strong>₹${price.toFixed(2)}</strong>
      </div>

      <div class="invoice-total">
        <span>Total</span>
        <span>₹${total.toFixed(2)}</span>
      </div>

      <p style="margin-top:25px;text-align:center;">
        Thank you for your business!
      </p>

      <button class="print-btn" onclick="printInvoice()">
        🖨️ Print / Save PDF
      </button>

    </div>
  `;

  document.getElementById("customerName").value = "";
  document.getElementById("customerMobile").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";
}


// SALES
function displaySales(){

  const list =
    document.getElementById("salesList");

  if(salesRecords.length === 0){

    list.innerHTML =
      `<p class="empty">No sales yet.</p>`;

    return;
  }

  list.innerHTML =
    salesRecords.map((sale,index)=>`

      <div class="history-item">

        <strong>${index + 1}. ${sale.product}</strong>

        <p>Customer: ${sale.customer}</p>

        <p>Mobile: ${sale.mobile}</p>

        <p>Quantity: ${sale.quantity}</p>

        <p>Total: ₹${sale.total.toFixed(2)}</p>

      </div>

    `).join("");
}


// ADD EXPENSE
function addExpense(){

  const name =
    document.getElementById("expenseName").value.trim();

  const amount =
    Number(document.getElementById("expenseAmount").value);

  if(!name || amount <= 0){

    alert("Enter valid expense details.");

    return;
  }

  totalExpenses += amount;

  expenseRecords.push({
    name,
    amount
  });

  updateDashboard();
  displayExpenses();

  document.getElementById("expenseResult").innerHTML = `

    <div class="result">
      Expense added successfully.
      <strong>₹${amount.toFixed(2)}</strong>
    </div>

  `;

  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
}


// DISPLAY EXPENSES
function displayExpenses(){

  const list =
    document.getElementById("expenseList");

  if(expenseRecords.length === 0){

    list.innerHTML =
      `<p class="empty">No expenses yet.</p>`;

    return;
  }

  list.innerHTML =
    expenseRecords.map((expense,index)=>`

      <div class="history-item">

        <strong>
          ${index + 1}. ${expense.name}
        </strong>

        <p>
          Amount: ₹${expense.amount.toFixed(2)}
        </p>

      </div>

    `).join("");
}


// ADD STOCK
function addStock(){

  const name =
    document.getElementById("stockName").value.trim();

  const qty =
    Number(document.getElementById("stockQty").value);

  if(!name || qty <= 0){

    alert("Enter valid stock details.");

    return;
  }

  totalStock += qty;

  stockRecords.push({
    name,
    qty
  });

  updateDashboard();
  displayStock();

  document.getElementById("stockResult").innerHTML = `

    <div class="result">
      Stock added successfully.
      <strong>${qty} units</strong>
    </div>

  `;

  document.getElementById("stockName").value = "";
  document.getElementById("stockQty").value = "";
}


// DISPLAY STOCK
function displayStock(){

  const list =
    document.getElementById("stockList");

  if(stockRecords.length === 0){

    list.innerHTML =
      `<p class="empty">No stock added.</p>`;

    return;
  }

  list.innerHTML =
    stockRecords.map((stock,index)=>`

      <div class="history-item">

        <strong>
          ${index + 1}. ${stock.name}
        </strong>

        <p>
          Quantity: ${stock.qty}
        </p>

      </div>

    `).join("");
}


// ADD CUSTOMER
function addCustomer(){

  const name =
    document.getElementById("customer").value.trim();

  const credit =
    Number(document.getElementById("credit").value);

  if(!name || credit < 0){

    alert("Enter valid customer details.");

    return;
  }

  customerRecords.push({
    name,
    credit
  });

  displayCustomers();

  document.getElementById("customerResult").innerHTML = `

    <div class="result">

      <strong>${name}</strong>

      <p>
        Credit / Khata: ₹${credit.toFixed(2)}
      </p>

    </div>

  `;

  document.getElementById("customer").value = "";
  document.getElementById("credit").value = "";
}


// DISPLAY CUSTOMERS
function displayCustomers(){

  let result =
    document.getElementById("customerResult");

  if(customerRecords.length === 0){
    return;
  }

  result.innerHTML = customerRecords.map((customer,index)=>`

    <div class="history-item">

      <strong>
        ${index + 1}. ${customer.name}
      </strong>

      <p>
        Credit / Khata: ₹${customer.credit.toFixed(2)}
      </p>

    </div>

  `).join("");
}


// PROFIT CALCULATOR
function calculateProfit(){

  const buy =
    Number(document.getElementById("buyPrice").value);

  const sell =
    Number(document.getElementById("sellPrice").value);

  const qty =
    Number(document.getElementById("profitQty").value);

  if(buy < 0 || sell < 0 || qty <= 0){

    alert("Enter valid values.");

    return;
  }

  const profit =
    (sell - buy) * qty;

  const message =
    profit >= 0
      ? `Profit: ₹${profit.toFixed(2)}`
      : `Loss: ₹${Math.abs(profit).toFixed(2)}`;

  document.getElementById("profitResult").innerHTML = `

    <div class="result">

      <h3>${message}</h3>

      <button class="print-btn" onclick="printProfit()">
        🖨️ Print / Save PDF
      </button>

    </div>

  `;
}


// GST CALCULATOR
function calculateGST(){

  const amount =
    Number(document.getElementById("gstAmount").value);

  const rate =
    Number(document.getElementById("gstRate").value);

  if(amount < 0 || rate < 0){

    alert("Enter valid GST details.");

    return;
  }

  const gst =
    amount * rate / 100;

  const total =
    amount + gst;

  document.getElementById("gstResult").innerHTML = `

    <div class="result">

      <p>Original Amount: ₹${amount.toFixed(2)}</p>

      <p>GST: ₹${gst.toFixed(2)}</p>

      <h3>Total: ₹${total.toFixed(2)}</h3>

      <button class="print-btn" onclick="printGST()">
        🖨️ Print / Save PDF
      </button>

    </div>

  `;
}


// DASHBOARD
function updateDashboard(){

  document.getElementById("dashboardSales").innerText =
    "₹" + totalSales.toFixed(2);

  document.getElementById("dashboardExpenses").innerText =
    "₹" + totalExpenses.toFixed(2);

  document.getElementById("dashboardProfit").innerText =
    "₹" + (totalSales - totalExpenses).toFixed(2);

  document.getElementById("dashboardStock").innerText =
    totalStock;
}


// ================================
// PRINT SYSTEM
// ================================

function openPrintWindow(title, content){

  const printWindow =
    window.open("", "_blank", "width=800,height=900");

  if(!printWindow){
    alert("Please allow pop-ups for printing.");
    return;
  }

  printWindow.document.write(`

    <!DOCTYPE html>

    <html>

    <head>

      <title>${title}</title>

      <style>

        body{
          font-family:Arial,sans-serif;
          background:#fff;
          padding:30px;
          color:#222;
        }

        .print-container{
          max-width:750px;
          margin:auto;
          border:1px solid #ddd;
          border-radius:15px;
          padding:30px;
        }

        h1{
          text-align:center;
          margin-bottom:30px;
        }

        h2{
          margin-bottom:20px;
        }

        .row{
          display:flex;
          justify-content:space-between;
          padding:12px 0;
          border-bottom:1px solid #eee;
        }

        .total{
          display:flex;
          justify-content:space-between;
          font-size:20px;
          font-weight:bold;
          margin-top:20px;
          padding-top:15px;
          border-top:2px solid #222;
        }

        .record{
          border:1px solid #ddd;
          border-radius:10px;
          padding:15px;
          margin:10px 0;
        }

        .record strong{
          font-size:17px;
        }

        @media print{

          body{
            padding:0;
          }

          .print-container{
            border:none;
          }

        }

      </style>

    </head>

    <body>

      <div class="print-container">

        <h1>${title}</h1>

        ${content}

      </div>

    </body>

    </html>

  `);

  printWindow.document.close();

  printWindow.focus();

  setTimeout(()=>{
    printWindow.print();
    printWindow.close();
  },300);
}


// PRINT INVOICE
function printInvoice(){

  const invoice =
    document.getElementById("currentInvoice");

  if(!invoice){

    alert("Please create an invoice first.");

    return;
  }

  openPrintWindow(
    "Business Invoice",
    invoice.innerHTML
  );
}


// PRINT SALES
function printSales(){

  if(salesRecords.length === 0){

    alert("No sales to print.");

    return;
  }

  const content = salesRecords.map((sale,index)=>`

    <div class="record">

      <strong>${index + 1}. ${sale.product}</strong>

      <p>Customer: ${sale.customer}</p>
      <p>Mobile: ${sale.mobile}</p>
      <p>Quantity: ${sale.quantity}</p>
      <p>Total: ₹${sale.total.toFixed(2)}</p>

    </div>

  `).join("");

  openPrintWindow(
    "Sales Report",
    content + `
      <div class="total">
        <span>Total Sales</span>
        <span>₹${totalSales.toFixed(2)}</span>
      </div>
    `
  );
}


// PRINT EXPENSES
function printExpenses(){

  if(expenseRecords.length === 0){

    alert("No expenses to print.");

    return;
  }

  const content = expenseRecords.map((expense,index)=>`

    <div class="record">

      <strong>${index + 1}. ${expense.name}</strong>

      <p>Amount: ₹${expense.amount.toFixed(2)}</p>

    </div>

  `).join("");

  openPrintWindow(
    "Expense Report",
    content + `
      <div class="total">
        <span>Total Expenses</span>
        <span>₹${totalExpenses.toFixed(2)}</span>
      </div>
    `
  );
}


// PRINT STOCK
function printStock(){

  if(stockRecords.length === 0){

    alert("No stock to print.");

    return;
  }

  const content = stockRecords.map((stock,index)=>`

    <div class="record">

      <strong>${index + 1}. ${stock.name}</strong>

      <p>Quantity: ${stock.qty}</p>

    </div>

  `).join("");

  openPrintWindow(
    "Stock Report",
    content + `
      <div class="total">
        <span>Total Stock</span>
        <span>${totalStock} units</span>
      </div>
    `
  );
}


// PRINT CUSTOMERS
function printCustomers(){

  if(customerRecords.length === 0){

    alert("No customers to print.");

    return;
  }

  const content = customerRecords.map((customer,index)=>`

    <div class="record">

      <strong>${index + 1}. ${customer.name}</strong>

      <p>
        Credit / Khata: ₹${customer.credit.toFixed(2)}
      </p>

    </div>

  `).join("");

  openPrintWindow(
    "Customer Report",
    content
  );
}


// PRINT PROFIT
function printProfit(){

  const buy =
    Number(document.getElementById("buyPrice").value);

  const sell =
    Number(document.getElementById("sellPrice").value);

  const qty =
    Number(document.getElementById("profitQty").value);

  if(buy < 0 || sell < 0 || qty <= 0){

    alert("Please calculate profit first.");

    return;
  }

  const profit =
    (sell - buy) * qty;

  const content = `

    <div class="row">
      <span>Buying Price</span>
      <strong>₹${buy.toFixed(2)}</strong>
    </div>

    <div class="row">
      <span>Selling Price</span>
      <strong>₹${sell.toFixed(2)}</strong>
    </div>

    <div class="row">
      <span>Quantity</span>
      <strong>${qty}</strong>
    </div>

    <div class="total">
      <span>${profit >= 0 ? "Profit" : "Loss"}</span>
      <span>₹${Math.abs(profit).toFixed(2)}</span>
    </div>

  `;

  openPrintWindow(
    "Profit Report",
    content
  );
}


// PRINT GST
function printGST(){

  const amount =
    Number(document.getElementById("gstAmount").value);

  const rate =
    Number(document.getElementById("gstRate").value);

  if(amount < 0 || rate < 0){

    alert("Please calculate GST first.");

    return;
  }

  const gst =
    amount * rate / 100;

  const total =
    amount + gst;

  const content = `

    <div class="row">
      <span>Original Amount</span>
      <strong>₹${amount.toFixed(2)}</strong>
    </div>

    <div class="row">
      <span>GST Rate</span>
      <strong>${rate}%</strong>
    </div>

    <div class="row">
      <span>GST Amount</span>
      <strong>₹${gst.toFixed(2)}</strong>
    </div>

    <div class="total">
      <span>Total Amount</span>
      <span>₹${total.toFixed(2)}</span>
    </div>

  `;

  openPrintWindow(
    "GST Report",
    content
  );
}


// INITIAL LOAD
displaySales();
displayExpenses();
displayStock();
updateDashboard();
