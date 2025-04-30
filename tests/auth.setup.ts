import { request, test as setup } from "@playwright/test";
import * as dotenv from "dotenv";
import * as OTPAuth from "otpauth";

dotenv.config();

const authFile = "playwright/.auth/user.json";

setup("authenticate via web", async ({ page }) => {
  // Skip setup if environment variables for AAD creds are not set
  setup.skip(
    !process.env.ENVIRONMENT_URL ||
      !process.env.AAD_USERNAME ||
      !process.env.AAD_PASSWORD,
    "ENVIRONMENT_URL, AAD_USERNAM and AAD_PASSWORD environment variables must be set"
  );

  await page.goto(process.env.ENVIRONMENT_URL);
  await page.getByPlaceholder("Email or phone").fill(process.env.AAD_USERNAME);
  await page.getByRole("button", { name: "Next" }).click();

  await page
    .getByRole("textbox", { name: "Password" })
    .fill(process.env.AAD_PASSWORD);
  await page.getByRole("button", { name: "Sign In" }).click();

  // The prompt for a code may not always appear, so let's check for it
  //  before diving into the code to generate a value
  //
  const mfaRequired = await Promise.any([
    page
      .getByRole("button", { name: "Yes" })
      .waitFor()
      .then(() => false),
    page
      .getByRole("button", { name: "Verify" })
      .waitFor()
      .then(() => true),
  ]).catch(() => {
    throw "Missing button";
  });

  if (mfaRequired) {
    const totp = new OTPAuth.TOTP({
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: process.env.OTP_SECRET,
    });

    // Generate a token.
    const token = totp.generate();
    await page.getByRole("textbox", { name: "Code" }).fill(token);
    await page.getByRole("button", { name: "Verify" }).click();
  }

  // This is the "stay signed in" screen that we just need to accept and move on
  //
  await page.getByRole("button", { name: "Yes" }).click();

  await page.context().storageState({ path: authFile });
});
