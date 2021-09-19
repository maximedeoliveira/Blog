import { createApp, provide, h } from 'vue';
import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { DefaultApolloClient } from '@vue/apollo-composable';
import App from './App.vue';
import router from './router';
import './styles/app.css';
import { key, store } from '@/store';

// REMOVE authLink FOR HTTPONLY_TOKEN
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    let token = '';
    const item = localStorage.getItem('session'); // survive a refresh

    if (item) {
        const user = JSON.parse(item);
        token = user.token;
    }

    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : '', // TBD - take into account refresh token and revocation
        },
    };
});

const httpLink = createHttpLink({
    uri: 'https://maximedeoliveira-blog-api.herokuapp.com/graphql',
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient);
    },
    data() {
        return {
            isAuthenticated: false,
        };
    },
    render: () => h(App),
});

app.use(router).use(store, key).mount('#app');
