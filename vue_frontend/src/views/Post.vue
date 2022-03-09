<template>
  <main>
    <div class="post">
      <div v-if="this.method === 'update'"><CreatePost/></div>
      <div v-if="this.method === 'read'">
        
        <!-- <div class="owner">   FAIT PLANTER LA PAGE
          <figure>
            <img class="owner__avatar" v-bind:src="onePost.User.avatar" alt="avatar"/>
          </figure>
          <div class="owner__details">
            <p class="owner__details__username"> {{ onePost.User.username }}</p>
            <p class="owner__details__updatedAt"> posté le {{ onePost.updatedAt}}</p>
          </div>
        </div>  -->

        <h1>{{ onePost.tilte }} :</h1>
        <div class="post__content">
          <figure class="post__file">
            <img :src="onePost.imageUrl"/>
          </figure>
          <p>{{onePost.content}}</p>
          <p>{{onePost.User}}</p>
        </div>
      </div>
        <div class="post__add">
          <p v-if="this.likeStatus == false" id="like-post" @click="addLike()"><i class="red-color fa-solid fa-hand-holding-heart" alt="liké"></i> ({{ numberOfLike }})</p>
          <p v-if="this.likeStatus == true" id="unlike-post" @click="unLike()"><i class="red-color fa-solid fa-hand-holding-heart" alt="liké"></i> ({{ numberOfLike }})</p>
          <p id="delete-post" @click='deletePost()' ><i class="red-color fa-solid fa-trash-can"></i> Delete </p>
          <p id="update-post" @click='updatePost()'><i class="red-color fa-regular fa-pen-to-square"></i> Update</p>
        </div>
        <div class="new-comment">
          <textarea id='new-comment__content' placeholder='Ecrivez votre commentaire' maxlength="300" required></textarea>
          <div class="new-comment__option">
            <button @click='sendComment()'>Envoyez</button>           
          </div>
        </div>
      <div class="commentary" v-for="comment in onePost.Comment" :key="comment.content">
        <figure class="commentary__avatar"> 
          <img :src="comment.User.avatar" alt="avatar">
        </figure>
        <div class="commentary__details">
          <p class="commentary__details__username"> {{ comment.User.username }}<strong class="date"> {{comment.updatedAt}}</strong></p>
          <p class="commentary__details__content">{{ comment.content }}</p>
          <div class="commentary__update">
            <p ><i class="red-color fa-solid fa-trash-can"></i>  Delete </p>
            <p><i class="red-color fa-regular fa-pen-to-square"></i>  Update</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import CreatePost from './CreatePost.vue';

export default {
  name:'Post',
  components:{
    CreatePost
  },
  data(){
    return {
        onePost : {},
        post_id : "",
        method: "read",
        likeStatus: false,
        numberOfLike: 0
    }
  },
  methods:{
    //ENVOI DU COMMENTAIRE A L'API
    sendComment(){
      let content = document.getElementById('new-comment__content').value;
      if(content == ""){
        console.log('contenu vide');
        return 0;
      }
      fetch(`http://localhost:3000/api/comment/${this.post_id}`,{
        method: "POST",
        headers: {
          'Authorization' : `Bearer ${this.$store.state.userToken}`,  // attention au majuscule
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
    //SUPPRESION DU POST:
    deletePost(){
      fetch(`http://localhost:3000/api/post/${this.post_id}`,{
        method: "DELETE",
        headers:{
          'Authorization' : `Bearer ${this.$store.state.userToken}`,  // attention au majuscule
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
          'Authorization' : `Bearer ${this.$store.state.userToken}`,
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
          'Authorization' : `Bearer ${this.$store.state.userToken}`,
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
        if(data.Liked[i].user_id == this.$store.state.userProfil.id){
          this.likeStatus = true;
        }
      }
    },
    //UPDATE POST:
    updatePost(){
      this.method = "update";
      document.getElementById('create-post__title').value = this.onePost.title;
      document.getElementById('create-post__content').value = this.onePost.content; 
    },
  },
  mounted(){ 
  //RECUPERATION DE L'ID DANS L'URL https://stackoverflow.com/questions/61946295/get-the-id-from-the-url-in-vuejs
  console.log("l'id d'url est: ", this.$route.params.id );
  this.post_id = this.$route.params.id;


    fetch(`http://localhost:3000/api/post/${this.post_id}`) // plus tard mettre autre chose
    .then(res => res.json())
    .then((data) => { 
      this.onePost = data;
      this.countLike(data);
      this.checkUserLike(data);
      })
    .catch(() => console.log("oops ca ne marche pas!"))
  },
}

</script>

<style lang="scss">
main{
  height: 100%;
  overflow: scroll;
  overflow-wrap: break-word;
  background-image: url("../assets/icon.png");
  background-position: center;
  background-repeat: no-repeat;
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
    overflow: hidden;
    margin-right: 10px;
  }
  &__update{
    display: flex;
    p{
      padding-right: 10px;
      font-size: 15px;
    }
  }
}
.commentary__details{
  text-align: start;
  padding-left: 10px;
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