<!-- PAGE TEST PROPS ET EVENEMENT ENFANT -> PARENTS -->
<template>
  <main id="messaging">
    <h1 class='border-bottom'> Messagerie </h1>
    <div v-if="status == 'showMessage'" class='button-propriety border-bottom'>
      <button @click='showNewMessage()'>Ecrire un nouveau message <i class="fa-solid fa-feather-pointed"></i></button>
    </div>
    <div v-if='status == "writeMessage"'>
      <NewMessage v-on:update-status='updateStatus' />
    </div>
    <div v-if="status == 'showMessage'">
      <AllMessage  v-on:get-conversationDetails='updateConversationDetails' />
    </div>
    <div class="full-height" v-if='conversationDetails !== null && status == "showConversation"' >
      <Conversation  :data='this.conversationDetails' v-on:back-to-all-messages='backToAllMessages'/>
    </div>
  </main>
</template>

<script>
import NewMessage from '@/components/NewMessage'
import AllMessage from '@/components/AllMessage'
import Conversation from '@/components/Conversation'

export default{
  name:'Messaging',
  components:{NewMessage, AllMessage, Conversation}, 
  data(){
    return {
      status: 'showMessage',
      conversationDetails: null,
    }
  },
  methods:{
      //CHANGE STATUS TO NEX MESAGE
      showNewMessage(){
        this.status = 'writeMessage';
      },
      //CHANGEMENT DE STATUS DEPUIS L'ENFANT
      updateStatus(){
        this.status = "showMessage";
      },
      //RECUPERATION DE L'ID DE L'INTERLOCUTEUR EN PROVENANCE DE L'ENFANT
      updateConversationDetails(payload){
        this.conversationDetails = payload.details.message;
        this.status = payload.details.newStatus;
      },
      //RETOUR AFFICHAGE DE TOUT LES MESSAGE  
      backToAllMessages(payload){
        this.status = payload.newStatus
      },
  },
  mounted(){
    if(localStorage.user == undefined){
      return this.$router.push(`/login`);
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const now = new Date();
    if(now.getTime() > user.expiry){ // ALORS SESSION EXPIRE
      localStorage.clear()
      return  this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss">
#messaging{
  height: 100%;
  overflow: scroll;
  overflow-wrap: break-word;
  background-image: url("../assets/icon.webp");
  background-position: center;
  background-repeat: no-repeat;
  h1{
    margin:0px;
    background-color: white;
  }
  .border-bottom{
    border-bottom: 2px solid #FD2D00;
  }
  p{
    margin:0; 
  }
  .button-propriety{
    display: flex;
    justify-content: end;
    margin-top:5px;
    padding-bottom: 5px;

    button{
      background-color: #ba2808;
      color: white;
      border-radius: 15px;
      padding: 3px 10px 5px 10px;
      cursor: pointer;
      
      &:hover{
       background-color: darken($color: #FD2D00, $amount: 10%);
      }
    }
  }
}
</style>