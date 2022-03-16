<template>
<div id="last-messages">
    <p class="section-title border-bottom"> Les derniers messages </p>
    <div v-if='lastMessage !== []'> <!-- revoir la condiciton -->
      <p>Afficher les message</p>

    </div>
</div>
</template>

<script>
export default {
  name: 'Message',
  data(){
    return {
      lastMessage: null,
    }
  }
}
</script>

<style lang="scss">
#last-messages{

  .section-title{ 
    height: 30px;
    margin: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:white;
}

}
</style>