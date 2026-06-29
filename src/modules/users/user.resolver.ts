// ============================================================================
// USER · RESOLVER  (Controlador)
// ----------------------------------------------------------------------------
// Punto de entrada de las operaciones GraphQL de usuarios. Delgado: solo
// extrae argumentos y llama al servicio.
// ============================================================================

import type { AppContext } from "../../graphql/context.js";
import { UserService } from "./user.service.js";

export const userResolvers = {
    Query: {
        // users: [User!]!
        users: (_parent: unknown, _args: unknown, ctx: AppContext) => {
            return UserService.getUsers(ctx.prisma);
        },
    },

    Mutation: {
        // createUser(nombre, email, password): User!
        createUser: (
            _parent: unknown,
            args: { nombre: string; email: string; password: string; rol: string },
            ctx: AppContext,
        ) => {
            return UserService.createUser(ctx.prisma, args);
        },
    },
};