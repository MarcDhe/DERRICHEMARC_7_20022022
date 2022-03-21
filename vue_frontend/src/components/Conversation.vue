<template>
<section id='conversation'>
  <!-- <p> {{conversation}}</p> -->
  <p >conversation avec : {{data}}</p> <!-- faire passé en props tout le profil -->
    <div v-for="message in conversation" :key='message.id'> <!-- https://stackoverflow.com/questions/37638083/how-do-i-reverse-the-order-of-an-array-using-v-for-and-orderby-filter-in-vue-js -->
      <div v-if='message.from_id == user.id' class='text-right'>
        <p class='color-from'>{{message.content}}</p>
      </div>
      <div v-if='message.from_id !== user.id' class="text-left"> 
        <p class="color-to">left {{message.content}} </p>
      </div>
    </div>
  <form @sumbit.prevent=''>
    <div id="ancre"></div>
    <textarea class="message__content" placeholder="Votre Message" maxlength="300" required='true' ></textarea>
    <button><i class="red-color fa-solid fa-paper-plane"></i></button>
  </form>
  </section>
</template>

<script>

export default {
  name:'Conversation',
  props:[
    'data',
  ],
  data(){
    return {
      user: null,
      conversation: null,
      conversationNumber: this.data,
      interlocutor: null
    }
  },
 async  mounted(){
   this.user = JSON.parse(localStorage.getItem('user'));
   console.log('Conversation:', this.conversationNumber);


  await fetch(`http://localhost:3000/api/message/${this.conversationNumber}`,{
        method: "GET",
        headers:{
          'Authorization' : `Bearer ${this.user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if(res.ok){
            return res.json()
          }
        })
        .then((res) =>{ this.conversation = res })
        .catch(() => console.log('Oops un pépin est arrivé'))
    
  console.log(this.conversation);
 

  //FONCTION QUI NOTE LU
  await fetch(`http://localhost:3000/api/message/${this.conversationNumber}/read`,{
        method: "GET",
        headers:{'Authorization' : `Bearer ${this.user.token}`}
      })
        .then((res) => {
          if(res.ok){
            return res.json()
          }
        })
        .catch(() => console.log('Oops un pépin est arrivé'))
 }
}
</script>

<style lang='scss'>
#conversation{
  background-color: rgba(237, 242, 246, 0.8);
  border-radius: 5px;
  .reverseorder{
    display: flex;
    flex-direction: column-reverse;
  }
  .text-left{
    display:flex;
    justify-content: start;
  }
  .text-right{
    display:flex;
    justify-content: end;
  }
  .color-from{
    // background-color:#FFD6D6;
    background-color:greenyellow;
    border-radius: 15px;
    padding: 5px 10px 5px 10px;
    margin-right: 10px;
    margin-bottom:5px;
  }
  .color-to{
    background-color: white;
    border-radius: 15px;
    padding: 5px 10px 5px 10px;
    margin-left:10px;
    margin-bottom:5px;
  }
  .red-color{
    color:red;
  }
  form{
    display: flex;
    justify-content: center;
    padding-bottom:10px;
    textarea{
      padding:5px;
      width: 100%;
      border-radius:5px 0px 0px 5px;
    }
    button{
      border-radius: 0px 5px 5px 0px;

    }
    
    
  }
}
</style>