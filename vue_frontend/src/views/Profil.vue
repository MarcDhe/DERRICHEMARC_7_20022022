<template>
  <main id='profile'>
  <div class="banner">Banniere</div>
    <div class="user">
      <img class="user__avatar" v-bind:src="user?.avatar" />
      <div class="user__details">
        <h1 class="username">{{user?.username}}</h1> 
        <p class="create-at">Membre depuis le: {{user?.createdAt}}</p>
      </div>
    </div>
  <div class="container">
    <div class='row-icon'>
      <div id='activity'>
        <i class="red-color fa-solid fa-newspaper"></i>
        <p>Activité</p>
      </div>
       <div id='message'>
        <i class="red-color fa-solid fa-envelope"></i>
        <p>Message</p>
      </div>
      <div id='edit'>
        <i class="red-color fa-solid fa-address-card"></i>
        <p>Edit </p>
      </div>
    </div>
    <div class=''>
      <EditProfileButton/>
    </div>
  </div>
<p>edition</p>
<p>supression</p>
<h2>Activité</h2>
    <h2>Post Liké</h2>
    <h2>nombre de like </h2>

</main>
</template>

<script>
import EditProfileButton from '@/components/EditProfileButton.vue';
import { mapState } from 'vuex'


export default {
  components: { EditProfileButton },
  name:'Profil',

  data(){
    return{
      user : null,
    }
  },
  computed: {
        ...mapState(["userProfil"])
    },
  mounted(){
    if(localStorage.user == undefined){
      this.$router.push(`/login`);
    }
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}

</script>

<style lang="scss">
#profile{
  .banner{
    height: 100px;
    background-image: url('../assets/societe.png');
    background-size: cover;
    background-repeat: no-repeat;
  }

  .user{
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
.container{
  padding: 10px 10px 0px 10px;
  background-color: #EDF2F6;
}
.row-icon{
  background-color: white;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: start;
  #activity, #edit, #message{
    padding:5px;
    border-right: 1px solid #EDF2F6;
    width: 15%;
    &:hover{
      cursor: pointer;
      border-bottom: 2px solid #FD2D00;
    }
  }
  #activity:hover .red-color, #edit:hover .red-color, #message:hover .red-color{
    color: #FD2D00;
  }
  p{
    margin: 0;
  }
}

  
}
</style>