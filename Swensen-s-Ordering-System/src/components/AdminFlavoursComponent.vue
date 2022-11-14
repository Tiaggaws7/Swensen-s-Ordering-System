<template>

  <div
    class="q-pa-md"
    style="max-width: 350px"
    v-if="store.flavours.length > 0"
  >
    <q-list bordered separator v-for="flavour in store.flavours" :key="flavour.id">
      <q-item clickable v-ripple>
        <q-item-section>
          ID : {{ flavour.id }} | Name : {{ flavour.name }} | Price : {{ flavour.price }} Image : <img :src="require(`../assets/${flavour.image}`)" width="220" height="200">
        </q-item-section
        >

        <q-item-section avatar>
          <q-icon
            name="edit"
            color="red"
            @click.stop="showUpdateForm(flavour.id,flavour.name,flavour.price,flavour.image)"
          />
          <q-icon
            name="delete"
            color="red"
            @click.stop="store.deleteFlavour(flavour.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>

  <div v-if="showForm">
    <h6>Update the scoop here</h6>
    <q-form
      @submit="onSubmitUpdate"
      @reset="onReset"
      class="q-gutter-md"
    >

      <q-input
        filled
        type="number"
        v-model="flavourID"
        label="ID of the flavour"
        lazy-rules
        :rules="[
            val => val !== null && val !== '' || 'Please  type the id'
          ]"
      />

      <q-input
        filled
        v-model="newFlavourName"
        label="Name of the flavour"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="newFlavourPrice"
        label="Price of the flavour"
        lazy-rules
        :rules="[
            val => val !== null && val !== '' || 'Please  type the price'
          ]"
      />
      <q-file standout v-model="newFlavourImage"
              label="the image of the flavour"
              max-file-size="1048576"
              accept=".jpg, .jpeg, .png"
              @rejected="onRejected"
              @update:model-value="uploadFile()"
      >
        <template #append>
          <q-icon name="attach file"/>


        </template>
      </q-file>

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>

  <div>
    <h6>Add a new scoop</h6>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="flavourName"
        label="Name of the flavour"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="flavourPrice"
        label="Price of the flavour"
        lazy-rules
        :rules="[
            val => val !== null && val !== '' || 'Please  type the price'
          ]"
      />

      <q-file standout v-model="flavourImage"
              label="the image of the flavour"
              max-file-size="1048576"
              accept=".jpg, .jpeg, .png"
              @rejected="onRejected"
              @update:model-value="uploadFile()"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Please fill the image'
                ]"
      >
        <template #append>
          <q-icon name="attach file"/>


        </template>
      </q-file>

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>


</template>

<script>
import {useGlobalStateStore} from "stores/globalState";
export default {
  name: "AdminFlavoursComponent",
  data(){
    return{
      store: useGlobalStateStore(),
      flavourName: "",
      flavourPrice: "",
      flavourImage: "",
      newFlavourName: "",
      newFlavourPrice: "",
      newFlavourImage: "",
      flavourID: "",
      showForm: false,
    }
  },
  methods:{
    onSubmit(){
      console.log(this.flavourImage.name)
      this.store.addFlavour(this.flavourName,this.flavourPrice,this.flavourImage.name)
      this.flavourName = ""
      this.flavourPrice = ""
      this.flavourImage = ""

    },
    onReset(){
      this.flavourName = ""
      this.flavourPrice = ""
      this.flavourImage = ""
      this.newFlavourName = ""
      this.newFlavourPrice = ""
      this.newFlavourImage = ""
      this.showForm = false
    },
    showUpdateForm(id,name,price,image){
      this.showForm = true
      this.flavourID = id
      this.newFlavourName = name
      this.newFlavourPrice = price
      this.newFlavourImage = image

    },
    onSubmitUpdate(){
      this.store.updateFlavour(this.flavourID,this.newFlavourName,this.newFlavourPrice,this.newFlavourImage.name)
      this.newFlavourName = ""
      this.newFlavourPrice = ""
      this.newFlavourImage = ""
      this.showForm = false
    },
    uploadFile(){

    }
  }
}
</script>

<style scoped>

</style>
