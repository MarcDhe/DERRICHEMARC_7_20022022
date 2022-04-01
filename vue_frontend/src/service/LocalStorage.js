exports.checkStorage = () => {
    if(localStorage.user == undefined){
      this.$router.push(`/login`);
    }
    const now = new Date();
    console.log(now)
    const user = JSON.parse(localStorage.getItem('user'));

    if(now.getTime() > user.expiry){ // ALORS SESSION EXPIRE
      localStorage.clear()
       this.$router.push('/login');
    }
    console.log(user)
    return  user;
}
