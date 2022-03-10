<template>
  <div id='option'>
    <div class="menu">
      <p @click='selectEditAvatar()' class='select-avatar border'>Avatar</p>
      <p @click="selectEditPassword()" class='select-password border'>Password</p>
      <p @click="selectEditDelete()" class='select-delete'>Delete</p>
    </div>
    <div v-if="this.element == 'avatar'" class="option__edit">
      <figure>
        <img :src="url" alt='avatar'/>
      </figure>
      <p>Selectionné un nouvelle avatar:</p>
      <input id='new-avatar' type="file" @change="previewFile"> 
      <button @click="sendAvatar()">Envoyé</button>
    </div>
    <div v-if='this.element == "password"' class='option__password'>
      <h2>Changement de mot de passe</h2>
      <div class="password-form">
        <label for='current-password'>Votre mot de passe :</label>
        <input id='current-password' placeholder="mot de passe" require/>
        <label for="new-password">Votre nouveau mot de passe :</label>
        <input id='new-password' placeholder="nouveau mdp" required>
        <label for="new-password-check">Confirmez votre new mot de passe :</label>
        <input id='new-password-check' placeholder="confirmer" required>
        <button @click="sendNewPassword()">Envoyé</button>
    </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'EditProfileButton',
  data(){
    return {
      element : "password",
      url: this.$store.state.userProfil.avatar,
    }
  },
  methods:{
        // //AFFICHAGE PICTURE: https://blog.enguehard.info/previsualiser-image-input-type-file/
     previewFile(e) { // interessant de voir e.target qui est lendroit ou ce declenche levent
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    //ENVOI DU NOUVELLE AVATAR
    sendAvatar(){
      const fileInput = document.getElementById('new-avatar');
      const formData = new FormData();
      formData.append('image', fileInput.files[0]);
      fetch('http://localhost:3000/api/auth/user/avatar',{
          method: "POST",
          headers: {
            'Authorization' : `Bearer ${this.$store.state.userToken}`,  // attention au majuscule
            'Accept': 'application/json', 
            // 'Content-Type': 'multipart/form-data' // ATTENTION ICI CHANGEMENT EN FORM-DATA
          },
          body: formData
        })
        .then(() => {
            // ici faire recharger la page
        })
        .catch(() => console.log('Oops !'))
    },
    //SUPPRESSION ATTRIBUT BORDER BOTTOM
    removeBorderBottom(){
      const blocAvatar = document.getElementsByClassName('select-avatar')[0];
      const blocDelete  = document.getElementsByClassName('select-delete')[0];
      const blocPassword = document.getElementsByClassName('select-password')[0];
      blocAvatar.classList.remove('border-bottom');
      blocDelete.classList.remove('border-bottom');
      blocPassword.classList.remove('border-bottom');
    },
    //AFFICHAGE DU BLOC AVATAR 
      selectEditAvatar(){
      this.element = "avatar";
      const blocAvatar = document.getElementsByClassName('select-avatar')[0];
      blocAvatar.classList.add('border-bottom');
    },
    //AFFICHAGE DU BLOC PASSWORD
      selectEditPassword(){
        // this.removeBorderBottom();
      this.element = "password";
      const blocPassword = document.getElementsByClassName('select-password')[0];
      blocPassword.classList.add('border-bottom');
    },
    //AFFICHAGE DU BLOC DELETE
    selectEditDelete(){
      this.element= "delete";
      console.log(this.element)
      const blocDelete  = document.getElementsByClassName('select-delete')[0];
      blocDelete.classList.add('border-bottom');
    },
    //ENVOYE DU NOUVEAU PASSWORD
    sendNewPassword(){
      const currentPassword = document.getElementById('current-password').value ;
      const newPassword = document.getElementById('new-password').value;
      const newPasswordCheck = document.getElementById('new-password-check').value;

      fetch(' http://localhost:3000/api/auth/user/password',{
          method: "POST",
          headers: {
            'Authorization' : `Bearer ${this.$store.state.userToken}`,  // attention au majuscule
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({currentPassword, newPassword, newPasswordCheck})
        })
          .then(function(res){
            if(res.ok){
              return res.json();
            }
          })
          .catch(() => console.log('Oops !'))
    }
 
  }
}
</script>

<style lang="scss">
#option{
  display: flex;
  flex-direction: column;
    .menu{
      display: flex;
      align-items: center;
      background-color:white;
      p{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 33%;
        height: 30px;
        margin: 0;
        &:hover{
          border-bottom: 2px solid #FD2D00;
          cursor: pointer;
        }
      }
      .border{
        border-right: 1px solid #EDF2F6;
      }
    }
  .option__edit{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom:10px;
    figure{
      margin:0;
      margin-top:5px;
      max-width: 50%;
    }
    img{
      max-width: 100%;
    }
    button{
      margin-top: 5px;
    }
  }
  .option__password{
    .password-form{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .label{
        display: inline;
      }
    }
  }
}

// CLASSE APPELER DANS UNE FONCTION
.border-bottom{
  border-bottom: 2px solid red;
}
 
</style>