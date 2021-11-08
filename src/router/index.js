import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'

Vue.use(VueRouter)

export default new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),

  beforeEach: (to, from, next) => {
    window.scrollTo(0, 0)
    next();
  },
  routes: routes,
  mode:'history'
});
