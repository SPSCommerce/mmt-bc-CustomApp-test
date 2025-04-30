import { APIRequestContext, expect } from "playwright/test";
import { ApiPage } from "./api.pom";
import {
  MicrosoftCompany,
  MicrosoftExtension,
} from "../models/microsoft.model";
import { VersionDetails } from "../models/version-details.model";

export class MSAutomationApiPage extends ApiPage {
  // We update the constructor to for this specific API class to require
  //  the modified base URL. This is because the MSFT management API is
  //  not hosted on the same path as our OData entities.
  //
  constructor(protected request: APIRequestContext, baseURL: string) {
    super(request, baseURL);
  }

  async GetVersions(): Promise<VersionDetails> {
    const versionDetails = {
      erpInstance: process.env.ENVIRONMENT_URL ?? "",
      systemVersion: "",
      spsEdiApiVersion: "",
      spsFulfillmentVersion: "",
    } as VersionDetails;

    let response = await this.context.get("./companies");
    expect(response.status()).toBe(200);
    let body = await response.json();
    const companies = body.value as MicrosoftCompany[];

    // Now let's grab the Cronus company
    //
    const cronusCompany = companies.find((x) => x.name === "CRONUS USA, Inc.");
    const companyId = cronusCompany?.id;
    versionDetails.systemVersion = cronusCompany?.systemVersion;

    // Now let's query the extension API to extract the SPS version details
    //
    response = await this.context.get(`./companies(${companyId})/extensions`);
    expect(response.status()).toBe(200);
    body = await response.json();
    const extensions = body.value as MicrosoftExtension[];

    let extension = extensions.find((x) => x.displayName === "SPS-EDI-API");
    versionDetails.spsEdiApiVersion = `${extension?.versionMajor}.${extension?.versionMinor}.${extension?.versionBuild}.${extension?.versionRevision} -${extension?.publishedAs}`;

    extension = extensions.find(
      (x) => x.displayName === "SPSCommerceFulfillment"
    );
    versionDetails.spsFulfillmentVersion = `${extension?.versionMajor}.${extension?.versionMinor}.${extension?.versionBuild}.${extension?.versionRevision} -${extension?.publishedAs}`;

    return versionDetails;
  }
}
