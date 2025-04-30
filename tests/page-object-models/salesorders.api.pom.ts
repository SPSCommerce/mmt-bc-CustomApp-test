import { APIRequestContext, expect } from "playwright/test";
import { NewSalesOrderHeader, SalesOrderHeader, patchSalesData } from "../models/salesorder.model";
import { ApiPage } from "./api.pom";


export class SalesOrdersApiPage extends ApiPage {
  constructor(protected request: APIRequestContext) {
    super(request);
  }

  // Post a new sales order and return both the header and lines
  async CreateSalesOrder(
    newSalesOrderHeader: NewSalesOrderHeader
  ): Promise<SalesOrderHeader> {
    const response = await this.context.post("./spsSalesOrders", {
      data: {
        ...newSalesOrderHeader, // Use salesOrderHeader to populate request body
      },
    });

    // Validate the HTTP response status
    expect(response.status()).toBe(201);

    // Parse and validate the response body
    const body = await response.json();
    expect(body).toBeDefined();

    //Cast response to models
    const salesOrderHeader = body as SalesOrderHeader;
    

    // Additional validation
    expect(salesOrderHeader.id).toBeDefined();
    expect(salesOrderHeader.id).toHaveLength(36);
    
  

    // return { salesOrderHeader, salesOrderLines };
    
    expect(response.body).toBeDefined();
    const createdSalesOrder = body as SalesOrderHeader;

    return createdSalesOrder;
    
  }


  async patchSalesOrder( OrderId: string,  data: Partial<patchSalesData>)
   {
    
  const headers = {
      'If-Match': '*',
      'Content-Type': 'application/json',
      // Add any other necessary headers, such as authentication headers
    };

  const patchResponse = await this.context.patch(
      `./CusSalesHeader(${OrderId})`,{ 
        headers,
        data,
       } );

   expect(patchResponse.status()).toBe(200); // Ensure the patch was successful
    const patchData = await patchResponse.json();// Parse the response body
    return patchData as patchSalesData;
      }    
        
      }

    

 

 
   
  
    

