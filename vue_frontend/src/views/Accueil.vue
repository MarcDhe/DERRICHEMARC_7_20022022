<template>
<main id="home">
  <h1>Accueil</h1>
  <div class="move-to-post">
    <div class="user">
      <figure>
        <img class="user__avatar" v-bind:src="user?.avatar" alt="user avatar"/>
      </figure>
      <p>{{user?.username}}</p>
    </div>
    <router-link to="/createPost" class='unlink'>
      <p class="input-post">Écrivez votre post.</p>
    </router-link>
  </div>  
  <!-- <div class="red-block"></div> -->
  <div class="post" v-for="post in posts " :key="post.id">
    <PostOverview :post='post'>
      <div class="post__action">
        <p v-if='testLike(post.id)' @click='unlike(post)' class="unlike" ><i class="red-color fa-solid fa-hand-holding-heart" alt="liké"></i> Like:({{post.Liked.length}})</p>
        <p v-if='!testLike(post.id)' @click='addLike(post)' class="like" ><i class="red-color fa-solid fa-hand-holding-heart" alt="liké"></i> Like:({{post.Liked.length}})</p>
        <p @click='showComment(post)' class="commentary" alt="rara" tilte="rere"><i class="red-color fa-solid fa-comment-dots"></i> Commenter </p>
      </div>
      <div v-if="commentStatus === post.id && resMessage" class='green-background'>
        <p>{{resMessage}}</p>
      </div>
      <div v-if="commentStatus === post.id && errMessage" class='red-background'>
        <p>{{errMessage}}</p>
      </div>
      <div v-if="commentStatus === post.id && !resMessage && !errMessage" class="comment">
        <form @submit.prevent="sendComment(post)">
          <textarea id='comment__content' placeholder='Ecrivez votre commentaire' maxlength="300" required></textarea>
          <div class="comment__option">
            <button @click.stop="cancelCommentary()">Annulez</button>
            <button>Envoyez</button>
          </div>
        </form>
      </div>
    </PostOverview>
    
  </div>
</main>
</template>

