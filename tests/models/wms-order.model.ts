export interface WmsOrder {

  asnId: string;
  cusNo: string;
  orderNo: string;
  orderDate: string;
  shipDate: string;
  shipToId: string;
  purchaseOrderNo: string;
  shipToName: string;
  shipToAdd1: string;
  shipToAdd2: string;
  shipToCity: string;
  shipToState: string;
  shipToZip: string;
  shipToCountry: string;
  carrierId: string;
  carrierServiceCode: string;
  ediYourReference: string;
  ediExternalDocumentNo: string;
  yourReference: string;
  lineNo: number;
  acct_Line_No: number;
  itemId: string;
  qtyPacked: number;
  uom: string;
  order_Wt: number;
  lineType: string;
  quantityInvoiced: number;
  quantity: number;
  variantCode: string;
  loc_Id: string;
  shipFromName: string;
  shipFromAdd1: string;
  shipFromAdd2: string;
  shipFromCity: string;
  shipFromState: string;
  shipFromZip: string;
  shipFromCountry: string;
  auxiliaryIndex1: string;

}
