<template>
  <nav id="nav__inside">
    <div class="container">
      <router-link class="nav__link mobile-off" to="/">
        <h2><i class="fa-solid fa-house-chimney-window"></i> Accueil</h2>
      </router-link> 
      <router-link class="nav__link mobile-on" to="/">
        <h2><i class="fa-solid fa-house-chimney-window"></i></h2>
      </router-link> 
      <!-- <router-link class="nav__link" to=""> 
        <h2><i class="fa-solid fa-bell"></i> Notifications</h2>
      </router-link> -->
      <router-link class="nav__link mobile-off" to='/messaging'>
        <h2><i class="fa-solid fa-envelope"></i> Message</h2>
      </router-link>
      <router-link class="nav__link mobile-on" to='/messaging'>
        <h2><i class="fa-solid fa-envelope"></i></h2>
      </router-link>
      <router-link  class="nav__link mobile-off" to="/profil">
        <h2><i class="fa-solid fa-user"></i> Profil</h2>
      </router-link> 
      <router-link  class="nav__link mobile-on" to="/profil">
        <h2><i class="fa-solid fa-user"></i></h2>
      </router-link> 
      <router-link id="make_post" class='mobile-off' to='/createPost'>
        <h2>Poster</h2>
      </router-link>      
      <router-link id="make_post" class='mobile-on' to='/createPost'>
        <h2>Poster</h2>
      </router-link>
      <!-- <router-link to="/login">Login</router-link> 
      <router-link to="/signup">Signup</router-link>  -->
    </div>
  </nav>
  
</template>

<script>
export default {
  name: 'SideBar',
  
}
</script>

<style lang="scss" scoped>
#nav__inside{
  background-color: rgb(245, 245, 245);
  border-radius: 10px 0px 0px 10px;
  height: 100%;
  .container{
    display: flex;
    flex-direction: column;
  }
  .nav__link{
      text-decoration: none;
      color: black;
      margin: 5px;
      font-size:14px;
      font-weight: 100;
      &:hover{
        background-color: #FFD6D6; 
        border-radius: 60px
      }
      h2{
      margin: 10px 0px 10px 0px;
      font-size:20px;
      font-weight: 600;
    }
  }

  #make_post{
    border: 1px solid red;
    background-color: #FD2D00;
    color: white;
    text-decoration: none;
    border-radius: 3px;
    margin: 10px 5px 10px 5px;
    text-align: center;
    font-size: 12px;
    &:hover{
    background-color: darken($color: #FD2D00, $amount: 10%);
    }
  }
  .mobile-on{
    display: none;
  }
}

@media screen and (max-width : 767px) {
  #nav__inside{
    height: auto;
    .mobile-on{
      display: block;
      width: 25%;
      margin: 0px;

    }
    .mobile-off{
      display: none;
    }
    #make_post{
      height: 100%;
      margin:0px;
    }
    .container{
      flex-direction: row;
      justify-content:space-between;
      align-items: center;
    }

  }

}


</style>