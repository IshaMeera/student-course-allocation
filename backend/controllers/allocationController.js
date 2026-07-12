const {runAllocation} = require('../services/allocationService');

const processAllocation = async(req, res) => {
    try{
        const result = await runAllocation();

        res.status(200).json({
            success: true,
            message: 'Allocation process completed successfully',
            data: result
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Allocation process failed',
            error: err.message
        });
    }
}

module.exports = {
    processAllocation
}