let num = 0

for (num=1; num <101; num++){
    if ((num % 3) === 0) {
        console.log('fizz')
    }else if ((num % 5) === 0) {
        console.log('buzz')
    }else if ((num % 15) === 0) {
        console.log('fizz buzz')
    } else {
        console.log(num+1)
    }

}


