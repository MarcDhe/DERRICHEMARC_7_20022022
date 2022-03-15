<template>
<div id="main">
  <h1>Accueil</h1>
  <!-- <p>{{ this.try }}</p> -->
  <div class="move-to-post">
    <div class="user">
      <figure>
        <img class="user__avatar" v-bind:src="user?.avatar"/>
      </figure>
      <p>{{user?.username}}</p>
    </div>
    <router-link to="/createPost"> <!-- renvoi vers la creation de post -->
      <input class="input-post" type="text" placeholder="Écrivez votre post."/>
    </router-link>
  </div>  
  <div class="red-block"></div>
  <div class="post" v-for="post in posts " :key="post.id">
    <!-- <router-link class="unlink" :to={name:'post', params: { id: post.id }}> attention a revoir ecriture non bonne   -->
    <router-link class="unlink" v-bind:to="`/post/${post.id}`">  <!-- EN ATTENDANT DAVOIR LA BONNE SOLUTION  -->
      <div class="info">
        <div class="owner">
          <div class="redim">
            <figure>
              <img class="owner__avatar" :src="post.User.avatar" alt="avatar"/>
            </figure>
          </div>
          <div class="owner__details">
            <div class="owner__username"> {{post.User.username}} {{ post.id }}</div>
            <div class="owner__relase" >{{this.setDate(post.createdAt)}}</div>
            <!-- <div class="owner__relase">posté le {{post.createdAt}}</div> -->

          </div>
        </div>
          <p><i class="fa-solid fa-user-plus"></i></p>
      </div>
      <div class="post__details">
        <h2>{{post.title}} :</h2>
         <figure>
          <img :src='post.imageUrl' />
        </figure>
        <p>{{post.content}}</p>
      </div>
      </router-link>
      <div class="post__action">
        <p v-if='testLike(post.Liked)' @click='unlike(post)' class="unlike" ><i class="red-color fa-solid fa-hand-holding-heart" alt="liké"></i> Like:({{post.Liked.length}})</p>
        <p v-if='!testLike(post.Liked)' @click='addLike(post)' class="like" ><i class="red-color fa-solid fa-hand-holding-heart" alt="liké"></i> Like:({{post.Liked.length}})</p>
        <p @click='showComment(post)' class="commentary" alt="rara" tilte="rere"><i class="red-color fa-solid fa-comment-dots"></i> Commenter </p>
      </div>
      <div v-if="commentStatus == post.id && resMessage" class='green-background'>
        <p>{{resMessage}}</p>
      </div>
      <div v-if="commentStatus == post.id && errMessage" class='red-background'>
        <p>{{errMessage}}</p>
      </div>
      <div v-if="commentStatus == post.id && !resMessage && !errMessage" class="comment">
          <textarea id='comment__content' placeholder='Ecrivez votre commentaire' maxlength="300" required></textarea>
          <div class="comment__option">
            <button @click="cancelCommentary()">Annulez</button>
            <button @click="sendComment(post)">Envoyez</button>
          </div>
      </div>
    
    
  </div>

    <button @click='printf'> cliquer pour afficher </button>
  <router-link to="/createPost">You want to post something ?</router-link>
</div>
</template>

<script>



export default {
  name:"Accueil",
  data(){
    return {
        posts : [],
        user: null,
        commentStatus: null,
        resMessage: null,
        errMessage: null,
    }
  },
  methods:{
    //CREATION FONCTION SOUSTRACTION DATE 
    dateDiff(date1, date2){ //SORUCE: http://www.finalclap.com/faq/88-javascript-difference-date
    let diff = {}                           // Initialisation du retour
    let tmp = date2 - date1;
 
    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes
 
    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes
 
    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures
     
    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
    diff.day = tmp;
     
    return diff;
    },
    //GESTION DE L'AFFICHAGE DES DATES
    setDate(date){
      const currentTime = new Date()
      let newDate = new Date((date))
      // const dayDate = newDate.toLocaleDateString() pour afficher uniquement le jour et/ou l'heure
      // const timeDate = newDate.toLocaleTimeString()
      const compareDate = this.dateDiff(newDate,currentTime); // retourne un objet
      if(compareDate.day == 0 && compareDate.hour == 0){
        return `posté il y a ${compareDate.min}min`
      }
      if(compareDate.day == 0){
        return `posté il y a ${compareDate.hour}h`
      }
        return `posté il y a ${compareDate.day}j`
    },
    printf(){
      console.log(" valeur recuperer :", this.posts)
    },
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
      console.log(content)
      if(content == ""){
        console.log('contenu vide');
        return 0;
      }
      const message = await this.newComment(content, post.id);
      console.log(message.message);
      if(message.error){
       return this.errMessage = message.error;
      }
      this.resMessage = message.message;
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
    testLike(data){
      console.log(data)
      for(let i in data){
        if(this.user.id == data[i].user_id){
          return true;
        }
      return false;
      }
    },
    // AJOUT D'UN LIKE
    addLike(post){
      const like = 1;
      console.log('valeur like', like)
      fetch(`http://localhost:3000/api/like/${post.id}`,{
        method: "POST",
        headers:{
          'Authorization' : `Bearer ${this.user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({like})
      })
    },
    // RETIRE UN LIKE
    unlike(post){
      const like = 0;
      console.log('valeur like', like)
      fetch(`http://localhost:3000/api/like/${post.id}`,{
        method: "POST",
        headers:{
          'Authorization' : `Bearer ${this.user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({like})
      })
    }
  },

  mounted(){ // pour executé la methods au chargement de la page
    if(localStorage.user == undefined){
      this.$router.push(`/login`);
    }
    this.user = JSON.parse(localStorage.getItem('user'));

    fetch('http://localhost:3000/api/post')
      .then(res => res.json())
      .then(result => { this.posts = result })
      .catch(() => console.log("oops ca ne marche pas!"))
    console.log("sur app l'utilisateur est: ", this.user.token)
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
        object-fit: cover;
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
      figure{
        margin: 0;
      }
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
        color:#7A8891;
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
}
</style>