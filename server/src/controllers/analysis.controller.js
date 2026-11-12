const { analyze } = require("../services/analysis.service");

const analyzeController = async (req, res) => {
  try {

    const {
    language,
    problemName,
    userInput,
    } = req.body;

    const result = await analyze({
        language,
        problemName,
        userInput,
    });

    res.status(200).json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

module.exports = {
  analyze: analyzeController,
};