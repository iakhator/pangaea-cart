import Vue from "vue";
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-boost";
import App from "./App.vue";

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: "https://pangaea-interviews.now.sh/api/graphql"
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});
Vue.use(VueApollo);

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
