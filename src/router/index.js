import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);

/**
 * ------------------------------------------------------------------
 * 路由配置
 * ------------------------------------------------------------------
 * @param redirect 重定向
 * @param meta>index 用于菜单的 default-active
 */
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/all-article',
    },
    {
      path: '/login',
      component: _import('login/index'),
      meta: {title: '登录'},
    }, {
      path: '/sginup',
      component: _import('sginup/index'),
      meta: {title: '注册'},
    },
    {
      path: '/home',
      name: 'home',
      component: _import('home/index'),
      meta: {title: '首页'},
      redirect: '/all-article',
      children: [
        {
          path: '/all-article',
          name: 'all-article',
          component: _import('all-article/index'),
          meta: {title: '所有文章'},
        },
        {
          path: '/my-article',
          name: 'my-article',
          component: _import('all-article/index'),
          meta: {title: '我的文章'},
        },
        {
          path: '/create',
          name: 'create',
          component: _import('create/index'),
          meta: {title: '发表文章'},
        },
        {
          path: '/edit/:id',
          name: 'edit',
          component: _import('create/index'),
          meta: {title: '编辑文章'},
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component: _import('detail/index'),
          meta: {title: '文章详情'},
        }, {
          path: '/people',
          name: 'people',
          component: _import('people/index'),
          meta: {title: '我的个人首页'},
        }, {
          path: '/change-password',
          name: 'change-password',
          component: _import('change-password/index'),
          meta: {title: '修改密码'},
        },

      ]
    }
  ]
});
