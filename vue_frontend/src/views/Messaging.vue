<template>
  <main id="messaging">
    <h1 class='border-bottom'> Messagerie </h1>
    <div v-if="status == 'showMessage'" class='button-propriety'>
      <button @click='showNewMessage()'>Ecrire un nouveau message <i class="fa-solid fa-feather-pointed"></i></button>
    </div>
    <div v-if='status == "writeMessage"'>
      <NewMessage v-on:update-status='updateStatus' />
    </div>
    <div v-if="status == 'showMessage'">
      <div class='colonne-description'>
      <p>Messages</p>
      <p>Non lus</p>
      </div>
      <AllMessage  v-on:get-conversationNumber='updateConversationNumber' />
    </div>
    <div v-if='conversationNumber !== null' >
      <p>tata{{conversationNumber}}</p>
      <Conversation  :data='this.conversationNumber' />
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
      conversationNumber: null,
    }
  },
  methods:{
      //CHANGE STATUS TO NEX MESAGE
      showNewMessage(){
        this.status = 'writeMessage'
      },
      //CHANGEMENT DE STATUS DEPUIS L'ENFANT
      updateStatus(){
        this.status = "showMessage";
      },
      //RECUPERATION DE L'ID DE L'INTERLOCUTEUR EN PROVENANCE DE L'ENFANT
      updateConversationNumber(payload){
        this.conversationNumber = payload.number
        console.log('messaging',this.conversationNumber)
      }
  },
  mounted(){
    if(localStorage.user == undefined){
      this.$router.push(`/login`);
    }
  }
}
</script>

<style lang="scss">
#messaging{
  height: 100%;
  overflow: scroll;
  overflow-wrap: break-word;
  background-image: url("../assets/icon.png");
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
    button{
      background-color:#FD2D00;
      border-radius: 15px;
      border-width: 1px;
      cursor: pointer;
    }
  }
  .colonne-description{
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    margin-right:10px;
    margin-left: 10px;
    
  }


}
</style>