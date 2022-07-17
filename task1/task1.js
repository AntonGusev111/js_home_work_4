function getPasswordChecker(password){
    return function check (checkPass) {
      if (password == checkPass){
          return true
      } else {
        return false
      }
    }
}

const pass = getPasswordChecker(1232);
console.log(pass(1232))
