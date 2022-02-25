<template>
<div id="main">
  <div>
    <h1>This is the Accueil</h1>
  <div class="post" v-for="post in posts" :key="post.content">
    <h2>{{post.title}}</h2>
    <p>{{ post.content}}</p>
    <p>user N° {{ post._id }}</p>
  </div>

    <button @click='printf'> cliquer pour afficher </button>
  </div>
<router-link to="/createPost">You want to post something ?</router-link>
</div>
</template>

<script>
// import axios from 'axios';

export default {
  name:"Accueil",
  data(){
    return {
        posts : []
    }
  },
  methods:{
    printf(){
      console.log(" valeur recuperer :", this.posts)
    }
  },

  mounted(){ // pour executé la methods au chargement de la page
    fetch('http://localhost:3000/api/post')
      .then(res => res.json())
      .then(result => this.posts = result)
      // .catch(err => console.log("oops ca ne marche pas!"))
  }

  }
</script>

<style lang="scss">
#main{
  height: 100%;
  overflow: scroll;
  background-image: url("../assets/icon.png");
  background-position: center;
  background-repeat: no-repeat;
}
.post{
  border: 1px solid black;
  border-radius: 5px;
  background-color: rgba(240, 240, 240, 0.8);
  margin: 5px;
}
</style>