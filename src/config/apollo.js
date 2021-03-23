import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";


const httpLink = createHttpLink({
    uri: "https://spotify-app-server662.herokuapp.com/",
    fetch
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),

    link: httpLink 
});

export default client;