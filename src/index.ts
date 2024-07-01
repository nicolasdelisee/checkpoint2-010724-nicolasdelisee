import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import datasource from "../lib/datasource";
import { buildSchema } from "type-graphql";
import CountryResolver from "./resolver";

async function main() {
  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });
  const server = new ApolloServer({
    // typeDefs,
    // resolvers,
    schema,
  });
  await datasource.initialize();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4010 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main();
