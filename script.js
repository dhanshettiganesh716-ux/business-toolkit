/* PAGE */

function showPage(pageId, btn){

  document.querySelectorAll(".page").forEach(function(page){
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
}


/* CALCULATOR */

let calcValue = "";

function addCalc(value){

  calcValue += value;

  document.getElementById("calcExpression").textContent =
    calcValue;

}

function clearCalc(){

  calcValue = "";

  document.getElementById("calcExpression").textContent = "";

  document.getElementById("calcResult").textContent = "0";

}

function backspace(){

  calcValue = calcValue.slice(0,-1);

  document.getElementById("calcExpression").textContent =
    calcValue;

}

function calculate(){

  try{

    let expression = calcValue.replace(/×/g,"*");

    let result = Function(
      '"use strict";return (' + expression + ')'
    )();

    document.getElementById("calcResult").textContent =
      Number(result).toLocaleString("en-IN");

  }catch(error){

    document.getElementById("calcResult").textContent =
      "Error";

  }

}


/* INVOICE */

function addProduct(){

  const row = document.createElement("div");

  row.className = "invoice-row";

  row.innerHTML = `
    <input
      class="product-name"
      placeholder="Product">

    <input
      class="product-qty"
      type="number"
      value="1"
      min="1"
      oninput="invoiceTotal()">

    <input
      class="product-price"
      type="number"
      value="0"
      min="0"
      oninput="invoiceTotal()">

    <div class="invoice-amount">
      ₹<span class="row-total">0.00</span>
    </div>

    <button
      class="danger invoice-delete"
      onclick="this.parentElement.remove();invoiceTotal()">
      Delete
    </button>
  `;

  document.getElementById("invoiceBody").appendChild(row);

  invoiceTotal();

}


function invoiceTotal(){

  let rows =
    document.querySelectorAll(".invoice-row");

  let subtotal = 0;

  rows.forEach(function(row){

    let qty =
      Number(
        row.querySelector(".product-qty").value
      ) || 0;

    let price =
      Number(
        row.querySelector(".product-price").value
      ) || 0;

    let amount = qty * price;

    row.querySelector(".row-total").textContent =
      amount.toFixed(2);

    subtotal += amount;

  });

  /* GST  */

  let gst = subtotal *  / 100;

  let grandTotal = subtotal + gst;

  document.getElementById("invoiceSubtotal").textContent =
    subtotal.toFixed(2);

  document.getElementById("invoiceGST").textContent =
    gst.toFixed(2);

  document.getElementById("invoiceGrandTotal").textContent =
    grandTotal.toFixed(2);

}


document.getElementById("invoiceNo")
.addEventListener("input",function(){

  document.getElementById("receiptInvoiceNo")
  .textContent = this.value || "---";

});


document.getElementById("invoiceCustomer")
.addEventListener("input",function(){

  document.getElementById("receiptCustomer")
  .textContent = this.value || "---";

});


document.getElementById("receiptDate").textContent =
  new Date().toLocaleDateString("en-GB");


function saveInvoice(){

  let invoice = {

    number:
      document.getElementById("invoiceNo").value,

    customer:
      document.getElementById("invoiceCustomer").value,

    total:
      document.getElementById("invoiceGrandTotal").textContent,

    date:
      new Date().toLocaleDateString()

  };

  let invoices =
    JSON.parse(
      localStorage.getItem("invoices") || "[]"
    );

  invoices.push(invoice);

  localStorage.setItem(
    "invoices",
    JSON.stringify(invoices)
  );

  let customerName =
    document.getElementById("invoiceCustomer")
    .value.trim();

  if(customerName){

    let customers =
      JSON.parse(
        localStorage.getItem("customers") || "[]"
      );

    let exists =
      customers.some(function(c){
        return c.name === customerName;
      });

    if(!exists){

      customers.push({
        name:customerName,
        phone:""
      });

      localStorage.setItem(
        "customers",
        JSON.stringify(customers)
      );

    }

  }

  alert("Invoice Saved!");

  updateAll();

}


/* SALES */

function addSale(){

  let product =
    document.getElementById("saleProduct").value.trim();

  let amount =
    Number(
      document.getElementById("saleAmount").value
    ) || 0;

  if(!product || amount <= 0){

    alert("Enter valid sale details");

    return;

  }

  let sales =
    JSON.parse(
      localStorage.getItem("sales") || "[]"
    );

  sales.push({
    product:product,
    amount:amount,
    date:new Date().toLocaleDateString()
  });

  localStorage.setItem(
    "sales",
    JSON.stringify(sales)
  );

  document.getElementById("saleProduct").value = "";
  document.getElementById("saleAmount").value = "";

  updateAll();

}


/* CUSTOMERS */

function addCustomer(){

  let name =
    document.getElementById("customerName").value.trim();

  let phone =
    document.getElementById("customerPhone").value.trim();

  if(!name){

    alert("Enter customer name");

    return;

  }

  let customers =
    JSON.parse(
      localStorage.getItem("customers") || "[]"
    );

  customers.push({
    name:name,
    phone:phone
  });

  localStorage.setItem(
    "customers",
    JSON.stringify(customers)
  );

  document.getElementById("customerName").value = "";
  document.getElementById("customerPhone").value = "";

  updateAll();

}


/* EXPENSES */

function addExpense(){

  let name =
    document.getElementById("expenseName").value.trim();

  let amount =
    Number(
      document.getElementById("expenseAmount").value
    ) || 0;

  if(!name || amount <= 0){

    alert("Enter valid expense");

    return;

  }

  let expenses =
    JSON.parse(
      localStorage.getItem("expenses") || "[]"
    );

  expenses.push({
    name:name,
    amount:amount,
    date:new Date().toLocaleDateString()
  });

  localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
  );

  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";

  updateAll();

}


/* STOCK */

function addStock(){

  let product =
    document.getElementById("stockProduct").value.trim();

  let qty =
    Number(
      document.getElementById("stockQty").value
    ) || 0;

  if(!product || qty <= 0){

    alert("Enter valid stock");

    return;

  }

  let stock =
    JSON.parse(
      localStorage.getItem("stock") || "[]"
    );

  stock.push({
    product:product,
    qty:qty
  });

  localStorage.setItem(
    "stock",
    JSON.stringify(stock)
  );

  document.getElementById("stockProduct").value = "";
  document.getElementById("stockQty").value = "";

  updateAll();

}


/* GST */

function calculateGST(){

  let amount =
    Number(
      document.getElementById("gstAmount").value
    ) || 0;

  let rate =
    Number(
      document.getElementById("gstRate").value
    ) || 0;

  let gst = amount * rate / 100;

  let total = amount + gst;

  document.getElementById("gstValue")
    .textContent = gst.toFixed(2);

  document.getElementById("gstTotal")
    .textContent = total.toFixed(2);

}
/* FEEDBACK → GOOGLE SHEETS */

const GOOGLE_SHEETS_URL =
  "YOUR_GOOGLE_SHEETS_WEB_APP_URL";


async function sendFeedback(){

  const name =
    document.getElementById("feedbackName")
      .value.trim();

  const message =
    document.getElementById("feedbackMessage")
      .value.trim();


  if(!message){

    alert("Please write feedback");

    return;

  }


  const result =
    document.getElementById("feedbackResult");

  result.innerHTML =
    "<p>Sending feedback...</p>";


  try{

    await fetch(GOOGLE_SHEETS_URL, {

      method: "POST",

      mode: "no-cors",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({

        name: name,

        message: message,

        date:
          new Date().toLocaleString("en-IN")

      })

    });


    document.getElementById("feedbackName")
      .value = "";

    document.getElementById("feedbackMessage")
      .value = "";


    result.innerHTML =
      "<p>Thank you for your feedback!</p>";


  }catch(error){

    console.error(error);

    result.innerHTML =
      "<p>Failed to send feedback. Please try again.</p>";

  }

}


}


