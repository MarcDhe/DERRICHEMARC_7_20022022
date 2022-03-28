<template>
  <main id='profile'>
  <div class="banner"></div>
    <div class="user">
      <figure>
        <img class="user__avatar" v-bind:src="user?.avatar" alt='avatar'/>
      </figure>
      <div class="user__details">
        <h1 class="username">{{user?.username}}</h1> 
        <p class="create-at">Membre depuis le: {{this.setDate(user?.createdAt)}}</p>
      </div>
    </div>
    <div class="container">
      <div class='row-icon'>
        <div @click='switchToActivity()' class='activity border-bottom'>
          <i class="red-color fa-solid fa-newspaper"></i>
          <p>Activité</p>
        </div>
        <div @click='switchToMessage()' class='message'>
          <i class="red-color fa-solid fa-envelope"></i>
          <p>Message</p>
        </div>
        <div @click='switchToEdit()' class='edit'>
          <i class="red-color fa-solid fa-address-card"></i>
          <p>Edit </p>
        </div>
      </div>
      <div v-if='select == "edit"' >
        <EditProfileButton v-on:update-user="updateUser" />
      </div>
      <div v-if='select == "activity"'>
        <Activity/>
      </div>
      <div v-if='select == "message"'>
        <MessageProfil/>
      </div>
    </div>
  </main>
</template>

<script>
import EditProfileButton from '@/components/EditProfileButton.vue';
import Activity from '@/components/Activity.vue'
import MessageProfil from '@/components/MessageProfil.vue'
import { mapState } from 'vuex'


export default {
  components: { EditProfileButton, Activity, MessageProfil },
  name:'Profil',

  data(){
    return{
      user : null,
      select: "activity",
    }
  },
  methods:{
    // FORMATE LA DATE DU POST
      setDate(date){
        const newDate = new Date((date));
        const dayDate = newDate.toLocaleDateString();
      return dayDate;
    },
    //MISE A JOUR AVATAR DEPUIS L'ENFANT
    updateUser(payload){
      this.user.avatar = payload.avatar;
    },
    //AFFICHE LE COMPOSANT ACTIVITY
    switchToActivity(){
      this.removeBorderBottom();
      this.select = "activity";
      const blocActivity = document.getElementsByClassName('activity')[0];
      blocActivity.classList.add('border-bottom');
    },
    //AFFICHE LE COMPOSANT MESSAGE
    switchToMessage(){
      this.removeBorderBottom();
      this.select = "message";
      const blocMessage = document.getElementsByClassName('message')[0];
      blocMessage.classList.add('border-bottom')
    },
    //AFFICHE LE COMPOSANT EDIT
    switchToEdit(){
      this.removeBorderBottom();
      this.select = "edit";
      const blocEdit = document.getElementsByClassName('edit')[0];
      blocEdit.classList.add('border-bottom');
    },
    //SUPPRESION ATTRIBUT BORDER BOTTOM
    removeBorderBottom(){
      const blocActivity = document.getElementsByClassName('activity')[0];
      const blocMessage = document.getElementsByClassName('message')[0];
      const blocEdit = document.getElementsByClassName('edit')[0];
      blocActivity.classList.remove('border-bottom');
      blocMessage.classList.remove('border-bottom');
      blocEdit.classList.remove('border-bottom');
    },
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
    background-image: url('../assets/societe.webp');
    background-size: cover;
    background-repeat: no-repeat;
  }

  .user{
    display: flex;
    align-items: center;
    background-color: aliceblue;
    figure{
      margin: 0;
    }
    &__avatar{
      height: 100px;
      width: 100px;
      border-radius: 70px;
      margin-top: -60px;
      margin-left: 20px;
      object-fit: cover;
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
  .activity, .edit, .message{
    padding:5px;
    border-right: 1px solid #EDF2F6;
    width: 15%;
    &:hover{
      cursor: pointer;
      border-bottom: 2px solid #FD2D00;
    }
  }
  .activity:hover .red-color, .edit:hover .red-color, .message:hover .red-color{
    color: #FD2D00;
  }
  p{
    margin: 0;
  }
}
  .border-bottom{ 
    border-bottom: 2px solid #FD2D00;
    .red-color{ // uniquement si border-bottom est attribué
      color: #FD2D00;
    }
  };
  
}

@media screen and (max-width : 767px) {
  #profile{
    .row-icon{
      .message, .activity, .edit{
       width: 33%;
      }
    }
  }
}
</style>