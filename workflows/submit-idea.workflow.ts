import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

const SubmitIdeaWorkflow = DefineWorkflow({
  callback_id: "submit-idea",
  title: "Submit an idea",
  description: "Submit an idea to a rubber duck",
  input_parameters: {
    properties: {
      interactivity: { type: Schema.slack.types.interactivity },
      channel: { type: Schema.slack.types.channel_id },
      user: { type: Schema.slack.types.user_id },
    },
    required: ["interactivity", "channel", "user"],
  },
});

// Add steps to the workflow: 1, 2, 3...

export default SubmitIdeaWorkflow;
