import Vue from 'vue'
import Router from 'vue-router'
// import components from '@/components'

Vue.use(Router)
// 获取原型对象上的push函数
const originalPush = Router.prototype.push
// 修改原型对象中的push方法
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/entry',
      component: () => import('@/components/index'),
      children: [
        // {
        //   path: '/helloworld',
        //   name: 'HelloWorld',
        //   component: () => import('@/components/helloWorld.vue')
        //   // meta: {
        //   //   title: 'emmm',
        //   //   icon: 'emmm'
        //   // }
        // },
        {
          path: '/entry',
          name: 'entry',
          component: () => import('@/components/entry')
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
        },
        {
          path: '/book',
          name: 'book',
          component: () => import('@/components/book')
        },
        {
          path: '/wordRoot',
          name: 'wordRoot',
          component: () => import('@/components/wordRoot')
        }
      ]
    }
  ]
})
