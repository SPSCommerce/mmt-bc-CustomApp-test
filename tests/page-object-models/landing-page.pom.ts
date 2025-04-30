import { FrameLocator, Page } from "playwright";
import { expect } from "playwright/test";

export class LandingPage {
  frameLocater: FrameLocator;

  constructor(private page: Page) {
    this.page = page;

    // This is just a helper since every locator in BC seems to start with this
    //
    this.frameLocater = this.page.frameLocator('iframe[title="undefined"]');
  }

  async confirmSystemExtensionsExistOnLandingPage() {
    await this.page.goto("");
    //
    // This test seems to take longer to load given it's priming the BC UI for the
    //  first time. We needed to increase the timeout beyond the 5 seconds.
    //
    await expect(
      this.frameLocater.getByRole("menuitem", { name: "EDI Dashboard" })
    ).toBeVisible({ timeout: 10000 });
    await expect(
      this.frameLocater.getByRole("menuitem", { name: "EDI Trading Partner" })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", { name: "EDI Document Explorer" })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", {
        name: "EDI Workflow Scheduler Status",
      })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", {
        name: "EDI Inbound Purchase Orders",
      })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", {
        name: "EDI Outbound Ship Notices On",
      })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", {
        name: "Fulfillment",
        exact: true,
      })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", {
        name: "Fulfillment Monitor",
        exact: true,
      })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", {
        name: "Fulfillment Monitor Reports",
      })
    ).toBeVisible();
    await expect(
      this.frameLocater.getByRole("menuitem", {
        name: "Fulfillment Customer Support",
      })
    ).toBeVisible();
  }
}
