import { createApp } from 'vue'
import Router from "vue-router"
import routes from "..";

Vue.use(Router);

const router = new Router({ routes, scrollBehavior });


router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta && route.meta.requiresAuth)) {
        if (!this.$storage.getStorage("userInfo")) {  // û�е�¼��Ϣ��ת����¼ҳ
            next({
                path: "/login",
                query: { redirect: to.fullPath }  // 'to.fullPath'��ת����¼֮ǰҳ���·��
            });
        } else {
            next();
        }
    } else {
        next();
    }
});


export default router;