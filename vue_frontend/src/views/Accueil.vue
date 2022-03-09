<template>
<div id="main">
  <h1>Accueil</h1>
  <div class="move-to-post">
    <div class="user">
      <figure>
        <img class="user__avatar" v-bind:src="$store.state.userProfil.avatar"/>
      </figure>
      <p>{{$store.state.userProfil.username}}</p>
    </div>
    <router-link to="/createPost"> <!-- renvoi vers la creation de post -->
      <input class="input-post" type="text" placeholder="Écrivez votre post."/>
    </router-link>
  </div>  
  <div class="red-block"></div>
  <div class="post" v-for="post in posts" :key="post.content">
    <!-- <router-link class="unlink" v-bind:to="{path:'post', params: { id: post.id }}"> attention a revoir ecriture non bonne   -->
    <router-link class="unlink" v-bind:to="`/post/${post.id}`">   <!-- EN ATTENDANT DAVOIR LA BONNE SOLUTION--> 
      <div class="info">
        <div class="owner">
          <div class="redim">
            <figure>
              <img class="owner__avatar" :src="post.User.avatar" alt="avatar"/>
            </figure>
          </div>
          <div class="owner__details">
            <div class="owner__username"> {{post.User.username}} {{ post.id }}</div>
            <div class="owner__relase">posté le {{post.createdAt}}</div>
          </div>
        </div>
          <p><i class="fa-solid fa-user-plus"></i></p>
      </div>
      <div class="post__details">
        <h2>{{post.title}} :</h2>
         <figure>
          <img :src='post.imageUrl' />
        </figure>
        <p>{{ post.content}}</p>
      </div>
      </router-link>
      <div class="post__action">
        <p class="unlike"><i class="red-color fa-solid fa-hand-holding-heart" alt="liké"></i> Like:({{post.Liked.length}})</p>
        <p class="like" ><i class="red-color fa-solid fa-hand-holding-heart" alt="liké"></i> Like:({{post.Liked.length}})</p>
        <p class="comment" alt="rara" tilte="rere"><i class="red-color fa-solid fa-comment-dots"></i> Commenter </p>
      </div>
    
    
  </div>

    <button @click='printf'> cliquer pour afficher </button>
  <router-link to="/createPost">You want to post something ?</router-link>
</div>
</template>

<script>
// import axios from 'axios';

export default {
  name:"Accueil",
  data(){
    return {
        posts : [],
        
    }
  },
  methods:{
    printf(){
      console.log(" valeur recuperer :", this.posts)
    }
  },

  mounted(){ // pour executé la methods au chargement de la page
      fetch('http://localhost:3000/api/auth/user',{
        method: "GET",
        headers: { 'Authorization' : `Bearer ${this.$store.state.userToken}`}
      })
      .then((res) => res.json())
      .then(result => {
        this.$store.state.userProfil = result 
      })
      .catch(() => console.log("oops ca ne marche pas!"))

    fetch('http://localhost:3000/api/post')
      .then(res => res.json())
      .then(result => this.posts = result)
      .catch(() => console.log("oops ca ne marche pas!"))

        console.log("sur app l'utilisateur est: ", this.$store.state.userProfil.token)
    }
  }
  
</script>

<style lang="scss" scoped>
#main{
  height: 100%;
  overflow: scroll;
  overflow-wrap: break-word;
  background-image: url("../assets/icon.png");
  background-position: center;
  background-repeat: no-repeat;
}
.move-to-post{
  margin: 5px 5px 10px 5px;
  padding:10px 5px 0px 0px;
  border:1px solid rgb(210, 210, 210);
  border-radius: 5px;
  background-color: rgba(250, 250, 250, 0.8);
  display: flex;
  flex-direction: column;
  .user{
    display: flex;
    justify-content: flex-start;
    margin-left: 15px;
    margin-bottom: 10px;
    figure{
      margin: 0;
    }
     &__avatar{
      height:50px;
      width: 50px;
      border:1px solid #d2d2d2;
      border-radius: 30px;
      overflow: hidden;
      margin-right: 10px;
    }
  }
  .input-post{
    width: 100%;
    height: 70px;
    border: 0;
    border-top: 1px solid #d2d2d2;
    text-indent:5px; // déplacer le text dans un padding
  }
  
}
.red-block{
  background-color: rgba(253, 45, 0, 0.8),;
  margin-left:5px;
  margin-right:5px;
  margin-bottom:10px;
  height:10px;
  border-radius: 5px;
}

.post{
  border:1px solid rgb(210, 210, 210);
  border-radius: 5px;
  background-color: rgba(250, 250, 250, 0.8);
  margin: 5px 5px 10px 5px;
  padding: 5px;
  .unlink{
    text-decoration: none;
    color: black
  }
    &__details{
    text-align: start;
    margin: 10px 5px 0px 5px;
    padding: 10px;
    border:1px solid rgb(210, 210, 210);
    border-radius: 5px;    
    background-color: white;
    h2{
      margin:0;
      margin-bottom: 5px;
    }
    img{
      max-width: 100%;
    }
    p{
      margin: 0;
    }
  }
  &__action{
    display: flex;
    justify-content: space-around;
    .like, .unlike, .comment{
      border-radius: 10px;
      padding: 2px 10px 2px 10px;
      &:hover{
        background-color: #FFD6D6; 
        cursor: pointer;
      }
    }
    .like, .comment{
      .red-color{
      color: #8e1352;
      }
    }
    .unlike{
      .red-color{
        color: #FD2D00;
      }
    }
  }
  
}

.info{
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  .owner{
    display: flex;
    align-items: center;
    &__avatar{
      height: 45px;
      width: 45px;
    }
    .redim{
      height:45px;
      width: 45px;
      border:1px solid rgb(210, 210, 210);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 25px;
      overflow: hidden;
    }
    &__details{
      padding-left: 10px;
      text-align: start;
    }
    &__relase{
      color:#7A8891;
    }
    &__username{
      font-weight: 600;
      color: #3F4156;
    }
  }

}

</style>