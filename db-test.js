const Database = require('./db');
const db = Database({ devMode: true })

const first = db.from('users').where('age', 'what').run();
const second = db.from('users').insert({ age: '12121' }).run();
const third = db.from('users').where('age', '12121').run();
const fourth = db.from('users').where('age', '2').run();
const fifth = db.from('users').where().run();
const last = db.raw('FROM USERS INSERT {"what":"the"} ').run()

console.log(first);
console.log(second);
console.log(third);
console.log(fourth);
console.log(fifth);
console.log(last)