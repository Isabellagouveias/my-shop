import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/future/image'
import Head from 'next/head'
import Stripe from 'stripe'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

type ProductProps = {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    defaultPriceId: string
    description: string
  }
}

const Product: NextPage<ProductProps> = ({ product }) => {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })
      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    } catch (error) {
      // conectar com ferramenta de observabilidade
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  const { isFallback } = useRouter()
  if (isFallback) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <Head>
        <title>{product.name} | My Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}>Comprar agora</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_MaJpeOecdAk6Q3' } }
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params!.id
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })
  const price = product.default_price as Stripe.Price
  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount ? price.unit_amount / 100 : 0),
        defaultPriceId: price.id,
        description: product.description
      }
    },
    revalidate: 60 * 60 * 1
  }
}

export default Product