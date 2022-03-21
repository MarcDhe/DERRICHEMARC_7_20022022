const time = new Date()
console.log(time)

// const tab= [
//   {
//     "id": 15,
//     "from_id": 3,
//     "to_id": 2,
//     "content": "sdf",
//     "readedat": "null",
//     "createdAt": "2022-03-17T10:52:41.000Z"
// },
//   {
//       "id": 2,
//       "from_id": 2,
//       "to_id": 1,
//       "content": "deuxieme vrai emssage",
//       "readedat": "null",
//       "createdAt": "2022-03-17T09:28:29.000Z"
//   },
//   {
//       "id": 3,
//       "from_id": 1,
//       "to_id": 2,
//       "content": "repoonse deuxieme  vrai emssage",
//       "readedat": "null",
//       "createdAt": "2022-03-17T09:28:36.000Z"
//   },
//   {
//       "id": 4,
//       "from_id": 2,
//       "to_id": 1,
//       "content": "troisieme  vrai emssage",
//       "readedat": "null",
//       "createdAt": "2022-03-17T09:28:48.000Z"
//   },
//   {
//       "id": 5,
//       "from_id": 2,
//       "to_id": 1,
//       "content": "e",
//       "readedat": "null",
//       "createdAt": "2022-03-17T09:34:41.000Z"
//   },
//   {
//       "id": 6,
//       "from_id": 2,
//       "to_id": 1,
//       "content": "e",
//       "readedat": "null",
//       "createdAt": "2022-03-17T09:37:07.000Z"
//   },
//   {
//       "id": 7,
//       "from_id": 2,
//       "to_id": 2,
//       "content": "e",
//       "readedat": "null",
//       "createdAt": "2022-03-17T09:37:12.000Z"
//   },
//   {
//       "id": 8,
//       "from_id": 2,
//       "to_id": 1,
//       "content": "e",
//       "readedat": "null",
//       "createdAt": "2022-03-17T09:40:21.000Z"
//   },
//   {
//       "id": 9,
//       "from_id": 2,
//       "to_id": 1,
//       "content": "t",
//       "readedat": "null",
//       "createdAt": "2022-03-17T09:51:41.000Z"
//   },
//   {
//       "id": 10,
//       "from_id": 2,
//       "to_id": 1,
//       "content": "e",
//       "readedat": "null",
//       "createdAt": "2022-03-17T09:53:43.000Z"
//   },
//   {
//       "id": 14,
//       "from_id": 3,
//       "to_id": 2,
//       "content": "fdsfds",
//       "readedat": "null",
//       "createdAt": "2022-03-17T10:52:39.000Z"
//   },

// ];



// const user = 2;
// const trie = [];
// const trie2 = [];
// console.log('debut')

// for(let i in tab){ // MIS AUTOMATIQUEMENT  EN ORDRE PAR DATE VIA LE FINDALL DE L API
//   if(tab[i].from_id !== user){
//     trie.push(tab[i].from_id);
//     trie2.push({id:tab[i].from_id, date:tab[i].createdAt});
//   }else{
//     trie.push(tab[i].to_id);
//     trie2.push({id: tab[i].to_id, date:tab[i].createdAt})
//   }
// }

// const uniquAddresses = Array.from(new Set(trie2.map(a => a.id)))  // SOURCE: https://www.codegrepper.com/code-examples/javascript/how+to+remove+duplicate+array+of+objects
//  .map(id => {
//    return trie2.find(a => a.id === id)
//  })

// console.log('test:',uniquAddresses)

// const userRegistred = [...new Set(trie)] // https://www.delftstack.com/fr/howto/javascript/javascript-remove-duplicates-from-an-array/#:~:text=%2C%203%2C%204%5D-,Utilisez%20Array.,s'il%20remplit%20la%20condition.



// console.log("trie avec date", trie2)
// // console.log('trie:', trie)
// // console.log('SAns doublons', userRegistred)

// // // let a = []
// // a[0] = trie2[0]
// // console.log(a)

// // for(let i in a){

// // }

// // var addresses = [
// //   {"type":"LICENSE", "licenseNum": "12345", state:"NV"},
// //   {"type":"LICENSE", "licenseNum": "A7846", state:"CA"},
// //   {"type":"LICENSE", "licenseNum": "12345", state:"OR"},
// //   {"type":"LICENSE", "licenseNum": "10849", state:"CA"},
// //   {"type":"LICENSE", "licenseNum": "B7037", state:"WA"},
// //   {"type":"LICENSE", "licenseNum": "12345", state:"NM"}
// // ];

// // const uniqueAddresses = Array.from(new Set(addresses.map(a => a.licenseNum)))
// //  .map(licenseNum => {
// //    return addresses.find(a => a.licenseNum === licenseNum)
// //  })
// //  console.log(uniqueAddresses)