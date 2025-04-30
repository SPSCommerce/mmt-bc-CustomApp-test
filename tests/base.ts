import { test as base } from "@playwright/test";
import { MySettingsPage } from "./page-object-models/my-settings.pom";
import { LandingPage } from "./page-object-models/landing-page.pom";
import { CustomersPage } from "./page-object-models/customers.pom";
import { VendorsPage } from "./page-object-models/vendors.pom";
import { ItemsPage } from "./page-object-models/items.pom";
import { ApiPage } from "./page-object-models/api.pom";
import { ItemsApiPage } from "./page-object-models/items.api.pom";

import { MSAutomationApiPage } from "./page-object-models/ms-automation.api.pom";
import { SalesOrdersApiPage } from "./page-object-models/salesOrders.api.pom";

type MyFixtures = {
  mySettingsPage: MySettingsPage;
  landingPage: LandingPage;
 
  customersPage: CustomersPage;
  vendorsPage: VendorsPage;
  itemsPage: ItemsPage;
  api: ApiPage;
  itemsApi: ItemsApiPage;
 
  salesOrderApi: SalesOrdersApiPage;
  msAutomationApi: MSAutomationApiPage;
};

// Technique for how to use fixtures and page object models taken from this
// YouTube video: https://youtu.be/k488kAtT-Pw?si=-WMb3qOvcqiP2Cs6
//
export const test = base.extend<MyFixtures>({
  mySettingsPage: async ({ page }, use) => {
    await use(new MySettingsPage(page));
  },
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },

  customersPage: async ({ page }, use) => {
    await use(new CustomersPage(page));
  },
  vendorsPage: async ({ page }, use) => {
    await use(new VendorsPage(page));
  },
  itemsPage: async ({ page }, use) => {
    await use(new ItemsPage(page));
  },
  api: async ({ request }, use) => {
    const apiPage = new ApiPage(request);
    await apiPage.Authenticate();
    await use(apiPage);
  },
  itemsApi: async ({ request }, use) => {
    const apiPage = new ItemsApiPage(request);
    await apiPage.Authenticate();
    await use(apiPage);
  },

  salesOrderApi: async ({ request }, use) => {
    const apiPage = new SalesOrdersApiPage(request);
    await apiPage.Authenticate();
    await use(apiPage);
  },
  msAutomationApi: async ({ request }, use) => {
    // This is needed to convert our regular API_ENDPOINT env variable into the
    //  right API url to call the Microsoft APIs. We basically need to strip off
    //  anything after the 'SandboxMFG/api' part of the URL.
    //
    const apiEndpoint = process.env.API_ENDPOINT ?? "";
    const apiRoot = apiEndpoint.match(/.*\/api/)[0];
    const baseURL = `${apiRoot}/microsoft/automation/v2.0/`;

    const apiPage = new MSAutomationApiPage(request, baseURL);
    await apiPage.Authenticate();
    await use(apiPage);
  },
});

export { expect } from "@playwright/test";
