<template>
  <main>
    <div class='login'>
      <h1>Signup</h1>
      <form @submit.prevent='signup()'>
        <input id='username' placeholder= "Username" required>
        <input id='password' type="password" placeholder= "Password" required>
        <button >Sign Up now</button>

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
      let passwd = document.getElementById('password').value;
      console.log(username, passwd)
      const userSignup = await this.createUser(username, passwd);
      console.log('userSignupp est:', userSignup)
      if(userSignup.error){
        return this.error = userSignup.error;
      }
      const user = await this.getUserDetails(username, passwd);
      if(user.error){
        return this.error = "Service momentanement indisponible"
      }
      localStorage.setItem('user', JSON.stringify(user));
      this.$router.push('/accueil');
    },
    // CREATION D'UN NOUVEAU USER
    async  createUser(username, passwd){
      return  fetch('http://localhost:3000/api/auth/signup',{
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
main{
  width: 100%;
  height: 100%;
  // background-image: url("../assets/icon-above-font.png");
  // background-position: center;
  display: flex;
  justify-content: center;
 }
 .login{
    background-color: #3F4257;
    border-radius: 10px; 
    width: 70%;
    height: 300px;
    margin-top:5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    h1{
      color: white;
    }
 }
 form{
    display: flex;
    flex-direction: column;
    width: 60%;
    input{
      margin-bottom: 10px;
      padding:5px;
      border-radius:5px;
      border: 0px
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
</style>