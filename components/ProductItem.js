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
import Currency from 'react-currency-formatter';
import { StarIcon } from '@heroicons/react/outline';

export default function ProductItem({ product, addToCartHandler }) {
  const classes = useStyles();

  return (
    <div className=" relative flex flex-col m-1 bg-white z-30 h-auto pt-10 pb-6 px-10">
      <p className=" absolute top-2 right-2 text-xs italic text-gray-400">
        <Typography>{product.category}</Typography>
      </p>
      
      <NextLink href={`/product/${product.slug}`} passHref>
        <input
          type="image"
          src={product.image}
          // height={800}
          // width={800}
          objectFit="contain"
          className={classes.linkCard}
        />
      </NextLink>

      <h4 className="mt-5 mb-2 text-black">{product.name}</h4>

      <div className="flex ">
        <Rating
          value={product.rating}
          readOnly
          name="simple-controlled"
          emptyIcon={<StarIcon  />}
        ></Rating>
      </div>
      <p className={classes.desc}>
        <h4 className="mt-2 text-black font-light"> {product.description} </h4>
      </p>

      <div className="my-2 text-black">
        <Currency quantity={product.price} currency="GNF" />
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
