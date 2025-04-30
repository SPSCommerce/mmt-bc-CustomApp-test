import { Interface } from "readline";

// Creating a sales order requires a subset of the header fields that are
//  returned for the new sales order
//
export interface NewSalesOrderHeader {
  sellToCustomerNumber: string;
  billToCustomerNumber: string;
  documentType: string;
  shipToCode: string;
  orderDate: string;
  postingDate: string;
  
 }
  


// Creating a sales order line requires a subset of the line fields that are
//  returned in the new sales order line
//
export interface NewSalesOrderLine {
  lineNumber: number;
  type: string;
  number: string;
  quantity: number;
  qtyToShip: number;
  unitPrice: number;
  ediUnitPrice : number,
  unitOfMeasureCode: string;
  shipmentDate: string;
 
}

export enum LineType {
  Comment = "Comment",
  Item = "Item",
  Account = "Account",
  Resource = "Resource",
  FixedAsset = "FixedAsset",
  Charge = "Charge",
  Service = "Service",
}


export interface SalesOrderLine {
  id: string;
  documentid: string;
  documentNumber: string;
  lineNumber: number;
  itemId: string;
  accountId: string;
  type: LineType;
  number: string;
  description: string;
  unitOfMeasureId: string;
  unitOfMeasure: string;
  unitOfMeasureCode: string;
  quantity: number;
  unitPrice: number;
  lineDiscountAmount: number;
  lineDiscountPercent: number;
  discountAppliedBeforeTax: boolean;
  amountExcludingTax: number;
  taxCode: string;
  vatPercent: number;
  totalTaxAmount: number;
  amountIncludingVat: number;
  invoiceDiscountAllocation: number;
  amount: number;
  netTaxAmount: number;
  shipmentDate: string;
  quantityShipped: number;
  quantityInvoiced: number;
  qtyToInvoice: number;
  qtyToShip: number;
  variantCode: string;
  locationCode: string;
 

}

export interface SalesOrderHeader {
  id: string;
  documentType: string;
  number: string;
  externalDocumentNumber: string;
  orderDate: string;
  documentDate: string;
  postingDate: string;
  shipmentDate: string;
  customerId: string;
  sellToCustomerNumber: string;
  customerName: string;
  billToName: string;
  billToName2: string;
  billToCustomerId: string;
  billToCustomerNumber: string;
  shipToCode: string;
  shipToName: string;
  shipToAddress: string;
  shipToAddress2: string;
  shipToCity: string;
  shipToCountry: string;
  shipToCounty: string;
  shipToPostCode: string;
  shipToCountryRegionCode: string;
  shipToContact: string;
  sellToAddressLine1: string;
  sellToAddressLine2: string;
  sellToCity: string;
  sellToCountry: string;
  sellToState: string;
  sellToPostCode: string;
  billToAddress: string;
  billToAddress2: string;
  billToCity: string;
  billToContact: string;
  billToCountry: string;
  billToState: string;
  billToPostCode: string;
  yourReference: string;
  ediYourReference: string;
  ediExternalDocumentNo: string;
  shortcutDimension1Code: string;
  shortcutDimension2Code: string;
  currencyId: string;
  currencyCode: string;
  pricesIncludeTax: boolean;
  paymentTermsId: string;
  shipmentMethodId: string;
  salesperson: string;
  shippingAgentServiceCode: string;
  status: string;
 
}

  export interface patchSalesData {
    cusPONo: string;
    spsEDI: string;
  }
    

       
