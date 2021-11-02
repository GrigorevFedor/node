// 1) Решите задачу по выводу данных в консоль.

// console.log('Record 1');

// setTimeout(() => {
//     console.log('Record 2');
//     Promise.resolve().then(() => {
//         setTimeout(() => {
//             сonsole.log('Record 3');
//             Promise.resolve().then(() => {
//                 console.log('Record 4');
//             });
//         });
//     });
// });

// console.log('Record 5');

// Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6')));

// 1 - tick 1 poll
// 5 - tick 1 poll
// 6 - tick 1 close callbacks
// 2 - tick 2 timers
// 3 - tick 3 timers
// 4 - tick 3 close callbacks

// 2) Напишите программу, которая будет принимать на вход 
// несколько аргументов: дату и время в формате 
// «час - день - месяц - год». Задача программы — 
// создавать для каждого аргумента таймер с обратным 
// отсчётом: посекундный вывод в терминал состояния 
// таймеров(сколько осталось).По истечении какого - 
// либо таймера, вместо сообщения о том, сколько осталось, 
// требуется показать сообщение о завершении его работы.
// Важно, чтобы работа программы основывалась на событиях.

// $ node index.js 01-04-26-10-2021 01-24-27-10-2021

const luxon = require('luxon')

const t1 = process.argv[2].split('-')
const t2 = process.argv[3].split('-')

let d1 = luxon.DateTime.fromISO(t1[4] + '-' + t1[3] + '-' + t1[2] + 'T' + t1[0] + ':' + t1[1]);
let d2 = luxon.DateTime.fromISO(t2[4] + '-' + t2[3] + '-' + t2[2] + 'T' + t2[0] + ':' + t2[1]);

const now = luxon.DateTime.now();

let dur1 = luxon.Duration.fromMillis(d1 - now).shiftTo('years', 'months', 'days', 'minutes', 'seconds');
let dur2 = luxon.Duration.fromMillis(d2 - now).shiftTo('years', 'months', 'days', 'minutes', 'seconds');

const EventEmitter = require('events');
const emitter = new EventEmitter();

const run = async (timer) => {
    const delay = 1000;
    timer.dur = timer.dur.minus({ seconds: 1 }).shiftTo('years', 'months', 'days', 'minutes', 'seconds').normalize();

    emitter.emit('print', timer);
    await new Promise(resolve => setTimeout(resolve, delay));
    console.clear();
    await run(timer);
}

class Handlers {
    static printTime(timer) {
        if (timer.dur.toMillis() > 0) {
            console.log(timer.name + ': seconds:' + Math.floor(timer.dur.seconds) + ' minutes:' + timer.dur.minutes + ' hours:' + timer.dur.hours + ' days:' + timer.dur.days + ' months:' + timer.dur.months + ' years:' + timer.dur.years);
        }
        else {
            console.log(timer.name + ': time is up');
        }
    }
}

emitter.on('print', Handlers.printTime);

run({ name: 'timer1', dur: dur1 });
run({ name: 'timer2', dur: dur2 });