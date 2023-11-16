import { Manifest } from "deno-slack-sdk/mod.ts";
import IdeaDatastore from "./datastores/request.datastore.ts";

export default Manifest({
  name: "ideas-bot",
  description: "Submit an idea to a rubber duck",
  icon: "assets/default_new_app_icon.png",
  workflows: [],
  functions: [],
  outgoingDomains: [],
  datastores: [IdeaDatastore],
  types: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
    "channels:read",
    "triggers:write",
  ],
});
