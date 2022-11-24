import { defineStore } from "pinia";

export const useGlobalStateStore = defineStore("global", {
  state: () => ({
    globalSell: 0,
    dailySell: 0,
    toppingsCounter: 8,
    flavoursCounter: 6 ,
    categoriesCounter: 3,
    menusCounter: 4,
    pendingTransaction: 0,
    rejectedTransaction: 0,
    categories: [
      { name: "Signature sundaes", id: "0",},
      { name: "chocolate fantasy", id: "1",},
      { name: "beautiful sundaes", id: "2",},
    ],
    menus: [
      { id: 0,
        name:"Vanilla master",
        hidden: false,
        category: { name: "Signature sundaes", id: "0",},
        flavour: [{id:5, name:"vanilla",price:8.99, image:"vanilla.png"},],
        toppings : [{id:1, name:"Vanilla", price: 0.99,},],
        image: "vanilla_master.jpg",
        price: 6.99,
      },
      { id: 1,
        name:"Vanilla Strawberry",
        hidden: false,
        category: { name: "beautiful sundaes", id: "2",},
        flavour: [{id:5, name:"vanilla",price:8.99, image:"vanilla.png"},],
        toppings : [{id:4, name:"Strawberry", price: 1.99,},],
        image : "vanilla_strawberry.jpeg",
        price: 10.99,
      },
      { id: 2,
        name:"Coconuts Chocolate",
        hidden: false,
        category: { name: "chocolate fantasy", id: "1",},
        flavour: [{id:3, name:"coconuts",price:7.99, image:"coconuts.webp"},],
        toppings : [{id:2, name:"Chocolate", price: 0.99, },],
        image : "coconuts_chocolate.jpeg",
        price: 8.99,
      },
      { id: 3,
        name:"CocoCara",
        hidden: false,
        category: { name: "beautiful sundaes", id: "2",},
        flavour: [{id:3, name:"coconuts",price:7.99, image:"coconuts.webp"},],
        toppings : [{id:6, name:"Caramel", price: 1.99,},],
        image : "coconuts_caramel.jpg",
        price: 7.99,
      },
    ],
    toppings: [
      {id:0, name:"Peanuts butter", price: 0.99,},
      {id:1, name:"Vanilla", price: 0.99,},
      {id:2, name:"Chocolate", price: 0.99, },
      {id:3, name:"M&M's", price: 1.99,},
      {id:4, name:"Strawberry", price: 1.99,},
      {id:5, name:"Blueberry", price: 1.99,},
      {id:6, name:"Caramel", price: 1.99,},
      {id:7, name:"Coconuts", price: 2.99,},
    ],
    flavours: [
      {id:0, name:"peanuts butter", price:5.99, image:"peanuts_butter_iceCream.jpg"},
      {id:1, name:"chocolate-vanilla",price:6.99, image:"chocolate-vanilla.jpg"},
      {id:2, name:"caramel",price:7.99, image:"caramel.jpg"},
      {id:3, name:"coconuts",price:7.99, image:"coconuts.webp"},
      {id:4, name:"red berries",price:8.99, image:"red_berries.png"},
      {id:5, name:"vanilla",price:8.99, image:"vanilla.png"},

    ],
    cartItemID: 0,
    cart: [
    ],
    order: [],
    loggedUser: {}
  }),

  getters: {
    doubleCount(state) {
      return state.globalSell * 2;
    },
  },

  actions: {
    incrementGlobalSell() {
      this.globalSell++;
    },
    incrementDailySell() {
      this.dailySell++;
    },
    resetDailySell() {
      this.dailySell = 0;
    },
    incrementPendingTransaction() {
      this.pendingTransaction++;
    },
    decrementPendingTransaction() {
      this.pendingTransaction--;
    },
    incrementRefusedTransaction() {
      this.rejectedTransaction++;
    },
    addTopping(name, price) {
      this.toppings.push({
        name: name,
        id: this.toppingsCounter,
        price: price,
      });
      this.toppingsCounter++;
      console.log(this.toppings);
    },
    deleteTopping(id) {
      // let index = 0
      // this.toppings.map((topping) => {
      //   if(topping.id == id){
      //     this.toppings.splice(index,1)
      //   }
      //   index++
      // })
      // console.log(this.toppings)
      console.log(this.toppings);
      this.toppings = this.toppings.filter((element) => {
        return element.id != id;
      });
      console.log(this.toppings);
    },
    updateTopping(id, name, price) {
      this.toppings[id].name = name;
      this.toppings[id].price = price;
      console.log(this.toppings);
    },
    addFlavour(name, price, image) {
      this.flavours.push({
        name: name,
        id: this.flavoursCounter,
        price: price,
        image: image,
      });
      this.flavoursCounter++;
      console.log(this.flavours);
    },
    deleteFlavour(id) {
      console.log(this.flavours);
      this.flavours = this.flavours.filter((element) => {
        return element.id != id;
      });
      console.log(this.flavours);
    },
    updateFlavour(id, name, price, image) {
      this.flavours[id].name = name;
      this.flavours[id].price = price;
      this.flavours[id].image = image;
    },
    addToCart(menuName, price, flavour, toppings){
      this.cart.push({id: this.cartItemID, name:menuName, price:price, flavour:flavour, toppings:toppings});
      this.cartItemID++;
    },
    addCategory(name) {
      this.categories.push({
        name: name,
        id: this.categoriesCounter,
      });
      this.categoriesCounter++;
    },
    deleteCategory(id) {
      this.categories = this.categories.filter((element) => {
        return element.id != id;
      });
    },
    updateCategory(id, name) {
      this.categories[id].name = name;
    },
    addMenu(name, image, categories, flavours, toppings) {
      console.log(name, image, categories, flavours, toppings);
      this.menus.push({
        id: this.menusCounter,
        name: name,
        image: image,
        hidden: false,
        category: { name: categories.name, id: categories.id },
        flavours: [flavours],
        toppings: [toppings],
      });
      this.menusCounter++
    },
    deleteMenu(id) {
      this.menus = this.menus.filter((element) => {
        return element.id != id;
      });
    },
    updateMenu(id, name, image, categories, flavours, toppings) {
      this.menus[id].name = name;
      this.menus[id].image = image;
      this.menus[id].category = {name: categories.name, id:categories.id};
      this.menus[id].flavours = [flavours];
      this.menus[id].toppings = [toppings];
    },
    toggleMenuHidden(id) {
      console.log(id);
      this.menus[id].hidden = !this.menus[id].hidden;
      console.log(this.menus[id].hidden);
    },
  },
});
