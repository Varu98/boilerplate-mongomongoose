require("dotenv").config();
const mongoose = require("mongoose");
let PersonModel = require("./models/person");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log(err);
  });

let Person = PersonModel;

let person = new Person({
  name: "John Doe",
  age: 35,
  favouriteFoods: ["idli", "sambhar"],
});

const createAndSavePerson = (done) => {
  let person = new Person({
    name: "John Doe",
    age: 35,
    favouriteFoods: ["idli", "sambhar"],
  });
  person.save(function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const createManyPeople = async (arrayOfPeople, done) => {
  try {
    const result = await Person.create(arrayOfPeople);
    done(null, result);
  } catch (error) {
    done(error);
  }
};

const findPeopleByName = async (personName, done) => {
  try {
    const data = await Person.find({ name: personName });

    done(null, data);
  } catch (error) {
    done(error);
  }
};

const findOneByFood = function (food, done) {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = function (personId, done) {
  Person.findById(personId, function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  });
};

const findEditThenSave = function (personId, done) {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    data.favoriteFoods.push(foodToAdd);
    data.save((err, updatedPerson) => {
      if (err) return console.log(err);

      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, updatedPerson) {
      if (err) done(err);
      done(null, updatedPerson);
    }
  );
};

const removeById = function (personId, done) {
  Person.findByIdAndRemove(personId, function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  });
};

const removeManyPeople = function (done) {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  });
};
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function (err, data) {
      if (err) return console.log(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
