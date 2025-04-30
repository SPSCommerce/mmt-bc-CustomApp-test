import { request, APIRequestContext, expect } from "playwright/test";
import { Carrier } from "../models/carrier.model";
import { WmsShipment } from "../models/wms-shipment.model";
import { ShipTo } from "../models/shipto.model";


export class ApiPage {
  protected context: APIRequestContext;
  protected baseURL: string;

  constructor(
    protected request: APIRequestContext,
    baseURL: string = ""
  ) {
    this.request = request;

    // If the baseURL is not provided, we will use the environment variable and
    // fall back to an empty string if it's not set.
    //
    this.baseURL =
      baseURL === ""
        ? `${process.env.API_ENDPOINT}companies(${process.env.COMPANY_ID})/`
        : baseURL;
  }

  async Authenticate() {
    const response = await this.request.post(process.env.API_AUTH_URL ?? "", {
      form: {
        resource: process.env.API_RESOURCE ?? "",
        client_id: process.env.API_CLIENT_ID ?? "",
        client_secret: process.env.API_CLIENT_SECRET ?? "",
        grant_type: process.env.API_GRANT_TYPE ?? "",
      },
    });

    const body = await response.json();

    this.context = await request.newContext({
      // We can override the base URL here so calls within this class are based on the API
      // URL instead of the regular website.
      //
      // However, with API calls we need to use the './' syntax to get the baseURL to work properly
      //  See: https://github.com/microsoft/playwright/issues/12064 for details.
      //
      baseURL: this.baseURL,

      // All requests we send go to this API endpoint.
      extraHTTPHeaders: {
        Accept: "*/*",
        "Content-Type": "application/json",
        // Add authorization token to all requests.
        Authorization: `Bearer ${body.access_token}`,
      },
    });
  }

  async GetShipTos(cusNo: string = "") {
    const params = {};

    if (cusNo !== "") {
      params["$filter"] = `cusNo eq '${cusNo}'`;
    }

    const response = await this.context.get("./spsShipTos", {
      params: params,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    const shipTos = body.value as ShipTo[];
    return shipTos;
  }

  async GetCarriers(carrierId: string = "") {
    const params = {};

    if (carrierId !== "") {
      params["$filter"] = `carrierId eq '${carrierId}'`;
    }

    const response = await this.context.get("./spsCarriers", {
      params: params,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    const carriers = body.value as Carrier[];
    return carriers;
  }

  async GetWmsShipments(asnId: string = "") {
    const params = {};

    if (asnId !== "") {
      params["$filter"] = `asnId eq '${asnId}'`;
    }

    const response = await this.context.get("./spsWMSShipments", {
      params: params,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    const shipments = body.value as WmsShipment[];
    return shipments;
  }
 
  }

