<template>
  <main>
    <div id="alert"  v-if="alertMessage">
      <div> </div>
      <p id="alert__text">{{ alertMessage }}</p>
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    </div>
    <div class="post">
      <form @submit.prevent="sendUpdatePost()" v-if="this.method === 'update'">
        <PostText 
        :imageUrl=this.onePost.imageUrl
        :title=this.onePost.title
        :content=this.onePost.content
        />
        <button type='submit'>Envoyer</button>
        <button type="button" @click="cancelUpdate()">Annuler</button>
      </form>
      <div v-if="this.method === 'read'">
        <div class="owner"> 
          <figure>
            <img class="owner__avatar" v-bind:src="onePost.User?.avatar" alt="avatar"/>
          </figure>
          <div class="owner__details">
            <p class="owner__details__username"> {{ onePost.User?.username }}</p>
            <p class="owner__details__updatedAt"> {{ setDate(onePost?.updatedAt)}}</p>
          </div>
        </div> 
        <h1>{{ onePost.title}} :</h1>
        <div class="post__content">
          <figure v-if="onePost.imageUrl" class="post__file">
            <img :src="onePost.imageUrl" alt="post picture"/>
          </figure>
          <p>{{onePost.content}}</p>
        </div>
      </div>
        <div id="comment-zone" class='ancre'></div>
        <div class="post__add">
          <p v-if="this.likeStatus == false" id="like-post" @click="addLike()"><i class="red-color fa-solid fa-hand-holding-heart" alt="liké"></i> ({{ numberOfLike }})</p>
          <p v-if="this.likeStatus == true" id="unlike-post" @click="unLike()"><i class="red-color fa-solid fa-hand-holding-heart" alt="liké"></i> ({{ numberOfLike }})</p>
          <p v-if="this.postOwner == true" id="delete-post" @click='deletePost()' ><i class="red-color fa-solid fa-trash-can"></i> Delete </p>
          <p v-if="this.postOwner == true" id="update-post" @click='updatePost(this.updateOne)'><i class="red-color fa-regular fa-pen-to-square"></i> Update</p>
        </div>
        <form class="new-comment">
          <textarea id='new-comment__content'  placeholder='Ecrivez votre commentaire' maxlength="300" required></textarea>
          <div class="new-comment__option">
            <button v-if='this.commentMethod == "read"' @click.prevent='sendComment()'>Envoyez</button>  
            <button v-if='this.commentMethod == "update"' @click.stop='cancelUpdate()'>Annuler</button>           
            <button v-if='this.commentMethod == "update"' @click.prevent='updateComment()'>Sauvegardez</button>           
          </div>
        </form>
      <div class="commentary" v-for="(comment, index) in onePost.Comment" :key="index">
        <figure > 
          <img class="commentary__avatar" :src="comment.User.avatar" alt="avatar">
        </figure>
        <div class="commentary__details">
          <p class="commentary__details__username"> {{ comment.User.username }}<strong class="date"> {{setDate(comment.updatedAt)}}</strong></p>
          <p class="commentary__details__content">{{ comment.content }}</p>
          <div class="commentary__update">
            <p class='commentary__update__delete' v-if="comment.user_id == user.id || user.power == 'admin'" @click="deleteComment(comment, index)"><i class="red-color fa-solid fa-trash-can"></i> Delete </p>
            <a href="#comment-zone"><p class='commentary__update__update' v-if="comment.user_id == user.id || user.power == 'admin'" @click="goToUpdateComment(comment, index)"><i class="red-color fa-regular fa-pen-to-square"></i>  Update</p></a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import PostText from '@/components/PostText.vue';
  import date from '../service/Date.js';


