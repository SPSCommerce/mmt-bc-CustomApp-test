import { log } from "console";
import { test, expect } from "../base";
import {  NewSalesOrderHeader, NewSalesOrderLine,SalesOrderHeader,SalesOrderLine,patchSalesData } from "../models/salesorder.model";




let orderId: string;
let salesOrderLineId: string;
let salesOrderType: string;
let lineNo: number;
let OrderNo: string;
test("Create and upadte Sales Order", async ({ salesOrderApi }) => {
    // Initialize the Sales Order Data
  const salesOrderData: NewSalesOrderHeader = {
    sellToCustomerNumber: "60000",
    billToCustomerNumber: "60000",
    documentType: "Order",
    shipToCode: "100",
    orderDate: "2024-11-20", // Use current or future date
    postingDate: "2024-11-20", // Use current or future date
        
  };
  const salesOrderHeader = await salesOrderApi.CreateSalesOrder(salesOrderData);
 
  expect(salesOrderHeader).toBeDefined();

  // Validate the ID in the response is a GUID or has a length of 36
  expect(salesOrderHeader.id).toBeDefined();
  expect(salesOrderHeader.id).toHaveLength(36);

  // Validate the returned data matches the request data
  expect(salesOrderHeader.sellToCustomerNumber).toBe(salesOrderData.sellToCustomerNumber);
  expect(salesOrderHeader.billToCustomerNumber).toBe(salesOrderData.billToCustomerNumber);
  expect(salesOrderHeader.documentType).toBe(salesOrderData.documentType);
  expect(salesOrderHeader.shipToCode).toBe(salesOrderData.shipToCode);
  expect(salesOrderHeader.orderDate).toBe(salesOrderData.orderDate);
  expect(salesOrderHeader.postingDate).toBe(salesOrderData.postingDate);

  // Validate the sales order line


    orderId = salesOrderHeader.id; 
  OrderNo = salesOrderHeader.number
  log(`Sales Order ID: ${orderId}`);
  
  const patchSalesData = {
    cusPONo: "Test123",
    spsEDI: "true",
    
  };
  const Patchdata= await salesOrderApi.patchSalesOrder(orderId,patchSalesData);

  expect(Patchdata.spsEDI).toBe(true);
  expect(Patchdata.cusPONo).toBe(patchSalesData.cusPONo);
  
 
});

 
  