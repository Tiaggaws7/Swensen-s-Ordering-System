<template>
  <NavComponent @showCart="showCart = true"/>
  <div class="title">
    <h3 style="text-align: center;">Welcome to the dashboard ! Here you can see how much buisness is booming.</h3>
    <q-btn @click="$router.push('/admin')">click here to go to admin page</q-btn>
  </div>
  <div style="display: grid;
        grid-template-columns: auto auto;
        justify-content: space-evenly;">
    <h5>Number of orders today : {{daily}} </h5>
    <h5>Number of orders total : {{global}}</h5>
    <h5>Amount of pending transactions (do your job admin) : {{pending}}</h5>
    <h5>Amount of rejected transactions : {{rejected}}</h5>
  </div>
</template>

<script>
import {useGlobalStateStore} from "stores/globalState";
import NavComponent from "components/NavComponent";

export default {
  name: "DashboardPage",
  components: {NavComponent,},
  data (){
    return{
      store: useGlobalStateStore(),
      global: "",
      daily: "",
      pending: "",
      rejected: "",
    }
  },
  mounted(){
    this.getPendingCount(),
    this.getAcceptedCount(),
    this.getRejectedCount(),
    this.getAcceptedTodayCount()
  },
  methods:{
    getPendingCount() {
      this.$api.get("/order/all/pending/count")
        .then((res) => {
          if (res.status == 200){
            console.log(res.data)
            this.pending = res.data
          }
        })
        .catch((err) => {
          console.log("error: " + err);
        })
    },
    getAcceptedCount() {
      this.$api.get("/order/all/accepted/count")
        .then((res) => {
          if (res.status == 200){
            console.log(res.data)
            this.global = res.data
          }
        })
        .catch((err) => {
          console.log("error: " + err);
        })
    },
    getAcceptedTodayCount() {
      this.$api.get("/order/all/accepted/today/count")
        .then((res) => {
          if (res.status == 200){
            console.log(res.data)
            this.daily = res.data
          }
        })
        .catch((err) => {
          console.log("error: " + err);
        })
    },
    getRejectedCount() {
      this.$api.get("/order/all/rejected/count")
        .then((res) => {
          if (res.status == 200){
            console.log(res.data)
            this.rejected = res.data
          }
        })
        .catch((err) => {
          console.log("error: " + err);
        })
    },
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
