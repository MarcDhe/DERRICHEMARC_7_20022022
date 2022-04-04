<template>
  <main id="login">
    <div class='login'>
      <h1>Connection au compte</h1>
      <form @submit.prevent='login()'>
        <input id='username' placeholder= "Nom d'utilisateur" title="Nom d'utilisateur" required>
        <input id='password' type='password'  placeholder= "Mot de passe" title='mot de passe' required>
        <button>Se connecter</button>
      </form>
      <p v-if='error' class='red-text'>{{error}}</p>
      <router-link class="signup-link" to="/signUp" > 
        <p>Pas encore membre ? <strong>S'enregistrer</strong></p>
      </router-link>
    </div>
  </main>
</template>


<script>


export default {
  name: 'Login',
  data(){
    return{
      tableau : [],
      error: null,
    }
  },
  methods:{
    //LOG LE USER ET SAUVEGARDE SUR LOCALSTORAGE
    async login(){
      const user = await this.getUserDetails();
      if(user.error){
        return this.error = user.error;
      }
      const now = new Date(); // RAPPEL getTime NB DE MS DEPUIS 1970
      user.expiry = now.getTime() + (1000 * 60 * 60 * 24); // 1J // AJOUT NOUVEAU CHAMP A USER + SOURCE https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
      localStorage.setItem('user', JSON.stringify(user));
      this.$router.push('/');
    }, 
    //RECUPRATION DES INFOMATION DU USER
    async getUserDetails(){
      let username = document.getElementById('username').value;
      let passwd = document.getElementById('password').value;
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
 #login{
  width: 100%;
  height: 100%;
  background-image: url("../assets/societe.webp");
  background-size: cover;
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
    .signup-link{
     text-decoration: none;
     color: white;
     strong{
       color:#FD2D00;
       &:hover{
        color: darken($color: #FD2D00, $amount: 10%);
      }
     }
    }
    button{
      border-radius: 5px;
      padding: 5px;
      background-color: #ba2808;
      color: white;
      font-weight: 600;
      &:hover{
       background-color: darken($color: #FD2D00, $amount: 10%);
      }
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
 }
   .red-text{
    color: red;
  }

</style>