// TODO writing .8 at the beginning doesn't make it into 0.8 properly.

// TODO, when pressing enter after having pressed a number, it adds the number to the textfield,
// like the number was clicked again. The expected result is calc();

// Memory should be an array of arrays

window.onload = function () {

  var expression = [];
  var numberCombiner = '';
  var number1 = '';
  var number2 = '';
  var op = '';

  // Using KeyUp here instead of keypress, so it will catch backspace
  document.body.addEventListener('keyup', function(e) {
    var key = e.keyCode;
    // If the ENTER key is pressed
    if (key === 13) {
      e.preventDefault();
      calc();
    // If the BACKSPACE key is pressed
    } else if (key === 8) {
      e.preventDefault();
    //   input.value = input.value.substr(0, input.value.length - 1);
    //   calc();
    }
  });
  // TODO, remove this and replace with individual event listeners! BAD PRACTICE
  var buttons = document.getElementsByTagName('button'); // Select all buttons

  var result = document.querySelector('#output'); // Select the result p tag
  var input = document.querySelector('#input'); // Select the input-field
  var clear = document.querySelector('#clear'); // Select the clearAll-button
  var numbers = document.querySelectorAll('.number'); // All the number buttons

  // Loop through all buttons and add the event listener
  for (var i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener("click", addValue.bind(null, i));
  }
  // This allows to calculate everytime the user types in a number only.
  for (var index = 0; index < numbers.length; index += 1) {
    numbers[index].addEventListener("click", calc);
  }
  function addValue(i) {
    // TODO, might be better practice to have individal event listeners for the operations, and numbers be the only ones we loop through.
      if (buttons[i].innerHTML === '÷') { // We need to replace this with an operator JS can understand
         input.value  += '/';
      } else if (buttons[i].innerHTML === 'x') { // We need to replace this with an operator JS can understand
         input.value  += '*';
      } else if (buttons[i].innerHTML === 'C') { // For our calculate to clear, we need the input field cleared first
         input.value = '';
         result.innerHTML = 0;
         expression = [];
         numberCombiner = '';
         number1 = '';
         number2 = '';
         op = '';
         console.log("=================");
         console.log("CLEARED");
         console.log("=================");

      } else if (buttons[i].innerHTML === '=') { // This removes the last character from the input
        //  input.value = input.value.substr(0, input.value.length - 1);
         calc();
      } else {
         input.value += buttons[i].innerHTML; // This adds the content of the button to the input
      }

  }



  function calc() {
    if(input.value === '') { // If the input is empty, we just set the result to 0;
      result.innerHTML = 0;
    } else {

      // Here we take out input field and split every character into the expression array;
      expression = input.value.split("");

      // Here we are combining the individual numbers in our array.

      // Reset combinedExpression
      var combinedExpression = [];
      expression.forEach(function (item, index, array) {
          if (isNaN(item)) {
            // If it's a '.' We still need to add it to the numberCombiner
            if (item === '.') {
                numberCombiner = numberCombiner + item;
                if (index === 0) { // If the user types '.' as the first thing, we want to replace that with 0.
                  numberCombiner = '0.';
                }
            } else {
              combinedExpression.push(numberCombiner);
              combinedExpression.push(item);
              numberCombiner = '';
            }
          } else { // Else we add them to the numberCombiner
            numberCombiner = numberCombiner + item;
            if (index === array.length - 1) { // If the last item is a number, we just want to push it.
              combinedExpression.push(numberCombiner);
              numberCombiner = '';
            }
          }
      });


      // ----------------------------------
      //          ORDER OF OPERATION
      // ----------------------------------
      var oooResult = 0;
      while (combinedExpression.indexOf('*') >= 0 || combinedExpression.indexOf('/') >= 0) {
        var multiplyIndex = combinedExpression.indexOf('*');
        var divideIndex = combinedExpression.indexOf('/');
        if (multiplyIndex > divideIndex) { // If multiply comes first
          oooResult = Number(combinedExpression[multiplyIndex-1]) * Number(combinedExpression[multiplyIndex+1]);
          combinedExpression.splice(multiplyIndex + 1, 1);
          combinedExpression.splice(multiplyIndex, 1);
          combinedExpression.splice(multiplyIndex - 1, 1);
          // console.log("CE before: " + combinedExpression);
          // Splice can't be used if the array is empty, so we need to test this.
          if (combinedExpression.length === 0) {
            combinedExpression.push(oooResult);
          } else if (multiplyIndex - 1 === 0) {
            combinedExpression.unshift(oooResult);
          } else {
            combinedExpression.splice(multiplyIndex - 1, 0, oooResult);
          }
        // console.log(combinedExpression);
        } else { // If divide comes first
          oooResult = Number(combinedExpression[divideIndex-1]) / Number(combinedExpression[divideIndex+1]);
          combinedExpression.splice(divideIndex + 1, 1);
          combinedExpression.splice(divideIndex, 1);
          combinedExpression.splice(divideIndex - 1, 1);
          // Splice can't be used if the array is empty, so we need to test this.
          if (combinedExpression.length === 0) {
            combinedExpression.push(oooResult);
          // Splice also can't be used for the first item in an array
          } else if (divideIndex - 1 === 0) {
            combinedExpression.unshift(oooResult);
          } else {
            combinedExpression.splice(divideIndex - 1, 0, oooResult);
          }
        }
      }

      // Reset values
      var number1 = '';
      var op = '';
      // Loop through array and calculate left to right.
      combinedExpression.forEach(function (item, index, array) {
        if (array.length === 1) {
          result.innerHTML = item;
        }
        if (index === 0) {
          number1 = item;
        } else if (isNaN(item)) {
          op = item;
        } else {
          number2 = item;
          // ----------------------------------
          //   LAST ADDITION AND SUBTRACTION
          // ----------------------------------
          if (op === '+') {
            console.log(Number(number1) + Number(number2));
            number1 = Number(number1) + Number(number2);
            result.innerHTML = number1;
          } else if (op === '-') {
            console.log(Number(number1) - Number(number2));
            number1 = Number(number1) - Number(number2);
            result.innerHTML = number1;
          } else {
            console.log("========================");
            console.log("ERROR: Unknown operator: " + op);
            console.log("========================");
          }
        }
      }); // End Loop

    }
  }
};
