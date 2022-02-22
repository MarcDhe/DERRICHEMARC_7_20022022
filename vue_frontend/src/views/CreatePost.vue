<template>
   <div class=form-group>
          <label for='post__title'>Post Title </label>
          <input id='post__title' required>
        </div>
        <div class=form-group>
          <label for='content'>Content: </label>
          <input id='content' required>
        </div>
        <button @click='sendPost()'>Post it</button>
</template>

<script>
export default {
  name: 'CreatePost',
  data(){
    return{
      tableau : []
    }
  },
  methods:{
    sendPost(){
      let title = document.getElementById('post__title').value;
      let content = document.getElementById('content').value; 
      console.log('titre :',title , '/contenu:', content)
       fetch('http://localhost:3000/api/post',{
          method: "POST",
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({content, title})
        })
          .then(function(res){
            if(res.ok){
              return res.json();
            }
          })
          .then(function(result){
            this.tableau = result;
            console.log("le resultat est :", this.tableau)
          })
    }
  }
}
</script>