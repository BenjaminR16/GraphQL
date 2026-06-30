// ============================================================================
// PRODUCT · RESOLVER  (Controlador)
// ----------------------------------------------------------------------------
// El RESOLVER es el equivalente al CONTROLADOR en MVC. Es el punto de entrada
// de cada operación GraphQL: recibe la petición (parent, args, context),
// extrae los argumentos y se los entrega al SERVICIO.
//
// Regla de oro: el resolver debe ser "delgado". No mete lógica de negocio ni
// queries: solo orquesta. Cuanto menos código tenga, mejor.
// ============================================================================

import type { AppContext } from "../../graphql/context.js";
import { ProductService } from "./produc.service.js";

export const productResolvers = {
    Query: {
        products: (
            _parent: unknown,
            args: { search?: string },
            ctx: AppContext, // <- el context inyectado, trae `prisma`
        ) => {
            return ProductService.getProducts(ctx.prisma, args.search);
        },
    },

    Mutation: {
        createProduct: (
            _parent: any,
            args: { nombre: string; precio: number; descripcion: string },
            ctx: AppContext,
        ) => {
            const payload = {
                nombre: args.nombre,
                price: args.precio,
                description: args.descripcion,
                userId: (ctx as any).userId ?? (ctx as any).user?.id,
            } as any; // cast to any to satisfy expected service parameter

            return ProductService.createProduct(ctx.prisma, payload);
        },
    },
};