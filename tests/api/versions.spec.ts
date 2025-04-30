import { test, expect } from "../base";

test("annotate version details", async ({ msAutomationApi }) => {
  const versionDetails = await msAutomationApi.GetVersions();

  test.info().annotations.push(
    {
      type: "BC Instance",
      description: versionDetails.erpInstance,
    },
    {
      type: "Business Central System Version",
      description: versionDetails.systemVersion,
    },
    {
      type: "SPS EDI API Version",
      description: versionDetails.spsEdiApiVersion,
    },
    {
      type: "SPS Fulfillment Version",
      description: versionDetails.spsFulfillmentVersion,
    }
  );
});
