const dessertSection = document.querySelector(".dessert-section")

// getting data from json
const createDessert = async () => {
  let data = await axios.get("data.json");
  console.log(data.data);

  // creating multiple desserts

  dessertSection.innerHTML = ""

  for (let i of data.data) {
    dessertSection.innerHTML +=

      `<div class="dessert-card" >
            <img class="dessert-img" src="${i.image.desktop}" alt="">
            <!-- add to cart  -->
            <div class=" add-to-cart">
              <div class="atc-btn">
                <img src="assets/images/icon-add-to-cart.svg" alt="">
                <p>Add to Cart</p>
              </div>
              <div class="product-num">
                <div class="item-toggle">
                  <img class="decrease" src="assets/images/icon-decrement-quantity.svg" alt="">
                </div>
                <span class="inc-qty"></span>
                <div class="item-toggle">
                  <img class="increase" src="assets/images/icon-increment-quantity.svg" alt="">
                </div>
              </div>
            </div>

            <!-- product info -->
            <div class="product-info">
              <p class="category">${i.category}</p>
              <p class="dessert-name" id="${i.id}">${i.name}</p>
              <span class="dessert-price">$<span>${i.price}</span></span>
            </div>
          </div>`
  }

  // add to cart cards html create

  const cartWithItem = document.querySelector(".cart-with-item")
  cartWithItem.classList.add("cartWithItem-off")

  const addItemMultiple = document.querySelector(".add-item-multiple")



  addItemMultiple.innerHTML = ""

  function cartCard(cardNameMain, cardIdMain) {
    addItemMultiple.innerHTML +=

      `<div class="add-item" id="dessert-${cardIdMain}">
              <div class="prod-info">
                <p class=" product-name">${cardNameMain}</p>
                <div class="product-num-info">
                  <span class="qty-outer"><span class="qty">1</span>x</span>
                  <span class="product-price-outer">@ $<span class="product-price">5.50</span></span>
                  <span class="price-add-outer">$<span class="price-add">5.50</span></span>
                </div>
              </div>
              <img class="remove" src="assets/images/icon-remove-item.svg" alt="">
            </div>
          </div>`
  }



  // clicking add to cart - loop through each card first

  const dessertCard = document.querySelectorAll(".dessert-card")

  dessertCard.forEach(card => {
    const atcBtn = card.querySelector(".atc-btn")
    const productNum = card.querySelector(".product-num")
    const decrease = card.querySelector(".decrease")
    const increase = card.querySelector(".increase")
    const incQty = card.querySelector(".inc-qty")
    // console.log(cardName.innerText)

    // add to cart toggle
    atcBtn.addEventListener("click", () => {
      atcBtn.classList.add("atcbtn-off")
      productNum.classList.add("productnum-on")
      const cardName = card.querySelector(".dessert-name")
      let cardNameMain = cardName.innerText
      let cardIdMain = cardName.id
      // console.dir(cardName)
      cartCard(cardNameMain, cardIdMain)
      console.log("button clicked")
      console.dir(addItemMultiple)
      const cartWithItem = document.querySelector(".cart-with-item")
      cartWithItem.classList.remove("cartWithItem-off")

    })

    // increase and decrease cart value

    incQty.innerText = 1

    let changeNum = parseInt(incQty.innerText)

    // decrease

    decrease.addEventListener("click", (event) => {
      changeNum = changeNum - 1
      incQty.innerText = changeNum
      // console.log(changeNum)
      if (changeNum <= 0) {
        const cardName = card.querySelector(".dessert-name")
        let cardIdProduct = cardName.id
        console.log(cardIdProduct)
        const addItem = document.getElementById(`dessert-${cardIdProduct}`)
        addItem.remove()
        atcBtn.classList.remove("atcbtn-off")
        productNum.classList.remove("productnum-on")
        incQty.innerText = 1
        console.dir(addItemMultiple)
        if (addItemMultiple.childElementCount === 0) {
          const cartWithItem = document.querySelector(".cart-with-item")
          cartWithItem.classList.add("cartWithItem-off")
        }
      }
    })

    // increase

    increase.addEventListener("click", () => {
      changeNum = changeNum + 1
      incQty.innerText = changeNum
    })

  })



}

createDessert()





