module.exports = retrieveData;
const cds = require('@sap/cds')

async function retrieveData(req) {
    console.log('---Retrieving data---')
    try {
        var whereCondition = "",
            whereSalesOrder = "",
            whereSalesOrderType = "",
            whereSalesOrganization = "",
            whereRejection = "";

        //const conn = await cds.connect.to('OP_API_SALES_ORDER_SRV_0002');
        const conn = await cds.connect.to('ZAPI_FORECASTREFRESHJOB_O2');

        /*const query = SELECT.from({ ref: ['jobService.s4SalesOrder'] })
            .columns(['*', { ref: ['to_DeliveryDocumentItem'], expand: ['*'] }])
            .where([{ ref: ['OverallGoodsMovementStatus'] }, '=', { val: 'B' }])
            .orderBy([{ ref: ['DeliveryDocument'], sort: 'asc' }]);*/

        /*const query = SELECT.from({ ref: ['jobService.s4SalesOrder'] })
        .columns(['*', { ref: ['to_Item'], expand: ['*'] }])
        .where([{ ref: ['SalesOrder'] }, '<=', { val: '${req.data.SalesOrderHigh}' }], and
               [{ ref: ['SalesOrder'] }, '>=', { val: '${req.data.SalesOrderLow}' }], and
               [{ ref: ['SalesDocumentRjcnReason'] }, '=', { val: '${req.data.SalesDocumentRjcnReason}' }], and
               ( [{ ref: ['SalesOrder'] }, '=', { val: '${req.data.SalesOrderLow}' }], or
               [{ ref: ['SalesOrder'] }, '=', { val: '${req.data.SalesOrderLow}' }], or
               [{ ref: ['SalesOrder'] }, '=', { val: '${req.data.SalesOrderLow}' }] ), and
               ( [{ ref: ['SalesOrder'] }, '=', { val: '${req.data.SalesOrderLow}' }], or
               [{ ref: ['SalesOrder'] }, '=', { val: '${req.data.SalesOrderLow}' }], or
               [{ ref: ['SalesOrder'] }, '=', { val: '${req.data.SalesOrderLow}' }] )
                )
        .orderBy([{ ref: ['SalesOrder'], sort: 'asc' }]);*/

        if(req.data.SalesOrder.Values && req.data.SalesOrder.Values.length > 0){
            var row = 0;
            var salesOrderValues = `SalesOrderID in ( `;
            for(var i=0;i<req.data.SalesOrder.Values.length;i++){
                row += 1;
                if(row === req.data.SalesOrder.Values.length){
                    salesOrderValues = salesOrderValues + `'${req.data.SalesOrder.Values[i].Low}' )`;
                }else{
                    salesOrderValues = salesOrderValues + `'${req.data.SalesOrder.Values[i].Low}', `;
                }
            }
            if(whereSalesOrder){
                whereSalesOrder = whereSalesOrder + ` or ` + salesOrderValues;
            }else{
                whereSalesOrder = salesOrderValues;
            }
        }
        if(req.data.SalesOrder.Ranges && req.data.SalesOrder.Ranges.length > 0){
            var row = 0;
            var salesOrderRanges = '';
            for(var i=0;i<req.data.SalesOrder.Ranges.length;i++){
                row += 1;
                if(row === req.data.SalesOrder.Ranges.length){
                    salesOrderRanges = salesOrderRanges + `SalesOrderID >= '${req.data.SalesOrder.Ranges[i].Low}' and SalesOrderID <= '${req.data.SalesOrder.Ranges[i].High}'`;
                }else{
                    salesOrderRanges = salesOrderRanges + `SalesOrderID >= '${req.data.SalesOrder.Ranges[i].Low}' and SalesOrderID <= '${req.data.SalesOrder.Ranges[i].High}' or `;
                }
            }
            if(whereSalesOrder){
                whereSalesOrder = whereSalesOrder + ` or ` + salesOrderRanges;
            }else{
                whereSalesOrder = salesOrderRanges;
            }
        }
        if(req.data.SalesDocumentRjcnReason && req.data.SalesDocumentRjcnReason.Values && req.data.SalesDocumentRjcnReason.Values.length > 0){
            var row = 0;
            //var rejectionValues = `SalesDocumentRjcnReason in ( `;
            var rejectionValues = `RejectionReason in ( `;
            if(req.data.SalesDocumentRjcnReason.Values.length === 1 && req.data.SalesDocumentRjcnReason.Values[0].Low === ''){
                rejectionValues = `RejectionReason eq ''`;
            }else{
                for(var i=0;i<req.data.SalesDocumentRjcnReason.Values.length;i++){
                    row += 1;
                    if(row === req.data.SalesDocumentRjcnReason.Values.length){
                        rejectionValues = rejectionValues + `'${req.data.SalesDocumentRjcnReason.Values[i].Low}' )`;
                    }else{
                        rejectionValues = rejectionValues + `'${req.data.SalesDocumentRjcnReason.Values[i].Low}', `;
                    }
                }
            }
            if(whereRejection){
                whereRejection = whereRejection + ` or ` + rejectionValues;
            }else{
                whereRejection = rejectionValues;
            }
        }
        if(req.data.SalesOrderType.Values && req.data.SalesOrderType.Values.length > 0){
            var row = 0;
            //var salesOrderTypeValues = `SalesOrderType in ( `;
            var salesOrderTypeValues = `SalesDocumentType in ( `;
            for(var i=0;i<req.data.SalesOrderType.Values.length;i++){
                row += 1;
                if(row === req.data.SalesOrderType.Values.length){
                    salesOrderTypeValues = salesOrderTypeValues + `'${req.data.SalesOrderType.Values[i].Low}' )`;
                }else{
                    salesOrderTypeValues = salesOrderTypeValues + `'${req.data.SalesOrderType.Values[i].Low}', `;
                }
            }
            if(whereSalesOrderType){
                whereSalesOrderType = whereSalesOrderType + ` or ` + salesOrderTypeValues;
            }else{
                whereSalesOrderType = salesOrderTypeValues;
            }
        }
        if(req.data.SalesOrganization.Values && req.data.SalesOrganization.Values.length > 0){
            var row = 0;
            var salesOrganizationValues = `SalesOrganization in ( `;
            for(var i=0;i<req.data.SalesOrganization.Values.length;i++){
                row += 1;
                if(row === req.data.SalesOrganization.Values.length){
                    salesOrganizationValues = salesOrganizationValues + `'${req.data.SalesOrganization.Values[i].Low}' )`;
                }else{
                    salesOrganizationValues = salesOrganizationValues + `'${req.data.SalesOrganization.Values[i].Low}', `;
                }
            }
            if(whereSalesOrganization){
                whereSalesOrganization = whereSalesOrganization + ` or ` + salesOrganizationValues;
            }else{
                whereSalesOrganization = salesOrganizationValues;
            }
        }
        
        if(whereSalesOrder){
            if(whereCondition){
                whereCondition = whereCondition + ' and ' + whereSalesOrder;
            }else{
                whereCondition = whereSalesOrder;
            }
        }
        if(whereRejection){
            if(whereCondition){
                whereCondition = whereCondition + ' and ' + whereRejection;
            }else{
                whereCondition = whereRejection;
            }
        }
        if(whereSalesOrderType){
            if(whereCondition){
                whereCondition = whereCondition + ' and ' + whereSalesOrderType;
            }else{
                whereCondition = whereSalesOrderType;
            }
        }
        if(whereSalesOrganization){
            if(whereCondition){
                whereCondition = whereCondition + ' and ' + whereSalesOrganization;
            }else{
                whereCondition = whereSalesOrganization;
            }
        }

        /*const query = SELECT.from({ ref: ['jobService.s4SalesOrder'] })
        .columns(['*', { ref: ['to_Item'], expand: ['*'] }])
        .where(whereCondition)
        .orderBy([{ ref: ['SalesOrder'], sort: 'asc' }]);*/
        
        /*const query = SELECT.from({ ref: ['jobService.s4ScheduleAgreement'] })
        .columns(['*'])
        .where(whereCondition)
        .orderBy([{ ref: ['SalesOrderID'], sort: 'asc' }]);*/
        
        const query =
            SELECT("*")
                .from("ZAPI_FORECASTREFRESHJOB_O2.ZA_ForecastSchRefreshJob")
                .where(whereCondition)
        /*const query =
                SELECT(s4ScheduleAgreement)
                    .where(whereCondition);*/

        const result = await conn.run(query);
        console.log(`Retrieved ${result.length} lines of data from destination.`)
        return result;
    } catch (error) {
        console.log(`Error during data retrieval:${error.message}`);
        //return [{"test":`Error during data retrieval:${error.message}`}];  //**REMOVE TEST */
    }
}