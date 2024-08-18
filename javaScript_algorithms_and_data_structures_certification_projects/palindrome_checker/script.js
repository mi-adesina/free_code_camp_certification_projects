const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

/**
 * isPalindrome - checks if a given string input is a palindrome.
 * test: input string to be tested
 * 
 * return: True if the string is s palindrome, otherwise False. 
 */
const isPalindrome = (test) => {
  for (let i = 0; i < test.length / 2; i++) {
    if (test[i] !== test[test.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

checkBtn.addEventListener("click", () => {
  if (!textInput.value) {
    alert("Please input a value");
  } else {
    // strip the testString of any character other than alphanumerics.
    const testString = textInput.value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    if (isPalindrome(testString)) {
      result.innerText = `${textInput.value} is a palindrome`;
    } else {
      result.innerText = `${textInput.value} is not a palindrome`;
    }
  }
});
