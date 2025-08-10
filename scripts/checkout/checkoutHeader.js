import {cart} from '../../data/cart.js';

export function renderCheckoutHeader() {
  let itemNumber = 0;
  cart.forEach(cartItem => {
    itemNumber += cartItem.quantity;
  });

  const checkoutHeaderHTML = `
    Checkout 
    (<a class="return-to-home-link" href="amazon.html">
      ${itemNumber} items
    </a>)
  `;

  document.querySelector('.js-checkout-header-middle-section')
    .innerHTML = checkoutHeaderHTML;
}