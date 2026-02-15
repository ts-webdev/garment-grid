import { loadStripe } from '@stripe/stripe-js';

// Your Stripe publishable key (from Stripe Dashboard)
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);