<template>
  <section id="create-message">
    <h3>Nouveau Message</h3>
    <div class='message'>
      <input @keyup='manageSearchUsername' id="username" class="message__to" placeholder="To:" required='true' autocomplete="off">
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
      <textarea class="message__content" placeholder="Votre Message" maxlength="300" required='true' ></textarea>
      <div class='message__option'>
      <button @click='sendMessage()'>Envoyez</button>
      <button @click='backToMessagingMenu()'>Annulez</button>
      </div>
    </div>
    <p id='essai'>{{searchUser}}</p>
  </section>
</template>

<script>
export default {
  name:'NewMessage',
  data(){
    return{
      user: null,
      toUser:null,
      searchUser: [],
    }
  },
  methods:{
    //RECHERCHE DU USERNAME 
    async manageSearchUsername(e){ // pour faire passer le (e) dans le html ne pas mettre de () a la fonciton
      console.log(e.target.value)
      const result = await this.searchUsername(e.target.value);
      if(result.error){
       return this.searchUser = result
      }
      this.searchUser = result.userArray;
      console.log(this.searchUser)
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
          return res.json()
      })
      .catch(() => console.log('Oops ca ne marche pas !'))
  },
  //SELECTION DU USER VOULU
  selectUser(user){
    console.log('userSelect est:',user)
    this.toUser = user;
    document.getElementById('username').value = this.toUser.username;
    this.searchUser = [] ; // ne pas oublié pour enlever les v-if
    console.log('searchUSer vaut:',this.searchUser)
  }

  },
  mounted(){
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
</script>

<style lang='scss'>
#create-message{
  
  .message{
    background-color: rgba(250, 250, 250, 0.8);
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
    &__to{
     border:1px solid rgb(210, 210, 210);
      margin-top: 5px;
      padding: 5px;
      border-radius: 5px;
    }
    &__option{
      margin: 5px;
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

}
</style>