import { createApp } from 'vue'
import Router from "vue-router"
import routes from "..";

Vue.use(Router);

const router = new Router({ routes, scrollBehavior });


router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta && route.meta.requiresAuth)) {
        if (!this.$storage.getStorage("userInfo")) {  // 没有登录信息跳转到登录页
            next({
                path: "/login",
                query: { redirect: to.fullPath }  // 'to.fullPath'跳转到登录之前页面的路径
            });
        } else {
            next();
        }
    } else {
        next();
    }
});


export default router;