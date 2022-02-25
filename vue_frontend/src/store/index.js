import { createStore } from 'vuex'

export default createStore({
  state: { 
    userProfil: {},

  },
  getters: { // se def comme une fonction avec state en parametre
  },
  mutations: { // par convension elle sont noté en MAJ recoit state en 1er argument et peu recevoir un payload en sec sacte avec les actions context.commit('NOM_DE_LA_MUTATION', PAYLOAD) une mutation est synchrone
  },
  actions: {   // acte les mutations prend en parametyre le context avec this.$store.dispatch()
  },
  modules: {
  },
  mounted(){
    fetch('http://localhost:3000/api/auth/user')
    .then(res => res.json())
    .then(result => {
      this.userProfil = result
    })
    console.log("le resultat est : ", this.userProfil)
  }
})
