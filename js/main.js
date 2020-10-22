var sell = document.querySelector('input[name="sell"]')
console.log(sell.checked)


window.addEventListener('click',e =>{
  if(sell.checked){
    document.querySelector('.management-content__item').classList.add('sold-out')
  }else{
    document.querySelector('.management-content__item').classList.remove('sold-out')
  }
})