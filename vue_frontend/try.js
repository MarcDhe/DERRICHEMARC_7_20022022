//https://gilles-hunault.leria-info.univ-angers.fr/tuteurs/tutregexp.php

const reg = new RegExp ('^[a-zA-Z0-9]+$') 
let username = 'tata93'

console.log(reg.test(username))