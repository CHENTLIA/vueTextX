import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Daily from '@/components/daily'
import Author from '@/components/author'
import Post from '@/components/post'
import AuthorD from '@/components/author-d'
import AuthorPage from '@/components/author-page'
import Column from '@/components/column'
import ColumnD from '@/components/column-d'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: '/daily',
      children: [
        {
          path: '/daily',
          name: 'daily',
          component: Daily,
          children: [

          ]
        },
        {path: '/post/:id', name: 'post', component: Post},
        {
          path: '/author',
          name: 'author',
          component: Author
        },
        {
          path: '/author-d/:id',
          name: 'author-d',
          component: AuthorD
        },
        {
          path: '/author-page/:id',
          name: 'author-page',
          component: AuthorPage
        },
        {
          path: '/column',
          name: 'column',
          component: Column
        },
        {
          path: '/column-d/:id',
          name: 'column-d',
          component: ColumnD
        }
      ]
    }
  ],
  mode: 'history'
})
