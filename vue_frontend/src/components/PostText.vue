<template>
      <div class=create-post>
        <input id='create-post__title' placeholder='Titre' maxlength="125" required>  <!-- maxlenght cf model backend-->
        <figure>
          <img v-if="url" :src="url" />
        </figure>
        <textarea  id='create-post__content'  placeholder='Text' maxlength="300" required></textarea>
        <label for='create-post__file'>Ajouter une image ou une vidéo :{{this.picture}} </label>
        <input id='create-post__file' type="file" @change="previewFile"> 
    </div>
</template>

<script>
export default {
  name:'PostText',
  data(){
    return{
      url: null
    }
  },
    methods:{
    // //AFFICHAGE PICTURE: https://blog.enguehard.info/previsualiser-image-input-type-file/
     previewFile(e) { // interessant de voir e.target qui est lendroit ou ce declenche levent
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
  }
}
</script>

<style lang="scss">
.create-post{
  border:1px solid rgb(210, 210, 210);
  border-radius: 5px;
  background-color: rgba(250, 250, 250, 0.8);
  margin: 5px 5px 10px 5px;
  padding:10px 5px 0px 0px;
  figure{
    margin: 0;
    img{
      max-width: 80%;
    }
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
</style>