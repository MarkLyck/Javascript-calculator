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

  // Main parts
  var result = document.querySelector('#output');
  var input = document.querySelector('#input');

  // Special keys
  var clear = document.querySelector('#clear');
  clear.addEventListener('click', function(){
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
  });
  var plusMinus = document.querySelector('#plus-minus');
  plusMinus.addEventListener('click', function(){
    // TODO, EXTRA feature Find out where the cursor is. and set the index to the cursor location
    expression = input.value.split("");
    // Create a loop to go back 1 index at a time, until it reaches something that's NaN
    expressionCounter = expression.length -1;
    while(expressionCounter >= -1) {
      if (isNaN(expression[expressionCounter])) {
        console.log(expression[expressionCounter]);
        var newOp = '';
        if (expression[expressionCounter] === '+') {
          newOp = '-';
          expression.splice(expressionCounter, 1); //Remove the operator
          expression.splice(expressionCounter, 0, newOp); // add the minus.
        } else if (expression[expressionCounter] === '-') {
          newOp = '+';
          expression.splice(expressionCounter, 1); //Remove the operator
          expression.splice(expressionCounter, 0, newOp); // add the plus.
        } else if (expression[expressionCounter] === undefined) { // This runs if there's only 1 number
          newOp = '-';
          expression.unshift(newOp);
          input.value = expression.join('');
        }
        input.value = expression.join('');
        break; // When we find a NaN, we break out of the loop
      }
      expressionCounter--;
    }
  });
  // Operators
  var plus = document.querySelector('#addition');
  plus.addEventListener('click', function(){input.value  += '+';});
  var minus = document.querySelector('#subtract');
  minus.addEventListener('click', function(){input.value  += '-';});
  var divide = document.querySelector('#divide');
  divide.addEventListener('click', function(){input.value  += '/';});
  var multiply = document.querySelector('#multiply');
  multiply.addEventListener('click', function(){input.value  += '*';});
  var equals = document.querySelector('#equals');

  // Numbers
  var numbers = document.querySelectorAll('.number');
  for (var index = 0; index < numbers.length; index += 1) {
    numbers[index].addEventListener("click", addValue.bind(null, index));
  }
  function addValue(index) {
    input.value += numbers[index].innerText;
    calc();
  }

//   CCCCCCCCCCCCC                       AAA               LLLLLLLLLLL                     CCCCCCCCCCCCC
// CCC::::::::::::C                     A:::A              L:::::::::L                  CCC::::::::::::C
// CC:::::::::::::::C                  A:::::A             L:::::::::L                CC:::::::::::::::C
// C:::::CCCCCCCC::::C                A:::::::A            LL:::::::LL               C:::::CCCCCCCC::::C
// C:::::C       CCCCCC              A:::::::::A             L:::::L                C:::::C       CCCCCC
// C:::::C                          A:::::A:::::A            L:::::L               C:::::C
// C:::::C                        A:::::A A:::::A           L:::::L               C:::::C
// C:::::C                       A:::::A   A:::::A          L:::::L               C:::::C
// C:::::C                      A:::::A     A:::::A         L:::::L               C:::::C
// C:::::C                     A:::::AAAAAAAAA:::::A        L:::::L               C:::::C
// C:::::C                    A:::::::::::::::::::::A       L:::::L               C:::::C
// C:::::C       CCCCCC      A:::::AAAAAAAAAAAAA:::::A      L:::::L         LLLLLL C:::::C       CCCCCC
// C:::::CCCCCCCC::::C      A:::::A             A:::::A   LL:::::::LLLLLLLLL:::::L  C:::::CCCCCCCC::::C
// CC:::::::::::::::C      A:::::A               A:::::A  L::::::::::::::::::::::L   CC:::::::::::::::C
// CCC::::::::::::C       A:::::A                 A:::::A L::::::::::::::::::::::L     CCC::::::::::::C
//   CCCCCCCCCCCCC       AAAAAAA                   AAAAAAALLLLLLLLLLLLLLLLLLLLLLLL        CCCCCCCCCCCCC


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
      //    ORDER OF OPERATION Functions
      // ----------------------------------
      multiplyAndDivide(combinedExpression);




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
  } // End calc







//   OOOOOOOOO          OOOOOOOOO             CCCCCCCCCCCCC
// OO:::::::::OO      OO:::::::::OO        CCC::::::::::::C
// OO:::::::::::::OO  OO:::::::::::::OO    CC:::::::::::::::C
// O:::::::OOO:::::::OO:::::::OOO:::::::O  C:::::CCCCCCCC::::C
// O::::::O   O::::::OO::::::O   O::::::O C:::::C       CCCCCC
// O:::::O     O:::::OO:::::O     O:::::OC:::::C
// O:::::O     O:::::OO:::::O     O:::::OC:::::C
// O:::::O     O:::::OO:::::O     O:::::OC:::::C
// O:::::O     O:::::OO:::::O     O:::::OC:::::C
// O:::::O     O:::::OO:::::O     O:::::OC:::::C
// O:::::O     O:::::OO:::::O     O:::::OC:::::C
// O::::::O   O::::::OO::::::O   O::::::O C:::::C       CCCCCC
// O:::::::OOO:::::::OO:::::::OOO:::::::O  C:::::CCCCCCCC::::C
// OO:::::::::::::OO  OO:::::::::::::OO    CC:::::::::::::::C
// OO:::::::::OO      OO:::::::::OO        CCC::::::::::::C
//   OOOOOOOOO          OOOOOOOOO             CCCCCCCCCCCCC



  function multiplyAndDivide(arr) {
    var oooResult = 0;
    // Multiplication and Dividends
    while (arr.indexOf('*') >= 0 || arr.indexOf('/') >= 0) {
      var multiplyIndex = arr.indexOf('*');
      var divideIndex = arr.indexOf('/');
      if (multiplyIndex > divideIndex) { // If multiply comes first
        oooResult = Number(arr[multiplyIndex-1]) * Number(arr[multiplyIndex+1]);
        arr.splice(multiplyIndex + 1, 1);
        arr.splice(multiplyIndex, 1);
        arr.splice(multiplyIndex - 1, 1);
        // console.log("CE before: " + combinedExpression);
        // Splice can't be used if the array is empty, so we need to test this.
        if (arr.length === 0) {
          arr.push(oooResult);
        } else if (multiplyIndex - 1 === 0) {
          arr.unshift(oooResult);
        } else {
          arr.splice(multiplyIndex - 1, 0, oooResult);
        }
      // console.log(combinedExpression);
      } else { // If divide comes first
        oooResult = Number(arr[divideIndex-1]) / Number(arr[divideIndex+1]);
        arr.splice(divideIndex + 1, 1);
        arr.splice(divideIndex, 1);
        arr.splice(divideIndex - 1, 1);
        // Splice can't be used if the array is empty, so we need to test this.
        if (arr.length === 0) {
          arr.push(oooResult);
        // Splice also can't be used for the first item in an array
        } else if (divideIndex - 1 === 0) {
          arr.unshift(oooResult);
        } else {
          arr.splice(divideIndex - 1, 0, oooResult);
        }
      }
    }
  }
};
