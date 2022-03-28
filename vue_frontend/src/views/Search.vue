<template>
<main id='search' >
  <h1 class='border-bottom'> Recherche </h1>
  <div v-if='user_idSearch == null'>
  <StandardSearch v-on:all-user-post='searchUserPost'/>
  </div>
  <div v-if='user_idSearch !== null'>
  <UserSearch :data='this.user_idSearch'/>
  </div>
</main>
</template>

<script>
import UserSearch from '@/components/UserSearch.vue';
import StandardSearch from '@/components/StandardSearch.vue'

export default {
components: { UserSearch, StandardSearch },
name: 'Search',
data(){
  return {
    user_idSearch: null 
  }
},
methods:{
  //RECEPTION EVENEMENT DE L'ENFANT
  searchUserPost(payload){
    this.user_idSearch = payload.user_id
    console.log('tata',payload.user_id)
  }
},
}
</script>

<style lang='scss'>
#search{
  h1{
  margin: 0px 5px 0px 5px;
  background-color: white;

  }
  .border-bottom{
    border-bottom: 2px solid red;
  }
}
</style>