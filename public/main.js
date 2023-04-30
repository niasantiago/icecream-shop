const buttons = document.querySelectorAll(".pay");
const clearButton = document.querySelector(".clear");

buttons.forEach((button)=> {
  button.addEventListener('click', payForOrder) 
})

function payForOrder(e) {
  const id = e.target.value
  console.log(id)
  fetch("/payForOrder", {
    method:"put",
    headers:{
      "Content-Type":"application/json"
    } ,
    body:JSON.stringify({id})
  })
  .then(res => res.json())
  .then(data => window.location.reload())
}  
clearButton.addEventListener('click', clearAll) 

function clearAll() {
 fetch("/clearAll", {
    method:"delete",
    headers:{
      "Content-Type":"application/json"
    } ,
  })
  window.location.reload()
  // .then(res => res.json())
  // .then(data => window.location.reload())
}  



// var thumbDown = document.getElementsByClassName("fa-thumbs-down"); 

// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText) 
//         fetch('messages', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// }); 

// Array.from(thumbDown).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[9].innerText) 
//     fetch('messages/thumbDown', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'thumbDown':thumbDown, 
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true) 
//     })
//   });
// });

// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });
