// using cds_zapi_ibdhdrcleanupjob as extRAP from './external/ZAPI_FORECASTREFRESHJOB_O2';
// using { OP_API_SALES_ORDER_SRV_0002 as extS4API } from './external/OP_API_SALES_ORDER_SRV_0002';
using s4_otc_ForecastRefresh as db from '../db/data-model';

//service jobService {
service jobService @(path: 'api'){
    type SelectOptions {
        Values: many {
            Low : String;
        };
        Ranges: many {
            Low : String;
            High : String;
        };
    }

    entity s4ScheduleAgreement as projection on db.s4ScheduleAgreement;
    //entity s4SalesOrder as projection on db.s4SalesOrder;
    //entity s4SalesOrderItem as projection on db.s4SalesOrderItem;
    action scheduledForecastRefresh(SalesOrder : SelectOptions, SalesDocumentRjcnReason : SelectOptions, SalesOrderType : SelectOptions, SalesOrganization : SelectOptions ) returns array of String;
}