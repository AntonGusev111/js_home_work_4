const rl = require('readline').createInterface(process.stdin, process.stdout)
const fs = require('node:fs');
let count = attempts();
const hidden = getRandomInt();

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
    if (userValue == 'q'){
        return false
    }
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


function question (quest) {
    let counter = count();
    return new Promise ((resolve, reject) => {
        rl.question(quest, (userValue) =>{
            let programAnswer = mainFunc(hidden, userValue);
            logger(counter, hidden, userValue, programAnswer);
            console.log('try '+counter)
            if (programAnswer == true){
                resolve ('You Win!');
            } if (programAnswer == false){
                resolve ('You lose!')
            }
            resolve(programAnswer);
        } )
    })
}

async function input() {
    while (true) {
        const userValue = await question('input number- ');
        console.log(userValue);
        if (userValue == 'You Win!' || userValue == 'You lose!'){
            rl.close();
            break;
        }
    }
}

input()