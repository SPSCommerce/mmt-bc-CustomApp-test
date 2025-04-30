import { test } from "../base";

test("landing page system extensions exist", async ({ landingPage }) => {
  await landingPage.confirmSystemExtensionsExistOnLandingPage();
});

test("sales order system extensions exist", async ({ salesOrdersPage }) => {
  await salesOrdersPage.confirmSystemExtensionsExistOnSalesOrder("1010");
});

test("customer system extensions exist", async ({ customersPage }) => {
  await customersPage.confirmSystemExtensionsExistOnCustomer("01121212");
});

test("vendor system extensions exist", async ({ vendorsPage }) => {
  await vendorsPage.confirmSystemExtensionsExistOnVendor("01254796");
});

test("item system extensions exist", async ({ itemsPage }) => {
  await itemsPage.confirmSystemExtensionsExistOnItem("1000");
});
