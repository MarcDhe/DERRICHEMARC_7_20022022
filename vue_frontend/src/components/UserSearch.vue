<template>
<div v-for='post in allPosts' :key='post.id'>
  <PostOverview :post='post'/>
</div>
</template>

<script>
import PostOverview from './PostOverview.vue';

export default {
components: { PostOverview }, 
name: 'UserSearch',
props: [ 'data' ],
data(){
  return {
    user_idSearch : this.data,
    allPosts: null,
    user: null,
  }
},
async mounted(){
 console.log('++++',this.user_idSearch)
    
  if(localStorage.user == undefined){
    this.$router.push(`/login`);
  }
  this.user = JSON.parse(localStorage.getItem('user'));

  await fetch(`http://localhost:3000/api/post/search/${this.user_idSearch}`,{
        method: "GET",
        headers:{'Authorization' : `Bearer ${this.user.token}`,}
  })
      .then((res) => { 
        if(res.ok){
        return res.json()
        }
      })
      .then((result)=> {
        this.allPosts = result
      })
      .catch(error => console.log(error))
}
}
</script>

<style lang='scss'>

</style>