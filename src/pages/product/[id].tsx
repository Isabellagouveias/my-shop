import type { NextPage } from 'next'; 
import  { useRouter } from 'next/router'
import { useState } from 'react'
import { json } from 'stream/consumers';
import { GetStaticProps, GetStaticPaths } from 'next'
import  Image from 'next/future/image'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe';
import  axios  from 'axios'
import { ProductContainer, ImageContainer, ProductDetails } from '../../styles/pages/product'

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
    const [isProcessing, setIsProcessing ] = useState(false)
    const { isFallback } = useRouter()

    async function handleBuyProduct(){
        setIsProcessing(true)
       try {
        const response = await axios.post('/api/checkout', {
            priceId: product.defaultPriceId
        })
        const { checkoutUrl } = response.data
        window.location.href = checkoutUrl
       } catch (error) {
        alert('Não foi possivel realizar a compra')
       } finally {
        setIsProcessing(false)
       }
    }

    if (isFallback) {
        return <h1>Loading...</h1>
    }

   return (
    <ProductContainer>
        <ImageContainer>
            <Image src={product.imageUrl} width={520} height={520} alt=""/>
        </ImageContainer>
        <ProductDetails>
            <h1>{product.name}</h1>
            <span>{product.price}</span>
            <p>{product.description}</p>
            <button onClick={handleBuyProduct} disabled={isProcessing}>Comprar agora</button>
        </ProductDetails>
    </ProductContainer>
   )
}

export const getStaticPaths: GetStaticPaths = async () => {
     return {
        paths: [
            {
                params: { id: 'prod_MboKHBZTNUtcbe'}
            }
        ],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<any, { id : string }> = async ({ params }) => {
    const productId = params!.id
    try {
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
            revalidate: 60 * 60 * 2 
        }
    } catch {
        return {
            notFound: true
        }
    }
}

export default Product