// ============================================================================
// PRODUCT · MODEL  (Modelo / Capa de acceso a datos)
// ----------------------------------------------------------------------------
// El MODELO es la ÚNICA capa que habla directamente con la base de datos a
// través de Prisma. No contiene reglas de negocio: solo recibe datos ya
// "limpios" y ejecuta la query correspondiente.
//
// Recibe `prisma` por parámetro (viene del context), no lo importa, para
// mantener el desacoplamiento.
// ============================================================================

import type { AppContext } from "../../graphql/context";

// Forma de los datos que necesitamos para crear un producto.
export interface CreateProductData {
    nombre: string;
    precio: number;
    descripcion: string;
}

export const ProductModel = {
    // Devuelve todos los productos, opcionalmente filtrados por título.
    findAll(prisma: AppContext["prisma"], search?: string) {
        if (search) {
            return prisma.products.findMany({
                where: {
                    nombre: {
                        contains: search,
                        mode: "insensitive", // búsqueda sin distinguir mayúsculas/minúsculas
                    },
                },
            });
        }
        return prisma.products.findMany();
    },

    // Inserta un nuevo producto en la base de datos.
    create(prisma: AppContext["prisma"], data: CreateProductData & { userId: number }) {
        return prisma.products.create({
            data: {
                nombre: data.nombre,
                descripcion: data.descripcion,
                precio: data.precio,
                userId: data.userId,
            },
        });
    }
};