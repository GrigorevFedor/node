// По ссылке вы найдете файл с логами запросов к серверу весом более 2 Гб.
// Напишите программу, которая находит в этом файле все записи с ip - адресами 89.123.1.41 и 
// 34.48.240.111, а также сохраняет их в отдельные файлы с названием “% ip - адрес % _requests.log”.

const fs = require('fs');
const { Transform } = require('stream');
const readline = require('readline');

const ACCESS_LOG = './access.log';
if (fs.existsSync('%89.123.1.41% _requests.log')) {
    fs.unlink('%89.123.1.41% _requests.log', (err) => {
        if (err) throw err;
        console.log(' % 89.123.1.41 % _requests.log Deleted');
    })
}
if (fs.existsSync('%34.48.240.111% _requests.log')) {
    fs.unlink('%34.48.240.111% _requests.log', (err) => {
        if (err) throw err;
        console.log(' % 34.48.240.111 % _requests.log Deleted');
    })
}

const readStream = fs.createReadStream(ACCESS_LOG);

// readStream.on('data', (chunk) => {
//     if (chunk.toString().search(/89.123.1.41.*/gm) >= 0) {
//         console.log(chunk.toString() + '\n');
// fs.writeFile('%89.123.1.41% _requests.log',
//     chunk.toString() + '\n',
//     {
//         encoding: 'utf-8',
//         flag: 'a',
//     },
//     (err) => console.log(err));
// }
// if (chunk.toString().search(/34.48.240.111.*/gm) >= 0) {
//     fs.writeFile('%34.48.240.111% _requests.log',
//         chunk.toString() + '\n',
//         {
//             encoding: 'utf-8',
//             flag: 'a',
//         },
//         (err) => console.log(err));
// }

// console.log('Current chunk:', chunk);

// });

const file = readline.createInterface({
    input: fs.createReadStream(ACCESS_LOG),
    output: process.stdout,
    terminal: false
});

file.on('line', (line) => {
    if (line.toString().search(/89.123.1.41.*/gm) >= 0) {
        console.log(line.toString() + '\n');
        fs.writeFile('%89.123.1.41% _requests.log',
            line.toString() + '\n',
            {
                encoding: 'utf-8',
                flag: 'a',
            },
            (err) => console.log(err));
    }
    if (line.toString().search(/34.48.240.111.*/gm) >= 0) {
        fs.writeFile('%34.48.240.111% _requests.log',
            line.toString() + '\n',
            {
                encoding: 'utf-8',
                flag: 'a',
            },
            (err) => console.log(err));
    }
});

// // const t = '176.212.24.22 - -[30 / Jan / 2021: 11: 11: 25 - 0300] "GET /boo HTTP/1.1" 404 0 "-" "curl/7.47.0"';
// // console.log(t.match(/176.212.24.22.*/gm));

