// ============================================================================
// USER · TYPEDEFS  ("Ruta" / Definición del esquema)
// ----------------------------------------------------------------------------
// Declara el tipo User y las operaciones disponibles para este módulo.
// ============================================================================

export const userTypeDefs = `#graphql
    type User {
        id: ID!
        nombre: String!
        email: String!
        created_at: String
        updated_at: String
    }

    extend type Query {
        users: [User!]!
    }

    extend type Mutation {
        createUser(nombre: String!, email: String!, password: String!): User!
    }
    `;