import { FrameLocator, Page } from "playwright";
import { expect } from "playwright/test";

export class VendorsPage {
  frameLocater: FrameLocator;

  constructor(private page: Page) {
    this.page = page;

    // This is just a helper since every locator in BC seems to start with this
    //
    this.frameLocater = this.page.frameLocator('iframe[title="undefined"]');
  }

  async confirmSystemExtensionsExistOnVendor(vendorId: string) {
    await this.page.goto("");
    await this.frameLocater
      .getByRole("menuitem", { name: "Vendors, View or edit" })
      .click();
    await this.frameLocater.getByLabel("EDI").click();
    await expect(
      this.frameLocater.getByLabel("Trading Partner", { exact: true })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByLabel("Item Cross References")
    ).toBeVisible();
    await expect(
      this.frameLocater.getByLabel("SAC Cross Reference")
    ).toBeVisible();
    await expect(
      this.frameLocater.getByLabel("Ship-to Cross Reference")
    ).toBeVisible();
    await expect(
      this.frameLocater.getByLabel("Transactions On Hold")
    ).toBeVisible();
    await expect(
      this.frameLocater.getByLabel("Transactions Ready")
    ).toBeVisible();
    await expect(
      this.frameLocater.getByLabel("Transactions Complete")
    ).toBeVisible();
    await expect(
      this.frameLocater.getByLabel("Documents On Hold")
    ).toBeVisible();
    await expect(
      this.frameLocater.getByLabel("Documents Received")
    ).toBeVisible();
    await expect(this.frameLocater.getByLabel("Documents Sent")).toBeVisible();

    await this.frameLocater
      .getByRole("button", {
        name: "No., sorted in Ascending order " + vendorId,
      })
      .click();
    await this.page.waitForTimeout(500);

    await this.frameLocater.getByRole("menuitem", { name: "EDI" }).click();

    await expect(
      this.frameLocater.getByRole("menuitem", { name: "Trading Partner" })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", { name: "Item Cross References" })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", { name: "SAC Cross Reference" })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", {
        name: "Ship-to Cross Reference",
      })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", { name: "Transactions On Hold" })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", { name: "Transactions Ready" })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", { name: "Transactions Complete" })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", { name: "Documents On Hold" })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", { name: "Documents Received" })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", { name: "Documents Sent" })
    ).toBeVisible();
  }
}
