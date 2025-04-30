import { APIRequestContext, expect } from "playwright/test";
import { Item, ItemRef } from "../models/item.model";
import { ApiPage } from "./api.pom";

export class ItemsApiPage extends ApiPage {
  constructor(protected request: APIRequestContext) {
    super(request);
  }

  async GetItem(itemId: string = "") {
    const params = {};

    if (itemId !== "") {
      params["$filter"] = `itemId eq '${itemId}'`;
    }

    const response = await this.context.get("./ediItems", {
      params: params,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    const item = body.value as Item[];
    return item;
  }

  async GetItemRef(itemId: string) {
    const response = await this.context.get("./EDIItemsItemRef", {
      params: {
        $filter: `itemId eq '${itemId}'`,
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    const itemRefs = body.value as ItemRef[];
    return itemRefs;
  }
}
