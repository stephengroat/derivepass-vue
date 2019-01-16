import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import plugins from './plugins';
import routes from './routes';

import App from './App.vue';

// Store
import storeConfig from './store/index';

import testFeatures from './utils/feature-test';
import i18n from './i18n'

const missingFeatures = testFeatures();
if (missingFeatures) {
  const title = document.createElement('b');
  title.textContent =
    'Following features are required for running this application:'
  document.body.appendChild(title);
  for (const feature of missingFeatures) {
    const elem = document.createElement('p');
    elem.textContent = `* ${feature}`;
    document.body.appendChild(elem);
  }
}

Vue.config.productionTip = false;

plugins.install(Vue);

const store = new Vuex.Store(storeConfig);
const router = new VueRouter({
  mode: 'history',
  routes,
});

plugins.installStoreDependent(Vue, { store });

new Vue({
  store,
  router,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
