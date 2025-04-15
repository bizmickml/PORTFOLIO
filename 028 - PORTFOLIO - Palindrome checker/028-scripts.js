if (typeof window !== 'undefined') {
    // Code that uses document object






/* ---- Elements I need to control:
        Button
        input field
        results box --------- */

        const btn = document.getElementById(`check-btn`);
        const input = document.querySelector(`#text-input`);
        const resultBox = document.getElementById(`result`);
        
        /* ---- Functions 
                submit - gets user's input data and causes functions to run
                  clean input - cleans user's input data
                  convert inputs - creates a forward and revers version of the user's input data
                  compare inputs - decides if the two versions are the same
                  display results - shows the results of the comparison ------ */
        
        let cleanUserArray;
        
        // -- Clean user input of all punctuation, spaces and convert characters to an array:
        const cleanInputString = (userString) => {
          const regex = /[\s\W\p{P}]/gu;
          const cleanUserString = userString.replace(regex, ``).toLowerCase();
          cleanUserArray = Array.from(cleanUserString);
          return;
        }
        console.log(cleanInputString("0_0 (: /-\ :) 0-0"));
        console.log("TESTS - clean user input TEST run output: " + cleanUserArray);
        
        
        // -- Backward array for comparison:
        const cleanUserArrayBackward = [];
        
        // -- To convert user input to backward array
        const convertInput = () => {
          for (const userArr of cleanUserArray) {
            cleanUserArrayBackward.unshift(userArr);
          }
        }
        convertInput();
        console.log("user input reversed TEST output: " + cleanUserArrayBackward);
        
        
        // -- To compare the two arrays from ^ above ^
        const compareArrays = () => {
          for (let index=0; index < cleanUserArray.length - 1; index++) {
            if (cleanUserArray[index] === cleanUserArrayBackward[index]) {
        
            } else {
              return false;
            }
          }
          return true;
        }
        console.log("TEST comparison answer: " + compareArrays());
        
        
        // -- To display results
        const resultMsg = () => {
          if (compareArrays()) {
            resultBox.innerText = `${input.value} is a palindrome`;
          } else {
            resultBox.innerText = `${input.value} is not a palindrome`;
          }
        }
        resultMsg();
        console.log(`${resultBox.innerText}`);
        
        
        // -- To get user data
        function getUserData() {
            cleanInputString(input.value)
            convertInput();
            resultMsg();  
            resultBox.classList.remove('hide');
          }
        
        btn.addEventListener("click", 
          function emptyClick() {
            if (input.value) {
              getUserData();
            } else {
                alert("Please input a value");
            }
          });





          

}