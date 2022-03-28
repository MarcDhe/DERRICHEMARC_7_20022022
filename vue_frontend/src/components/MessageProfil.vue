<template>
<div id="last-messages">
    <p class="section-title border-bottom"> Les derniers messages </p>
    <p v-if='lastMessages?.length == 0'>Aucun Message</p>
      <div v-if='lastMessages'>
        <div v-for='message, in computedMessage' :key='message.id'>
          <div class='message'>
            <div  class="message__flex">
              <div class="message__details">
                <figure>
                  <img class='message__avatar' :src='message.avatar' alt='avatar'>
                </figure>
                <p class='message__username'>{{ message.username }} </p>
              </div>
              <p v-if='message.status== "sended"' class ='message__status color-red'> Envoyé </p>
              <p v-if='message.status== "received"' class ='message__status color-white'> Reçu</p>
            </div>
            <p class="message__content">{{message.content}}</p>
          </div>
        </div>
        <div class='display-more' v-if='lastMessages.length >5 && limit< lastMessages.length'>
          <button @click='changeLimit()'>Afficher plus</button>
        </div>
      </div>
      
</div>
</template>

<script>
export default {
  name: 'Message',
  data(){
    return {
      user: null,
      lastMessages: null,
      limit: 5,
    }
  },
  computed:{
    computedMessage(){ // SOURCE https://stackoverflow.com/questions/46622209/how-to-limit-iteration-of-elements-in-v-for
      return this.limit<=this.lastMessages.length ? this.lastMessages.slice(0, this.limit) : this.lastMessages  // si limit
    }
  },
  methods:{
    //CHANGE LIMIT 
    changeLimit(){
    this.limit += 5;
    console.log(this.limit)
    },
  },
  async mounted(){
    //RECUPERATION USER 
    this.user = JSON.parse(localStorage.getItem('user'));
    // RECUPERATION DE TOUT LES MESSAGES  
    await fetch('http://localhost:3000/api/message/last/messages',{
        method: "GET",
        headers:{'Authorization' : `Bearer ${this.user.token}`}
      })
      .then(res => res.json())
      .then(result => { this.lastMessages = result })
      .catch(() => console.log("oops ca ne marche pas!"))
      console.log(this.lastMessages.length)

    }

}
</script>

<style lang="scss">
#last-messages{
  padding-bottom: 20px;;
  .section-title{ 
    height: 30px;
    margin: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:white;
  }
  .message{
    border:1px solid rgb(210, 210, 210);
    border-radius: 5px;
    margin-top: 5px;
    overflow: hidden;
    p{
      margin: 0px;
    }
    &__flex{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 0.5px solid rgb(210, 210, 210);
      background-color: rgba(250, 250, 250, 0.8);
      padding-left: 5px;
      padding-right: 5px
    }
    &__details{
      display: flex;
      align-items: center;
      
    }
    &__status{
      font-size: 13px;
      padding-left: 5px;
      padding-right: 5px;
      padding-top:2px;
      padding-bottom: 2px;
      border-radius: 13px;
    }
    figure{
      margin: 0;
    }
    &__avatar{
      border-radius: 25px;
      border:1px solid rgb(210, 210, 210);
      height: 30px;
      width: 30px;
      object-fit: cover;
      margin-right:10px;
      margin-top: 5px;
    }
    &__username{
      font-weight: 600;
      color: #3F4156;
    }
    &__content{
      background-color: white;
      padding: 5px;
    }
  }
  .color-white{
    background-color:white;
  }
  .color-red{
    background-color: #FFD6D6;
  }
  .display-more{
    padding-top:10px;
    padding-bottom: 20px;
  }
}
</style>