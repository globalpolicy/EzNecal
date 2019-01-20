const dateConverter = require('./dateconverter.js').DateConverter;

let nepaliMonths = [
    "बैशाख",
    "जेठ",
    "असार",
    "श्रावण",
    "भदौ",
    "असोज",
    "कत्तिक",
    "मङ्सिर",
    "पुस",
    "माघ",
    "फागुन",
    "चैत"
];
let daysOfTheWeek = ["आइतबार", "सोमबार", "मंगलबार", "बुधबार", "बिहीबार", "शुक्रबार", "शनिबार"];
let nepaliNumbers = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

function getNepaliDate() {
    dateConverter.setCurrentDate();
    let nepaliYear = englishNumberToNepali(dateConverter.getNepaliYear());
    let nepaliMonth = nepaliMonths[dateConverter.getNepaliMonth() - 1];
    let nepaliDate = englishNumberToNepali(dateConverter.getNepaliDate());
    let dayInNepali = daysOfTheWeek[new Date().getDay()];

    return `${nepaliYear} ${nepaliMonth} ${nepaliDate}, ${dayInNepali}`;
}

function englishNumberToNepali(englishNumber) {
    return englishNumber.toString().split('').map((digit) => nepaliNumbers[digit]).join('');
}

exports.getNepaliDate=getNepaliDate;