<template>
<main id='search' >
  <h1 class='border-bottom'> Recherche </h1>
  <div class='search__object border-bottom'>
    <h2>Objet de la recherche :</h2>
    <form @submit.prevent='goToSearch' class="search__small" title="search section">
      <input  id="search__bar__small" type="search" :Value='termSearch'  title="Recherche" required/>
      <i class="search-icone fa-solid fa-magnifying-glass"></i>
    </form>
 </div>
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
    user_idSearch: null,
    termSearch : null, 
  }
},
methods:{
  //RECEPTION EVENEMENT DE L'ENFANT
  searchUserPost(payload){
    this.user_idSearch = payload.user_id
  },
  async goToSearch(){
      const searchValue = document.getElementById('search__bar__small').value 
      await this.$router.push({ name: 'Search', params: { value: searchValue } })
      this.$store.state.searchKey += 1;
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
    this.termSearch = this.$route.params.value;

}
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
  h2{
    margin-top:5px;
    margin-bottom: 0px;
  }
  .search__object{
    display: flex;
    justify-content: center;
    padding-top: 5px;
    padding-bottom: 5px;
  }
      .search__small{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-left:5px;
      #search__bar__small{
        height: 30px;
        width: 200px;
        padding-right: 40px;
        padding-left: 10px;
        border-radius: 10px;
        border: 0px;
      border:2px solid rgb(233, 34, 34);

        &:focus{
          background-color: white;
        }
      }
      .search-icone{
        height: 20px;
        margin-left:-30px;
        color:black;
      }
    }
}
@media screen and (max-width : 767px) {
  .search__object{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 5px;
    padding-bottom: 5px;
    .search__small{
      margin-top:5px;
      margin-left: 0px;
    }
  }
}
</style>