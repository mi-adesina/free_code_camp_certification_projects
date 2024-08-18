const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

// Define the Roman numerals and their values
const romanNumerals = [
  { numeral: "M", value: 1000 },
  { numeral: "CM", value: 900 },
  { numeral: "D", value: 500 },
  { numeral: "CD", value: 400 },
  { numeral: "C", value: 100 },
  { numeral: "XC", value: 90 },
  { numeral: "L", value: 50 },
  { numeral: "XL", value: 40 },
  { numeral: "X", value: 10 },
  { numeral: "IX", value: 9 },
  { numeral: "V", value: 5 },
  { numeral: "IV", value: 4 },
  { numeral: "I", value: 1 },
];

// Convert the number to a Roman numeral
const numberToRomanNumeral = (input) => {
  let result = "";

  for (let i = 0; i < romanNumerals.length; i++) {
    while (input >= romanNumerals[i].value) {
      result += romanNumerals[i].numeral;
      input -= romanNumerals[i].value;
    }
  }
  output.innerText = result;
};

const checkUserInput = () => {
  if (!numberInput.value) {
    output.innerText = "Please enter a valid number";
    return;
  } else if (parseInt(numberInput.value) < 0) {
    output.innerText = "Please enter a number greater than or equal to 1";
    return;
  } else if (parseInt(numberInput.value) >= 4000) {
    output.innerText = "Please enter a number less than or equal to 3999";
    return;
  } else if (isNaN(parseInt(numberInput.value))) {
    output.innerText =
      "Please provide a decimal number greater than or equal to 0";
    return;
  }

  numberToRomanNumeral(parseInt(numberInput.value));
  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
