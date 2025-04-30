export interface ItemRef {
  assemblyPolicy: string;
  auxiliaryIndex1: string;
  auxiliaryIndex2: string;
  auxiliaryIndex3: string;
  blocked: boolean;
  blockedforPurchase: boolean;
  blockedforSales: boolean;
  ediUom: string;
  gtin: string;
  itemDesc: string;
  itemId: string;
  itemSalesUOM: string;
  itemUom: string;
  itemWt: number;
  referenceDescription: string;
  referenceDescription_2: string;
  referenceUnitofMeasure: string;
  retailPrice: number;
  rrferenceType: string;
  sellingPrice: number;
  upc: string;
  variantCode: string;
}

export interface Item {
  itemId: string;
  itemDesc: string;
  itemWt: number;
  itemUom: string;
  eDIUom: string;
  retailPrice: number;
  sellingPrices: number;
  assemblyPolicy: string;
  blocked: boolean;
  blockedforSales: boolean;
  blockedforPurchase: boolean;
  gtin: string;
  itemSalesUOM: string;
  auxiliaryIndex1: string;

  itemRefs: ItemRef[];
}
