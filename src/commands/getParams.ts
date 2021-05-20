import { Command } from "./command";

import { Core } from "../run";

interface GetParamsResult {
  slotName: string;
  subscriptionID: string;
  ressourceGroup: string;
  appName: string;
  clientID: string;
  applicationSecret: string;
  tenantID: string;
}

export class GetParams extends Command<GetParamsResult> {
  private core: Core;

  constructor({ core }: { core: Core }) {
    super();

    this.core = core;
  }

  protected async execute(): Promise<GetParamsResult> {
    const core = this.core;

    const slotName = core.getInput("slotName", { required: true });
    const subscriptionID = core.getInput("subscriptionID", { required: true });
    const ressourceGroup = core.getInput("ressourceGroup", { required: true });
    const appName = core.getInput("appName", { required: true });
    const clientID = core.getInput("clientID", { required: true });
    const applicationSecret = core.getInput("applicationSecret", {
      required: true,
    });
    const tenantID = core.getInput("tenantID", { required: true });

    return {
      slotName,
      subscriptionID,
      ressourceGroup,
      applicationSecret,
      appName,
      clientID,
      tenantID,
    };
  }
}
