<template>
  <div class="flavour--container">
    <p class="text-bold text-h4">Scoops</p>
    <div class="card-flavour-container flex justify-around">
      <q-card :class="flavour.name !== selectedFlavour.name ? 'card-flavour' : 'card-flavour-selected'" v-for="flavour in flavours" :key="flavour.id" @click="selectedFlavour = flavour">
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
      <q-checkbox v-for="topping in toppings" :key="topping.id" v-model="selectedToppings" :val="topping" :label="topping.name + ' | ' + topping.price + '$'" class="check-toppings"/>
    </div>
  </div>

  <div class="flex flex-center justify-around">
    <div class="btn-addToCart-container">
      <q-btn color="deep-orange" class="b tn-addToCart" push @click="addToCart()" :disabled="Object.keys(selectedFlavour).length === 0">
        <div class="row items-center no-wrap">
          <q-icon left name="shopping_cart" />
          <div class="text-center">
            Add to Cart
          </div>
        </div>
      </q-btn>
    </div>

    <div class="btn-addToCart-container">
      <q-btn color="grey" class="btn-addToCart" push @click="showCart">
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
    this.$api.get("/flavour/all")
      .then(res => {
        this.flavours = res.data
      })
    this.$api.get("/toppings/all")
      .then(res => {
        this.toppings = res.data
      })
  },
  mounted() {
    this.flavours.map(flavour => {
      if (flavour.id == menu.flavourId) {
        this.selectedFlavour = flavour
      }
    })
    this.toppings.map(topping => {
      if (toppings.id == menu.toppingsId) {
        this.selectedToppings.append(topping)
      }
    })
  },
  data() {
    return {
      store: useGlobalStateStore(),
      flavours: [],
      toppings: [],
      selectedFlavour : {},
      selectedToppings : [],
    }
  },
  methods : {
    addToCart() {
      if (Object.keys(this.store.loggedUser).length === 0) {
        this.$router.push('signup')
      }
      else {
        const nameOfToppings = []
        this.selectedToppings.map(topping => {
          nameOfToppings.push(`"${topping.name}"`)
        })
        console.log(nameOfToppings)

        console.log("loggeduserid = " + this.store.loggedUser.id)

        const cartDetails = {
          name:this.menu.name,
          flavour: this.selectedFlavour.name,
          toppings: nameOfToppings
        }

        const strCartDetails = JSON.stringify(cartDetails)

        const data = {
          customerId: Object.keys(this.store.loggedUser).length === 0 ? 1 : this.store.loggedUser.id,
          totalPrice: this.getPrice() ,
          details: strCartDetails
        }
        this.$api.post("/cart/add", data)
          .then(res => {
            console.log(res.data)
          })
          .catch(err => {
            console.log("addToCart() error: " + err)
          })
      }
    },
    getPrice () {
      let sum = this.selectedFlavour.price
      console.log("selected topping : " + this.selectedToppings)
      this.selectedToppings.map( topping => {
        sum = sum + topping.price
      })
      return sum
    },
    showCart() {
      if (Object.keys(this.store.loggedUser).length === 0) {
        this.$router.push('signup')
      }
      else {
        this.$emit('showCart')
      }
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
