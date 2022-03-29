<template>
  <div id='option'>
 
    <div class="menu">
      <p @click='selectEditAvatar()' class='select-avatar border border-bottom'>Avatar</p>
      <p @click="selectEditPassword()" class='select-password border'>Password</p>
      <p @click="selectEditDelete()" class='select-delete'>Delete</p>
    </div>
    <div v-if="this.element == 'avatar'" class="option__avatar">
      <figure>
        <img :src="url" alt='new avatar'/>
      </figure>
      <label for='new-avatar'>Selectionné un nouvelle avatar:</label>
      <input id='new-avatar' type="file" @change="previewFile"> 
      <button @click="changeAvatar()">Envoyé</button>
    </div>
    <div v-if='this.element == "password"' class='option__password'>
      <h2>Changement de mot de passe</h2>
        <form @submit.prevent="sendNewPassword()" class="password-form">
          <label for='current-password'>Votre mot de passe :</label>
          <input id='current-password' placeholder="mot de passe" type='password' required/>
          <label for="new-password">Votre nouveau mot de passe :</label>
          <input id='new-password' placeholder="nouveau mdp" type='password' required>
          <label for="new-password-check">Confirmez votre nouveau mot de passe :</label>
          <input id='new-password-check' placeholder="confirmer" type='password' required>
          <button >Envoyé</button>
          <p class="red-color" v-if="alertMessage">{{ alertMessage }}</p>
        </form>
    </div>
    <div v-if='this.element == "delete"' class='option__delete'>
     <p>Supprimer votre compte ?</p>
     <p></p>
     <button @click='deleteUser()'>Supprimer</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'EditProfileButton',
  data(){
    return {
      element : "avatar",
      url: null,
      user: null,
      alertMessage: null,
    }
  },
  methods:{
     // //AFFICHAGE PICTURE: https://blog.enguehard.info/previsualiser-image-input-type-file/
     previewFile(e) { // interessant de voir e.target qui est lendroit ou ce declenche levent
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    //ENVOI DU NOUVELLE AVATAR
    async changeAvatar(){
      const avatarRefresh = await this.updateAvatar();
      this.user.avatar = avatarRefresh.avatar
      localStorage.setItem('user', JSON.stringify(this.user));
      this.sendParentComponent();
    },
    //UPDATE COMPOPSANT PARENT
    sendParentComponent(){
      this.$emit('update-user', //payload en deuxieme argument, objet pour faire passer un maximum d'info
      {
        avatar:`${this.user.avatar}` 
      })
    },
    //MISE A JOUR AVATAR
    async updateAvatar(){
      const fileInput = document.getElementById('new-avatar');
      const formData = new FormData();
      formData.append('image', fileInput.files[0]);
       return fetch('http://localhost:3000/api/auth/user/avatar',{
          method: "POST",
          headers: {
            'Authorization' : `Bearer ${this.user.token}`,  // attention au majuscule
            'Accept': 'application/json', 
            // 'Content-Type': 'multipart/form-data' // ATTENTION ICI CHANGEMENT EN FORM-DATA
          },
          body: formData
        })
        .then((res) => { 
          if(res.ok){
           return res.json()
          }
        })
        .catch(() => console.log('Oops !'))
    },
    //
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
      this.removeBorderBottom();
      this.element = "avatar";
      const blocAvatar = document.getElementsByClassName('select-avatar')[0];
      blocAvatar.classList.add('border-bottom');
    },
    //AFFICHAGE DU BLOC PASSWORD
      selectEditPassword(){
      this.removeBorderBottom();
      this.element = "password";
      const blocPassword = document.getElementsByClassName('select-password')[0];
      blocPassword.classList.add('border-bottom');
    },
    //AFFICHAGE DU BLOC DELETE
    selectEditDelete(){
      this.removeBorderBottom();
      this.element= "delete";
      const blocDelete  = document.getElementsByClassName('select-delete')[0];
      blocDelete.classList.add('border-bottom');
    },
    //SUPPRESSION DU COMPTE
    async deleteUser(){
      const answer = confirm("Voulez vous supprimer votre compte ? \n(Attention toutes vos données seront perdus)")
      if(answer == false){
        return 0;
      }
      await fetch('http://localhost:3000/api/auth/user/delete',{
        method:'DELETE',
        headers:{'Authorization' : `Bearer ${this.user.token}`}
      })
        .catch(() => console.log("Oops cela ne marche pas !"))

      localStorage.clear();
      window.location = '/Login' // ici on peu l'utilisé vu que l'on sen fiche si celui ci est ou non sauvegarder 
    },
    //ENVOYE DU NOUVEAU PASSWORD
    async sendNewPassword(){
      const currentPassword = document.getElementById('current-password').value ;
      const passwd = document.getElementById('new-password').value; // Format pôur le faire passé dans password validator 
      const newPasswordCheck = document.getElementById('new-password-check').value;

      const resMessage = await fetch(' http://localhost:3000/api/auth/user/password',{
          method: "POST",
          headers: {
            'Authorization' : `Bearer ${this.user.token}`,  // attention au majuscule
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({currentPassword, passwd, newPasswordCheck})
        })
          .then(function(res){
              return res.json();
          })
          .catch(() => console.log('Oops !'))
      if(resMessage.error){
       return this.alertMessage = resMessage.error
      }
      this.alertMessage = resMessage.message
    }
  },
  mounted(){
    this.user = JSON.parse(localStorage.getItem('user'));
    this.url = this.user.avatar
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
  .option__avatar{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom:10px;
    figure{
      margin:0;
      margin-top:15px;
      max-width: 50%;
    }
    img{
      max-width: 100%;
    }
    label{
      padding-bottom:3px;
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
      margin-bottom: 10px;
      .label{
        display: inline;
      }
      input{
        margin-top: 5px;
        margin-bottom: 5px;;
      }
      button{
        margin-top: 5px;
        margin-bottom: 5px;
      }
    }
    .red-color{
      color: #FD2D00;
    }
  }
  .option__delete{
    padding-top: 10px;
    padding-bottom: 10px;
    button{
      margin-top:5px;
    }
  }

button{
      background-color: #ba2808;
      color: white;
      border-radius: 15px;
      padding: 3px 10px 5px 10px;
      cursor: pointer;
      &:hover{
       background-color: darken($color: #FD2D00, $amount: 10%);
      }
    }

// CLASSE APPELER DANS UNE FONCTION
  .border-bottom{
    border-bottom: 2px solid red;
  }
}
</style>