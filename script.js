// भाषा बदला (Multi-lingual Logic)
const translations = {
    mr: {
        headline: 'तुमचा व्यवसाय करा डिजिटल, <span class="highlight">फक्त एका क्लिकवर!</span>',
        subheadline: 'बिलिंग, उधारी आणि जीएसटी - आता सर्वकाही एकाच ठिकाणी अत्यंत सोप्या पद्धतीने व्यवस्थापित करा.',
        ctaMain: 'मोफत सुरू करा (Start For Free)',
        ctaSecondary: '१४ दिवसांची फ्री ट्रायल घ्या'
    },
    hi: {
        headline: 'अपना व्यवसाय डिजिटल करें, <span class="highlight">सिर्फ एक क्लिक पर!</span>',
        subheadline: 'बिलिंग, उधारी और जीएसटी - अब सब कुछ एक ही जगह पर आसानी से प्रबंधित करें।',
        ctaMain: 'मुफ्त शुरू करें (Start For Free)',
        ctaSecondary: '14 दिनों का फ्री ट्रायल लें'
    },
    en: {
        headline: 'Digitize Your Business, <span class="highlight">Just in One Click!</span>',
        subheadline: 'Invoicing, Credit Management & GST - Manage everything easily in one place.',
        ctaMain: 'Start For Free',
        ctaSecondary: 'Take 14 Days Free Trial'
    }
};

function changeLanguage(lang) {
    if (translations[lang]) {
        document.getElementById('heroHeadline').innerHTML = translations[lang].headline;
        document.getElementById('heroSubheadline').innerText = translations[lang].subheadline;
        document.getElementById('ctaMain').innerText = translations[lang].ctaMain;
        document.getElementById('ctaSecondary').innerText = translations[lang].ctaSecondary;
    }
}
