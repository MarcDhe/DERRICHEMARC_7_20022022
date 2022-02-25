<template>
  <h1>nous somme sur le profil</h1> 
</template>

<script>
export default {
  name:'Profil',
  data(){
    return {
      userProfil: ""
    }
  },
  mounted(){
    fetch('http://localhost:3000/api/auth/user')
    .then(res => res.json())
    .then(result => {
      this.userProfil = result.username
      console.log("le resultat est : ", result.username)
    })
    console.log("le resultat est : ", this.userProfil)
  }
}
</script>

<style lang="scss">

</style>