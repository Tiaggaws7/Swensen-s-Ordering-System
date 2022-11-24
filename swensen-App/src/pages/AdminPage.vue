<template>
  <NavComponent @showCart="showCart = true"/>
  <div>
  <div style="max-width: 500px">
    <h3>Welcome to the admin page</h3>
    <q-btn @click="$router.push('/dashboard')">click here to go to dashboard</q-btn>
    <h6>Here you can manage the pending orders</h6>
    <q-list bordered separator v-for="order in list" :key="order.id">
      <q-item clickable v-ripple >
        <q-item-section >
          ID : {{order.id}} | Customer ID : {{order.customerId}} | Status : {{order.status}} | Date : {{order.date}}
        </q-item-section
        >
        <q-item-section avatar>
          <q-icon
            name="check"
            color="green"
            @click.stop="updateAccept(order.id,order.customerId,order.date)"
          />
          <q-icon
            name="delete"
            color="red"
            @click.stop="updateReject(order.id,order.customerId,order.date)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <h6>Here you can manage the toppings, the scoops, the categories and the menu</h6>
  </div>
  <AdminToppingsComponent></AdminToppingsComponent>
  <AdminFlavoursComponent></AdminFlavoursComponent>
  <AdminCategoryComponent></AdminCategoryComponent>
  <AdminMenusComponent></AdminMenusComponent>

</template>

<script>
import {useGlobalStateStore} from "../stores/globalState";
import AdminToppingsComponent from "../components/AdminToppingsComponent.vue"
import AdminFlavoursComponent from "../components/AdminFlavoursComponent.vue";
import AdminCategoryComponent from "../components/AdminCategoryComponent.vue";
import AdminMenusComponent from "../components/AdminMenusComponent.vue";
import NavComponent from "components/NavComponent";
export default {
  name: "AdminPage",
  components: { AdminToppingsComponent, AdminFlavoursComponent, AdminCategoryComponent, AdminMenusComponent, NavComponent },
  data() {
    return {
      store: useGlobalStateStore(),
      list: [],
      customerId: "",
      status:"",
      date:"",

    };
  },
  mounted(){
    this.getPending()
  },
  methods:{
    getPending() {
      this.$api.get("/order/all/pending")
        .then((res) => {
          if (res.status == 200){
            console.log(res.data)
            this.list = res.data
          }
        })
        .catch((err) => {
          console.log("error: " + err);
        })
    },
    updateWithID(id){
              const data = {
                customerId: this.customerId,
                status: this.status,
                date: this.date
              }
              this.$api.put("/order/" + id, data)
                .then((res) => {
                  if (res.status == 200){
                    console.log(res.data)
                    console.log(this.status)
                    this.getPending()
                  }
                })
                .catch((err) => {
                  console.log("updateWithID() error: " + err);
                })
            },
    updateAccept(id,customerId,date){
      this.customerId = customerId
      this.status = "accepted"
      this.date = date
      this.updateWithID(id)
    },
    updateReject(id,customerId,date){
      this.customerId = customerId
      this.status = "rejected"
      this.date = date
      this.updateWithID(id)
    }
  },
}

</script>

<style scoped>

</style>
