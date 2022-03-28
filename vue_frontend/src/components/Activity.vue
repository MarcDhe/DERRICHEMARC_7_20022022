<template>
  <div id='option'>
   <div class="menu">
      <p @click='selectPost()' class='select-post border border-bottom'>Mes posts</p>
      <p @click="selectLiked()" class='select-liked border'>Mes Likes</p>
    </div>
    <!-- MY POSTS -->
    <div v-if='select == "post" && allPosts !== null'> <!-- si pas de condition !== null fait crashé la page--> 
        <div  class="default-message" v-if='allPosts.length == 0' >
        <p> Vous n'avez pas posté!</p>
      </div>
      <div class="post" v-for="post in allPosts " :key="post.id">
        <router-link class="unlink" v-bind:to="`/post/${post.id}`">  <!-- EN ATTENDANT DAVOIR LA BONNE SOLUTION  -->
        <div class="post__info">
          <div class="align-start">
            <h3 class="post__title">{{post.title}}:</h3>
            <p class="post__release">- {{setDate(post.createdAt)}} -</p>
          </div>
            <p><i class="red-color fa-solid fa-hand-holding-heart" alt="Number of like"></i> {{post.Liked.length}}</p>
        </div>
          <div class="post__body">
            <figure v-if='post.imageUrl'>
              <img class="post__picture" :src="post.imageUrl" alt="avatar"/>
            </figure>
            <p class="post__content">{{post.content}}</p>
          </div>
        </router-link>
      </div>
    </div>
    <!-- POSTS LIKED -->
    <div v-if='select == "liked" && allLiked !== null'>
      <div  class="default-message" v-if='allLiked.length == 0' >
        <p> Vous n'avez pas liké !</p>
      </div>
      <div class="post" v-for="liked in allLiked " :key="liked.post_id">
        <router-link class="unlink" v-bind:to="`/post/${liked.post_id}`">  <!-- EN ATTENDANT DAVOIR LA BONNE SOLUTION  -->
          <div class="post__info">
            <div class="align-start">
              <h3 class="post__title">{{liked.Post.title}}:</h3>
              <p class="post__release">- {{setDate(liked.Post.createdAt)}} -</p>
            </div>
              <p><i class="red-color fa-solid fa-hand-holding-heart" alt="like"></i> {{liked.Post.Liked.length}}</p>
          </div>
            <div class="post__body">
            <figure v-if='liked.Post.imageUrl'>
              <img class="post__picture" :src="liked.Post.imageUrl" alt="avatar"/>
            </figure>
            <p class="post__content">{{liked.Post.content}}</p>
          </div>
        </router-link>
      </div>
    </div>
   </div>
</template>

<script>
import date from '../service/Date.js';

export default {
  name:'Activity',  
  data(){
    return{
      user: null,
      allPosts: [],
      allLiked: [],
      select: "post",
    }
  },
  methods:{
    //IMPORTATION FONCTION DE SERVICE/DATE.js
    setDate: date.setDate, 
    dateDiff: date.dateDiff,
    
    // AFFICHAGE DU BLOC POST
    selectPost(){
      this.removeBorderBottom();
      this.select = "post";
      const blocPost = document.getElementsByClassName('select-post')[0];
      blocPost.classList.add('border-bottom');  

    },
    // AFFICHAGE DU BLOC COMMENT
    selectLiked(){
      this.removeBorderBottom();
      this.select = "liked";
      const blocLiked = document.getElementsByClassName('select-liked')[0];
      blocLiked.classList.add('border-bottom');  
    },
    //SUPPRESSION ATTRIBUT BORDER BOTTOM
    removeBorderBottom(){
      const blocPost = document.getElementsByClassName('select-post')[0];
      const blocLiked  = document.getElementsByClassName('select-liked')[0];
      blocPost.classList.remove('border-bottom');
      blocLiked.classList.remove('border-bottom');
    },
  },
  async mounted(){
    //RECUPERATION USER 
    this.user = JSON.parse(localStorage.getItem('user'));

    //RECUPERATION DE TOUT LES POSTS FAIT PAR DATE
    await fetch('http://localhost:3000/api/post/user/post',{
        method: "GET",
        headers:{'Authorization' : `Bearer ${this.user.token}`}
      })
      .then(res => res.json())
      .then(result => { this.allPosts = result })
      .catch(() => console.log("oops ca ne marche pas!"))

    //RECUPERATION DE TOUT LES COMMENTS FAIT PAR DATE
      await fetch('http://localhost:3000/api/like',{
        method: "GET",
        headers:{'Authorization' : `Bearer ${this.user.token}`}
      })
      .then(res => res.json())
      .then(result => { this.allLiked = result })
      .catch(() => console.log("oops ca ne marche pas!"))

  }
}
</script>

<style lang="scss">
#option{
  display: flex;
  flex-direction: column;
  h3{
    margin:0px;
  }
  p{
    margin:0px;
  }
    .menu{
      display: flex;
      align-items: center;
      background-color:white;
      p{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 30px;
        margin: 0;
        &:hover{
          border-bottom: 2px solid #FD2D00;
          cursor: pointer;
        }
      }
      .border{
        border-right: 1px solid #EDF2F6;
      }
    }
  
  .post, .comment{
     border:1px solid rgb(210, 210, 210);
    border-radius: 5px;
    background-color: white;
    margin-top:10px;
    padding: 5px;
    &__info{
      border-radius: 5px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      padding: 5px;
      .align-start{
        text-align: start;
      }
    }
    &__release{
        color:#7A8891;
    }
    .red-color{
      color: #FD2D00;
    }
    &__body{
      border:1px solid rgb(210, 210, 210);
      border-radius: 5px;
      min-height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__content{
      width: 100%;
      padding-left: 10px;
      text-align: start;
      margin-bottom:15px;
    }
    &__picture{
      max-width: 100%;
    }
    .unlink{
      text-decoration: none;
      color: black
    }

    }
    .default-message{
      margin-top:10px;
      margin-bottom: 10px;
    }
}
</style>