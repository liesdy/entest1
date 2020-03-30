import Vue from 'vue'
import Router from 'vue-router'
// import components from '@/components'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/search',
      component: () => import('@/components/index'),
      children: [
        {
          path: '/helloworld',
          name: 'HelloWorld',
          component: () => import('@/components/helloWorld.vue')
          // meta: {
          //   title: 'emmm',
          //   icon: 'emmm'
          // }
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('@/components/search')
        },
        {
          path: '/word',
          name: 'word',
          component: () => import('@/components/word')
        },
        {
          path: '/phrase',
          name: 'phrase',
          component: () => import('@/components/phrase')
        },
        {
          path: '/sentence',
          name: 'sentence',
          component: () => import('@/components/sentence')
        },
        {
          path: '/article',
          name: 'article',
          component: () => import('@/components/article')
        }
      ]
    }
  ]
})
