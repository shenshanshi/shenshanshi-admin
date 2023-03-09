import Vue from "vue";
import VueRouter from "vue-router";
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);








export default new VueRouter({

    routes:[
        {
            path:"/",
            component: ()=>import('@/views/Home'),
            children:[
                {
                    path:"/",
                    component: ()=>import('@/views/Home/Welcome'),
                },
                {

                    path: "/user",
                    component: ()=>import('@/views/Home/User'),
                    children:[

                        {
                            path: "user",
                            component: ()=>import('@/views/Home/User/User'),
                        },
                        {
                            path:"role",
                            component: ()=>import('@/views/Home/User/Role'),

                        },

                        {
                            path: "permission",
                            component: ()=>import('@/views/Home/User/Permission'),
                        },


                    ]
                }


            ]
        },
        {
            path:"/login",
            component: ()=>import('@/views/Login'),

        },



    ]




})

