<template>
  <main>
    <h1> Créer votre poste  </h1>
    <div class=post>
        <input id='post__title' placeholder='Titre' maxlength="125" required>  <!-- maxlenght cf model backend-->
        <textarea id='post__content' placeholder='Text' maxlength="300" required></textarea>
        <label for='post__file'>Ajouter une image ou une vidéo : </label>
        <input id='post__file' type="file"> 
    </div>
    <button @click='sendPost()'>Post it</button>
  </main>
</template>

<script>
export default {
  name: 'CreatePost',
  data(){
    return{
      tableau : [],
    }
  },
  methods:{
    sendPost(){
      let title = document.getElementById('post__title').value;
      let content = document.getElementById('post__content').value;
      let user_id = this.$store.state.userProfil.user_id;
      console.log('titre :',title , '/contenu:', content)
       fetch('http://localhost:3000/api/post',{
          method: "POST",
          headers: {
            'Authorization' : `Bearer ${this.$store.state.userProfil.token}`,  // attention au majuscule
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({title, content, user_id})
        })
          .then(function(res){
            if(res.ok){
              return res.json();
            }
          })
          .then((result) => {
            this.tableau = result;
            console.log("le resultat est :", this.tableau)
          })
    }
  }
}
</script>

<style lang="scss">
main{
  height: 100%;
  overflow: scroll;
  background-image: url("../assets/icon.png");
  background-position: center;
  background-repeat: no-repeat;
  .post{
    border:1px solid rgb(210, 210, 210);
    border-radius: 5px;
    background-color: rgba(250, 250, 250, 0.8);
    margin: 5px 5px 10px 5px;
    padding:10px 5px 0px 0px;

    #post__title{
    border:1px solid rgb(210, 210, 210);
    width: 80%;
    margin-bottom: 10px;
    padding:5px;
    }
    #post__content{
      border:1px solid rgb(210, 210, 210);
      resize: none; // bloque le resize du textarea
      height: 150px;
      width: 80%;
      padding: 5px;
      margin-bottom: 10px;
    }
    label{
      display: block;   // car est un inline de base donc !=flex
      margin-bottom: 5px;
    }
    #post__file{
      margin-bottom: 10px;
    }
  }
  
}
</style>