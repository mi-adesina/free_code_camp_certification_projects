const inputNumber = document.getElementById("user-input");
const resultDiv = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

const phoneRegex = /^(\+?1)?\s?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/

clearBtn.addEventListener("click", () => {
  resultDiv.innerText = "";
});

const  checkNumber = (num) => {
  if (phoneRegex.test(num)) {
    resultDiv.innerText = `Valid US number: ${inputNumber.value}`
  } else {
    resultDiv.innerText = `Invalid US number: ${inputNumber.value}`
  }
}

checkBtn.addEventListener("click", () => {
  if (inputNumber.value === "") {
    alert("Please provide a phone number");
  } else {
    checkNumber(inputNumber.value);
  }
});
