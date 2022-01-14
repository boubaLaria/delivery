import {
  // Button,
  // Card,
  // CardActionArea,
  // CardActions,
  // CardContent,
  // CardMedia,
  // ImageList,
  Typography,
} from '@material-ui/core';
import React from 'react';
import NextLink from 'next/link';
import Rating from '@material-ui/lab/Rating';
import useStyles from '../utils/styles';
import Currency from "react-currency-formatter";


export default function ProductItem({ product, addToCartHandler }) {
  const classes = useStyles();

  return (
    <div className=" relative flex flex-col m-3 bg-white z-30 p-10">
      <p className=" absolute top-2 right-2 text-xs italic text-gray-400">
      
        <Typography>{product.category}</Typography>
      </p>
      <NextLink href={`/product/${product.slug}`} passHref >
        <input type='image'
          src={product.image}
          height={200}
          width={200}
          objectFit="contain"
          className={classes.linkCard}
          
          
        />
      </NextLink>
      <h4 className="my-3 text-black">{product.name}</h4>

      <div className="flex ">
        <Rating value={product.rating} readOnly></Rating>
      </div>
      <p className={classes.desc}>
        <Typography>{product.description}</Typography>
      </p>

      <div className="my-5 text-black">
      <Currency quantity={product.price}  currency="XOF" />
        </div>
      <button
        className="mt-auto button"
        onClick={() => addToCartHandler(product)}
      >
        Add to basket
      </button>
    </div>
  );
}
