// console.log("destructuring");

// // note object representation - object {}
// const person = {
//     name: 'Mike',
//     age: 36,
//     location: {
//         city: 'New York',
//         temp: 88
//     }
// };

// // destructuring object creates variables from object
// // instead of using . notation
// // = sets default
// // : renames the variable
// const {name = 'Anonymous', age} = person;
// const {city, temp: temperature} = person.location

// console.log(`${name} is ${age}`);

// if (city && temperature) {
//     console.log(`It is ${temperature} in ${city}`);
// }
// const book = {
//     name: 'Water Heater',
//     author: 'Server',
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const {name: publisherName = 'Self-Published'} = book.publisher;
// console.log(publisherName);

//Array destructuring
const address = ['22 S Lincoln', 'New York', 'New York'];
// array of ordered list variables to match array
const [street, city, state] = address;
console.log(`You are in ${city} ${state}`);

const item = ['Hot Coffee', '2.00', '2.50', '2.75'];
const [coffee, sprice, mprice, lprice] = item;
console.log(`Your ${coffee} costs ${mprice}`);