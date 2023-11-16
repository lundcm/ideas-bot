import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { IDEA_DATASTORE, queryIdeas } from "../datastores/request.datastore.ts";

export const CollectStatsFunction = DefineFunction({
  title: "Collect Stats",
  callback_id: "collect-stats",
  source_file: "functions/collect-stats.function.ts",
  description: "Collect stats from the datastore",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.types.string,
      },
    },
    required: ["channel"],
  },
  output_parameters: {
    properties: {
      ideas: {
        type: Schema.types.array,
        items: {
          type: Schema.types.object, // TODO: Type this
        },
      },
    },
    required: ["ideas"],
  },
});

export default SlackFunction(CollectStatsFunction, async ({ client }) => {
  const today = new Date(Date.now());

  const lastWeekStartDate = new Date(
    new Date(Date.now()).setDate(today.getDate() - 6),
  );

  const expressions = {
    expression: `#created BETWEEN :start AND :end`,
    expression_attributes: { "#created": "created_at" },
    expression_values: {
      ":start": lastWeekStartDate.toISOString().substring(0, 10),
      ":end": today.toISOString().substring(0, 10),
    },
  };

  const lastWeekIdeas = await queryIdeas(client, expressions);

  return {
    ok: lastWeekIdeas.ok,
    completed: true,
    error: lastWeekIdeas.error,
    outputs: {
      ideas: lastWeekIdeas.items,
    },
  };
});
