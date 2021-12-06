
import Home from '@/components/Home'
import Shop from '@/components/Shop'
import Product from '@/components/Product'
import Blog from '@/components/Blog'
import Post from '@/components/Post'
import Cart from '@/components/Cart'
import Admin from '@/components/Admin'
import Layout from '@/components/Layout'

const routes = [
    {
        path: '/',
        component: Layout,
        children:[
          {
            path:'/',
            component:Home,
            name:'Home'
          },
          {
            path:'/shop',
            component:Shop,
            name:'Shop'
          },
          {
            path:'/product',
            component:Product,
            name:'Product',
            props: {
              header: true,
              content: true
           },
          },
          {
            path:'/blog',
            component:Blog,
            name:'Blog'
          },
          {
            path:'/post',
            component:Post,
            name:'Post'
          },
          {
            path:'/cart',
            component:Cart,
            name:'Cart'
          },
          {
            path:'/admin',
            component:Admin,
            name:'Admin'
          }
        ]
      },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: '*',
      component: () => import('../views/404.vue')
    }
  ]
  
  export default routes
  