<template>
  <div class="banner">Banniere</div>
    <div class="profil">
      <img class="profil__avatar" v-bind:src="userProfil.avatar" />
      <div class="profil__details">
        <h1 class="username">{{userProfil.username}}</h1> 
        <p class="create-at">Membre depuis le: {{userProfil.createdAt}}</p>
      </div>
    </div>
  
  <div class="like-post">
    <h2>Activité</h2>
    <h2>Post Liké</h2>
  </div>

<p>edition</p>
<p>supression</p>

  
</template>

<script>
import { mapState } from 'vuex'

export default {
  name:'Profil',
  computed: {
        ...mapState(["userProfil"])
    }
}

</script>

<style lang="scss" scoped>
.banner{
  height: 100px;
  background-color: greenyellow;
}

.profil{
  display: flex;
  align-items: center;
 background-color: aliceblue;
  &__avatar{
    background-color: aqua;
    height: 100px;
    width: 100px;
    border-radius: 70px;
    margin-top: -60px;
    margin-left: 20px
  }
  &__details{
    display: flex;
    flex-direction: column;
    align-items: start;
    .username{
      margin-left:10px;
      margin-top: -40px;
    }
    .create-at{
      padding-left: 10px;
      margin-top: -10px;
    }
  }
 
 
}
</style>