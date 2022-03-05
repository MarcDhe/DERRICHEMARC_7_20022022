<template>
  <main>
    <div class='login'>
      <h1>Account Login</h1>
      <form>
        <input id='username' placeholder= "Username" required>
        <input id='password' type='password'  placeholder= "Password" required>
      </form>
      <button @click='sendForm()'>Login to your Account</button>
      <router-link class="signup-link" to="/signUp" > 
        <p>Still not member ? <strong>Signup</strong></p>
      </router-link>
    </div>
  </main>
</template>


<script>


export default {
  name: 'Login',
  data(){
    return{
      tableau : []
    }
  },
  methods:{
      sendForm(){ /// faire marché event.preventDefault() ??
        let username = document.getElementById('username').value;
        let passwd = document.getElementById('password').value;
        console.log(JSON.stringify({username, passwd}));
        fetch('http://localhost:3000/api/auth/login',{
          method: "POST",
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({username, passwd})
        })
          .then(function(res){ 
            if(res.ok){
              console.log('test')
              return res.json();
            }
          })
          .then((res)  => {  // attention au context function ou => si pâs => plus de contexwt this
            console.log('le token es', res.token)
            this.$store.state.userToken = res.token;
            console.log("le resultat est assigné :", this.$store.state.userToken)
            this.$router.push('/accueil')//NOUS FAIT ALLER SUR L"ACCUEIL https://router.vuejs.org/guide/essentials/navigation.html#navigate-to-a-different-location
          })
          .catch(() => console.log("oops ca ne marche pas!"))
    }
  }
}


</script>

<style lang="scss" scoped>
 main{
  width: 100%;
  height: 100%;
  background-image: url("../assets/societe.png");
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
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
     }
    }
    button{
      border-radius: 5px;
      padding: 5px;
      background-color: #FD2D00;
      color: white;
      font-weight: 600;
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

</style>