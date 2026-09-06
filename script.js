let receiptNumber =
    Number(localStorage.getItem("receiptNumber")) || 1;

function showReceiptNumber() {

    document.getElementById("receiptNo").innerText =
        String(receiptNumber).padStart(5, "0");
}

function showDate() {

    const today = new Date();

    const date =
        today.toLocaleDateString("en-IN");

    document.getElementById("receiptDate").innerText =
        date;
}

function addItem() {

    const table = document.getElementById("items");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <input
                type="text"
                placeholder="वस्तूचे नाव"
            >
        </td>

        <td>
            <input
                type="number"
                value="1"
                min="1"
                oninput="calculateTotal()"
            >
        </td>

        <td>
            <input
                type="number"
                value="0"
                min="0"
                oninput="calculateTotal()"
            >
        </td>

        <td class="amount">
            ₹0.00
        </td>

        <td class="no-print">
            <button
                class="delete-btn"
                onclick="deleteItem(this)"
            >
                X
            </button>
        </td>
    `;

    table.appendChild(row);

    calculateTotal();
}

function deleteItem(button) {

    button.closest("tr").remove();

    calculateTotal();
}

function calculateTotal() {

    const rows =
        document.querySelectorAll("#items tr");

    let total = 0;

    rows.forEach(row => {

        const inputs =
            row.querySelectorAll("input");

        const quantity =
            Number(inputs[1].value) || 0;

        const rate =
            Number(inputs[2].value) || 0;

        const amount =
            quantity * rate;

        row.querySelector(".amount").innerText =
            "₹" + amount.toFixed(2);

        total += amount;
    });

    document.getElementById("total").innerText =
        total.toFixed(2);
}

function printReceipt() {

    localStorage.setItem(
        "receiptNumber",
        receiptNumber + 1
    );

    window.print();

    receiptNumber++;

    showReceiptNumber();
}

showReceiptNumber();
showDate();
addItem();
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // तारीख, नाम और मैसेज शीट में सेव होगा
    sheet.appendRow([new Date(), data.name, data.message]);
    
    return ContentService.createTextOutput(JSON.stringify({"result": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"result": "error", "error": error}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
