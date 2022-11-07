import { NextApiHandler } from "next";
import { stripe } from '../../lib/stripe'

const handler: NextApiHandler = async (request, response) => {
    const { priceId } = request.body
    if (!priceId) return response.status(400).json({ error: 'Price is required '})
    const sucessUrl = `${process.env.NEXT_URL}/success?sessionId={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_URL}/`
    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: sucessUrl,
        cancel_url: cancelUrl,
        mode: 'payment',
        line_items: [
            {
            price: priceId,
            quantity: 1
            }
        ]
    })
    return response.status(201).json({
        checkoutUrl: checkoutSession.url
    })
}

export default handler