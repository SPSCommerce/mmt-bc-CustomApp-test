import { FrameLocator, Page } from "playwright";
import { expect } from "playwright/test";

export class ItemsPage {
  frameLocater: FrameLocator;

  constructor(private page: Page) {
    this.page = page;

    // This is just a helper since every locator in BC seems to start with this
    //
    this.frameLocater = this.page.frameLocator('iframe[title="undefined"]');
  }

  async confirmSystemExtensionsExistOnItem(itemId: string) {
    await this.page.goto("");

    await this.frameLocater
      .getByRole("menuitem", { name: "Items, View or edit detailed" })
      .click();
    await this.frameLocater.getByLabel("EDI").click();
    await expect(
      this.frameLocater.getByLabel("EDI - Item Cross References")
    ).toBeVisible();
    await expect(
      this.frameLocater.getByLabel("EDI - Item Details")
    ).toBeVisible();

    await this.frameLocater
      .getByRole("button", { name: `No., sorted in Ascending order ${itemId}` })
      .click();
    await this.page.waitForTimeout(500);

    await this.frameLocater
      .getByRole("menuitem", { name: "EDI", exact: true })
      .click();

    await expect(
      this.frameLocater.getByRole("menuitem", { name: "Item Cross References" })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", { name: "Item Details" })
    ).toBeVisible();
  }
}
