import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });
  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOptionId){
  const deliveryOption = getDeliveryOption(deliveryOptionId);

  let deliveryDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs().add(4, 'days');

  while (deliveryDays > 0){
    const day = deliveryDate.format('dddd');
    if (day === 'Friday' || day === 'Saturday') {
      deliveryDate = deliveryDate.add(1, 'days');
    }
    else{
      deliveryDays--;
      deliveryDate = deliveryDate.add(1, 'days');
    }
  }

  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );
  
  return dateString;
}