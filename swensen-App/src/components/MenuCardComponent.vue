<template>
  <q-card class="my-card flex justify-evenly" style="width: 300px; height: 200px">
    <q-img :src=img>
      <div class="absolute-bottom">
        <div class="text-h6">{{nom}}</div>
          <div class="text-subtitle2">{{toppings}}</div>
      </div>
    </q-img>

    <q-card-actions>
      <q-btn flat style="width: 300px" @click="addCart">Order</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "MenuCard",
  props:{
    img:{type:String},
    nom:{type:String},
    toppings:{type:String}
  },
  methods:{
    addCart(){
      console.log("ajouté au panier")
    }
  }
}
</script>

<style scoped>

</style>
