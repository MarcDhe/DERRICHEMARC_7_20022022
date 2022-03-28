<template>
  <main id='signup'>
    <div class='login'>
      <h1>S'enregistrer</h1>
      <form @submit.prevent='signup()'>
        <label for="username">Nom d'utilisateur :</label>
        <input id='username' type="text" placeholder= "Pseudo" required>
        <label for="lastName" >Nom :</label>
        <input id='lastName' type="text" placeholder= "Nom" required>
        <label for="firstName">Prénom :</label>
        <input id='firstName' type="text" placeholder= "Prénom" required>
        <label for="password">Mot de passe :</label>
        <input id='password' type="password" placeholder= "Mot de Passe " required>
        <button >S'enregistrer maintenant</button>

      </form>
      <p v-if='error' class='red-text'>{{error}}</p>
    </div>
  </main>
</template>

<script>

export default {
  name: 'Signup',
  data(){
    return {
      error: null,
    }
  },
  methods:{
    async signup(){
      let username = document.getElementById('username').value;
      let lastname = document.getElementById('lastName').value;
      let firstname = document.getElementById('firstName').value;
      let passwd = document.getElementById('password').value;
      console.log(username, passwd)
      const userSignup = await this.createUser(username, lastname, firstname, passwd);
      console.log('userSignupp est:', userSignup)
      if(userSignup.error){
        return this.error = userSignup.error;
      }
      const user = await this.getUserDetails(username, passwd);
      if(user.error){
        return this.error = "Service momentanement indisponible"
      }
      localStorage.setItem('user', JSON.stringify(user));
      this.$router.push('/');
    },
    // CREATION D'UN NOUVEAU USER
    async  createUser(username, lastname, firstname, passwd){
      return  fetch('http://localhost:3000/api/auth/signup',{
          method: "POST",
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({username, lastname, firstname, passwd})
        })
          .then(res => {
              return res.json();
          })
        .catch(() => console.log('Oups, je ne sais pas non plus ce qu il se passe!'));
      },
    //RECUPRATION DES INFOMATION DU USER
    async getUserDetails(username, passwd){
       return fetch('http://localhost:3000/api/auth/login',{
          method: "POST",
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({username, passwd})
        })
        .then(res => {
          return res.json();
        })
        .catch(() => console.log('Oups, je ne sais pas non plus ce qu il se passe!'));
    },

    }
  
}


</script>

<style lang="scss" scoped>
#signup{
  width: 100%;
  height: 100%;
  background-image: url("../assets/societe.webp");
  background-size: cover;
  display: flex;
  justify-content: center;
//  label{
//    color: red;
//    text-align: start;
//    padding-bottom: 2px;
//  }
 .login{
    background-color: #3F4257;
    border-radius: 10px; 
    width: 70%;
    height: 430px;
    margin-top:5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    h1{
      color: white;
      margin-top:0;
    }
 }
 form{
    display: flex;
    flex-direction: column;
    width: 60%;
    label{
      text-align: start;
      color: white;
      margin:2px;
    }
    input{
      margin-bottom: 10px;
      padding:5px;
      border-radius:5px;
      border: 0px;
      appearance: none;
   }

   button{
    border-radius: 5px;
    padding: 5px;
    background-color: #FD2D00;
    color: white;
    font-weight: 600;
   }
 }
 .red-text{
   color: red;
 }
}
</style>