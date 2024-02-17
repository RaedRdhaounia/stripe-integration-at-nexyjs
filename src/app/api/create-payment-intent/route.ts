import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? ""

// Initialize Stripe with your secret key
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Add the API version if needed
});

const calculateOrderAmount = (items: any[]): number => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400; 
};

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { items } = payload;
      const paymentIntent = await stripe.paymentIntents.list();
    return NextResponse.json(
      {
        data: paymentIntent.data,
        status: 200.
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error },
      { status: 500 },
    );
  }
};