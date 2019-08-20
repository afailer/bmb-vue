
import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/pages/login";
import home from "@/pages/home";
import skip from "@/pages/skip"

Vue.use(VueRouter)

const routers = [
  {
    path: '/',
    component: () =>
    import('@/pages/index/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',  //到时候地址栏会显示的路径
        name: 'home',
        component: home // Home是组件的名字，这个路由对应跳转到的组件。。注意component没有加“s”.
      }
    ]
  },
  {
    path: '/skip/:id',
    name: 'skip',
    component: skip
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]
const router = new VueRouter({
  routes: routers
})

router.beforeEach((to, from, next) => {

  const token = localStorage.getItem('token')

  if(to.path !== '/login'){
    if(!token){
      next('/login')
    }
  }

  if(to.path === '/login'){
    if(token){
      next('/')
    }
  }
  next()
})

export default router ;
