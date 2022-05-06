<template>
<article class='post-overview'>
  <router-link class="unlink" :to="{name:'Post', params: { id: post.id }}">
    <div class="info">
      <div class="owner">
        <div class="redim">
          <figure>
            <img class="owner__avatar" :src="post.User.avatar" alt="avatar"/>
          </figure>
        </div>
        <div class="owner__details">
          <div class="owner__username"> {{post.User.username}}</div>
          <div class="owner__release" >posté il y a {{setDate(post.createdAt)}}</div>
        </div>
      </div>
    </div>
    <div class="post__details">
      <h2>{{post.title}} :</h2>
      <figure class='post__picture' v-if='post.imageUrl'>
        <img :src='post.imageUrl' alt="post picture"/>
      </figure>
      <p>{{post.content}}</p>
    </div>
  </router-link>
  <slot></slot>  <!-- SOURCE = https://openclassrooms.com/fr/courses/6390311-creez-une-application-web-avec-vue-js/6865121-creez-des-composants-flexibles-en-utilisant-les-slots  -->
</article>
</template>

<script>
import date from '../service/Date'

export default {
props: [ 'post' ],
name:'PostOverview',
data(){
  return{
    allPost: this.post,
  }
},
methods:{
    setDate: date.setDate, 
    dateDiff: date.dateDiff, 
  //push post
 async try(){
    this.allPosts = this.post
  }
}

}
</script>

<style lang='scss'>
.post-overview{
  border:1px solid rgb(210, 210, 210);
  border-radius: 5px;
  background-color: rgba(250, 250, 250, 0.8);
  margin: 5px 5px 10px 5px;
  padding: 5px;
  .unlink{
    text-decoration: none;
    color: black
  }
  .post__picture{
    display: flex;
    justify-content: center;
  }
  .post__details{
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
  figure{
    margin:0px;
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
      &__release{
        color:#7a7f82;
      }
      &__username{
        font-weight: 600;
        color: #3F4156;
      }
    }
  }
}

</style>