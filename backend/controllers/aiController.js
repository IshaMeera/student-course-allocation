const { askAI } = require("../services/aiService");

const queryAI = async (req, res) => {

    try{

        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question is required.",
            });
        }

        const answer = await askAI(question);

        res.status(200).json({
            success: true,
            answer,
        });

    }catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    queryAI,
};