/* UPDATE ALL */

function updateAll(){

  let sales =
    JSON.parse(
      localStorage.getItem("sales") || "[]"
    );

  let expenses =
    JSON.parse(
      localStorage.getItem("expenses") || "[]"
    );

  let customers =
    JSON.parse(
      localStorage.getItem("customers") || "[]"
    );

  let stock =
    JSON.parse(
      localStorage.getItem("stock") || "[]"
    );


  /* SALES TOTAL */

  let totalSales = sales.reduce(
    function(sum,item){
      return sum + Number(item.amount || 0);
    },
    0
  );


  /* EXPENSE TOTAL */

  let totalExpenses = expenses.reduce(
    function(sum,item){
      return sum + Number(item.amount || 0);
    },
    0
  );


  /* PROFIT */

  let profit = totalSales - totalExpenses;


  document.getElementById("dashSales")
    .textContent = totalSales.toFixed(2);

  document.getElementById("dashExpenses")
    .textContent = totalExpenses.toFixed(2);

  document.getElementById("dashProfit")
    .textContent = profit.toFixed(2);

  document.getElementById("dashCustomers")
    .textContent = customers.length;

  document.getElementById("dashStock")
    .textContent = stock.length;


  document.getElementById("profitSales")
    .textContent = totalSales.toFixed(2);

  document.getElementById("profitExpenses")
    .textContent = totalExpenses.toFixed(2);

  document.getElementById("profitTotal")
    .textContent = profit.toFixed(2);


  /* SALES LIST */

  let salesList =
    document.getElementById("salesList");

  salesList.innerHTML = "";

  sales.forEach(function(item){

    salesList.innerHTML += `
      <div class="list-item">
        <span>${item.product}</span>
        <b>₹${Number(item.amount).toFixed(2)}</b>
      </div>
    `;

  });


  /* CUSTOMER LIST */

  let customersList =
    document.getElementById("customersList");

  customersList.innerHTML = "";

  customers.forEach(function(item){

    customersList.innerHTML += `
      <div class="list-item">
        <span>${item.name}</span>
        <span>${item.phone || ""}</span>
      </div>
    `;

  });


  /* EXPENSE LIST */

  let expensesList =
    document.getElementById("expensesList");

  expensesList.innerHTML = "";

  expenses.forEach(function(item){

    expensesList.innerHTML += `
      <div class="list-item">
        <span>${item.name}</span>
        <b>₹${Number(item.amount).toFixed(2)}</b>
      </div>
    `;

  });


  /* STOCK LIST */

  let stockList =
    document.getElementById("stockList");

  stockList.innerHTML = "";

  stock.forEach(function(item){

    stockList.innerHTML += `
      <div class="list-item">
        <span>${item.product}</span>
        <b>${item.qty}</b>
      </div>
    `;

  });

}


/* START */

updateAll();

addProduct();
