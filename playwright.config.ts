import { defineConfig, devices } from "@playwright/test";
import path from "path"; // Add this line to import the 'path' module

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html", { open: "never" }],
    ["junit", { outputFile: "test-results/results.xml" }],
  ] /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */,
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.ENVIRONMENT_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"], // Use prepared auth state.
        storageState: "playwright/.auth/user.json",
        //
        // To increase the chance that UI elements appear on the screen without
        //  extra clicks and complex locators we increase the viewport size beyond
        //  the default 1280x720.
        //
        viewport: { width: 1920, height: 1280 },
      },
      dependencies: ["setup"],
    },

    // For our purposes, we are primarily concerned with the existence of items
    //  in the UI, and now how things function across browsers (since that's the
    //  responsibility of Microsoft). We'll just test in Chrome.
    //
    // {
    //   name: "firefox",
    //   use: {
    //     ...devices["Desktop Firefox"], // Use prepared auth state.
    //     storageState: "playwright/.auth/user.json",
    //     viewport: { width: 1920, height: 1280 },
    //   },
    //   dependencies: ["setup"],
    // },

    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"], // Use prepared auth state.
    //     storageState: "playwright/.auth/user.json",
    //     viewport: { width: 1920, height: 1280 },
    //   },
    //   dependencies: ["setup"],
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
