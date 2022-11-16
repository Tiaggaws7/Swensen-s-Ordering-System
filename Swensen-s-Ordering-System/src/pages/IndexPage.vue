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
