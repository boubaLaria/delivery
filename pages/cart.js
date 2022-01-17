import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
import useStyles from '../utils/styles';
import {
  Grid,
  Typography,
  Link,
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
  Container,
} from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import Rating from '@material-ui/lab/Rating';
import { StarIcon } from '@heroicons/react/outline';

function CartScreen() {
  const router = useRouter();
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const checkoutHandler = () => {
    router.push('/shipping');
  };
  return (
    <Layout title="Shopping Cart">
      <Container maxWidth="xl" className=" max-w-screen-2xl mx-auto">
        {cartItems.length === 0 ? (
          <div>
            Cart is empty.{' '}
            <NextLink href="/" passHref>
              <Link>Go shopping</Link>
            </NextLink>
          </div>
        ) : (
          <Grid container spacing={1}>
            <Grid item xs={12} >
              
                <input
                  type="image"
                  src="https://www.junglescout.com/wp-content/uploads/2020/05/Prime-day-banner.png"
                  height={150}
                  width="100%"
                  className={classes.imgCheckout}
                />
              
            </Grid>
            <Grid item md={9} xs={12}>
              <div className="flex flex-col p-5 space-y-10">
                <h1 className="text-3xl border-b  pb-4">
                 
                  Your Shopping Basket
                </h1>
              </div>

              {cartItems.map((item) => (
                <div key={item._id} className="p-5 space-y-10 ">
                  <Grid container spacing={2} className=" flex border-b py-4">
                    <Grid item md={2} xs={3} className=" my-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                      ></Image>
                    </Grid>
                    <Grid item md={8} xs={8} className="">
                      <NextLink href={`/product/${item.slug}`} passHref>
                        <Link>
                          <Typography>{item.name}</Typography>
                        </Link>
                      </NextLink>
                      <div className="flex ">
                        <Rating
                          value={item.rating}
                          readOnly
                          name="simple-controlled"
                          emptyIcon={<StarIcon />}
                          
                        ></Rating>
                      </div>

                      <p className={classes.desc}>
                        <h4 className="my-2"> {item.description} </h4>
                      </p>
                      <Typography>${item.price}</Typography>
                    </Grid>
                    <Grid item md={2} xs={12}>
                      <div className="border p-2 mx-auto flex justify-between">
                        <button
                          onClick={() => removeItemHandler(item)}
                          className="button mr-3 "
                        >
                          Remove
                        </button>
                        <Select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                          className="ml-auto"
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </Grid>
            <Grid item md={3} xs={12} >
              <Card>
                <List>
                  <ListItem>
                    <Typography variant="h2">
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                      items) : $
                      {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={checkoutHandler}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Check Out
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
