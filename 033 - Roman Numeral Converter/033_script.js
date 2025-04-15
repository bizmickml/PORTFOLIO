if (typeof window !== 'undefined') {
  // Code that uses document object


const numberInput = document.getElementById('number');
const btn = document.getElementById('convert-btn');
const output = document.getElementById('output');

const placeValue = [1000, 100, 10, 1];
const romanNumerals = [
  {
    simbol: "M",
    val: 1000,
    amount: 0
  }, 
  {
    simbol: "C",
    val: 100,
    amount: 0
  },
  {
    simbol: "X",
    val: 10,
    amount: 0
  }, 
  {
    simbol: "I",
    val: 1,
    amount: 0
  }];
const secondarySymbols = [
  {
    simbol: "",
    val: 0
  },
  {
    simbol: "D",
    val: 500
  },
  {
    simbol: "L",
    val: 50
  },
  {
    simbol: "V",
    val: 5
  }];

// ---  check if user input is a number greater than zero and less than 4000
// ---  establish a "clean" userInput number
// ---  cancel out any decimal values entered
const checkUserInput = () => {
let cleanUserInput;
  if (!numberInput.value) {
    output.innerText = "Please enter a valid number";
    output.classList.remove("hidden");
    return;
  } else if (numberInput.value > 3999) {
    output.innerText = 'Please enter a number less than or equal to 3999';
    output.classList.remove("hidden");
    return;
  } else if (numberInput.value <= 0) {
    output.innerText = 'Please enter a number greater than or equal to 1';
    output.classList.remove("hidden");
    return;
  } else {
    cleanUserInput = Math.floor(numberInput.value);
    numberInput.value = cleanUserInput;
  } 
  decomposeUserInput(cleanUserInput);
};

btn.addEventListener("click", checkUserInput);
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
} );

/* --- how to convert? 
  1. divide the user input by each of the values of the roman numerals
      (how many 1000s, how many 500s etc.)
  2. get a count of how many of each of values 
  3. add the symbols to a string based on the counts and rules I create
*/

const decomposeUserInput = (num) => { 
  let count = 0;
  let qty = 0;
  while (count < placeValue.length) {
    const divisor = placeValue[count];
    qty = (Math.floor(num / divisor));
    romanNumerals[count].amount = qty;
    count ++;
    num -= divisor * qty;
  };
  calcResult();
};

// ---  RULES:
//      starting with the thousands
//      if the amount is 3 or less, add that many simbols to the string 
//      if the amount if 4 add one of that simbol and one of the previous symbols from the previous object level

let outputString = "";
const calcResult = () => {
  outputString = "";
  let count = 0;
  while (count < romanNumerals.length) {
    if (romanNumerals[count].amount < 4) {
    outputString += romanNumerals[count].simbol.repeat(romanNumerals[count].amount);
    } else if (romanNumerals[count].amount === 4) {
      outputString += romanNumerals[count].simbol + secondarySymbols[count].simbol;
    } else if (romanNumerals[count].amount === 5) {
      outputString += secondarySymbols[count].simbol;
    } else if (romanNumerals[count].amount > 5 && romanNumerals[count].amount < 9) {
      let qty = romanNumerals[count].amount - 5;
      outputString += secondarySymbols[count].simbol + romanNumerals[count].simbol.repeat(qty);
    } else if (romanNumerals[count].amount === 9) {
      outputString += romanNumerals[count].simbol + romanNumerals[count - 1].simbol;
    }
    count ++;
  }  
  output.innerText = outputString;
  output.classList.remove("hidden");
};




}