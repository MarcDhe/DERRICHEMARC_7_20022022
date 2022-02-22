<template>
  <section>
    <div class='container'>
      <h1>Signup</h1>
      <!-- <form> -->
        <div class=form-group>
          <label for='username'>Username : </label>
          <input id='username' required>
        </div>
        <div class=form-group>
          <label for='password'>Password : </label>
          <input id='password' required>
        </div>
        <button @click='sendForm()'>Send</button>
      <!-- </form> -->
    </div>
  </section>
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

<style lang="scss">
 section{
  display: flex;
  justify-content: center; 
 }
 .container{
   width: 70%;
   height: 300px;
   background-color: rgb(220,220,220);
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
 }
</style>