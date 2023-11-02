
import { ApolloServer } from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone'



import userData from './user-data.js';
import { typeDefs } from './schema.js';

const resolvers ={
    Query: {
        users(_, __, { deletedUser }){
            return userData.users.filter((user) => user !== deletedUser);
        },
        user(_, args){

            return userData.users.find((user)=> user.id === args.id)
        }
       
    },
    Mutation : {
        deleteUser(_, args){
            const userIndex= userData.users.findIndex((g)=> g.id !== args.id)
            if (userIndex !== -1) {
                const deletedUser = userData.users.splice(userIndex, 1)[0];
                return deletedUser;
              }
            throw new Error('User not found')
        },
        addUser(_, args){
            let user = {
                ...args.user,
                id: Math.floor(Math.random() * 100).toString()
            }
            userData.users.push(user)
            return user
        },
       
            updateUser: (_,{id, edits}) => {
              const userIndex = userData.users.findIndex((user) => user.id === id);
              if (userIndex !== -1) {
                const updatedUser = { ...userData.users[userIndex], ...edits };
                userData.users[userIndex] = updatedUser;
                return updatedUser;
              }
              throw new Error('User not found.');
            
          },
    }
}

const server = new ApolloServer({
    typeDefs,

    resolvers,
    context: { deletedUser: null },  //Initialize deletedUser as null
})

const {url} = await startStandaloneServer(server, {
    listen: {port : 4000}
})

console.log('server ready at port' , 4000)