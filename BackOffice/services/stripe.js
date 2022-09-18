const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SK);

const generatePaymentIntent = async ({
  amount,
  userName,
  email,
  payment_method,
}) => {
  const resPaymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount).toFixed(2) * 100,
    currency: process.env.STRIPE_CURRENCY,
    payment_method_types: ['card'],
    payment_method,
    description: `Paid by ${userName}`,
    receipt_email: email,
  });

  return resPaymentIntent;
};

const generatePaymentMethod = async (token) => {
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: { token },
  });

  return paymentMethod;
};

module.exports = {
  generatePaymentIntent,
  generatePaymentMethod,
};
