const createUser = async (req, res) => {
  console.log("create USER");
  res.status(200).send("TESTING");
};

module.exports = { createUser };
