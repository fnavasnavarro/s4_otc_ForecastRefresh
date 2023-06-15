const retrieveData = require('./libs/retrieveData.js')
const processData = require('./libs/processData.js')
const processReqHeader = require('./libs/processReqHeader')
const updateScheduler = require('./libs/updateScheduler.js')

module.exports = (srv) => {
    srv.on('scheduledForecastRefresh', async (req) => {
        const isJob = await processReqHeader(req);
        const dataSet = await retrieveData(req);
        result = await processData(dataSet);
        if (isJob) {
        await updateScheduler(result, req.headers)
        } else {
            return result;
            //return dataSet; //**REMOVE TEST */
        }
    })
}

/*module.exports = async function (srv) {

    this.on('scheduledForecastRefresh', async (req) => {
        try{
            const isJob = await processReqHeader(req);
            const dataSet = await retrieveData(req);
            result = await processData(dataSet);
            if (isJob) {
            await updateScheduler(result, req.headers)
            } else {
                return result;
            }
        } catch (error) {
            console.log('Error during data retrieval:${error.message}');
        }

    })

}*/