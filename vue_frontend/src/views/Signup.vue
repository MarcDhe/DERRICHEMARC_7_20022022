<template>
  <main>
    <div class='login'>
      <h1>Signup</h1>
      <form>
        <input id='username' placeholder= "Username" required>
        <input id='password' type="password" placeholder= "Password" required>
        <button @click='sendForm()'>Sign Up now</button>
      </form>
    </div>
  </main>
</template>


<script>


export default {
  name: 'Signup',
  methods:{
      sendForm(){ /// faire marché event.preventDefault() ??
        let username = document.getElementById('username').value;
        let passwd = document.getElementById('password').value;
        console.log(JSON.stringify({username, passwd}));

        fetch('http://localhost:3000/api/auth/signup',{
          method: "POST",
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({username, passwd})
        })
          .then(function(res){
            if(res.ok){
              return res.json();
            }
          })
          .then(function(res){
            console.log("le resultat est :",res)
          })
      }

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
</style>