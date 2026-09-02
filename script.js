// =========================
// OPEN FEEDBACK
// =========================

function openFeedback() {
  document.getElementById("feedbackBox").style.display = "block";
}


// =========================
// CLOSE FEEDBACK
// =========================

function closeFeedback() {
  document.getElementById("feedbackBox").style.display = "none";
}


// =========================
// SUBMIT FEEDBACK
// =========================

function submitFeedback() {

  const q1 = document.getElementById("q1").value;
  const q2 = document.getElementById("q2").value;
  const q3 = document.getElementById("q3").value;
  const q4 = document.getElementById("q4").value;

  // Check all questions
  if (!q1 || !q2 || !q3 || !q4) {

    alert("कृपया सर्व 4 प्रश्नांची उत्तरं निवडा. 🙏");

    return;
  }

  // Google Form
  window.open(
    "https://docs.google.com/forms/d/e/1FAIpQLSewOR2YdFto41kc7jZVnTLcCg5jWigSHig-rJOAgDoaL1lgCQ/viewform",
    "_blank"
  );

  // Close popup
  closeFeedback();
}


// =========================
// CLOSE WHEN CLICK OUTSIDE
// =========================

document.addEventListener("click", function(event) {

  const box = document.getElementById("feedbackBox");

  if (event.target === box) {
    closeFeedback();
  }

});
