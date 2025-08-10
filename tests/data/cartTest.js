import { cart, addToCart, loadFromStorage, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';

describe('test suite : add to cart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem'); 
  });

  it('adds an existing product to card', () => {
    //spyOn(localStorage, 'setItem'); 
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  it('adds a new product to the cart', () => {
    //spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });
});

describe('test suite : remove from cart', () => {
  const productIdExist = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productIdNotExist = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
  });
  
  it('remove an item which exist', () => {
    removeFromCart(productIdExist);
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  it('remove an item which not exit', () => {
    removeFromCart(productIdNotExist);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

});

describe('test suite : update delivery option', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
  });
  it('update delivery option id with valid productId', () => {
    updateDeliveryOption(productId1, '3');
    expect(
      cart[0].deliveryOptionId
    ).toEqual('3');
    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(1);
  });
  it('update delivery option id with unvalid productId', () => {
    updateDeliveryOption('productId1', '3');
    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(0);
  });
  it('update delivery option with unvalid deliveryOptionId', () => {
    updateDeliveryOption(productId1, '4');
    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(0);
  });
  
});