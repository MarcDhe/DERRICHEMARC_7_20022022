const liked = [
  {
      "id": 1,
      "post_id": 1,
      "user_id": 1
  },
  {
      "id": 2,
      "post_id": 1,
      "user_id": 2
  },
  {
    "id": 2,
    "post_id": 3,
    "user_id": 2
  },
  {
    "id": 2,
    "post_id": 1,
    "user_id": 2
  }
]

let count = 0;

console.log("début");

for ( let i in liked){
  if(liked[i].post_id == 1){
    count++;
  }
}

console.log('le count est de :',count)