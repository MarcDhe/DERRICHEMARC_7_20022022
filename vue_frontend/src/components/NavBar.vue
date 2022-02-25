<template>
 <header>
   <div class="flex-row ">
    <h1><img class="logo" src="../assets/white_logo.png" alt="logo groupomania"></h1>
    <div class="search">
      <input id="search__bar" type="search" placeholder="Search Groupomania"/>
      <i class="search-icone fa-solid fa-magnifying-glass"></i>
    </div>
   </div>
  <button id="logout"><i class="fa-solid fa-power-off"></i></button>
 </header> 
</template>

<script>
export default {
  name:'NavBar',
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
    border-radius: 5px;
    background-color: #FD2D00;
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
        color:rgb(200, 200, 200);
      }
      .search-icone{
        height: 25px;
        margin-left:-35px;
        color:rgb(200, 200, 200);
      }
    }
  }
  #logout{
    height: 50px;
    width: 50px;
    padding: 7px;
    background-color: #FD2D00;
    color: white;
    border: 0;
    cursor: pointer;
    &:hover{
       background-color: darken($color: #FD2D00, $amount: 5%);
    }
  }
}

</style>