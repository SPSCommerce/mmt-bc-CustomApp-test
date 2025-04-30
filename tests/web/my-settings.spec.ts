import { test, expect } from "../base";

test("user settings are correct", async ({ mySettingsPage }) => {
  // Note: This approach of using page object models to retrieve data is just
  //  one way to keep the code required to get data seperate from the assertions
  //  we're making. We should keep watching this pattern to see if it's useful.
  //
  const settings = await mySettingsPage.GetMySettings();

  // The user should have the EDI Manager role for the various links back to DMEDI
  //  and fulfillment to appear.
  //
  expect(settings.role).toBe("EDI Manager");

  // The company should be CRONUS USA, Inc. to ensure the base data we'll be pulling is
  //  loaded and avaialble.
  //
  expect(settings.company).toBe("CRONUS USA, Inc.");

  // This should be disabled to prevent extra UI elements from appearing.
  //
  expect(settings.teachingTips).toBe(false);
});
