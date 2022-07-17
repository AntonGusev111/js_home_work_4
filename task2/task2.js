const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });
const hidden = getRandomInt();
const fs = require('node:fs');
let count = attempts();

function getRandomInt() {
    return Math.floor(Math.random() * 100);
  }

function attempts (){
    let count = 0
    return function counter() {
        return count +=  1;
    }
}

function promt(hiddenValue, userValue) {
    if (hiddenValue > userValue){
        return "hidden number is biger";
    } if (hiddenValue < userValue) {
        return "hidden number is smaller"
    }
}

function mainFunc(hidden, userValue) {
    if (isNaN(userValue) === true){
        return 'it is not number'
    }
    if (hidden != userValue){
        return promt(hidden, userValue)
    }
    if (hidden == userValue){
        return true
    }
}

function logger(counter, hidden, answer, programAnswer) {
    const separator = ";"
    const logData = [
        {counter: counter, hidden: hidden, answer:answer, programAnswer: programAnswer},
    ]
    fs.appendFileSync("log.csv", logData.map(row=> 
        `\n${row.counter}${separator}${row.hidden}${separator}${row.answer}${separator}${row.programAnswer}`)
        .join("\n"))
}


function question () {
    let main =  rl.question("input you'r number- ", (answer) => {
        let counter = "try " + count()
        let programAnswer = mainFunc(hidden,answer)
        logger(counter,hidden,answer,programAnswer)
        console.log(counter)
        if (programAnswer == true){
            console.log('You win!')
            return rl.close();   
        }
        if (answer == 'q'){
            console.log('you false')
            return rl.close();
        }
        console.log(programAnswer);
        question();
    });
}

question()