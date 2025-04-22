import { cart, calculateCartQuantity, updateDeliveryOption } from '../data/cart.js';
import { getProduct } from '../data/products.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import formatCurrency from '../scripts/utils/money.js';

export function renderPaymentSummary() {
  let totalPrice = 0;
  let shippingCost = 0;
  let totalBeforeTax = 0;
  let estimatedTax = 0;
  const taxRate = 0.1;
  let orderTotal = 0;
  let html = ``;

  function paymentSummaryHTML() {

    cart.forEach(cartItem => {
      const matchingProduct = getProduct(cartItem.productId);
  
      totalPrice += (matchingProduct.priceCents * cartItem.quantity);
  
      const cartQuantity = calculateCartQuantity();

      //IS THIS THE SAME WITH THE updateDeliveryOption() in cart.js?
      deliveryOptions.forEach(selectedDeliveryOpt => {
        if (selectedDeliveryOpt.id === cartItem.deliveryOptionId) {
          shippingCost += selectedDeliveryOpt.priceCents;
        }
      });

      totalBeforeTax = totalPrice + shippingCost;

      estimatedTax = totalBeforeTax * taxRate;

      orderTotal = totalBeforeTax + estimatedTax;

      console.log(totalPrice);

  
      html = 
      `
        <div 
          class="payment-summary-title">
            Order Summary
          </div>
  
          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
          </div>
  
          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingCost)}</div>
          </div>
  
          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>
  
          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
          </div>
  
          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
        </div>
      `;
    });
  }

  paymentSummaryHTML();

  document.querySelector('.js-payment-summary').innerHTML = html;
};