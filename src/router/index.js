import Vue from 'vue'
import VueRouter from 'vue-router'
import musiclist from '../components/musiclist.vue'
import found from '../components/found.vue'

Vue.use(VueRouter)

export default  new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: musiclist},
    { path: '/found',component: found},
    { path:'/*',component:musiclist}
  ]
})

