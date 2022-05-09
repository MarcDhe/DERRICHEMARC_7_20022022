<template>
<section id='standard-search'>
  <div class="container">
    <div class='select'>
      <div @click='switchToPost()' class='select__post border-bottom'>
        <i class="red-color fa-solid fa-file-invoice"></i>
        <p>Posts</p>
      </div>
      <div @click='switchToCommentaire()' class='select__commentaire'>
        <i class="red-color fa-solid fa-comment-dots"></i>
        <p>Commentaires</p>
      </div>
      <div @click='switchToUser()' class='select__user'>
        <i class="red-color fa-solid fa-address-card"></i>
        <p>Users</p>
      </div>
    </div>
    <div v-if='select == "post"'>
      <div v-if='postResult?.length == 0'>
       <p> Aucun Résultat </p>
      </div>
      <div v-for='post in postResult' :key='post.id'>
        <div class='post'>
        <router-link class=" unlink" :to="{name:'Post', params: { id: post.id }}">
          <div class="info">
            <div class="owner">
                <figure>
                  <img class="owner__avatar" :src="post.avatar" alt="avatar"/>
                </figure>
              <div class="owner__details">
                <div class="owner__username"> {{post.username}} {{ post.id }}</div>
                <div class="owner__relase" >posté il y a {{setDate(post.createdAt)}}</div>
              </div>
            </div>
          </div>
          <div class="post__details">
            <h2>{{post.title}} :</h2>
            <figure class='post__picture' v-if='post.imageUrl'>
              <img :src='post.imageUrl' alt='post picture' />
            </figure>
          </div>
        </router-link>
        </div>
      </div>
    </div>

    <div v-if='select == "commentaire"'>
     <div v-if='commentResult.length == 0'>
       <p> Aucun Résultat </p>
     </div>
     <div  v-for="comment in commentResult" :key="comment.id">
        <router-link class="commentary unlink" :to="{name:'Post', params: { id: comment.post_id }}">
          <figure > 
            <img class="commentary__avatar" :src="comment.avatar" alt="avatar">
          </figure>
          <div class="commentary__details">
            <p class="commentary__details__username"> {{ comment.username }}<strong class="date">{{setDate(comment.updatedAt)}}</strong></p>
            <p class="commentary__details__content">{{ comment.content }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <div v-if='select == "user"'>
      <div v-if='userResult.length == 0'>
       <p> Aucun Résultat </p>
     </div>
       <div v-for='user in userResult' :key='user.id'>
            <div @click='searchAllUserPost(user.id)' class="user">
                <figure>
                  <img class="user__avatar" :src="user.avatar" alt="avatar"/>
                </figure>
              <div class="user__details">
                <p class="user__username"> {{user.username}} </p>
                  <p class="user__name"> {{user.firstname}} {{user.lastname}}</p>
            </div>
          </div>
     </div>
    </div>
  </div>
</section>
</template>

<script>
import date from '../service/Date';

export default {
name: 'StandardSearch',
data(){
  return {
    user: null,
    userResult: null,
    postResult: null,
    commentResult: null,
    userResulLength: null,
    postResultLength: null,
    commentResultLength: null,
    termSearch: null,
    select: "post"
  }
},
methods:{
    //IMPORTATION FONCTION DE SERVICE/DATE.js
    setDate: date.setDate, 
    dateDiff: date.dateDiff,

  searchAllUserPost(user_id ){
    this.$emit('all-user-post', {
      user_id
    })
  },
   //AFFICHE LE COMPOSANT ACTIVITY
    switchToPost(){
      this.removeBorderBottom();
      this.select = "post";
      const blocActivity = document.getElementsByClassName('select__post')[0];
      blocActivity.classList.add('border-bottom');
    },
    //AFFICHE LE COMPOSANT MESSAGE
    switchToCommentaire(){
      this.removeBorderBottom();
      this.select = "commentaire";
      const blocMessage = document.getElementsByClassName('select__commentaire')[0];
      blocMessage.classList.add('border-bottom')
    },
    //AFFICHE LE COMPOSANT EDIT
    switchToUser(){
      this.removeBorderBottom();
      this.select = "user";
      const blocEdit = document.getElementsByClassName('select__user')[0];
      blocEdit.classList.add('border-bottom');
    },
    //SUPPRESION ATTRIBUT BORDER BOTTOM
    removeBorderBottom(){
      const blocPost = document.getElementsByClassName('select__post')[0];
      const blocCommentaire = document.getElementsByClassName('select__commentaire')[0];
      const blocUser = document.getElementsByClassName('select__user')[0];
      blocPost.classList.remove('border-bottom');
      blocCommentaire.classList.remove('border-bottom');
      blocUser.classList.remove('border-bottom');
    },
},
async mounted(){
   
    if(localStorage.user == undefined){
      this.$router.push(`/login`);
    }
    this.user = JSON.parse(localStorage.getItem('user'));

    const termSearch = this.$route.params.value
    this.termSearch = termSearch
  
    await fetch('http://localhost:3000/api/search',{
      method: "POST",
      headers:{
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${this.user.token}`
        },
      body: JSON.stringify({term: termSearch})
    })
      .then((res) => {
           return res.json()
      })
      .then((result) => { 
      this.userResult = result[0].User;
      this.postResult = result[1].Post;
      this.commentResult = result[2].Comment;
      })
      .catch(() => console.log('Oops ca ne marche pas !')) 
      
    this.termSearch = termSearch
  }
}
</script>

<style lang='scss'>
#standard-search{
  h1{
  margin: 0px 5px 0px 5px;
  background-color: white;

  }
  .border-bottom{
    border-bottom: 2px solid red;
  }
  .select{
    background-color: white;
    width: 100%;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    &__post, &__user, &__commentaire{
      padding:5px;
      border-right: 1px solid #EDF2F6;
      width: 33%;
      &:hover{
        cursor: pointer;
        border-bottom: 2px solid #FD2D00;
      }
    }
    &__post:hover .red-color, &__user:hover .red-color, &__commentaire:hover .red-color{
      color: #FD2D00;
    }
    p{
      margin: 0;
    }
  }
    .unlink{
    text-decoration: none;
    color: black
  }
  .commentary{
  background-color: rgba(250, 250, 250, 0.8);
  border:1px solid rgb(210, 210, 210);
  border-radius: 5px;
  margin: 5px 5px 10px 5px;
  padding: 10px 5px 10px 5px;
  display: flex;
  cursor: pointer;
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
  .info{
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    .owner{
      display: flex;
      align-items: center;
      &__avatar{
        border-radius: 25px;
        border:1px solid rgb(210, 210, 210);
        height: 50px;
        width: 50px;
        object-fit: cover;
        margin-right:5px;
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
  .post{
    border:1px solid rgb(210, 210, 210);
    border-radius: 5px;
    background-color: rgba(250, 250, 250, 0.8);
    margin: 5px 5px 10px 5px;
    padding: 5px;
    padding-bottom: 10px;
    &__picture{
      display: flex;
      justify-content: center;
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
  }

  .user{
    cursor: pointer;
    display: flex;
    align-items: center;
    border:1px solid rgb(210, 210, 210);
    border-radius: 5px;
    margin-bottom:5px;
    padding: 5px;
    &__avatar{
        border-radius: 35px;
        border:1px solid rgb(210, 210, 210);
        height: 70px;
        width: 70px;
        object-fit: cover;
        margin-right:5px;
    }
    &__details{
      text-align: start;
      padding-left: 5px;
    }
  }
  figure{
    margin: 0px;
  }
}
</style>
