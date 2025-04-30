import { Page } from "playwright";

export class MySettings {
  role: string | null;
  company: string | null;
  teachingTips: boolean | null;
}

export class MySettingsPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async GetMySettings(): Promise<MySettings> {
    await this.page.goto("");
    await this.page.getByLabel("Settings").click();
    await this.page.getByLabel("My Settings").click();

    const settings: MySettings = {
      role: null,
      company: null,
      teachingTips: null,
    };

    settings.role = await this.page
      .frameLocator('iframe[title="undefined"]')
      .getByLabel("Role", { exact: true })
      .textContent();
    settings.company = await this.page
      .frameLocator('iframe[title="undefined"]')
      .getByLabel("Company", { exact: true })
      .textContent();
    settings.teachingTips = await this.page
      .frameLocator('iframe[title="undefined"]')
      .getByLabel("Teaching Tips", { exact: true })
      .isChecked();

    return settings;
  }
}
