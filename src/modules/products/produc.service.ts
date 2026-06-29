// ============================================================================
// PRODUCT · SERVICE  (Servicio / Lógica de negocio)
// ----------------------------------------------------------------------------
// El SERVICIO es el "cerebro" del módulo. Aquí van las reglas de negocio:
// validaciones, transformaciones, cálculos, llamadas a varios modelos, etc.
//
// El servicio NO sabe nada de GraphQL (no conoce resolvers ni argumentos de
// la query) y tampoco escribe queries de Prisma a mano: para eso llama al
// MODELO. Así, si mañana cambias de base de datos, solo tocas el modelo.
// ============================================================================

import type { AppContext } from "../../graphql/context.js";
import { ProductModel } from "./product.model.js";

type CreateProductInput = {
    nombre: string;
    descripcion: string;
    precio: number;
    userId: number;
};

export const ProductService = {
    getProducts(prisma: AppContext["prisma"], search?: string) {
        return ProductModel.findAll(prisma, search);
    },

    async createProduct(
        prisma: AppContext["prisma"],
        data: CreateProductInput
    ) {
        // aquí podrías validar reglas de negocio
        if (data.precio <= 0) {
            throw new Error("Price must be greater than 0");
        }

        return ProductModel.create(prisma, data);
    },
};