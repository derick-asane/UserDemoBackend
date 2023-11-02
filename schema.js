

export const typeDefs = `#graphql
    type User {
        id: ID!,
        firstname: String!,
        lastname: String!,
        email: String!,
        gender: String!,
        birthdate: String!

    }
    type Query {
        users: [User]
        user(id: ID!) : User
    }
    type Mutation {
        deleteUser(id: ID) : User
        addUser(user: AddUserInput!): User
        updateUser(id: ID!, edits: EditUserInput!): User
    }
    input AddUserInput {
        firstname: String!,
        lastname: String!,
        email: String!,
        gender: String!,
        birthdate: String!
    }
    input EditUserInput {
        firstname: String,
        lastname: String,
        email: String,
        gender: String,
        birthdate: String
    }

`