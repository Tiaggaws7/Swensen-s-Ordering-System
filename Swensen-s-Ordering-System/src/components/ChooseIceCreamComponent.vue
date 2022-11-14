<template>
  <div class="flavour--container">
    <p class="text-bold text-h4">Scoops</p>
    <div class="card-flavour-container flex justify-around">
      <q-card :class="flavour.name !== selectedFlavour.name ? 'card-flavour' : 'card-flavour-selected'" v-for="flavour in flavours" :key="flavour.id" @click="selectedFlavour.name = flavour.name">
        <img :src="require(`../assets/${flavour.image}`)" />

        <q-card-section>
          <div class="text-h6">{{flavour.name}}</div>
          <div class="text-subtitle2">Made in Italia</div>
          <div class="text-subtitle2">{{flavour.price}} $</div>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <div class="q-pa-md">
    <p class="text-bold text-h4">Toppings</p>
    <div class="topping-container">
      <q-checkbox v-for="topping in toppings" :key="topping.id" v-model="selectedToppings" :val="topping.name" :label="topping.name + ' | ' + topping.price + '$'" class="check-toppings"/>
    </div>
  </div>

  <div class="flex flex-center justify-around">
    <div class="btn-addToCart-container">
      <q-btn color="deep-orange" class="b tn-addToCart" push @click="addToCart()" :disabled="selectedFlavour == ''">
        <div class="row items-center no-wrap">
          <q-icon left name="shopping_cart" />
          <div class="text-center">
            Add to Cart
          </div>
        </div>
      </q-btn>
    </div>

    <div v-if="this.store.cart.length > 0" class="btn-addToCart-container">
      <q-btn color="grey" class="btn-addToCart" push @click="$emit('showCart')">
        <div class="row items-center no-wrap">
          <q-icon left name="shopping_cart" />
          <div class="text-center">
            Cart
          </div>
        </div>
      </q-btn>
    </div>
  </div>
</template>

<script>
import {useGlobalStateStore} from "stores/globalState";
import { Notify } from "quasar"
export default {
  props:{
    menu : Object
  },
  name: "ChooseIceCream",
  beforeMount() {
    this.flavours = this.store.flavours
    this.toppings = this.store.toppings
  },
  data() {
    return {
      store: useGlobalStateStore(),
      flavours: [],
      toppings: [],
      selectedFlavour : this.menu.flavour[0],
      selectedToppings : [this.menu.toppings[0].name],
    }
  },
  methods : {
    addToCart() {
      this.store.addToCart(this.menu.name, this.menu.price, this.selectedFlavour, this.selectedToppings)
      Notify.create({
        type: 'positive',
        message: `Ice cream ${this.menu.name} added to cart`,
      })
    }
  }
}
</script>

<style scoped>

.flavour--container {
  width: 80%;
  margin-left: 1%;
}

.card-flavour {
  width: 100%;
  max-width: 250px;
  opacity: 0.95;
  margin: 10px 5px;
}

.card-flavour:hover {
  opacity: 0.75;
}

.card-flavour-selected {
  width: 100%;
  max-width: 250px;
  border: #1D1D1D solid 2px;

}

.topping-container {
  width:50%;
  min-width: 400px;
  margin-left: 1%;
}

.check-toppings {
  width: 30%;
  margin: 10px 5px;
}

.btn-addToCart-container {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}
</style>