export default {
  name:'Post',
  components:{
    PostText
  },
  data(){
    return {
        user: null,
        postOwner: null,
        commentOwner: null,
        onePost : {},
        post_id : "",
        method: "read",
        commentMethod: "read",
        idComment: null,
        likeStatus: false,
        numberOfLike: 0,
        alertMessage: null,
        indexUpdate: null,
    }
  },
  methods:{
    dateDiff: date.dateDiff,
    setDate : date.setDate,

    //CHECK IF USER IS POST OWNER / COMMENT Owner
    checkPostOwner(){
      if(this.user.id == this.onePost.user_id){
        this.postOwner = true;
        console.log('et les resultat est :', this.postOwner)
      }
      if(this.user.power == 'admin' ){
        this.postOwner = true
      }
    },
      checkCommentOwner(data){
      if(this.user.id == data.Comment.user_id){
        this.commentOwner = true;
      }
    },
    //ENVOI DU COMMENTAIRE A L'API
    async sendComment(){
      let content = document.getElementById('new-comment__content').value;
      // if(content == ""){
      //   console.log('contenu vide');
      //   return 0;
      // }
      const commentPush = await this.newComment(content);
      if(commentPush.error){
        console.log(commentPush)
        return 0;
      }
      const User = {avatar: this.user.avatar, username: this.user.username, id: this.user.id}
      console.log('new one:', commentPush)
      commentPush.User = User  // AJOUT NOUVELLE ELEMENT A UN OBJET  SOURCE: https://grafikart.fr/forum/15626
      console.log('after add user ', commentPush)
      this.onePost.Comment.unshift(commentPush)  // unshift "push" au début d'un tableau
      document.getElementById('new-comment__content').value = '';
      
    },
    //NOUVEAU COMMENTAIRE
    async newComment(content){
      return fetch(`http://localhost:3000/api/comment/${this.post_id}/add`,{
        method: "POST",
        headers: {
          'Authorization' : `Bearer ${this.user.token}`,  // attention au majuscule
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({content})
        })
        .then(function(res){
            return res.json();
        })
        .catch(() => console.log('oops ca ne marche pas!'));
    },
    //SUPPRESION DU POST:
    deletePost(){
      //http://www.fobec.com/tuto/910/afficher-popup-message-confirmation-invite-saisie.html
      const answer = confirm("Voulez-vous vraiment supprimer votre poste ?")
      if(answer == false){
        return 0;
      }
      fetch(`http://localhost:3000/api/post/${this.post_id}`,{
        method: "DELETE",
        headers:{
          'Authorization' : `Bearer ${this.user.token}`,  // attention au majuscule
        }
      })
      .then((res) => {
          if(res.ok){
            this.$router.push('/accueil')//NOUS FAIT ALLER SUR L"ACCUEIL https://router.vuejs.org/guide/essentials/navigation.html#navigate-to-a-different-location
          }
      })
      .catch(() => console.log('oops ca ne marche pas!'));
    },
    //AJOUT D'UN LIKE
    addLike(){
      const like = 1;
      this.numberOfLike++;
      this.likeStatus = true;
      console.log('valeur like', like)
      fetch(`http://localhost:3000/api/like/${this.post_id}`,{
        method: "POST",
        headers:{
          'Authorization' : `Bearer ${this.user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({like})
      })
    },
    //RETIRER UN LIKE
      unLike(){
      const like = 0;
      this.numberOfLike--;
      this.likeStatus = false;
      console.log('valeur like', like)
      fetch(`http://localhost:3000/api/like/${this.post_id}`,{
        method: "POST",
        headers:{
          'Authorization' : `Bearer ${this.user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({like})
      })
    },
    // COUNT NUMBER OF LIKE  
    countLike(data){
      this.numberOfLike = data.Liked.length 
    },
    // CHECK IF USER LIKE ALREADY OR NOT
    checkUserLike(data){
      for(let i in data.Liked){
        if(data.Liked[i].user_id == this.user.id){
          this.likeStatus = true;
        }
      }
    },
    // CANCEL ALL UPDATE:
    cancelUpdate(){
      this.method="read";
      this.commentMethod="read";
      document.getElementById('new-comment__content').value = "";
    },
    //UPDATE POST:
    updatePost(){
      this.method = "update";
    },
    //SEND UPDATE POST CONTENT
    async sendUpdatePost(){
      const title = document.getElementById('create-post__title').value;
      const content = document.getElementById('create-post__content').value; 
      const post = JSON.stringify({title, content})
      console.log("strigify est", post)
      //https://stackoverflow.com/questions/48284011/how-to-post-image-with-fetch
      const fileInput = document.getElementById('create-post__file');  //https://www.tech-wiki.online/fr/how-to-upload-files-fetch.html
      const formData = new FormData(); // utilisation de .append() https://serversideup.net/file-uploads-using-fetch-api-and-vuejs/
      formData.append('post',post); // A FAIRE ATTENTION ICI
      formData.append('image',fileInput.files[0]);// nommé image a cause de multer
      console.log('le file est ',formData);

     await  fetch(`http://localhost:3000/api/post/${this.post_id}`,{
          method: "POST",
          headers: {
            'Authorization' : `Bearer ${this.user.token}`,  // attention au majuscule
            'Accept': 'application/json', 
            // 'Content-Type': 'multipart/form-data' // ATTENTION ICI CHANGEMENT EN FORM-DATA
          },
          body: formData
        })
          .then(function(res){
            if(res.ok){
              return res.json();
            }
          })
          .then((result) => {
            this.tableau = result;
            console.log("le resultat est :", this.tableau);
            // ATTENTION NON VIABLE DECONNECTE
            // this.$router.go() // RECHARGE LA PAGE MAIS DECONNECTE :x
          })
      // ON RAFRAICHI LE ONEPOST POUR AVOIR LE NOUVEAU CONTENU "OBILIGE"  CAR NOUS NAVONS PAS LADRESSE DE LA NOUVELLE IMAGE
     await fetch(`http://localhost:3000/api/post/${this.post_id}`) // plus tard mettre autre chose
        .then(res => res.json())
        .then((data) => { 
          console.log('+++',data)
          this.onePost = data;
          this.countLike(data);
          this.checkUserLike(data);
          this.checkPostOwner();
          })
        .catch(() => console.log("oops ca ne marche pas!"))

        this.method = "read";
      },
    // RENVOI A LA POSSIBILITE DE MODIFICATION DU COMMENTAIRE
    goToUpdateComment(comment, index){ // PASSAGE de COMMENT DANS LE PARAMETRE dans le HTML
    console.log(comment)
    this.commentMethod = "update";
    this.idComment = comment.id;
    document.getElementById('new-comment__content').value = comment.content;
    //RENVOIE VERS UNE ANCRE DE LA PAGE 
    this.$router.push('#new-comment__content');
    document.getElementById('new-comment__content').focus(); // NE MARCHE PAS ICI MAIS MARCHE SI DANS MOUNTED 
    this.indexUpdate = index;
    },
    // MANAGE L'UPDATE du commentaire
    async updateComment(){
    const content = document.getElementById('new-comment__content').value;
    console.log("content",content,'tat:',this.idComment) 
    const updateStatus = await fetch(`http://localhost:3000/api/comment/${this.idComment}/update`,{
        method: "POST",
        headers: {
          'Authorization' : `Bearer ${this.user.token}`,
          'Accept': 'application/json',  // ATTENTION SI ENVOI JSON NE PAS LES OUBLIES SINON HS
          'Content-Type': 'application/json' 
          },
        body: JSON.stringify({content}),
      })
      .then(res => {
        return res.json()
      })
      .catch(() => console.log('Oops !'))
      this.alertMessage = updateStatus.message
      this.onePost.Comment[this.indexUpdate].content = content
      this.commentMethod="read"
      document.getElementById('new-comment__content').value = '';
    },
    // SUPRESSION COMMENT
    async deleteComment(comment, index){
      console.log('index est :',index)
    const deleteStatus = await  fetch(`http://localhost:3000/api/comment/${comment.id}`,{
        method: "DELETE",
        headers: {'Authorization' : `Bearer ${this.user.token}`},
      })
      .then(res => {
        return res.json()
      })
      .catch(() => console.log('Oops !'))
      this.alertMessage = deleteStatus.message;
      this.onePost.Comment.splice(index,1); // SOURCE DE L UTILISATION INDEX : https://codesource.io/vue-js-snippets-delete-item-from-list/#:~:text=In%20the%20%2C%20we,from%20the%20list%20using%20Array.
    }
    
  },
  mounted(){ 
    
    if(localStorage.user == undefined){
      this.$router.push(`/login`);
    }
  //RECUPERATION DE L'ID DANS L'URL https://stackoverflow.com/questions/61946295/get-the-id-from-the-url-in-vuejs
  console.log("l'id d'url est: ", this.$route.params.id );
  this.post_id = this.$route.params.id;
  
  // RECUPERATION USER SUR LOCALSTORAGE
    this.user = JSON.parse(localStorage.getItem('user'));
  
    fetch(`http://localhost:3000/api/post/${this.post_id}`) // plus tard mettre autre chose
    .then(res => res.json())
    .then((data) => { 
      console.log('+++',data)
      this.onePost = data;
      this.countLike(data);
      this.checkUserLike(data);
      this.checkPostOwner();
      })
    .catch(() => console.log("oops ca ne marche pas!"))
  },
}

</script>

<style lang="scss" scoped>
#alert{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right:5px;
  margin-left: 5px;
  padding-right:5px;
  padding-left: 5px;
   background-color: #D4ECD9;
}

main{
  height: 100%;
  overflow: scroll;
  overflow-wrap: break-word;
  background-image: url("../assets/icon.png");
  background-position: center;
  background-repeat: no-repeat;
  a{
    text-decoration: none;
    color: black;
  }
  .ancre{
     position: relative;
     top: -20px;
  }
}
.owner{
  display: flex;
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
  &__details{
    text-align: start;
    &__username{
        font-weight: 600;
        color: #3F4156;
    }
    &__updatedAt{
      color:#7A8891;

    }
    p{
      margin:0px;
    }
  }
}
.post{ 
  border:1px solid rgb(210, 210, 210);
  background-color: rgba(250, 250, 250, 0.8);
  margin: 5px 5px 10px 5px;
  padding: 5px;
  h1{
    margin: 0px;
    text-align: start;
    padding-left: 15px;
    font-size: 20px;
  }
  &__content{
    background-color: white;
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    figure{
      margin:0;
    }
  }
  &__add{
    margin-top:0px;
    display: flex;
    justify-content: space-around;
  }
  &__file{
    img{
      max-width: 90%;
    }
  }
}
.new-comment{
  border:1px solid #d2d2d2;
  display: flex;
  flex-direction: column;
  align-content: center;
  #new-comment__content{
    width: auto;
    min-height: 70px;
    margin:5px;
    padding: 5px;
    resize: vertical;
  }
  &__option{
    display: flex;
    justify-content: space-around;
    margin-bottom: 5px;
  }
}
.commentary{
  background-color: rgba(250, 250, 250, 0.8);
  border:1px solid rgb(210, 210, 210);
  border-radius: 5px;
  margin: 5px 5px 10px 5px;
  padding: 10px 5px 10px 5px;
  display: flex;
  figure{
    margin: 0;
  }
  &__avatar{
    height:50px;
    width: 50px;
    border:1px solid #d2d2d2;
    border-radius: 30px;
    margin-right: 10px;
    object-fit: cover;
  }
  &__update{
    display: flex;
    &__delete, &__update{
      cursor: pointer;
      padding-right: 10px;
      font-size: 15px;
      &:hover{
        color: #982778;
      }
    }
  }
}
.commentary__details{
  text-align: start;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p{
    margin:0;
  }

  &__username{
    color: #982778;
    font-weight: 600;
    .date{
      color:#7A8891;
      font-weight: 300;
      padding-left:5px;
    }
  }
}
#unlike-post{
  border-radius: 10px;
  padding: 2px 10px 2px 10px;
    &:hover{
    background-color: #FFD6D6; 
    cursor: pointer;
  }
   .red-color{
    color: #FD2D00;
  }
}
#delete-post, #update-post, #like-post{
  border-radius: 10px;
  padding: 2px 10px 2px 10px;
  &:hover{
    background-color: #FFD6D6; 
    cursor: pointer;
  }
  .red-color{
    color: #8e1352;
  }
}


</style>