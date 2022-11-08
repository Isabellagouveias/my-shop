import { ImageContainer, SuccessContainer } from '../styles/pages/success'
import { stripe } from '../lib/stripe'

import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Stripe from 'stripe'
import Image from 'next/future/image'

type SuccessProps = {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

const Success: NextPage<SuccessProps> = ({ customerName, product }) => {
  return (
    <>
      <Head>
        <title>Compra efetuada | My Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </ImageContainer>
        <p>
          Uhuul <strong>{customerName}</strong>, seu produto <strong>{product.name}</strong> já está a caminho da sua casa
        </p>
        <Link href='/'>
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.sessionId) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const sessionId = String(query.sessionId)
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })
  const customerName = session.customer_details?.name ?? ''
  const product = session.line_items?.data[0].price?.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}

export default Success