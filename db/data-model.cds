namespace s4_otc_ForecastRefresh;

using {ZAPI_FORECASTREFRESHJOB_O2 as extS4RAP} from '../srv/external/ZAPI_FORECASTREFRESHJOB_O2.csn';

entity s4ScheduleAgreement as projection on extS4RAP.ZA_ForecastSchRefreshJob{
    key SalesOrderID,
    key ItemID,
    SDCategory,  //VBAK VBTYP
    RejectionReason,
    SalesDocumentType, //item?
    SalesOrganization //item?
}

/*using {OP_API_SALES_ORDER_SRV_0002 as extS4API} from '../srv/external/OP_API_SALES_ORDER_SRV_0002.csn';

entity s4SalesOrder as projection on extS4API.A_SalesOrder{
    key SalesOrder,
    ReferenceSDDocumentCategory,  //VBAK VBTYP
    SalesOrderType, //item?
    SalesOrganization, //item?
    to_Item : redirected to s4SalesOrderItem
}

entity s4SalesOrderItem as projection on extS4API.A_SalesOrderItem{
    SalesOrderItem,
    SalesDocumentRjcnReason //VBAP ABGRU
}*/