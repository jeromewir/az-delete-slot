import * as core from "@actions/core";
import { paramCase } from "change-case";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { WebSiteManagementClient } from "@azure/arm-appservice";

import { GetParams } from "./commands/getParams";

export type Core = {
  getInput: (s: string, opts?: core.InputOptions) => string;
  setFailed: (err: Error) => void;
};

const authenticate = async ({
  clientID,
  applicationSecret,
  tenantID,
}: {
  clientID: string;
  applicationSecret: string;
  tenantID: string;
}) => {
  return msRestNodeAuth.loginWithServicePrincipalSecretWithAuthResponse(
    clientID,
    applicationSecret,
    tenantID
  );
};

async function run(): Promise<void> {
  try {
    const getParams = new GetParams({ core });

    const {
      slotName: candidateSlotName,
      subscriptionID,
      ressourceGroup,
      appName,
      clientID,
      applicationSecret,
      tenantID,
    } = await getParams.run();

    const { credentials } = await authenticate({
      clientID,
      applicationSecret,
      tenantID,
    });

    const slotName = paramCase(candidateSlotName);

    const client = new WebSiteManagementClient(credentials, subscriptionID);

    await client.webApps.deleteSlot(ressourceGroup, appName, slotName);

    core.info(`Deleted slot ${slotName} for webapp ${appName}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

export { run };
