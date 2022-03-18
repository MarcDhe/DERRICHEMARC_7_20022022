<template>
  <main id="messaging">
  <h1 class='border-bottom'> Messagerie </h1>
  <NewMessage/>
  <AllMessage/>
  </main>
</template>

<script>
import NewMessage from '@/components/NewMessage'
import AllMessage from '@/components/AllMessage'

export default{
  name:'Messaging',
  components:{NewMessage, AllMessage},
  mounted(){
        if(localStorage.user == undefined){
      this.$router.push(`/login`);
    }
  }
}
</script>

<style lang="scss">
#messaging{
  height: 100%;
  overflow: scroll;
  overflow-wrap: break-word;
  background-image: url("../assets/icon.png");
  background-position: center;
  background-repeat: no-repeat;
  h1{
    margin:0px;
    background-color: white;
  }
  .border-bottom{
    border-bottom: 2px solid #FD2D00;
  }

}
</style>