import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://ahouse-hono-server.onrender.com/graphql",
  ignoreNoDocuments: true,
  documents: "graphql/*.ts",
  // require: ["ts-node/register"],
  generates: {
    "src/gql/generated.ts": {
      // preset: "client-preset",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        // documentMode: "string",
        withHooks: true,
        withComponent: false,
        skipTypeName: true,
      },
      // presetConfig: {
      //   gqlTagName: "gql",
      // },
    },

    // "./graphql.schema.json": {
    //   plugins: ["introspection"],
    // },

    "./schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
  watch: true,
};

export default config;
