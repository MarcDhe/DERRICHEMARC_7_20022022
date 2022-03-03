<template>
  <div class="post">
    <!-- <div class="owner">
      <figure>
        <img class="owner__avatar" v-bind:src=""/>
      </figure>
      <p class="owner__username"> {{ }}</p>
    </div>  -->
    <div class="post__content">
      <h1>le titre</h1>
      <figure>
        <img src="http://localhost:3000/pictures/avatars/default_avatar.png"/>
      </figure>
      <p>ici le ontenu {{onePost._id}}</p>
    </div>
    <div class="post__add">
      <p id="like"> {{ onePost }}<i class="fa-solid fa-hand-holding-heart" alt="liké"></i> Liker</p>
    </div>
  </div>
  <div class="commentary">
    <div class="commentary__owner">
      
    </div>
  </div>
</template>

<script>
export default {
  name:'Post',
  data(){
    return {
        onePost : {},
        
    }
  },
  mounted(){ // pour executé la methods au chargement de la page
  fetch(`http://localhost:3000/api/post/2`) // plus tard mettre autre chose
    .then(res => res.json())
    .then(data => this.onePost = data)
    // .catch(err => console.log("oops ca ne marche pas!"))
  }
  //VOIR POUR FDAIORE UN FETCH QUI RECUPERE AUSSI LE NOM DU PROPRIETAIRE
}

</script>

<style lang="scss">

.post{ 
  border:1px solid rgb(210, 210, 210);
  background-color: rgba(250, 250, 250, 0.8);
}

</style>