const { getDashboardData } = require("../services/dashboardService");

const getDashboard = async(req, res)=>{
    try{
        const dashboard = await getDashboardData();

        res.status(200).json({
            success: true,
            data: dashboard
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {getDashboard};