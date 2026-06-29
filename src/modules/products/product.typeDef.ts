// ============================================================================
// PRODUCT · TYPEDEFS  ("Ruta" / Definición del esquema)
// ----------------------------------------------------------------------------
// En GraphQL no hay "rutas" como en REST: el esquema (typeDefs) ES el contrato
// que define qué puede pedir el cliente. Por eso cumple el papel de la "ruta"
// en tu modelo mental MVC: declara qué Queries y Mutations existen para este
// módulo y qué forma tienen los datos.
//
// Cada módulo declara solo SU parte del esquema; luego en graphql/schema.ts
// se unen todos.
// ============================================================================

export const productTypeDefs = `#graphql
    type Product {
        id: ID!
        nombre: String!
        precio: Float!
        descripcion: String!
    }

    # Usamos "extend type" porque Query y Mutation se definen de forma base en el
    # schema raíz y cada módulo les AÑADE sus operaciones.
    extend type Query {
        products(search: String): [Product!]!
    }

    extend type Mutation {
        createProduct(nombre: String!, precio: Float!, descripcion: String!): Product!
    }
    `;