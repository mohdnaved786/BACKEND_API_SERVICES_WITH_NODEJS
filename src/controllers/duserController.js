const DummyUser = require("../models/DummyUser");
const { faker } = require("@faker-js/faker");

const createDummyUsers = async (req, res) => {
  try {
    const users = [];

    for (let i = 0; i < 100; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const fullName = `${firstName} ${lastName}`;

      users.push({
        name: fullName,
        email: faker.internet.email({ firstName, lastName }),
        mobile: faker.phone.number("+91-##########"),
        dob: faker.date.birthdate({ min: 18, max: 60, mode: "age" }),
        address:
          faker.location.streetAddress() +
          ", " +
          faker.location.city() +
          ", " +
          faker.location.country(),
      });
    }

    await DummyUser.insertMany(users, { ordered: false });
    res
      .status(201)
      .json({ message: "100 realistic dummy users created successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating dummy users", error: err.message });
  }
};

const getAllDummyUsers = async (req, res) => {
  try {
    const users = await DummyUser.find();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching dummy users", error: err.message });
  }
};

module.exports = {
  createDummyUsers,
  getAllDummyUsers,
};
