//this is where ill push all the new button press info
//once we see an '=' then we will have to evaluate the elements of the stack using BEDMAS
class Stack {
    constructor() {
        this.data = [];
        this.top = 0;
    }
    push (element) {
        this.data[this.top] = element;
        this.top = this.top + 1;
    }
    length() {
        return this.top;
    }
    peek() {
        if(this.isEmpty() === false){
            return this.data[this.top -1];
        }
    }
    peekTwo() {
        if(this.length() >= 2){
            return this.data[this.top-2];
        }
    }

    isEmpty() {
        return this.top === 0;
    }
    pop () {
        if( this.isEmpty() === false){
            this.top = this.top -1; 
            return this.data.pop();
        }
    }
    print() {
        let top = this.top -1;

        while( top >= 0){
            console.log(this.data[top]);
            top --;
        }
    }

    clear() {
        //destroys everything in the stack... be careful.
        while(this.isEmpty() === false){
            this.pop();
        }
    }
}

// this takes in the current stack, and will evaluate 
// function Evaluate(buttonStack){
function Evaluate(){

    let result;
    let lastIn;
    let operator;
    let firstIn;
    if(buttonStack.length() === 3){
        lastIn = buttonStack.pop();
        operator = buttonStack.pop();
        firstIn = buttonStack.pop();
        if(isNaN(lastIn) || isNaN(firstIn)){
            console.log('something is wrong... i think that two operators may have been pushed back to back,' + 
            ' may also get this message if operator then backspace pressed');
        }
    }
    else{
        if(buttonStack.length() < 3){
            //not enough things to evaluate so just ignore the call to evaluate
            //this will happen if the user does something like 1 + = 
            return;
        }
        //dont have enough things to evaluate.
        console.log("not exactly 3 things in my stack so ill print to show you ");
        buttonStack.print();
        return 0;
    }

    switch(operator){
        case '+':
            result = Addition(firstIn, lastIn);
            break;

        case '-':
            result = Subtraction(firstIn, lastIn)
            break;
        
        case '*':
            result = Multiplication(firstIn, lastIn);
            break;

        case '/':
            result = Division(firstIn, lastIn);
            break;
    }
    buttonStack.push(result);



    return 1;
}


//this should handle everything that comes up on the display.
function Display(){
    let display = document.querySelector('.calculator-display');
    if(buttonStack.peek() === undefined){
        // this placeholder keeps the display the same size.
        display.innerText = 'Nothing to see here...';
        display.style.color = '#AAAAAE';
    }else{
        display.style.color = 'white';
        if(isNaN(buttonStack.peek())){
            //want to ignore displaying operators on the screen. peek 2 deep to get the last number.
            display.innerText = buttonStack.peekTwo();
        }else {
            display.innerText = buttonStack.peek();
        }
        
    }

}


//function ButtonPress (whichButton, buttonStack){
function ButtonPress (whichButton){

    //if we have a full expression and another operator is pressed, we want to evaluate the first part before moving on.
    let operators = ['+', '-', '*', '/'];
    let isOperator = operators.indexOf(whichButton);
    if(buttonStack.length() >= 3 && isOperator >= 0){

        // if(let isOperator = operators.indexOf(whichButton)){
        //     console.log(whichButton);
        // }
    //if(buttonStack.length() >= 3 && operators.indexOf(whichButton)){
        let didEval = Evaluate(buttonStack);
        if(!didEval){
            console.log('received error from evaluate');
        }
        
        Display();
        buttonStack.push(whichButton);

    }
    if(isNaN(whichButton)){
        if(isNaN(buttonStack.peek()) && isOperator >= 0){
            //don't want two operators in a row...
            //this gets weird when we want to clear or backspace
            return null;
        }
        switch(whichButton){
            case '=':
                let didEval = Evaluate(buttonStack);
                if(!didEval){
                    console.log('received an error from evaluate');
                }
                break;

            case 'clear':
                buttonStack.clear();
                break;
            case 'backspace': 
                let backspaceResult = doBackSpace(buttonStack);
                //this deletes the last single character input
                //for example it would delete a + or a *, but if it were a number input such as 623,
                //backspace would only delete the last character leaving us 62
                break;
            case '.':
                alert('i dont do decimals yet...');
                break;
            default:
                buttonStack.push(whichButton);
                break;


        }
    }else {
        //it is a number and should be concatenated to the previous number if there are any.
        if(isNaN(buttonStack.peek())){
            //then the previously pressed button was not a number.
            // and should not do the concatenation.
            buttonStack.push(whichButton);
        }else{
            //have to do this conversion between int/string/int so that it concatenates rather than adding together.
            let concatenatedNum = "" + buttonStack.pop() + whichButton;
            buttonStack.push(parseInt(concatenatedNum));   
        }

    }
    Display(buttonStack);
}


