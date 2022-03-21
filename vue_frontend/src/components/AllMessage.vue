<template>
 <section id='all-message'>
  <div v-if='!allMessage[0]'>
    <p>Aucun Message</p>
  </div>
  <div v-if="allMessage[0]">
    <ul v-for='message in allMessage' :key='message.user_id'> 
      <li>
        <a class='message' @click='getConversationNumber(message)'>
          <div class='message__details'>
            <p class="message__username">Boby {{message.user_id}}</p> <!-- attention à rectfier avec le bon retour api-->
            <p class='message__createdat'>dernier message il y a {{setDate(message.createdAt)}}</p>
          </div>
          <p v-if='message.not_read > 0' class="message__not-read">{{message.not_read}}</p>
        </a>
      </li>
    </ul>
  </div>
 </section>
</template>

<script>
import date from '../service/Date.js';

export default {
  name: 'AllMessage',
  data(){
    return{
      user: null,
      allMessage: [],
    }
  },
  methods:{
    setDate: date.setDate, 
    dateDiff: date.dateDiff,
    //RECUPERATION DE L'ID DE L'INTEROLOCUTEUR
    getConversationNumber(message){
      this.$emit('get-conversationNumber',{
        number: message.user_id
      })
      console.log('allMessage:', message.user_id)
    }
  },
  async mounted(){
    this.user = JSON.parse(localStorage.getItem('user'));

    this.allMessage = await fetch('http://localhost:3000/api/message',{
      method: "GET",
      headers: {'Authorization' : `Bearer ${this.user.token}`}
    })
      .then((res) => {
        if(res.ok){
          return res.json()
      }
      })
      .catch(() => console.log('Oops ca ne marche pas !'))

  }

}
</script>

<style lang='scss'>
#all-message{
  ul, li{
    margin: 0;
    padding:0;
  }
  .message{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid #FD2D00;
    border-radius: 5px;
    background-color: rgb(245, 245, 245);
    margin: 5px;
    padding-right: 5px;
    padding-left: 5px;
    &:hover{
      background-color: #FFD6D6; 
      cursor: pointer;
    }
    &__details{
      display: flex;
      flex-direction: column;
    }
    &__not-read{
      height: 25px;
      width: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #FFD6D6; 
      border-radius: 15px;
    }
    &:hover .message__not-read{
      background-color: rgb(245, 245, 245); 
    }
    &__username{
      text-align: start;
    }
    p{
      margin:0;
    }
    a{
      text-decoration: none;
      color: black;
    }
    }
  
}
</style>