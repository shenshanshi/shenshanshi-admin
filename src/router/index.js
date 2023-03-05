import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


import Account from "@/views/Account";

export default new VueRouter({

    routes:[
        {
            path:"/",
            redirect:"/account",
        },
        {
            path:"/account",
            component:Account
        },



    ]




})