const routes=[
    {path:'/Home',component:Home},
    {path:'/Cviky',component:Cviky},
    {path:'/Trenink',component:Trenink},
    {path:'/Statistiky',component:Result}
    
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
  })
  const app = Vue.createApp({})
  app.use(router)
  app.mount('#app')