/* --- 🆕 दुकानदार स्पेशल: स्क्रीन आकडे मोठे करण्यासाठी --- */

.calculator-screen, #calc-display {
  font-size: 52px !important;    /* आकड्यांचा आकार खूप मोठा केला */
  font-weight: 900 !important;   /* आकडे एकदम ठळक आणि डार्क केले */
  color: #111827 !important;     /* स्पष्ट दिसणारा गडद काळा रंग */
  text-align: right !important;  /* आकडे उजव्या बाजूला दिसतील */
  padding: 15px 20px !important;
  font-family: monospace !important; /* हिशोबाचे आकडे सरळ रेषेत दिसण्यासाठी */
  letter-spacing: 1px;
}

.calculator-history, #calc-history {
  font-size: 22px !important;    /* जुने आकडे दुकानदाराला स्पष्ट दिसतील */
  color: #6b7280 !important;     /* फिकट राखाडी रंग */
  text-align: right !important;
  padding: 0 20px !important;
  margin-bottom: 5px;
}

/* भाषा बदलण्याच्या बटणाचे डिझाईन */
.lang-btn {
  background: white;
  border: 1px solid #d1d5db;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  margin-left: 5px;
}
.lang-btn.active {
  background: #111827;
  color: white;
}

/* मोबाईलवर स्क्रीन व्यवस्थित दिसण्यासाठी */
@media (max-width: 600px) {
  .calculator-screen {
    font-size: 42px !important; /* मोबाईल स्क्रीनबाहेर आकडे जाणार नाहीत */
  }
}
