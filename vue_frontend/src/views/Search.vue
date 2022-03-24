<template>
<main id='search'>
  <h1 class='border-bottom'> Recherche </h1>
  <p>{{searchResult}}</p>
</main>
</template>

<script>
export default {
name: 'Search',
data(){
  return {
    user: null,
    searchResult: null
  }
},
async mounted(){
   
    if(localStorage.user == undefined){
      this.$router.push(`/login`);
    }
    this.user = JSON.parse(localStorage.getItem('user'));

    const termSearch = this.$route.params.value
    console.log("route value", termSearch) 
  
    await fetch('http://localhost:3000/api/search',{
      method: "POST",
      headers:{
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${this.user.token}`
        },
      body: JSON.stringify({term: termSearch})
    })
      .then((res) => {
           return res.json()
      })
      .then((result) => { this.searchResult = result;
      console.log(result)})
      .catch(() => console.log('Oops ca ne marche pas !'))

      console.log('result is :',this.searchResult) 
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
}
</style>