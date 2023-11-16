import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { CollectStatsFunction } from "../functions/collect-stats.function.ts";

const DisplayStatsWorkflow = DefineWorkflow({
  callback_id: "display-stats",
  title: "Display Stats",
  description: "Display Stats",
  input_parameters: {
    properties: {
      channel: { type: Schema.slack.types.channel_id },
    },
    required: ["channel"],
  },
});

// Step 1: Gather the data
const stats = DisplayStatsWorkflow.addStep(
  CollectStatsFunction,
  { channel: DisplayStatsWorkflow.inputs.channel },
);

// Step 2: Format the data
const formattedStats = DisplayStatsWorkflow.addStep(
  "",
  {},
);

// Step 3: Post the data to channel
DisplayStatsWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: DisplayStatsWorkflow.inputs.channel,
  message: formattedStats.outputs.message,
});

export default DisplayStatsWorkflow;
