const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const userInput = document.getElementById('user-input');
const results = document.getElementById('results-div');

const bracketsRegex = /[)(]/g
const phoneWithCountryRegex = /^[1][-\s]?[\d][\d][\d][-\s]?[\d][\d][\d][-\s]?[\d][\d][\d][\d]$/;
const phoneNoCountryRegex = /^[\d][\d][\d][-\s]?[\d][\d][\d][-\s]?[\d][\d][\d][\d]$/;
const noCountryWithBracketRegex = /^[(][\d][\d][\d][)][-\s]?[\d][\d][\d][-\s]?[\d][\d][\d][\d]$/;
const countryWithBracketRegex = /^[1][-\s]?[(][\d][\d][\d][)][-\s]?[\d][\d][\d][-\s]?[\d][\d][\d][\d]$/;

const displayResults = (val, str) => {
  if (val) {
    results.insertAdjacentHTML("beforeend", `<p>Valid US number: ${str}<p>`);
  } else {
    results.insertAdjacentHTML("beforeend", `<p>Invalid US number: ${str}<p>`);
  }
}

const testUserInput = (str) => {
  if (!str) {
    alert("Please provide a phone number");
  } else if (noCountryWithBracketRegex.test(str) | countryWithBracketRegex.test(str)) {
    return displayResults(true, str);
  } else if (phoneWithCountryRegex.test(str) | phoneNoCountryRegex.test(str)) {
    return displayResults(true, str);
  } else {
    return displayResults(false, str);
  }
}

clearBtn.addEventListener("click", () => {
  results.innerText = "";
  userInput.value = "";
})

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
  testUserInput(userInput.value);
  }
})

checkBtn.addEventListener("click", (e) => {
  e.preventDefault();
    testUserInput(userInput.value);
})