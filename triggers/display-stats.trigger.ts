import {} from "deno-slack-api/mod.ts";
import { Trigger } from "deno-slack-api/types.ts";

const DisplayWeeklyStats: Trigger<
  typeof DisplayStatsWorkflow.definition
> = {};
