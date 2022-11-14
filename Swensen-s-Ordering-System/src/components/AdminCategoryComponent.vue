<template>

    <div
        class="q-pa-md"
        style="max-width: 350px"
        v-if="store.categories.length > 0"
      >
        <q-list bordered separator v-for="category in store.categories" :key="category.id">
          <q-item clickable v-ripple >
            <q-item-section >
              ID : {{ category.id }} | Name : {{ category.name }}
              </q-item-section
            >
               <q-item-section avatar>
                <q-icon
                name="edit"
                color="red"
                @click.stop="showUpdateForm(category.id,category.name)"
              />
              <q-icon
                name="delete"
                color="red"
                @click.stop="store.deleteCategory(category.id)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div v-if="showForm">
          <h6>Update the category here</h6>
          <q-form
          @submit="onSubmitUpdate"
          @reset="onReset"
          class="q-gutter-md"
        >

        <q-input
            filled
            type="number"
            v-model="categoryID"
            label="ID of the category"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please  type the id'
            ]"
          />

          <q-input
            filled
            v-model="newCategoryName"
            label="Name of the category"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>

        <div>
          <h6>Add a new category</h6>
          <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="categoryName"
            label="Name of the category"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>


      </template>

      <script>
      import {useGlobalStateStore} from "../stores/globalState";
      export default {
        name: "AdminCategoryComponent",
        data(){
          return{
            store: useGlobalStateStore(),
            categoryName: "",
            newCategoryName: "",
            categoryID: "",
            showForm: false,
          }
        },
        methods:{
            onSubmit(){
                this.store.addCategory(this.categoryName)
                this.categoryName = ""
            },
            onReset(){
              this.categoryName = ""
              this.newCategoryName = ""
              this.showForm = false
            },
            showUpdateForm(id,name){
              this.showForm = true
              this.categoryID = id
              this.newCategoryName = name
            },
            onSubmitUpdate(){
              this.store.updateCategory(this.categoryID,this.newCategoryName)
              this.newCategoryName = ""
              this.showForm = false
            }
        }
      }
      </script>

      <style scoped>

      </style>
