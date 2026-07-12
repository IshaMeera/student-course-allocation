const {generateReport} = require("../services/reportService");

const getReport = async(req, res) => {
    try{
        const report = await generateReport();

        res.status(200).json({
            success: true,
            data: report
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = { getReport };