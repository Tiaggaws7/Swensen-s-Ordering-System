<template>
  <div class="title">
    <h3 style="text-align: center;">Welcome to the dashboard ! Here you can see how much buisness is booming.</h3>
    <q-btn @click="$router.push('/admin')">click here to go to admin page</q-btn>
  </div>
  <div style="display: grid;
  grid-template-columns: auto auto;
  justify-content: space-evenly;">
    <h5>Number of orders today : {{store.dailySell}} </h5>
    <h5>Number of orders total : {{store.globalSell}}</h5>
    <h5>Amount of pending transactions (do your job admin) : {{store.pendingTransaction}}</h5>
    <h5>Amount of rejected transactions : {{store.rejectedTransaction}}</h5>
  </div>
</template>

<script>
import {useGlobalStateStore} from "stores/globalState";
export default {
  name: "DashboardPage",
  data (){
    return{
      store: useGlobalStateStore(),
    }
  }
}
</script>

<style scoped>
 h5{
    background-color: hsl(255, 33%, 25%);
    border-radius: 25px;
    padding: 20px;
    margin:20px;
    max-width: 400px;
    text-align: center;
    color:white;
 }
 .title{
  background-color: hsl(255, 33%, 25%);
  border-radius: 25px;
  padding: 20px;
  margin:20px;
  color:white;
 }
</style>
