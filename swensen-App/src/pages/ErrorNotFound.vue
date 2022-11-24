<template>
  <NavComponent @showCart="showCart = true"/>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
  <q-dialog v-model="showCart" full-width>
    <CartComponent/>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import NavComponent from "components/NavComponent";
import CartComponent from "components/CartComponent";

export default defineComponent({
  name: 'ErrorNotFound',
  components: {NavComponent, CartComponent},
  data(){
    return {
      showCart: false
    }
  }
})
</script>
