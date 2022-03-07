<template>
  <main>
    <h1> Créer votre poste  </h1>
    <div class=create-post>
        <input id='create-post__title' placeholder='Titre' maxlength="125" required>  <!-- maxlenght cf model backend-->
        <textarea id='create-post__content' placeholder='Text' maxlength="300" required></textarea>
        <label for='create-post__file'>Ajouter une image ou une vidéo : </label>
        <input id='create-post__file' type="file"> 
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
      const title = document.getElementById('create-post__title').value;
      const content = document.getElementById('create-post__content').value; 
      const post = JSON.stringify({title, content})
      console.log("strigify est", post)
      //https://stackoverflow.com/questions/48284011/how-to-post-image-with-fetch
      const fileInput = document.getElementById('create-post__file');  //https://www.tech-wiki.online/fr/how-to-upload-files-fetch.html
      const formData = new FormData(); // utilisation de .append() https://serversideup.net/file-uploads-using-fetch-api-and-vuejs/
      formData.append('post',post) // A FAIRE ATTENTION ICI
      formData.append('image',fileInput.files[0])// nommé image a cause de multer
      console.log('le file est ',formData)

       fetch('http://localhost:3000/api/post',{
          method: "POST",
          headers: {
            'Authorization' : `Bearer ${this.$store.state.userToken}`,  // attention au majuscule
            'Accept': 'application/json', 
            // 'Content-Type': 'multipart/form-data' // ATTENTION ICI CHANGEMENT EN FORM-DATA
          },
          body: formData
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
  .create-post{
    border:1px solid rgb(210, 210, 210);
    border-radius: 5px;
    background-color: rgba(250, 250, 250, 0.8);
    margin: 5px 5px 10px 5px;
    padding:10px 5px 0px 0px;

    #create-post__title{
    border:1px solid rgb(210, 210, 210);
    width: 80%;
    margin-bottom: 10px;
    padding:5px;
    }
    #create-post__content{
      border:1px solid rgb(210, 210, 210);
      resize: vertical; // bloque le resize du textarea en horizontal
      height: 150px;
      width: 80%;
      padding: 5px;
      margin-bottom: 10px;
    }
    label{
      display: block;   // car est un inline de base donc !=flex
      margin-bottom: 5px;
    }
    #create-post__file{
      margin-bottom: 10px;
    }
  }
  
}
</style>