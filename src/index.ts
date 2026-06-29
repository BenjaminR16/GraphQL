// ============================================================================
// INDEX  (Punto de entrada de la aplicación)
// ----------------------------------------------------------------------------
// Este archivo SOLO se encarga de arrancar el servidor y "cablear" las piezas.
// No tiene esquema, ni resolvers, ni queries: todo eso vive ahora en sus
// respectivos módulos. Su única responsabilidad es:
//   1. Crear la app de Express.
//   2. Crear el servidor Apollo con el esquema ya ensamblado.
//   3. Montar Apollo en la ruta /graphql.
//   4. Levantar el servidor HTTP.
//
// Flujo MVC:  index -> typeDefs(ruta) -> resolver(controlador) -> service -> model
// ============================================================================

import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import express from "express";
import cors from "cors";

import { typeDefs, resolvers } from "./graphql/schema"
import { createContext, type AppContext } from "./graphql/context.js";

async function startServer() {
    const app = express();

    // 1. Servidor Apollo: recibe el esquema (typeDefs) y los controladores
    //    (resolvers) ya ensamblados desde graphql/schema.ts.
    //    Le indicamos el tipo del contexto con <AppContext>.
    const server = new ApolloServer<AppContext>({
        typeDefs,
        resolvers,
    });

    // 2. Es OBLIGATORIO iniciar Apollo antes de conectarlo a Express.
    await server.start();

    // 3. Montamos Apollo en /graphql.
    //    IMPORTANTE: `expressMiddleware(server, options)` YA es un middleware de
    //    Express. Se pasa directamente a app.use(...). (En la versión anterior
    //    se envolvía dentro de otro handler con res.send(), lo que rompía Apollo.)
    //
    //    En `context` le pasamos la función que construye el contexto en cada
    //    petición; así cada resolver recibe `prisma` a través de ctx.
    app.use(
        "/graphql",
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server, {
            context: createContext,
        }),
    );

    // 4. Ruta REST de prueba (health check), independiente de GraphQL.
    app.get("/api/health", (_req, res) => {
        res.json({ status: "ok", message: "Servidor Express funcionando al 100%" });
    });

    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor GraphQL listo en http://localhost:${PORT}/graphql`);
        console.log(`📡 Ruta REST lista en http://localhost:${PORT}/api/health`);
    });
}

startServer();