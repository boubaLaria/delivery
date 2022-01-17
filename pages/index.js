/* eslint-disable @next/next/no-img-element */
import NextLink from 'next/link';
import {Link, } from '@material-ui/core';
import Layout from '../components/Layout';
import db from '../utils/db';
import Product from '../models/Product';
import axios from 'axios';
// import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import ProductItem from '../components/ProductItem';
import Carousel from 'react-material-ui-carousel';
import useStyles from '../utils/styles';

export default function Home(props) {
  const classes = useStyles();
  // const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { topRatedProducts, featuredProducts } = props;
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    // router.push('/cart');
  };
  return (
    <Layout >
      <Carousel className={classes.mt1} 
      indicators={false}
      animation="slide">
        {featuredProducts.map((product) => (
          <NextLink
            key={product._id}
            href={`/product/${product.slug}`}
            passHref
          >
            <Link>
              <img
                src={product.featuredImage}
                alt={product.name}
                className={classes.featuredImage}
            
              ></img>
            </Link>
          </NextLink>
        ))}
      </Carousel>
      
      {/* <Typography variant="h2">Popular Products</Typography> */}
      {/* <div className="grid bg-gray-200 grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto "> */}
      <div className="grid  grid-flow-row-dense grid-cols-2 md:grid-cols-3 bg-gray-200 xl:grid-cols-4  md:-mt-52 mx-auto ">
        
        {topRatedProducts
        .slice(0, 4)
        .map((product) => (
         
            <ProductItem
            key={product.name}
              product={product}
              addToCartHandler={addToCartHandler}
             
            />
           
          
        ))}
        <img
        className="col-span-full my-2"
        src="https://links.papareact.com/dyz"
        alt=""
      />
       <div className="md:col-span-2 grid grid-flow-col-dense ">
       {topRatedProducts
        .slice(4, 5)
        .map((product) => (
         
            <ProductItem
            key={product.name} 
              product={product}
              addToCartHandler={addToCartHandler}
            
            />
         
        ))}
       </div>

       
       {topRatedProducts
       .slice(5, props.length)
        .map((product) => (
          
            <ProductItem
            key={product.name} 
              product={product}
              addToCartHandler={addToCartHandler}
            />
          
        ))}
      </div>
     
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    '-reviews'
  )
    .lean()
    .limit(100);
  const topRatedProductsDocs = await Product.find({}, '-reviews')
    .lean()
    .sort({
      rating: -1,
    })
    .limit(150);
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}