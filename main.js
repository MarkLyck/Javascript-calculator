// TODO writing .8 at the beginning doesn't make it into 0.8 properly.


window.onload = function () {

  var expression = [];
  var numberCombiner = '';
  var number1 = '';
  var number2 = '';
  var op = '';

  // var array = ['10', '+', '24'];
// Memory should be an array of arrays


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
      input.value = input.value.substr(0, input.value.length - 1);
      calc();
    }
  });

  var buttons = document.getElementsByTagName('button'); // Select all buttons
  var result = document.querySelector('#output'); // Select the result p tag
  var input = document.querySelector('#input'); // Select the input-field
  var clear = document.querySelector('#clear'); // Select the clearAll-button

  // Loop through all buttons and add the event listener
  for (var i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener("click", addValue.bind(null, i));
  }
  function addValue(i) {
      if (buttons[i].innerHTML === '÷') { // We need to replace this with an operator JS can understand
         input.value  += '/';
         expression.push('/');
      } else if (buttons[i].innerHTML === 'x') { // We need to replace this with an operator JS can understand
         input.value  += '*';
         expression.push('*');
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
        //  expression.pop();
         calc();
      } else {
         input.value += buttons[i].innerHTML; // This adds the content of the button to the input
         expression.push(buttons[i].innerHTML);
      }

  }



  function calc() {
    if(input.value === '') {
      result.innerHTML = 0;
    } else {
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

      // console.log("IndexOf: " + combinedExpression.indexOf('*'));
      // Calculates higher order of operations first.
      var oooResult = 0;
      // Start loop for multiply

      // This is horribly broken, because it's a loop. We only need to do this once, then START over and do it again.
      // Until there are no more higher presedences.

      // Calling a function with another function inside of this is the answer!
      while (combinedExpression.indexOf('*') >= 0 || combinedExpression.indexOf('/') >= 0) {
        console.log("Found * or /");
        var multiplyIndex = combinedExpression.indexOf('*');
        var divideIndex = combinedExpression.indexOf('/');
        if (multiplyIndex > divideIndex) { // If multiply comes first
          oooResult = Number(combinedExpression[multiplyIndex-1]) * Number(combinedExpression[multiplyIndex+1]);
          combinedExpression.splice(multiplyIndex + 1, 1);
          combinedExpression.splice(multiplyIndex, 1);
          combinedExpression.splice(multiplyIndex - 1, 1);
          console.log("RESULT: " + oooResult);
          // console.log("CE before: " + combinedExpression);
          // Splice can't be used if the array is empty, so we need to test this.
          if (combinedExpression.length === 0) {
            combinedExpression.push(oooResult);
            console.log("PUSH");
          } else if (multiplyIndex - 1 === 0) {
            console.log("UNSHIFT");
            console.log(oooResult);
            combinedExpression.unshift(oooResult);
          } else {
            combinedExpression.splice(multiplyIndex - 1, 0, oooResult);
          }
          console.log("CE after: " + combinedExpression);

        // console.log(combinedExpression);
        } else { // If divide comes first
          oooResult = Number(combinedExpression[divideIndex-1]) / Number(combinedExpression[divideIndex+1]);
          combinedExpression.splice(divideIndex + 1, 1);
          combinedExpression.splice(divideIndex, 1);
          combinedExpression.splice(divideIndex - 1, 1);

          console.log("CE before: " + combinedExpression);
          // Splice can't be used if the array is empty, so we need to test this.
          if (combinedExpression.length === 0) {
            combinedExpression.push(oooResult);
          } else {
            combinedExpression.splice(divideIndex - 1, 0, oooResult);
          }
        }
      }
      console.log("CE: " + combinedExpression);
      console.log("RESULT: " + oooResult);
      // console.log("CE end: " + combinedExpression);

      // This will find The elements of an array that matches '*' or '/'
      // combinedExpression.forEach(function (item, index, array) {
      //   // This should have a counter for each time we encounter a * or a /, so we can run a function that many times.
      //   if (item === '*' || item === '/') {
      //     var opIndex = index;
      //     if (item === '*') {
      //       console.log("Multiplying: " + array[index-1] + " * " + array[index+1]);
      //       oooResult = Number(array[index-1]) * Number(array[index+1]);
      //     } else {
      //       console.log("Dividing: " + array[index-1] + " / " + array[index+1]);
      //       oooResult = Number(array[index-1]) / Number(array[index+1]);
      //     }
      //     array.splice(index + 1, 1);
      //     array.splice(index, 1);
      //     array.splice(index - 1, 1);
      //     array.splice(index - 1, 0, String(oooResult));
      //     console.log(combinedExpression);
      //   }
      // }); //End multiply loop

// .indexOf('*') Will only return the first one.

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
          // The calculation

          if (op === '+') {
            console.log(Number(number1) + Number(number2));
            number1 = Number(number1) + Number(number2);
            result.innerHTML = number1;
          } else if (op === '-') {
            console.log(Number(number1) - Number(number2));
            number1 = Number(number1) - Number(number2);
            result.innerHTML = number1;
          } //else if (op === '/') {
          //   console.log(Number(number1) / Number(number2));
          //   number1 = Number(number1) / Number(number2);
          //   result.innerHTML = number1;
          // } else if (op === '*') {
          //   console.log(Number(number1) * Number(number2));
          //   number1 = Number(number1) * Number(number2);
          //   result.innerHTML = number1;
          // }
        }
      });

      // Instead of using eval() store every number and operator in an array.
      // Then in calc loop through array, to figure out which ones are numbers and which ones are operators.
      // If it contains any higher presedence operators, do those first.
      // Keep looping until there are only +/- then just add them together from start to finish?
    }
  }
};
