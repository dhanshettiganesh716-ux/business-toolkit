function openPage(page) {

  const pageArea = document.getElementById("pageArea");

  if (page === "invoice") {

    pageArea.innerHTML = `
      <div class="page-card">
        <h2>🧾 Create Invoice</h2>
        <p>Create a new customer invoice.</p>

        <div class="form-group">
          <label>Customer Name</label>
          <input type="text" placeholder="Customer name">
        </div>

        <div class="form-group">
          <label>Amount</label>
          <input type="number" placeholder="₹ Amount">
        </div>

        <button class="primary-btn">Create Invoice</button>
      </div>
    `;

  }

  else if (page === "sales") {

    pageArea.innerHTML = `
      <div class="page-card">
        <h2>💰 Sales</h2>
        <p>Manage your business sales.</p>

        <div class="form-group">
          <label>Product Name</label>
          <input type="text" placeholder="Product name">
        </div>

        <div class="form-group">
          <label>Amount</label>
          <input type="number" placeholder="₹ Amount">
        </div>

        <button class="primary-btn">Add Sale</button>
      </div>
    `;

  }

  else if (page === "expenses") {

    pageArea.innerHTML = `
      <div class="page-card">
        <h2>💸 Expenses</h2>
        <p>Track your business expenses.</p>

        <div class="form-group">
          <label>Expense Name</label>
          <input type="text" placeholder="Expense name">
        </div>

        <div class="form-group">
          <label>Amount</label>
          <input type="number" placeholder="₹ Amount">
        </div>

        <button class="primary-btn">Add Expense</button>
      </div>
    `;

  }

  else if (page === "customers") {

    pageArea.innerHTML = `
      <div class="page-card">

        <h2>👥 Customers</h2>
        <p>Manage customer credit / khata</p>

        <div class="form-group">
          <label>Customer Name</label>
          <input type="text" placeholder="Customer name">
        </div>

        <div class="form-group">
          <label>Credit Amount</label>
          <input type="number" placeholder="₹ Amount">
        </div>

        <button class="primary-btn">Add Customer</button>

      </div>
    `;

  }

  else if (page === "stock") {

    pageArea.innerHTML = `
      <div class="page-card">
        <h2>📦 Stock</h2>
        <p>Manage your business stock.</p>

        <div class="form-group">
          <label>Product Name</label>
          <input type="text" placeholder="Product name">
        </div>

        <div class="form-group">
          <label>Quantity</label>
          <input type="number" placeholder="Quantity">
        </div>

        <button class="primary-btn">Add Stock</button>
      </div>
    `;

  }

  else if (page === "gst") {

    pageArea.innerHTML = `
      <div class="page-card">
        <h2>🧮 GST Calculator</h2>
        <p>Calculate GST easily.</p>

        <div class="form-group">
          <label>Amount</label>
          <input type="number" placeholder="₹ Amount">
        </div>

        <div class="form-group">
          <label>GST %</label>
          <input type="number" placeholder="GST percentage">
        </div>

        <button class="primary-btn">Calculate GST</button>
      </div>
    `;

  }

  else if (page === "profit") {

    pageArea.innerHTML = `
      <div class="page-card">
        <h2>📈 Profit</h2>
        <p>Check your business profit.</p>

        <div class="form-group">
          <label>Total Sales</label>
          <input type="number" placeholder="₹ Sales">
        </div>

        <div class="form-group">
          <label>Total Expenses</label>
          <input type="number" placeholder="₹ Expenses">
        </div>

        <button class="primary-btn">Calculate Profit</button>
      </div>
    `;

  }

  pageArea.scrollIntoView({
    behavior: "smooth"
  });
}


function openFeedback() {

  window.open(
    "https://docs.google.com/forms/",
    "_blank"
  );

}
