<template>
  <section id="create-message">
    <h3 class='border-bottom'>Nouveau Message</h3>
    <div class='message'>
      <form @keyup='manageSearchUsername'>
       <input  id="username" class="message__to" placeholder="À:" required='true' autocomplete="off" title='Destinataire'>
      </form>
      <div>
        <div v-if='searchUser.error' class="found">
          <p class="found__user"> {{searchUser.error}}</p>
        </div>
        <div v-if='searchUser[0] && !searchUser.error' class="found">
          <div v-for="user in searchUser" :key="user.id">
            <p @click='selectUser(user)' class='found__user'>{{user.username}}</p>
          </div>
        </div>
      </div>
      <form @submit.prevent="sendMessage()">
        <textarea class="message__content" placeholder="Votre Message" maxlength="300" title="Votre Message" required ></textarea>
        <div class='message__option'>
          <button>Envoyer</button>
          <button @click.stop='backToMessagingMenu()'>Annuler</button>
        </div>
      </form>
      <p class="message__alert red-alert" v-if='alertMessage'>{{alertMessage}}</p>
      <p class="message__alert green-alert" v-if='resMessage'>{{resMessage}}</p>
    </div>
  </section>
</template>

<script>
export default {
  name:'NewMessage',
  data(){
    return{
      user: null,
      toUser: null,
      searchUser: [],
      alertMessage: null,
      resMessage: null,
    }
  },
  methods:{
    //RECHERCHE DU USERNAME 
    async manageSearchUsername(e){ // pour faire passer le (e) dans le html ne pas mettre de () a la fonciton
      const tryUsername = e.target.value
      if(tryUsername.length == 0){ // pour désafficher le menu déroulant 
        return this.searchUser = "";
      }
      const result = await this.searchUsername(tryUsername);
      if(result.error){
       return this.searchUser = result;
      }
      this.searchUser = result.userArray;
    },
    // ENVOI RECHERCHE API
  async searchUsername(username){
    return fetch('http://localhost:3000/api/auth/message',{
      method: "POST",
      headers:{
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${this.user.token}`
        },
      body: JSON.stringify({username})
    })
      .then((res) => {
          return res.json();
      })
      .catch(() => console.log('Oops ca ne marche pas !'))
  },
  //SELECTION DU USER VOULU
  selectUser(user){
    this.toUser = user;
    document.getElementById('username').value = this.toUser.username;
    this.searchUser = [] ; // ne pas oublié pour enlever les v-if
    document.getElementsByClassName('message__content')[0].focus(); // met le focus sur l'element

  },
  //ENVOIE DU MESSAGE
  async sendMessage(){
    const to_id = this.toUser.id;
    const content = document.getElementsByClassName('message__content')[0].value;
    const resMessage = await this.sendMessageToApi(to_id, content);
    if(resMessage.error){
      return this.alertMessage = resMessage.error;
    }
    this.backToMessagingMenu();
  },
  //ENVOIE DU MESSAGE A L API
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
  backToMessagingMenu(){
    this.$emit('update-status')
  },

  },
  mounted(){
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
</script>

<style lang='scss'>
#create-message{
  .border-bottom{
    padding-bottom:2px;
    border-bottom: 2px solid red;
    margin:10px 5px 10px 5px;

  }
  .message{
    background-color: rgba(245, 245, 245, 0.8);
    border:1px solid rgb(210, 210, 210);
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    &__content{
      border:1px solid rgb(210, 210, 210);
      min-height: 70px;
      padding: 5px;
      margin-top:5px;
      resize: vertical;
    }
    form{
      display: flex;
      flex-direction: column;
    }
    &__to{
     border:1px solid rgb(210, 210, 210);
      margin-top: 5px;
      padding: 5px;
      border-radius: 5px;
    }
    &__option{
      margin: 5px;
    }
    &__alert{
      padding: 5px;
    }
    .red-alert{
      background-color: #F8D6D9;
    }
    .green-alert{
      background-color: #D4ECD9;
    }
    .found{
      background-color: white;
      border:1px solid rgb(210, 210, 210);
      border-top:none;
      position: relative;
      width: auto;
      max-height: 80px;
      overflow: scroll;
      top: -2px;
      &__user{
        border-top:1px solid rgb(210, 210, 210);
        margin: 0px;
        padding-left: 5px;
        text-align: start;
        &:hover{
          background-color: #EEEEEE;
          cursor: pointer;
        }
      }
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