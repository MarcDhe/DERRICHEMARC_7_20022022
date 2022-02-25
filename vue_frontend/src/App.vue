<template>
<div class="bloc">
  <nav><NavBar/></nav>
  <main><router-view /></main>
  <div id="sidebar"><SideBar/></div>
  <div id="content1">Content1</div>
  <div id="content2">Content2</div>
  <footer>Footer</footer>
</div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import NavBar from '@/components/NavBar.vue';



export default {
  components:{
    SideBar, NavBar
  }
}
</script>

<style lang="scss">
.bloc{
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 0.2fr 1.5fr 1.2fr 0.8fr;
  grid-template-areas: 
    "nav nav nav nav"
    "sidebar main main content1"
    "sidebar main main content2"
    "sidebar footer footer footer";
  grid-gap: 0.3rem;
  align-self: center;
  text-align: center;
}

nav{
  background-color:aqua;
  grid-area: nav;
}
main{
  background-color: aquamarine;
  grid-area: main;
}
#sidebar{
  background-color: white;
  grid-area: sidebar;
}
#content1{
  background-color: #a7ffeb;
  grid-area: content1;
}
#content2{
  background-color: #84ffff;
  grid-area: content2;

}
#content3{
  background-color: #73ffba;
  grid-area: content3;

}
footer{
  background-color: #1de9b6;
  grid-area: footer;
}
</style>