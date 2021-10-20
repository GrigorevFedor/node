const colors = require('colors');
const n = +process.argv[2];
if (!n) {
    console.log(colors.red('mismatch arg'));
    return;
}
let curColor = 0;
const simpleArr = simple(n);
if (simpleArr.length == 0) {
    console.log(colors.red('try one more time'));
}
else {
    simpleArr.forEach((el)=>{
        switch (curColor){ 
            case 0:
                console.log(colors.red(el));
                curColor++;
                break;
            case 1:
                console.log(colors.yellow(el));
                curColor++;
                break;
            case 2:
                console.log(colors.green(el));
                curColor=0;
                break;
        }
    
    })
}    

function simple(n) {
    var array = [], limit = Math.sqrt(n), result = [];

    for (var i = 2; i < n; i++) {
        array.push(true);
    }

    for (var i = 2; i <= limit; i++) {
        if (array[i]) {
            for (var j = i * i; j < n; j += i) {
                array[j] = false;
            }
        }
    }

    for (var i = 2; i < n; i++) {
        if (array[i]) {
            result.push(i);
        }
    }

    return result;
}