<script>
import date from '../service/Date.js';
import PostOverview from '../components/PostOverview.vue';
// import localStorage from '../service/LocalStorage';
export default {
components: { PostOverview }, 
  name:"Accueil",
  data(){
    return {
        posts : [],
        userLiked: [],
        user: null,
        commentStatus: null,
        resMessage: null,
        errMessage: null,
    }
  },
  methods:{
    setDate: date.setDate, // METHODE D'APPEL DU FONCTION IMPORTER
    dateDiff: date.dateDiff, // SOURCE : https://forum.vuejs.org/t/how-to-use-helper-functions-for-imported-modules-in-vuejs-vue-template/6266

    //AFFICHE L'ESPACE COMMENTAIRE
    showComment(post){
      this.commentStatus = post.id
      this.resMessage = null
      
    },
    // ANNULE LA CREATION DU COMMENTAIRE
    cancelCommentary(){
      this.commentStatus = null;
    },
    //ENVOIE LE COMMENTAIRE
    async sendComment(post){
      const content = document.getElementById('comment__content').value; // ici vu qu'il y a un v-if comment-content ne peut apparaitre qu'une seul fois par page
      if(content == ""){
        return 0;
      }
      const message = await this.newComment(content, post.id);
      if(message.error){
       return this.errMessage = message.error;
      }
      this.resMessage = "Commentaire envoyé !";
    },
    //NOUVEAU COMMENTAIRE
    async newComment(content, id){
      return fetch(`http://localhost:3000/api/comment/${id}/add`,{ // ATTENTION NE PAS OUBLI2 LE RETURN SUR LE FETCH POUR RECEVOIR LE MESASGE SINON RIP 
        method: "POST",
        headers: {
          'Authorization' : `Bearer ${this.user.token}`,  // attention au majuscule
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({content})
        })
        .then(function(res){
          if(res.ok){
            return res.json();
          }
        })
        .catch(() => console.log('oops ca ne marche pas!'));
    },

    //TEST LIKE
    testLike(post_id){
      return this.userLiked.includes(post_id) // true or false
    },
    // AJOUT D'UN LIKE
    addLike(post){
      const like = 1;
      fetch(`http://localhost:3000/api/like/${post.id}`,{
        method: "POST",
        headers:{
          'Authorization' : `Bearer ${this.user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({like})
      })
      this.userLiked.push(post.id);
      post.Liked.length++;


    },
    // RETIRE UN LIKE
    unlike(post){
      const like = 0;
      fetch(`http://localhost:3000/api/like/${post.id}`,{
        method: "POST",
        headers:{
          'Authorization' : `Bearer ${this.user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({like})
      })
      .then((res) => { 
        if(res.ok){
        return res.json()
      }
      })
      .catch(error => console.log(error))
      this.userLiked = this.userLiked.filter(item => item !== post.id) // SOURCE: https://waytolearnx.com/2019/09/supprimer-un-element-dun-tableau-en-javascript-2.html
      post.Liked.length--;
    }
  },

  async mounted(){ // pour executé la methods au chargement de la page
  
    // this.user = this.checkLocalStorage();
    // A REVOIR
    if(localStorage.user == undefined){
     return this.$router.push(`/login`);
    }
    this.user = JSON.parse(localStorage.getItem('user'));
    const now = new Date();
    if(now.getTime() > this.user.expiry){ // ALORS SESSION EXPIRE
      localStorage.clear()
      return this.$router.push('/login');
    }

   await fetch('http://localhost:3000/api/post',{
          method: "GET",
          headers: {'Authorization' : `Bearer ${this.user.token}`}
          })
      .then(res => res.json())
      .then(result => { this.posts = result })
      .catch(() => console.log("oops ca ne marche pas!"))
  

    // CREATION TABLEAU USERLIKED QUI CONTIENT LE POST_ID DES POST LIKÉ
  const createUserLiked = (post) => {
    for(let i in post){
      for(let y in post[i].Liked){
        if(post[i].Liked[y].user_id == this.user.id){
          this.userLiked.push(post[i].Liked[y].post_id)
        }
      }
    }
  }
    createUserLiked(this.posts)
    
    
  }
}
  
</script>

<style lang="scss" scoped>
#home{
  height: 100%;
  overflow: scroll;
  overflow-wrap: break-word;
  background-image: url("../assets/icon.webp");
  background-position: center;
  background-repeat: no-repeat;
  h1{
    margin:0px;
    margin-left:5px;
    margin-right: 5px;
    background-color: white;
    border-bottom: 2px solid red;
  }
  figure{
    margin: 0;
  }
  .move-to-post{
    overflow: hidden;
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
      &__avatar{
        height:50px;
        width: 50px;
        border:1px solid #d2d2d2;
        border-radius: 30px;
        overflow: hidden;
        margin-right: 10px;
        object-fit: cover;
      }
    }
    .unlink{
      text-decoration: none;
      color:#3F4156;
      cursor:text;
    }
    .input-post{
      text-align: start;
      text-decoration: none;
      margin:0;
      padding:5px;
      height: 70px;
      border: 0;
      background-color: white;
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
    .like, .commentary{
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
        height: 50px;
        width: 50px;
        object-fit: cover;
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
        color:#7a7f82;
      }
      &__username{
        font-weight: 600;
        color: #3F4156;
      }
    }
  }
  .commentary{
    cursor: pointer;
     border-radius: 10px;
     padding: 2px 10px 2px 10px;
    &:hover{
      background-color: #FFD6D6; 
    }
  }
  .comment{
    border:1px solid #d2d2d2;
    display: flex;
    flex-direction: column;
    align-content: center;
    form{
      display: flex;
      flex-direction: column;
    }
    #comment__content{
      width: auto;
      min-height: 70px;
      margin:5px;
      padding: 5px;
      resize: vertical;
      border-radius: 5px;
    }
    &__option{
      display: flex;
      justify-content: space-around;
      
    }
    button{
      margin: 0px 5px 5px 5px;
    }
  }
  .green-background{
    padding: 5px;
    background-color:#D4ECD9;
  }
  .red-background{
    padding: 5px;
    background-color: #F9D6D9;
  }
  button{
    background-color: #ba2808;
    color: white;
    border-radius: 15px;
    padding: 3px 10px 5px 10px;
    cursor: pointer;
    
    &:hover{
    background-color: darken($color: #FD2D00, $amount: 10%);
    }
  }
}
</style>