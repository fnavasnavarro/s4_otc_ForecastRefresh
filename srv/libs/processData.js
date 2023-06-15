module.exports = processData;
const cds = require('@sap/cds')

async function processData(dataSet) {
    console.log(`---Beginning of Data Processing---`)
    var processResult = [];
    processResult.push({"test":"ini"});  //**REMOVE TEST */
    if (dataSet !== null && dataSet !== undefined) {
        processResult.push({"test":"dataset_ok"}); //**REMOVE TEST */
        try {
            for (let i = 0; i < dataSet.length; i++) { //remember to switch back to i=0
                let doUpdate = true;
                const salesOrder = dataSet[i];
                /*for (let j = 0; j < salesOrder.to_Item.length; j++) {
                    const item = salesOrder.to_Item[j];
                    //if (item.GoodsMovementStatus !== 'C') {
                    //    doUpdate = false;
                    //    break;
                    //}
                    result = await _executeUpdate(salesOrder.SalesOrder,item.SalesOrderItem);
                    processResult.push(result);
                }*/

                /*result = {
                    salesOrder: salesOrder.SalesOrderID,
                    salesOrderItem: salesOrder.ItemID,
                    status: ''
                }*/
                processResult.push({"loopa":i}); //**REMOVE TEST */
                result = await _executeUpdate(salesOrder.SalesOrderID,salesOrder.ItemID);
                processResult.push({"loopb":i}); //**REMOVE TEST */
                processResult.push(result);
                /*if (doUpdate) {
                    result = await _executeUpdate(salesOrder.SalesOrder);
                    processResult.push(result);
                }*/
            }
        } catch (error) {
            console.log('Error during data processing:', error.message)
        }
    }
    console.log(`---End of Data Processing---`)
    return processResult;
}

const _executeUpdate = async function (salesOrder,salesOrderItem) {
    console.log(`Creating job for document:${salesOrder,salesOrderItem}`)
    var returnData = {
        salesOrder: salesOrder,
        salesOrderItem: salesOrderItem,
        status: ''
    }
    try {

        const conn = await cds.connect.to('ZAPI_FORECASTREFRESHJOB_O2');
        const postResult = await conn.send(
            { method: 'POST', path: `/RefreshForecast?SalesOrderId='${salesOrder}'&ItemId='${salesOrderItem}'&$format=json` }
        )
        console.log('POST performed successfully')
        returnData.status = 'Success';
        
    } catch (error) {
        if (error.response.data) {
            console.log('Error during axios call:', error.response.data)
            returnData.status = `Error:${error.response.data}`
        } else {
            console.log('Error during axios call:', error.message)
            returnData.status = `Error:${error.message}`
        }
    }
    return returnData;
}