import router from './router';
import Cookies from 'js-cookie';

router.beforeEach((to, from, next) => {
  if (to.name == 'my-article') {
    if (Cookies.get('username')) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }


});

router.afterEach(() => {

});
