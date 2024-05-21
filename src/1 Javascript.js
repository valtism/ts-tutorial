// Typescript works in JS code too

const Person = {
  name: "John",
  sayHi: () => {
    console.log("Hi");
  },
};

Person.name;
//      ^?
Person.sayHi();
//      ^?
