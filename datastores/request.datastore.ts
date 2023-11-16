import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";
import { SlackAPIClient } from "deno-slack-sdk/deps.ts";
import { DatastoreItem } from "deno-slack-api/types.ts";
import { DatastoreQueryResponse } from "deno-slack-api/typed-method-types/apps.ts";

export const IDEA_DATASTORE = "ideas";

const IdeaDatastore = DefineDatastore({
  name: "ideas",
  primary_key: "id",
  attributes: {
    id: {
      type: Schema.types.string,
    },
    originator: {
      type: Schema.slack.types.user_id,
    },
    rubber_duck: {
      type: Schema.slack.types.user_id,
    },
    description: {
      type: Schema.types.string,
    },
    market_potential: {
      type: Schema.types.string,
    },
    created_at: {
      type: Schema.slack.types.timestamp,
    },
  },
});

/**
 * Returns the complete collection from the datastore for an expression
 *
 * @param client the client to interact with the Slack API
 * @param expressions optional filters and attributes to refine a query
 *
 * @returns ok if the query completed successfully
 * @returns items a list of responses from the datastore
 * @returns error the description of any server error
 */
export async function queryIdeas(
  client: SlackAPIClient,
  expressions?: object,
): Promise<
  {
    ok: boolean;
    items: DatastoreItem<typeof IdeaDatastore.definition>[];
    error?: string;
  }
> {
  const items: DatastoreItem<typeof IdeaDatastore.definition>[] = [];
  let cursor = undefined;

  do {
    const ideas: DatastoreQueryResponse<typeof IdeaDatastore.definition> =
      await client.apps.datastore.query<typeof IdeaDatastore.definition>({
        datastore: IDEA_DATASTORE,
        cursor,
        ...expressions,
      });

    if (!ideas.ok) {
      return { ok: false, items, error: ideas.error };
    }

    cursor = ideas.response_metadata?.next_cursor;
    items.push(...ideas.items);
  } while (cursor);

  return {
    ok: true,
    items,
  };
}

export default IdeaDatastore;
