<template>
  <p>all message here </p>
  <div v-if='!allMessage[0]'>
    <p>Aucun Message</p>
  </div>
</template>

<script>
export default {
  name: 'AllMessage',
  data(){
    return{
      user: null,
      allMessage: [],
    }
  },
  methods:{

  },
  async mounted(){
    this.user = JSON.parse(localStorage.getItem('user'));

    this.allMessage = await fetch('http://localhost:3000/api/auth/message',{
      method: "GET",
      headers: {'Authorization' : `Bearer ${this.user.token}`}
    })
      .then((res) => {
        if(res.ok){
          return res.json()
      }
      })
      .catch(() => console.log('Oops ca ne marche pas !'))

  }

}
</script>

<style lang='scss'>

</style>