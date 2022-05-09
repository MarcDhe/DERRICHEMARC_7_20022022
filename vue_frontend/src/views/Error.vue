<template>
  <p>Error 404</p>
  <p>Page non trouvé !</p>
</template>

<script>
export default {
  name:'Error',
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

<style lang=scss>

</style>