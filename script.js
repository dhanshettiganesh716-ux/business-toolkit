let totalSales = 0;
let totalExpenses = 0;
let totalStock = 0;

let salesRecords = [];
let expenseRecords = [];
let stockRecords = [];


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

    <div class="invoice">

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

      <button class="print-btn" onclick="window.print()">
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

        <p>
          Customer: ${sale.customer}
        </p>

        <p>
          Quantity: ${sale.quantity}
        </p>

        <p>
          Total: ₹${sale.total.toFixed(2)}
        </p>

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



// INITIAL LOAD
displaySales();
displayExpenses();
displayStock();
updateDashboard();