//rounds numbers to 2 decimal points
function Addition (a, b) {
    // return (parseInt(a) + parseInt(b));
    a = parseFloat(a);
    b = parseFloat(b);

    let result = a + b;
    result = Math.round((result * 100 ));
    return result/100;

}

function Subtraction (a, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    let result = a - b;
    result = Math.round((result * 100 ));
    return (result /100);
}

function Division (a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if(b === 0){
        //dont divide by zero plz
        alert("You suck, dont divide by 0");
        return '';
    }
    let result = a / b;
    result = Math.round((result * 100 ));
    // not sure why this didnt want to work when the *100 and /100 were in the same line... 
    return (result/ 100);
}

function Multiplication (a, b){
    a = parseFloat(a);
    b = parseFloat(b);

    let result = a * b;
    result = Math.round((result * 100 ));
    return (result /100);
}

//returnss 0 if it took off an operator
//returns 1 if it shortened a number
function doBackSpace(){

    let prev = buttonStack.peek();
    if(isNaN(prev)){
        //last thing is not a number so just pop it off and forget about it.
        console.log('deleting '  + buttonStack.pop());
        return 0;
    }else{
        console.log(prev);
        //it is a number... want to just take off the last digit.
        prev = prev.toString();
        prev = prev.substring(0, prev.length -1);
        buttonStack.push(prev);
        return 1;
    }
}

// //this should give us a fresh stack to start pushing things into.
// function Clear () {
//     let buttonStack = new Stack ();
//     console.log(buttonStack.peek());
//     return(buttonStack);
// }

//create a new stack, and setup the calculator for input
let buttonStack = new Stack ();

//run the display.
Display();

// button listeners below:

//numbers in order they appear on the screen
let seven = document.getElementById('seven').addEventListener('click', () => ButtonPress(7, buttonStack));
let eight = document.getElementById('eight').addEventListener('click', () =>ButtonPress(8, buttonStack));
let nine = document.getElementById('nine').addEventListener('click', () => ButtonPress(9, buttonStack));

let four = document.getElementById('four').addEventListener('click', () => ButtonPress(4, buttonStack));
let five = document.getElementById('five').addEventListener('click', () =>ButtonPress(5, buttonStack));
let six = document.getElementById('six').addEventListener('click', () =>ButtonPress(6, buttonStack));

let one = document.getElementById('one').addEventListener('click', () => ButtonPress(1, buttonStack));
let two = document.getElementById('two').addEventListener('click', () => ButtonPress(2, buttonStack));
let three = document.getElementById('three').addEventListener('click', () => ButtonPress(3, buttonStack));

let zero = document.getElementById('zero').addEventListener('click', () => ButtonPress(0, buttonStack));

//operators in order they appear on the screen.

let divide = document.getElementById('divide').addEventListener('click', () => ButtonPress('/', buttonStack));
let multiply = document.getElementById('multiply').addEventListener('click', () => ButtonPress('*', buttonStack));
let subtract = document.getElementById('subtract').addEventListener('click', () => ButtonPress('-', buttonStack));
let add = document.getElementById('add').addEventListener('click', () => ButtonPress('+', buttonStack));

//all other buttons below:

let decimal  = document.getElementById('decimal').addEventListener('click', () => ButtonPress('.', buttonStack));
let backSpace  = document.getElementById('backspace').addEventListener('click', () => ButtonPress('backspace', buttonStack));
let clear  = document.getElementById('clear').addEventListener('click', () => ButtonPress('clear', buttonStack));
let equals  = document.getElementById('equals').addEventListener('click', () => ButtonPress('=', buttonStack));
