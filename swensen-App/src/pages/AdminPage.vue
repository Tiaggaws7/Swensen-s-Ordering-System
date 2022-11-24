<template>
  <NavComponent @showCart="showCart = true"/>
  <div>
    <h3>Welcome to the admin page</h3>
    <q-btn @click="$router.push('/dashboard')">click here to go to dashboard</q-btn>
    <h6>Here you can manage the orders</h6>
    <q-list bordered separator v-for="ordered in store.order" :key="ordered.id">
      <q-item clickable v-ripple >
        <q-item-section >
          Items : {{ ordered[0] }} {{ ordered[1] }} {{ ordered[2] }}
        </q-item-section
        >
        <q-item-section avatar>
          <q-icon
            name="edit"
            color="red"
            @click.stop="showUpdateForm(topping.id,topping.name,topping.price)"
          />
          <q-icon
            name="delete"
            color="red"
            @click.stop="store.deleteTopping(topping.id)"
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
  data() {
    return {
      store: useGlobalStateStore(),
    };
  },
  components: { AdminToppingsComponent, AdminFlavoursComponent, AdminCategoryComponent, AdminMenusComponent, NavComponent }
}

</script>

<style scoped>

</style>
