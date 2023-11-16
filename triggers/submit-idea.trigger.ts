import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import SubmitIdeaWorkflow from "../workflows/submit-idea.workflow.ts";

const trigger: Trigger = {
  type: TriggerTypes.Shortcut,
  name: "Submit an idea",
  description: "Submit an idea to a rubber duck",
  workflow: `#/workflows/${SubmitIdeaWorkflow.definition.callback_id}`,
  inputs: {
    interactivity: {
      value: TriggerContextData.Shortcut.interactivity,
    },
    chanel: {
      value: TriggerContextData.Shortcut.channel_id,
    },
    user: {
      value: TriggerContextData.Shortcut.user_id,
    },
  },
};

export default trigger;
