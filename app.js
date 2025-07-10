const dessertSection = document.querySelector(".dessert-section")

// getting data from json
const createDessert = async () => {
  let data = await axios.get("data.json");
  console.log(data.data);

  // creating multiple desserts

  dessertSection.innerHTML = ""

  for (let i of data.data) {
    dessertSection.innerHTML +=

      `<div class="dessert-card">
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
              <p class="dessert-name">${i.name}</p>
              <span class="dessert-price">$<span>${i.price}</span></span>
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
    console.dir(incQty)

    // add to cart toggle
    atcBtn.addEventListener("click", () => {
      atcBtn.classList.add("atcbtn-off")
      productNum.classList.add("productnum-on")
      console.log("button clicked")
    })

    // increase and decrease cart value

    incQty.innerText = 1

    let changeNum = parseInt(incQty.innerText)

    // decrease

    decrease.addEventListener("click", () => {
      changeNum = changeNum - 1
      incQty.innerText = changeNum
      if (changeNum <= 0) {
        atcBtn.classList.remove("atcbtn-off")
        productNum.classList.remove("productnum-on")
        incQty.innerText = 1
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





