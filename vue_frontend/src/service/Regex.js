// exports.Nom_De_La_Foction = () => {}
////https://gilles-hunault.leria-info.univ-angers.fr/tuteurs/tutregexp.php

exports.usernameRegex = (username) => {
  const reg = new RegExp ('^[a-zA-Z0-9]{6,}+$') // chaine restreinte à un seul mot non vide en minuscule (sans lettre accentuée) avec majusscule, minuscule et chiffre
  if(!reg.test(username)){
    return { error: 'username incorrect !'}
  }
}

