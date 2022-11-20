<template>
  <div v-if="!detail">
    <h1 class="text-center">Choose your menu</h1>
    <div v-for="category in this.store.categories" :key="category.id" class="card-flavour-container">
      <h3 class="text-center text-bold" >{{category.name}}</h3>
      <br/>
      <div class="flex justify-around">
        <q-card :class="menu !== selectedMenu ? 'card-menu' : 'card-menu-selected'" v-for="menu in this.store.menus.filter( item => item.category.name == category.name)" :key="menu.id" @click="selectedMenu = menu, detail=true">
          <img :src="require(`../assets/${menu.image}`)" />
          <q-card-section>
            <div class="text-h6">{{menu.name}}</div>
            <div class="text-subtitle2">Made in Italia</div>
            <div class="text-subtitle2"> {{menu.price}} $</div>
          </q-card-section>
        </q-card>
      </div>
      <hr/>
    </div>
  </div>


  <div v-else>
      <h1>Personalize your Ice-Cream</h1>
      <h3>{{selectedMenu.name}}</h3>
      <ChooseIceCream :menu="selectedMenu" @showCart="showCart()"/>
  </div>
</template>

<script>
import {useGlobalStateStore} from "stores/globalState";
import ChooseIceCream from "components/ChooseIceCreamComponent";

export default {
  name: "ChooseMenuComponent",
  components: {ChooseIceCream},
  mounted() {
    this.getMenus()
  },
  data(){
    return  {
      store: useGlobalStateStore(),
      menus: [],
      selectedMenu: {},
      detail : false
    }
  },
  methods : {
    getMenus() {
      this.$api.get("/menu/all")
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log("getMenus error: " + err)
        })
    },
    getPrice(menu){
      let sum = menu.flavour[0].price
      menu.toppings.map( topping => {
          sum = sum + topping.price
      })
      return sum
    },
    showCart(){
      this.$emit('showCart')
    }
  }
}
</script>

<style scoped>

hr {
  width: 80%;
  height: 1px;
  border-radius: 50px;
  background-color: black;
}

img {
  width: 100%;
  max-height : 200px;
}

.card-menu {
  width: 100%;
  max-width: 250px;
  opacity: 0.95;
  margin: 10px 5px;
}

.card-menu:hover {
  opacity: 0.75;
}

.card-menu-selected {
  width: 100%;
  max-width: 250px;
  border: #1D1D1D solid 2px;

}

</style>
