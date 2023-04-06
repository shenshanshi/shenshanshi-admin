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
                },
                {
                    path: "/forum",
                    component: ()=>import('@/views/Home/Forum'),
                    children:[

                        {
                            path: "post",
                            component: ()=>import('@/views/Home/Forum/Post'),
                        },
                        {
                            path:"review",
                            component: ()=>import('@/views/Home/Forum/Review'),

                        },

                        {
                            path: "permission",
                            component: ()=>import('@/views/Home/User/Permission'),
                        },


                    ]
                },
                {
                    path: "/periphery",
                    component: ()=>import('@/views/Home/Periphery'),
                    children:[

                        {
                            path: "goods",
                            component: ()=>import('@/views/Home/Periphery/Goods'),
                        },
                        {
                            path:"display",
                            component: ()=>import('@/views/Home/Periphery/Display'),

                        },


                    ]
                },
                {
                    path: "/resource",
                    component: ()=>import('@/views/Home/Resource'),
                    children:[

                        {
                            path: "resource",
                            component: ()=>import('@/views/Home/Resource/Resource'),
                        }

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

