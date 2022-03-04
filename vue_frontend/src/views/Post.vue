<template>
  <main>
    <div class="post">
      <!-- <div class="owner">   FAIT PLANTER LA PAGE
        <figure>
          <img class="owner__avatar" v-bind:src="onePost.User.avatar" alt="avatar"/>
        </figure>
        <div class="owner__details">
          <p class="owner__details__username"> {{ onePost.User.username }}</p>
          <p class="owner__details__updatedAt"> posté le {{ onePost.updatedAt}}</p>
        </div>
      </div>  -->
      <h1>{{ onePost.title}} :</h1>
      <div class="post__content">
        <figure class="post__file">
          <img src="http://localhost:3000/pictures/black_logo.png"/>
        </figure>
        <p>{{onePost.content}}</p>

      <p>{{onePost.User}}</p>
      </div>
      <div class="post__add">
        <p id="like"><i class="red-color fa-solid fa-hand-holding-heart" alt="liké"></i> Liker</p>
        <p><i class="red-color fa-solid fa-trash-can"></i> Delete </p>
        <p><i class="red-color fa-regular fa-pen-to-square"></i> Update</p>
      </div>
    
      <div class="commentary" v-for="comment in onePost.Comment" :key="comment.content">
        <figure class="commentary__avatar"> 
          <img :src="comment.User.avatar" alt="avatar">
        </figure>
        <div class="commentary__details">
          <p class="commentary__details__username"> {{ comment.User.username }}<strong class="date"> {{comment.updatedAt}}</strong></p>
          <p class="commentary__details__content">{{ comment.content }}</p>
          <div class="commentary__update">
            <p><i class="red-color fa-solid fa-trash-can"></i>  Delete </p>
            <p><i class="red-color fa-regular fa-pen-to-square"></i>  Update</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name:'Post',
  data(){
    return {
        onePost : {},
        postId : "",
    }
  },
  mounted(){ // pour executé la methods au chargement de la page
  fetch(`http://localhost:3000/api/post/2`) // plus tard mettre autre chose
    .then(res => res.json())
    .then(data => this.onePost = data)
    .catch(() => console.log("oops ca ne marche pas!"))
  }
  
  //VOIR POUR FAIRE UN FETCH QUI RECUPERE AUSSI LE NOM DU PROPRIETAIRE


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
.red-color{
  color: #8e1352;
}


</style>