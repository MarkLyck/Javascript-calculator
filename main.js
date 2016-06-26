// TODO, when pressing enter after having pressed a number, it adds the number to the textfield,
// like the number was clicked again. The expected result is calc();

// TODO, check if they have an unclosed parenthesis and if they do display an alert box :D

window.onload = function () {

  var expression = [];
  var number1 = '';
  var number2 = '';
  var op = '';
  var degreeType = "Deg";
  var alternate = false;
  var EEcalc = false;
  var memory = 0;
  var lastpressed = '';

  // When the user clicks any calculator buttons, see if we need to change the clear button
  var calculator = document.querySelector('.calculations-wrapper');
  calculator.addEventListener('click', function() {
    if (input.value.length > 0) {
      clear.innerHTML = 'C';
    }
  });

  // Using KeyUp here instead of keypress, so it will catch backspace
  document.body.addEventListener('keyup', function(e) {
    if (input.value.length > 0) {
      clear.innerHTML = 'C';
    }

    var key = e.keyCode;
    // If the ENTER key is pressed
    if (key === 13) {
      e.preventDefault();
      calc();
    // If the BACKSPACE key is pressed
    } else if (key === 8) {
      if (input.value.length === 0) {
        clear.innerHTML = 'AC';
      }
      e.preventDefault(); // Doesn't work
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
    clear.innerHTML = 'AC';
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
    console.log('=== INVERT ===');
    // TODO, EXTRA feature Find out where the cursor is. and set the index to the cursor location
    expression = input.value.split("");
    // Create a loop to go back 1 index at a time, until it reaches something that's NaN
    expressionCounter = expression.length -1;
    while(expressionCounter >= -1) {
      if (isNaN(expression[expressionCounter])) {
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
    calc();
  });
  var percentage = document.querySelector('#percentage');
  percentage.addEventListener('click', function(){
    expression = input.value.split("");
    expressionCounter = expression.length -1;
    var fullNumber = '';
    while(!isNaN(expression[expressionCounter])) {
      // console.log(expression[expressionCounter]);
      fullNumber = expression[expressionCounter] + fullNumber;
      expression.splice(expressionCounter, 1); //Remove the Number
      expressionCounter--;
    }
    var percentCalculated = Number(fullNumber)/100;
    if (expression[expressionCounter] === undefined) {
      expression.unshift(percentCalculated);
      input.value = expression.join('');
    } else {
      expression.splice(expressionCounter + 1, 0, percentCalculated); // add the minus.
      input.value = expression.join('');
    }
    calc();
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
  equals.addEventListener('click', function(){calc();});

  // Numbers
  var numbers = document.querySelectorAll('.number');
  for (var index = 0; index < numbers.length; index += 1) {
    numbers[index].addEventListener("click", addValue.bind(null, index));
  }
  var decimal = document.querySelector('.decimal');
  decimal.addEventListener('click', function(){
    if (input.value[input.value.length-1] !== '.') { // This prevents multiple decimal points after eachother.
      input.value  += '.';
    }
  });

  function addValue(index) {
    input.value += numbers[index].innerText;
    calc();
  }

//   SSSSSSSSSSSSSSS         CCCCCCCCCCCCC  IIIIIIIIII  EEEEEEEEEEEEEEEEEEEEEE
// SS:::::::::::::::S     CCC::::::::::::C  I::::::::I  E::::::::::::::::::::E
// S:::::SSSSSS::::::S   CC:::::::::::::::C I::::::::I  E::::::::::::::::::::E
// S:::::S     SSSSSSS  C:::::CCCCCCCC::::C II::::::II  EE::::::EEEEEEEEE::::E
// S:::::S             C:::::C       CCCCCC   I::::I      E:::::E       EEEEEE
// S:::::S            C:::::C                 I::::I      E:::::E
// S::::SSSS         C:::::C                  I::::I      E::::::EEEEEEEEEE
//  SS::::::SSSSS    C:::::C                  I::::I      E:::::::::::::::E
//    SSS::::::::SS  C:::::C                  I::::I      E:::::::::::::::E
//       SSSSSS::::S C:::::C                  I::::I      E::::::EEEEEEEEEE
//            S:::::SC:::::C                  I::::I      E:::::E
//            S:::::S C:::::C       CCCCCC    I::::I      E:::::E       EEEEEE
// SSSSSSS     S:::::S  C:::::CCCCCCCC::::C II::::::II  EE::::::EEEEEEEE:::::E
// S::::::SSSSSS:::::S   CC:::::::::::::::C I::::::::I  E::::::::::::::::::::E
// S:::::::::::::::SS      CCC::::::::::::C I::::::::I  E::::::::::::::::::::E
// SSSSSSSSSSSSSSS           CCCCCCCCCCCCC  IIIIIIIIII  EEEEEEEEEEEEEEEEEEEEEE

  // Scientific Functions
  // <button id="parenthesis-1" type="button" name="button">(</button>
  var par1 = document.querySelector('#parenthesis-1');
  par1.addEventListener('click', function(){input.value  += '(';});
  // <button id="parenthesis-2" type="button" name="button">)</button>
  var par2 = document.querySelector('#parenthesis-2');
  par2.addEventListener('click', function(){input.value  += ')'; calc();});
  // <button id="mc" type="button" name="button">mc</button>
  var mc = document.querySelector('#mc');
  mc.addEventListener('click', function(){memory = 0;});
  // <button id="mPlus" type="button" name="button">m+</button>
  var mPlus = document.querySelector('#mPlus');
  mPlus.addEventListener('click', function(){
    memory = memory + Number(calc());
    console.log("MEM: "+memory);
  });
  // <button id="mMinus-2" type="button" name="button">m-</button>
  var mMinus = document.querySelector('#mMinus');
  mMinus.addEventListener('click', function(){
    memory = memory - Number(calc());
    console.log("MEM: " + memory);
  });
  // <button id="mr" type="button" name="button">mr</button>
  var mr = document.querySelector('#mr');
  mr.addEventListener('click', function(){input.value  += memory; calc();});
  //
  // <button id="second" type="button" name="button">2nd</button>
  var second = document.querySelector('#second');
  second.addEventListener('click', function(){
    if (alternate === false ) {
      alternate = true;
      second.style.background = "red";
      eSquared.innerHTML = 'y<sup>x</sup>';
      tenSquared.innerHTML = '2<sup>x</sup>';
      ln.innerHTML = 'log<sub>y</sub>';
      log.innerHTML = 'log<sub>2</sub>';
      sin.innerHTML = 'sin<sup>-1</sup>';
      cos.innerHTML = 'cos<sup>-1</sup>';
      tan.innerHTML = 'tan<sup>-1</sup>';
      sinh.innerHTML = 'sinh<sup>-1</sup>';
      cosh.innerHTML = 'cosh<sup>-1</sup>';
      tanh.innerHTML = 'tanh<sup>-1</sup>';
    } else {
      alternate = false;
      second.style.background = 'gray';
      eSquared.innerHTML = 'e<sup>x</sup>';
      tenSquared.innerHTML = '10<sup>x</sup>';
      ln.innerHTML = 'ln';
      log.innerHTML = 'log<sub>10</sub>';
      sin.innerHTML = 'sin';
      cos.innerHTML = 'cos';
      tan.innerHTML = 'tan';
      sinh.innerHTML = 'sinh';
      cosh.innerHTML = 'cosh';
      tanh.innerHTML = 'tanh';
    }
  });
  // <button id="X2" type="button" name="button">X2</button>
  var squared = document.querySelector('#squared');
  squared.addEventListener('click', function(){input.value  += '^2';});
  // <button id="X3" type="button" name="button">X3</button>
  var squared3 = document.querySelector('#squared-3');
  squared3.addEventListener('click', function(){input.value  += '^3';});
  // <button id="Xy" type="button" name="button">Xy</button>
  var squaredy = document.querySelector('#squared-y');
  squaredy.addEventListener('click', function(){input.value  += '^';});
  // <button id="eX" type="button" name="button">eX</button>
  var eSquared = document.querySelector('#e-squared');
  eSquared.addEventListener('click', function(){input.value  += 'e^';});
  // <button id="tenX" type="button" name="button">10X</button>
  var tenSquared = document.querySelector('#ten-squared');
  tenSquared.addEventListener('click', function(){input.value  += '10^';});

  // <button id="oneDividendX" type="button" name="button">1/X</button>
  var oneDivided = document.querySelector('#one-divided-x');
  oneDivided.addEventListener('click', function(){input.value  += '1/';});
  // <button id="twoSquareRootX" type="button" name="button">2SQX</button>
  var twoSquareRoot = document.querySelector('#two-squareroot-x');
  twoSquareRoot.addEventListener('click', function(){input.value  += '2sqrt(';});
  // <button id="threeSquareRootX" type="button" name="button">3SQX</button>
  var threeSquareRoot = document.querySelector('#three-squareroot-x');
  threeSquareRoot.addEventListener('click', function(){input.value  += '3sqrt(';});
  // <button id="ySquareRootX" type="button" name="button">2SQX</button>
  var ySquareRoot = document.querySelector('#y-squareRoot-x');
  ySquareRoot.addEventListener('click', function(){input.value  += 'sqrt(';});
  // <button id="ln" type="button" name="button">ln</button>
  var ln = document.querySelector('#ln');
  ln.addEventListener('click', function(){input.value  += 'ln(';});
  // <button id="logTen" type="button" name="button">log10</button>
  var log = document.querySelector('#log-ten');
  log.addEventListener('click', function(){input.value  += 'log(';});

  // <button id="XEsclamation" type="button" name="button">X!</button>
  var factor = document.querySelector('#factor');
  factor.addEventListener('click', function(){input.value  += '!';});
  // <button id="sin" type="button" name="button">sin</button>
  var sin = document.querySelector('#sin');
  sin.addEventListener('click', function(){input.value  += 'sin(';});
  // <button id="cos" type="button" name="button">cos</button>
  var cos = document.querySelector('#cos');
  cos.addEventListener('click', function(){input.value  += 'cos(';});
  // <button id="tan" type="button" name="button">tan</button>
  var tan = document.querySelector('#tan');
  tan.addEventListener('click', function(){input.value  += 'tan(';});
  // <button id="e" type="button" name="button">e</button>
  var e = document.querySelector('#e');
  e.addEventListener('click', function(){input.value  += 'e'; calc();});
  // <button id="EE" type="button" name="button">EE</button>
  var EEbutton = document.querySelector('#EE');
  EEbutton.addEventListener('click', function(){
    if (EEcalc === false) {
      EEcalc = true;
      EEbutton.style.background = "black";
    } else {
      EEcalc = false;
      EEbutton.style.background = "gray";
    }

  });
  // <button id="rad" type="button" name="button">Rad</button>
  var rad = document.querySelector('#rad');
  rad.addEventListener('click', function(){
    if (degreeType === 'Deg') {
      degreeType = 'Rad';
      rad.innerText = "Deg";
    } else {
      degreeType = 'Deg';
      rad.innerText = "Rad";
    }
  });
  // <button id="sinh" type="button" name="button">sinh</button>
  var sinh = document.querySelector('#sinh');
  sinh.addEventListener('click', function(){input.value  += 'sinh(';});
  // <button id="cosh" type="button" name="button">cosh</button>
  var cosh = document.querySelector('#cosh');
  cosh.addEventListener('click', function(){input.value  += 'cosh(';});
  // <button id="tanh" type="button" name="button">tanh</button>
  var tanh = document.querySelector('#tanh');
  tanh.addEventListener('click', function(){input.value  += 'tanh(';});
  // <button id="pi" type="button" name="button">π</button>
  var pi = document.querySelector('#pi');
  pi.addEventListener('click', function(){input.value  += 'π'; calc();});
  // <button id="rand" type="button" name="button">Rand</button>
  var rand = document.querySelector('#rand');
  rand.addEventListener('click', function(){
    input.value  += Math.random();
    calc();
  });

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
    var finalResult = 0;
    if(input.value === '') { // If the input is empty, we just set the result to 0;
      result.innerHTML = 0;
    } else {
      // Here we take out input field and split every character into the expression array;
      expression = input.value.split("");

      var combinedExpression = combineArray(expression);
      finalResult = orderOfOperations(combinedExpression);
      if (EEcalc === false) {
        result.innerHTML = finalResult;
      } else { //if EE mode is on.
        result.innerHTML = Number(finalResult).toExponential();
      }
    }
    if (finalResult.length > 50) {
      result.style.fontSize = '1rem';
    } else if (finalResult.length > 34) {
      result.style.fontSize = '2rem';
    } else if (finalResult.length > 15) {
      result.style.fontSize = '3rem';
    }
    return finalResult;
  } // End calc



  function combineArray(arr) {
    var outputArray = [];
    var numberCombiner = '';
    arr.forEach(function (item, index, array) { // Here we are combining the individual numbers in our array.
        if (isNaN(item)) {
          // If it's a '.' We still need to add it to the numberCombiner
          if (item === '.') {
            numberCombiner = numberCombiner + item;
            if (index === 0) { // If the user types '.' as the first thing, we want to replace that with 0.
              numberCombiner = '0.';
            }
          } else if (item === 'π'){
            if (numberCombiner === '') {
              outputArray.push(Math.PI);
            } else {
              outputArray.push(Number(numberCombiner)*Math.PI);
              numberCombiner = '';
            }

          } else if (item === 'e') {
            if (numberCombiner === '') {
              outputArray.push(Math.E);
            } else {
              outputArray.push(Number(numberCombiner)*Math.E);
              numberCombiner = '';
            }
          } else {

            if (numberCombiner !== '') {
              outputArray.push(numberCombiner);
            }
            outputArray.push(item);
            numberCombiner = '';
          }
        } else { // Else we add them to the numberCombiner
          numberCombiner = numberCombiner + item;
          if (index === array.length - 1) { // If the last item is a number, we just want to push it.
            outputArray.push(numberCombiner);
            numberCombiner = '';
          }
        }
    });
    return outputArray;
  }



//   OOOOOOOOO          OOOOOOOOO             CCCCCCCCCCCCC
// OO:::::::::OO      OO:::::::::OO        CCC::::::::::::C
// OO:::::::::::::OO  OO:::::::::::::OO    CC:::::::::::::::C
// O:::::::OOO:::::::OO:::::::OOO:::::::O  C:::::CCCCCCCC::::C
// O::::::O   O::::::OO::::::O   O::::::O C:::::C       CCCCCC
// O:::::O     O:::::OO:::::O     O:::::OC:::::C        CCCCCC
// O:::::O     O:::::OO:::::O     O:::::OC:::::C        CCCCCC
// O:::::O     O:::::OO:::::O     O:::::OC:::::C        CCCCCC
// O:::::O     O:::::OO:::::O     O:::::OC:::::C        CCCCCC
// O:::::O     O:::::OO:::::O     O:::::OC:::::C        CCCCCC
// O:::::O     O:::::OO:::::O     O:::::OC:::::C        CCCCCC
// O::::::O   O::::::OO::::::O   O::::::O C:::::C       CCCCCC
// O:::::::OOO:::::::OO:::::::OOO:::::::O  C:::::CCCCCCCC::::C
// OO:::::::::::::OO  OO:::::::::::::OO    CC:::::::::::::::C
// OO:::::::::OO      OO:::::::::OO        CCC::::::::::::C
//   OOOOOOOOO          OOOOOOOOO             CCCCCCCCCCCCC


function orderOfOperations(arr) {
  arr = scienceCalc(arr);
  // parenthesis
  arr = parenthesis(arr);
  // Calculate ^ and sqr
  arr = exponentsAndSqrt(arr);
  // Calculate * & /
  arr = multiplyAndDivide(arr);
  // Calculate + and -
  return plusAndMinus(arr);
}












// TODO Most of these can be replaced by a single function which takes the name of the function and the array as arguments
function scienceCalc(arr) {
  var arrAsString = arr.join('');
  var regExp = '';
  var testArray = [];
  var indexesToSplice = 0;

  // Factorial
  while (arr.indexOf("!") >= 0) { // If the expression contains log
    var factorIndex = arr.indexOf("!");
    var factor = arr[arr.indexOf("!")-1];
    var factorArray = [];
    while (factor > 0) {
      factorArray.push(String(factor));
      factorArray.push('*');
      factor--;
    }
    factorArray.pop();
    var factorResult = orderOfOperations(factorArray);
    arr.splice(factorIndex-1, 2); // Remove the !

    if (arr.length === 0) {
      arr.push(factorResult);
    } else if (factorIndex - 1 === 0) {
      arr.unshift(factorResult);
    } else {
      arr.splice(factorIndex - 1, 0, factorResult);
    }
  }


  // LOG
  while (arrAsString.indexOf("log(") >= 0) { // If the expression contains log
    console.log("=== LOG ===");
    regExp = '(log)\(([^)]+)\)';
    var log = arrAsString.match(regExp)[2];
    testArray = log.split('');
    testArray.shift(); // Remove a leftover parenthesis at the beginning
    testArray = combineArray(testArray);
    indexesToSplice = testArray.length;
    var logResult = orderOfOperations(testArray);
    logResult = Math.log10(logResult);

    var logIndex = arr.indexOf('l');
    if (logIndex >= 0 && arr[logIndex+1] === 'o' && arr[logIndex+2] === 'g'){
      arr.splice(logIndex, indexesToSplice + 3);
      arr.splice(logIndex, 0, logResult);
    } else {
      console.log("========================");
      console.log("Couldn't find log");
      console.log("========================");
      break;
    }
    arrAsString = arr.join(''); // Reset arrAsString
  }



  // LN
  while (arrAsString.indexOf("ln(") >= 0) { // If the expression contains ln
    console.log("=== LN ===");
    regExp = '(ln)\(([^)]+)\)';
    var ln = arrAsString.match(regExp)[2];
    testArray = ln.split('');
    testArray.shift(); // Remove a leftover parenthesis at the beginning
    testArray = combineArray(testArray);
    indexesToSplice = testArray.length;
    var lnResult = orderOfOperations(testArray);
    lnResult = Math.log(lnResult);

    var lnIndex = arr.indexOf('l');
    if (lnIndex >= 0 && arr[lnIndex+1] === 'n') {
      arr.splice(lnIndex, indexesToSplice + 3);
      arr.splice(lnIndex, 0, lnResult);
    } else {
      console.log("========================");
      console.log("Couldn't find ln");
      console.log("========================");
      break;
    }
    arrAsString = arr.join(''); // Reset arrAsString
  }



  while (arrAsString.indexOf("sin(") >= 0 ) { // If the expression contains sin
    console.log("=== SIN ===");
    regExp = '(sin)\(([^)]+)\)';
    var sin = arrAsString.match(regExp)[2];
    testArray = sin.split('');
    testArray.shift(); // Remove a leftover parenthesis at the beginning
    testArray = combineArray(testArray);
    indexesToSplice = testArray.length;
    var sinResult = orderOfOperations(testArray);
    sinResult = Math.sin(sinResult);

    var sinIndex = arr.indexOf('s');
    if (sinIndex >= 0 && arr[sinIndex+1] === 'i' && arr[sinIndex+2] === 'n' && arr[sinIndex+3] === '(') {
      arr.splice(sinIndex, indexesToSplice + 3);
      arr.splice(sinIndex, 0, sinResult);
    } else {
      console.log("========================");
      console.log("Couldn't find the Sinus");
      console.log("========================");
      break;
    }
    arrAsString = arr.join(''); // Reset arrAsString
  }
  while (arrAsString.indexOf("cos(") >= 0) { // If the expression contains sin
    console.log("=== COS ===");
    regExp = '(cos)\(([^)]+)\)';
    var cos = arrAsString.match(regExp)[2];
    testArray = cos.split('');
    testArray.shift(); // Remove a leftover parenthesis at the beginning
    testArray = combineArray(testArray);
    indexesToSplice = testArray.length;
    var cosResult = orderOfOperations(testArray);
    cosResult = Math.cos(cosResult);

    var cosIndex = arr.indexOf('c');
    if (cosIndex >= 0 && arr[cosIndex+1] === 'o' && arr[cosIndex+2] === 's' && arr[cosIndex+3] === '(') {
      arr.splice(cosIndex, indexesToSplice + 3);
      arr.splice(cosIndex, 0, cosResult);
    } else {
      console.log("========================");
      console.log("Couldn't find the Cosinus");
      console.log("========================");
      break;
    }
    arrAsString = arr.join(''); // Reset arrAsString
  }
  while (arrAsString.indexOf("tan(") >= 0) { // If the expression contains sin
    console.log("=== TAN ===");
    regExp = '(tan)\(([^)]+)\)';
    var tan = arrAsString.match(regExp)[2];
    testArray = tan.split('');
    testArray.shift(); // Remove a leftover parenthesis at the beginning
    testArray = combineArray(testArray);
    indexesToSplice = testArray.length;
    var tanResult = orderOfOperations(testArray);
    tanResult = Math.tan(tanResult);

    var tanIndex = arr.indexOf('t');
    if (tanIndex >= 0 && arr[tanIndex+1] === 'a' && arr[tanIndex+2] === 'n' && arr[tanIndex+3] === '(') {
      arr.splice(tanIndex, indexesToSplice + 3);
      arr.splice(tanIndex, 0, tanResult);
    } else {
      console.log("========================");
      console.log("Couldn't find the Tangent");
      console.log("========================");
      break;
    }
    arrAsString = arr.join(''); // Reset arrAsString
  }





  // sinH, cosH, tanh
  while (arrAsString.indexOf("sinh(") >= 0 ) { // If the expression contains sin
    console.log("=== SINH ===");
    regExp = '(sinh)\(([^)]+)\)';
    var sinh = arrAsString.match(regExp)[2];
    testArray = sinh.split('');
    testArray.shift(); // Remove a leftover parenthesis at the beginning
    testArray = combineArray(testArray);
    indexesToSplice = testArray.length;
    var sinhResult = orderOfOperations(testArray);
    sinhResult = Math.sinh(sinhResult);

    var sinhIndex = arr.indexOf('s');
    if (sinhIndex >= 0 && arr[sinhIndex+1] === 'i' && arr[sinhIndex+2] === 'n' && arr[sinhIndex+3] === 'h' && arr[sinhIndex+4] === '(') {
      arr.splice(sinhIndex, indexesToSplice + 4);
      arr.splice(sinhIndex, 0, sinhResult);
    } else {
      console.log("========================");
      console.log("Couldn't find the Sinus");
      console.log("========================");
      break;
    }
    arrAsString = arr.join(''); // Reset arrAsString
  }
  while (arrAsString.indexOf("cosh(") >= 0) { // If the expression contains sin
    console.log("=== COSH ===");
    regExp = '(cosh)\(([^)]+)\)';
    var cosh = arrAsString.match(regExp)[2];
    testArray = cosh.split('');
    testArray.shift(); // Remove a leftover parenthesis at the beginning
    testArray = combineArray(testArray);
    indexesToSplice = testArray.length;
    var coshResult = orderOfOperations(testArray);
    coshResult = Math.cosh(coshResult);

    var coshIndex = arr.indexOf('c');
    if (coshIndex >= 0 && arr[coshIndex+1] === 'o' && arr[coshIndex+2] === 's' && arr[coshIndex+3] === 'h' && arr[coshIndex+4] === '(') {
      arr.splice(coshIndex, indexesToSplice + 4);
      arr.splice(coshIndex, 0, coshResult);
    } else {
      console.log("========================");
      console.log("Couldn't find the Cosinus");
      console.log("========================");
      break;
    }
    arrAsString = arr.join(''); // Reset arrAsString
  }
  while (arrAsString.indexOf("tanh(") >= 0) { // If the expression contains sin
    console.log("=== TANh ===");
    regExp = '(tanh)\(([^)]+)\)';
    var tanh = arrAsString.match(regExp)[2];
    testArray = tanh.split('');
    testArray.shift(); // Remove a leftover parenthesis at the beginning
    testArray = combineArray(testArray);
    indexesToSplice = testArray.length;
    tanhResult = orderOfOperations(testArray);
    tanhResult = Math.tanh(tanhResult);

    var tanhIndex = arr.indexOf('t');
    if (tanhIndex >= 0 && arr[tanhIndex+1] === 'a' && arr[tanhIndex+2] === 'n' && arr[tanhIndex+3] === 'h' && arr[tanhIndex+4] === '(') {
      arr.splice(tanhIndex, indexesToSplice + 4);
      arr.splice(tanhIndex, 0, tanhResult);
    } else {
      console.log("========================");
      console.log("Couldn't find the Tangenth");
      console.log("========================");
      break;
    }
    arrAsString = arr.join(''); // Reset arrAsString
  }
  return arr;
}
















function parenthesis(arr) {
  var arrAsString = arr.join('');
  while (arr.indexOf("(") >= 0 && arr.indexOf(")") >= 0) { // If the expression contains a (
    console.log('=== () ===');
    if (arr[arr.indexOf('(') - 4] === 's' && arr[arr.indexOf('(') - 3] === 'q' && arr[arr.indexOf('(') - 2] === 'r' && arr[arr.indexOf('(') - 1] === 't') {
      console.log("found SQRT exception");
      break;
    }
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(arrAsString); // This will throw an error if there's no ending parenthesis
    var testArray = matches[1].split("");
    testArray = combineArray(testArray);
    testArray = multiplyAndDivide(testArray);
    var parenthesisResult = plusAndMinus(testArray);
    if (testArray.indexOf("(") >= 0) { // If there are nested parenthesis
      console.log("ERROR: No support for nested parentheses yet.");
      // TODO allow nested parentheses
    } else {
      // Splice arr starting at the first '(' and ending at the first '('
      var indexesToSplice = arr.indexOf(")") - arr.indexOf("(");
      var insertAtIndex = arr.indexOf("(");
      arr.splice(insertAtIndex, indexesToSplice + 1);
      arr.splice(insertAtIndex, 0, parenthesisResult);
    }
  }
  return arr;
}




function exponentsAndSqrt(arr) {
  var exponentResult = 0;
  var arrAsString = arr.join('');
  // Multiplication and Dividends
  while (arr.indexOf('^') >= 0 || arrAsString.indexOf('sqrt') >= 0) {
    var exponentIndex = arr.indexOf('^');
    var sqrtIndex = arrAsString.indexOf('sqrt');
    if (exponentIndex > sqrtIndex) { // If exponent comes first
      exponentResult = Math.pow(Number(arr[exponentIndex-1]), Number(arr[exponentIndex+1]));
      arr.splice(exponentIndex + 1, 1);
      arr.splice(exponentIndex, 1);
      arr.splice(exponentIndex - 1, 1);
      // Splice can't be used if the array is empty, so we need to test this.
      if (arr.length === 0) {
        arr.push(exponentResult);
      } else if (exponentIndex - 1 === 0) {
        arr.unshift(exponentResult);
      } else {
        arr.splice(exponentIndex - 1, 0, exponentResult);
      }
    } else { // If sqrt comes first
      console.log("=== SQRT ===");
      regExp = '(sqrt)\(([^)]+)\)';
      var sqrt = arrAsString.match(regExp)[2];
      testArray = sqrt.split('');
      testArray.shift(); // Remove a leftover parenthesis at the beginning
      testArray = combineArray(testArray);
      indexesToSplice = testArray.length;
      var sqrtResult = orderOfOperations(testArray);
      sqrtResult = Math.sqrt(sqrtResult);
      if (!isNaN(Number(arr[arrAsString.indexOf('sqrt') -1]))) { // If the squaretoor is preceeded by a number
        console.log('PRECEEDED BY NUM');
        sqrtResult = Math.sqrt(sqrtResult) * arr[arrAsString.indexOf('sqrt') -1];
      }
      console.log('RESULT: ' + sqrtResult);


      sqrtIndex = arr.indexOf('s');
      if (sqrtIndex >= 0 && arr[sqrtIndex+1] === 'q' && arr[sqrtIndex+2] === 'r' && arr[sqrtIndex+3] === 't' && arr[sqrtIndex+4] === '(' && !isNaN(arr[sqrtIndex-1])) {
        console.log('success?');
        sqrtResult = Math.sqrt(sqrtResult) * arr[arrAsString.indexOf('sqrt') -1];
        arr.splice(sqrtIndex - 1, indexesToSplice + 6);
        arr.splice(sqrtIndex -1, 0, sqrtResult);
      } else if (sqrtIndex >= 0 && arr[sqrtIndex+1] === 'q' && arr[sqrtIndex+2] === 'r' && arr[sqrtIndex+3] === 't' && arr[sqrtIndex+4] === '('){
        arr.splice(sqrtIndex, indexesToSplice + 5);
        arr.splice(sqrtIndex, 0, sqrtResult);
      } else {
        console.log("========================");
        console.log("Couldn't find sqrt");
        console.log("========================");
        break;
      }
      arrAsString = arr.join(''); // Reset arrAsString
    }
  }
  return arr;
}











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
    return arr;
  }




  function plusAndMinus(arr) {
    // Reset values
    var number1 = '';
    var op = '';
    // Loop through array and calculate left to right.
    arr.forEach(function (item, index, array) {
      if (array.length === 1) {
        result.innerHTML = item;
      }
      if (index === 0 && !isNaN(item)) {
        number1 = item;
      } else if (isNaN(item)) {
        op = item;
      } else {
        number2 = item;
        // ----------------------------------
        //   LAST ADDITION AND SUBTRACTION
        // ----------------------------------
        if (op === '+') {
          number1 = Number(number1) + Number(number2);
          result.innerHTML = number1;
        } else if (op === '-') {
          number1 = Number(number1) - Number(number2);
          result.innerHTML = number1;
        } else {
          console.log("========================");
          console.log("ERROR: Unknown operator: " + op);
          console.log("========================");
        }
      }
    }); // End Loop
    return number1;
  }








}; // End window.onload
