<template>
  <main id="create-post">
    <h1> Créer votre poste  </h1>
    <form @submit.prevent="sendPost()">
    <PostText/>
    <button>Poster</button>
    </form>
  </main>
</template>

<script>
import PostText from '@/components/PostText.vue';

export default {

  name: 'CreatePost',
  components: {
    PostText,
  },
  data(){
    return{
      url : null,
      user: null
    }
  },
  methods:{
    // //AFFICHAGE PICTURE: https://blog.enguehard.info/previsualiser-image-input-type-file/
     previewFile(e) { // interessant de voir e.target qui est lendroit ou ce declenche levent
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    sendPost(){
      const title = document.getElementById('create-post__title').value;
      const content = document.getElementById('create-post__content').value; 
      const post = JSON.stringify({title, content})
      console.log("strigify est", post)
      //https://stackoverflow.com/questions/48284011/how-to-post-image-with-fetch
      const fileInput = document.getElementById('create-post__file');  //https://www.tech-wiki.online/fr/how-to-upload-files-fetch.html
      const formData = new FormData(); // utilisation de .append() https://serversideup.net/file-uploads-using-fetch-api-and-vuejs/
      formData.append('post',post); // A FAIRE ATTENTION ICI
      formData.append('image',fileInput.files[0]);// nommé image a cause de multer
      console.log('le file est ',formData);

       fetch('http://localhost:3000/api/post',{
          method: "POST",
          headers: {
            'Authorization' : `Bearer ${this.user.token}`,  // attention au majuscule
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
          .then((result) => { // NOUS RETOURNE L'ID DU NOUVEAU POST
            this.$router.push(`/post/${result.new_post_id}`)
          })
    }
  },
  mounted(){
    if(localStorage.user == undefined){
      return this.$router.push(`/login`);
    }
    this.user = JSON.parse(localStorage.getItem('user'));
    const now = new Date();
    if(now.getTime() > this.user.expiry){ // ALORS SESSION EXPIRE
      localStorage.clear()
       return this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss">
#create-post{
  height: 100%;
  overflow: scroll;
  background-image: url("../assets/icon.webp");
  background-position: center;
  background-repeat: no-repeat;
  .create-post{
    border:1px solid rgb(210, 210, 210);
    border-radius: 5px;
    background-color: rgba(250, 250, 250, 0.8);
    margin: 5px 5px 10px 5px;
    padding:10px 5px 0px 0px;
    img{
      max-width: 100px;
    }

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
      button{
      background-color: #ba2808;
      color: white;
      border-radius: 10px;
      padding: 3px 10px 5px 10px;
      cursor: pointer;
      
      &:hover{
       background-color: darken($color: #FD2D00, $amount: 10%);
      }
    }
}
</style>