
const handleHomeRequest = (req, res) => {
  res.status(200).json({message: "This is home page :)"})
};

const handleNotFound = (req, res) => {
  res.status(404).json({message: "This page was not found :("})
};

module.exports = { handleHomeRequest, handleNotFound };
