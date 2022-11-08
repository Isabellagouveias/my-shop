import { stripe } from '../../lib/stripe'

import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const { priceId } = req.body
  if (req.method !== 'POST') res.status(405).json({ error: 'Method not allowed' })
  if (!priceId) return res.status(400).json({ error: 'Price not found' })
  const successUrl = `${process.env.NEXT_URL}/success?sessionId={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`
  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ]
  })
  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}

export default handler