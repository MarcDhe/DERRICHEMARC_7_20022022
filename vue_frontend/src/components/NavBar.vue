<template>
 <header>
   <div class="flex-row ">
    <h1>
      <img class="logo mobile-off" src="../assets/white_logo.webp" alt="logo groupomania">
      <img class="logo mobile-on" src="../assets/mobile_logo.webp" alt="logo groupomania">
    </h1>
      <form @submit.prevent='goToSearch' class="search" >
        <input id="search__bar" type="search" placeholder="Search Groupomania" required/>
        <i class="search-icone fa-solid fa-magnifying-glass"></i>
      </form>
   </div>
  <button id="logout" @click="log" aria-label='login/logout'><i class="fa-solid fa-power-off" ></i></button>
 </header> 
</template>

<script>

export default {
  name:'NavBar',
  data(){
    return {
    }
  },
  methods:{
    log(){
      if(localStorage.user == undefined){ 
        console.log("crac")
        window.location = '/Login' // ici on peu l'utilisé vu que l'on sen fiche si celui ci est ou non sauvegarder 
      }else{
        localStorage.clear();
        console.log('you are logout');
        window.location = '/Login' // ici on peu l'utilisé vu que l'on sen fiche si celui ci est ou non sauvegarder 
      }
    },
    //ENVOIR VERS SEARCH AVEC PARAMS DANS L'URL
    async goToSearch(){
      const searchValue = document.getElementById('search__bar').value 
      console.log('ici',searchValue)
      await this.$router.push({ name: 'Search', params: { value: searchValue } })
      this.$store.state.searchKey += 1;
      console.log(this.$store.state.searchKey)
    }
  },


}
</script>

<style lang="scss">



header{
  background-color: #3F4257;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1{
    height: 35px;
    padding: 7px 10px 7px 10px;
    margin: 0;
    margin-right: 0.3rem;
    border-radius: 0px 5px 5px 0px;
    background-color: #ba2808;
    align-self: center; 
    img{
      width: 100%;
      height: 100%;
    }
  }
  .flex-row{
    display: flex;
    .search{
      display: flex;
      flex-direction: row;
      align-items: center;
      #search__bar{
        height: 100%;
        width: 300px;
        padding-right: 40px;
        padding-left: 10px;
        border-radius: 10px;
        border: 0px;
        background-color: lighten(#3F4257, 10%);
        &:focus{
          background-color: white;
        }
      }
      ::placeholder{
        color:white;
      }
      .search-icone{
        height: 25px;
        margin-left:-35px;
        color:white;
      }
    }
  }
  #logout{
    height: 50px;
    width: 50px;
    padding: 7px;
    background-color: #ba2808;
    color: white;
    border: 0;
    cursor: pointer;
    &:hover{
       background-color: darken($color: #FD2D00, $amount: 10%);
    }
  }
  .mobile-on{
    display: none;
  }
}
@media screen and (max-width : 767px) {

header{
  .mobile-off{
    display: none;
  }
  .mobile-on{
    display: block;
  }
 .flex-row{
   width: 100%;
   margin-right:3px;
    .search{
      width: 100%;
      #search__bar{
        height: 50px;
        width: 100%;
        &:focus{
          background-color: white;
        }
      }
    }
 }
}

}


</style>