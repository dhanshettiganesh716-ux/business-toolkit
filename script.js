function calculateInvoice() {
  const customerName = document.getElementById("customerName").value.trim();
  const itemName = document.getElementById("itemName").value.trim();
  const quantity = Number(document.getElementById("quantity").value);
  const price = Number(document.getElementById("price").value);

  if (!customerName || !itemName || quantity <= 0 || price <= 0) {
    document.getElementById("invoiceResult").innerHTML =
      "Please enter all details.";
    return;
  }

  const total = quantity * price;

  document.getElementById("invoiceResult").innerHTML =
    "Customer: " + customerName +
    "<br>Product/Service: " + itemName +
    "<br>Quantity: " + quantity +
    "<br>Price: ₹" + price.toFixed(2) +
    "<br><strong>Total: ₹" + total.toFixed(2) + "</strong>";
}


function calculateGST() {
  const amount = Number(document.getElementById("gstAmount").value);
  const rate = Number(document.getElementById("gstRate").value);

  if (amount <= 0 || rate < 0) {
    document.getElementById("gstResult").innerHTML =
      "Please enter valid values.";
    return;
  }

  const gst = amount * rate / 100;
  const total = amount + gst;

  document.getElementById("gstResult").innerHTML =
    "GST: ₹" + gst.toFixed(2) +
    "<br><strong>Total Amount: ₹" + total.toFixed(2) + "</strong>";
}


function calculateProfit() {
  const costPrice = Number(document.getElementById("costPrice").value);
  const sellingPrice = Number(document.getElementById("sellingPrice").value);

  if (costPrice <= 0 || sellingPrice <= 0) {
    document.getElementById("profitResult").innerHTML =
      "Please enter valid prices.";
    return;
  }

  const difference = sellingPrice - costPrice;

  if (difference > 0) {
    document.getElementById("profitResult").innerHTML =
      "Profit: ₹" + difference.toFixed(2);
  } else if (difference < 0) {
    document.getElementById("profitResult").innerHTML =
      "Loss: ₹" + Math.abs(difference).toFixed(2);
  } else {
    document.getElementById("profitResult").innerHTML =
      "No Profit, No Loss.";
  }
}


let totalExpense = 0;

function addExpense() {
  const expenseName = document.getElementById("expenseName").value.trim();
  const expenseAmount = Number(
    document.getElementById("expenseAmount").value
  );

  if (!expenseName || expenseAmount <= 0) {
    alert("Please enter a valid expense.");
    return;
  }

  totalExpense += expenseAmount;

  const list = document.getElementById("expenseList");

  const item = document.createElement("li");

  item.textContent =
    expenseName + " - ₹" + expenseAmount.toFixed(2);

  list.appendChild(item);

  document.getElementById("totalExpense").textContent =
    totalExpense.toFixed(2);

  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
}






