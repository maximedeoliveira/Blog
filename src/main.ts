import { createApp, provide, h } from 'vue';
import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import App from './App.vue';
import router from './router';
import './styles/app.css';

const apolloClient = new ApolloClient({
    link: createHttpLink({
        uri: 'https://maximedeoliveira-blog-api.herokuapp.com/graphql',
    }),
    cache: new InMemoryCache(),
});

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
});

app.use(router).mount('#app');
