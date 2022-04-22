// navbar
const navbarActive = document.querySelectorAll("header ul li")

navbarActive.forEach(element => {
   element.addEventListener('click', () => {
      navbarActive.forEach(element => {
         element.classList.remove('active')
      })
      element.classList.add('active')
   })
})

// main
// variables
const currencyIn = document.querySelectorAll('.box-left .currency li')
const currencyOut = document.querySelectorAll('.box-right .currency li')
const moneyIn = document.querySelector('.box-left .money')
const moneyOut = document.querySelector('.box-right .money')
const constMoneyLeft = document.querySelector('.box-left .const-money')
const constMoneyRight = document.querySelector('.box-right .const-money')

let base = 'RUB', symbols = 'USD', ratio = 1, ratio2 = 1;

// Fetch
// moneyIn.value = 1
function getFetch() {
   if(base == symbols) {
      constMoneyLeft.innerHTML = `1 ${base} = 1 ${base}`
      constMoneyRight.innerHTML = `1 ${base} = 1 ${base}`
      return moneyOut.value = moneyIn.value;
   }
   // left
   fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols} `)
   .then(res => res.json())
   .then(data => {
      ratio = data.rates[symbols]
      ans(data)
      return data
   })
   .catch(err => console.log(err)) //bunu sonra duzelt
   // right
   fetch(`https://api.exchangerate.host/latest?base=${symbols}&symbols=${base} `)
   .then(res => res.json())
   .then(data => {
      ratio2 = data.rates[base]
      ans2(data)
      return data
   })
   .catch(err => console.log(err)) //bunu sonra duzelt
}
getFetch();

// checkLeft
function choiceIn(elem) {
   currencyIn.forEach(elem => {
      elem.classList.remove('active')
   })

   elem.classList.add('active')
   return getFetch();
}
currencyIn.forEach(elem => elem.addEventListener('click', () => { 
   base = elem.innerHTML
   return choiceIn(elem)
}) )

// checkRight
function choiceOut(elem) {
   currencyOut.forEach(elem => {
      elem.classList.remove('active')

   })
   elem.classList.add('active')
   return getFetch();
}
currencyOut.forEach(elem => elem.addEventListener('click', () => { 
   symbols = elem.innerHTML
   return choiceOut(elem)
}) )


// check
function ans(data) {
   moneyOut.value = moneyIn.value * ratio;
   constMoneyLeft.innerHTML = `1 ${base} = ${ratio} ${symbols}`
}

function ans2(data) {
   moneyIn.value = moneyOut.value * ratio2;
   constMoneyRight.innerHTML = `1 ${symbols} = ${ratio2} ${base}`
}

// operation
moneyIn.addEventListener('keyup', () => {
   return ans();
})

moneyOut.addEventListener('keyup', () => {
   return ans2();
})