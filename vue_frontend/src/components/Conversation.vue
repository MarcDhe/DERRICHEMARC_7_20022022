<template>
<section id='conversation'>
  <div class="interlocutor border-bottom">
    <figure>
      <img class='interlocutor__avatar' :src='conversationDetails.avatar' alt='avatar'>
    </figure>
    <h2 class='interlocutor__username'>{{conversationDetails.username}}</h2>
  </div>
  <button  v-if="limit <= conversation?.length"  @click='askMoreMessage()'>{{ conversationDetails.length}}Afficher plus </button>
  <div class='reverse-order'>
    <div v-for="message in conversation" :key='message.id'> <!-- https://stackoverflow.com/questions/37638083/how-do-i-reverse-the-order-of-an-array-using-v-for-and-orderby-filter-in-vue-js -->
      <div v-if='message.from_id == user.id' class='text-right'>
        <p class='color-from'>{{message.content}}</p>
      </div>
      <div v-if='message.from_id !== user.id' class="text-left"> 
        <p class="color-to">left {{message.content}} </p>
      </div>
    </div>
  </div>
  <form @submit.prevent='manageSendMessage()'>
    <div id="ancre"></div>
    <textarea class="message__content" placeholder="Votre Message" maxlength="300" required='true' title="votre Message"></textarea>
    <button><i class="white-color fa-solid fa-paper-plane" aria-label='send'></i></button>
  </form>
  <button class='previous' @click='backToAllMessages()'>retour</button>
  </section>
</template>

<script>

export default {
  name:'Conversation',
  props:[
    'data',
  ],
  data(){
    return {
      user: null,
      conversation: null,
      conversationDetails: this.data,
      interlocutor: null,
      limit: 5,
    }
  },
    computed:{
    computedMessage(){ // SOURCE https://stackoverflow.com/questions/46622209/how-to-limit-iteration-of-elements-in-v-for
      return this.limit<=this.conversation.length ? this.conversation.slice(0, this.limit) : this.conversation  // si limit
    }
  },
  methods:{
    async manageSendMessage(){
      const to_id = this.conversationDetails.user_id;
      const content = document.getElementsByClassName('message__content')[0].value;
      await this.sendMessageToApi(to_id, content);
      this.conversation.unshift({content, from_id:this.user.id});
      document.getElementsByClassName('message__content')[0].value = "";
    },
    //ENVOI A L'API
    async sendMessageToApi(to_id, content){
        return fetch('http://localhost:3000/api/message/new',{
            method: "POST",
            headers:{
              'Authorization' : `Bearer ${this.user.token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({to_id, content})
        })
      .then((res) => { return res.json()})
      .catch(() => console.log("Oops une chose c'est mal passé !"));
    },
    //RETOUR A LA VU DE TOUT LES MESSAGE
    backToAllMessages(){
        this.$emit('back-to-all-messages',{
        newStatus : "showMessage"
      })
    },
    //DEMANDE CONVERSATION A L'API
    askMoreMessage(){
      this.limit += 5;
      const limit = this.limit
    fetch(`http://localhost:3000/api/message/${this.conversationDetails.user_id}`,{
        method: "POST",
        headers:{
          'Authorization' : `Bearer ${this.user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({limit})
      })
        .then((res) => {
          if(res.ok){
            return res.json();
          }
        })
        .then((res) =>{ this.conversation = res })
        .catch(() => console.log('Oops un pépin est arrivé'))
    }
  },

 async mounted(){

  this.user = JSON.parse(localStorage.getItem('user'));
  await fetch(`http://localhost:3000/api/message/${this.conversationDetails.user_id}`,{
        method: "POST",
        headers:{
          'Authorization' : `Bearer ${this.user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ limit: 5})
      })
        .then((res) => {
          if(res.ok){
            return res.json();
          }
        })
        .then((res) =>{ this.conversation = res })
        .catch(() => console.log('Oops un pépin est arrivé'))

  // FONCTION QUI NOTE LU
  if(this.conversationDetails.not_read !== 0){
  fetch(`http://localhost:3000/api/message/${this.conversationDetails.user_id}/read`,{
        method: "GET",
        headers:{'Authorization' : `Bearer ${this.user.token}`}
      })
        .then((res) => {
          if(res.ok){
            return res.json();
          }
        })
        .catch(() => console.log('Oops un pépin est arrivé'))
  }
 }
}
</script>

<style lang='scss'>
#conversation{
  background-color: rgba(237, 242, 246, 0.8);
  height: auto;
  border-radius: 5px;
  padding-top:5px;
  padding-bottom:10px;
  padding-left:5px;
  padding-right: 5px;
  .interlocutor{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
      &__avatar{
        border-radius: 25px;
        border:1px solid rgb(210, 210, 210);
        height: 50px;
        width: 50px;
        object-fit: cover;
        margin-right:5px;
      }
      &__username{
        margin-left:5px;
        font-size: 24px;;
        font-weight: 600;
        color: #3F4156;
      }
    figure{
      margin: 0;
    }
  }
  .reverse-order{
    display: flex;
    flex-direction: column-reverse;
  }
  .text-left{
    display:flex;
    justify-content: start;
  }
  .text-right{
    display:flex;
    justify-content: end;
  }
  .color-from{
    // background-color:#FFD6D6;
    background-color: #FFD6D6; 
    border-radius: 15px;
    padding: 5px 10px 5px 10px;
    margin-right: 10px;
    margin-bottom:5px;
  }
  .color-to{
    background-color: white;
    border-radius: 15px;
    padding: 5px 10px 5px 10px;
    margin-left:10px;
    margin-bottom:5px;
  }
  .red-color{
    color:white;
  }
  form{
    display: flex;
    justify-content: center;
    padding-bottom:10px;
    textarea{
      padding:5px;
      width: 100%;
      border-radius:5px 0px 0px 5px;
      resize:none;
    }
    button{
      border-radius: 0px 5px 5px 0px;
      border-left: 1px;
    }
    .previous{
      margin-bottom: 10px;
      
    } 
  }
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
</style>