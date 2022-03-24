<template>

<div class="bloc">
  <nav><NavBar/></nav>
  <main><router-view /></main>
  <div id="sidebar"><SideBar/></div>
</div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import NavBar from '@/components/NavBar.vue';


export default {
  components:{
    SideBar, NavBar
  },
    mounted(){ 
  }
}
</script>

<style lang="scss">
.bloc{
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 50px 1.5fr 1.2fr 0.8fr;
  grid-template-areas: 
    "nav nav nav nav"
    "sidebar main main main"
    "sidebar main main main"
    "sidebar main main main";
  grid-gap: 0.3rem;
  align-self: center;
  text-align: center;
}


nav{
  background-color:aqua;
  grid-area: nav;
}
main{
  grid-area: main;
}
#sidebar{
  grid-area: sidebar;
}
#content1{
  grid-area: content1;
  overflow-wrap: break-word;
}

@media screen and (max-width : 767px) {
  .bloc{
    grid-template-areas: 
      "nav"
      "sidebar"
      "main "
      "main";
    grid-template-columns: 1fr;
    grid-auto-rows: 50px 0.1fr 1fr 1fr;
  }
}

</style>