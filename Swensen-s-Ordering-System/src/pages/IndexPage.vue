<template>
  <q-page>

    <q-input v-model="category" label=" Add category" />
    <q-btn color="primary" label="valider" @click="addCategory" />

    <NavComponent @showCart="showCart = true"/>
    <ChooseMenuComponent @showCart="showCart = true"/>
    <q-dialog v-model="showCart" full-width>
      <CartComponent/>
    </q-dialog>

  </q-page>
</template>


<script>
import { defineComponent } from 'vue'
import ChooseIceCream from "components/ChooseIceCreamComponent";
import NavComponent from "components/NavComponent";
import CartComponent from "components/CartComponent";
import ChooseMenuComponent from "components/ChooseMenuComponent"

export default defineComponent({
  name: 'IndexPage',
  components: {NavComponent, CartComponent ,ChooseMenuComponent},
  data() {
    return {
      showCart : false,
      personalize : false,
      category: ""
    }
  },
  methods: {
    toggleShowCart(){
      this.showCart = !this.showCart
    },
    addCategory () {
      console.log("Maybe try to put api in dubug, having the log can be useful but it's maybe not the problem" +
        " just to check is the api is called")
      const data = {
        name: this.name
      }
      this.$api
        .post("/category/add", data)
        .then((res) => {
          console.log(res)
        })
      },
    },
  })
</script>
