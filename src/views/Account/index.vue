<template>
  <div>
    account
    <button v-on:click="getAccount"></button>
    <p>{{account.toString()}}</p>
  </div>

</template>

<script>

import {getAccountById} from "@/api/account/account";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Account",
  data(){
    return{
      account:{"11": 22}
    }
  },

  methods:{

    async getAccount(){
      let resoult = await getAccountById(1);
      console.log(resoult.data);
    }

  }

}
</script>

<style scoped>

</style>