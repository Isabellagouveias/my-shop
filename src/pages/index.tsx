import type { GetStaticProps, NextPage } from 'next'
import { stripe } from '../lib/stripe'
import { HomeContainer, Product } from '../styles/pages/home'
import Stripe from 'stripe'
import Image from 'next/future/image'
import Link from 'next/link'


type HomeProps = {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

const Home: NextPage <HomeProps> = ({ products }) => {
  return (
      <HomeContainer>
        {products.map(product => {
          return (
          <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
            <Product>
              <Image src={product.imageUrl} width={520} height={480} alt=""></Image>
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
          )
        })}
      </HomeContainer>
    )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount ? price.unit_amount / 100 : 0)
    }
  })
  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2
  }
}

export default Home

