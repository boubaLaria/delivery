import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';

import {
  AppBar,
  Toolbar,
  Typography,
  // Container,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemText,
} from '@material-ui/core';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import MenuIcon from '@material-ui/icons/Menu';
import CancelIcon from '@material-ui/icons/Cancel';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import { getError } from '../utils/error';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useEffect } from 'react';

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#eaeded',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const classes = useStyles();

  const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const [query, setQuery] = useState('');
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
  };
  return (
    <div>
      <Head>
        <title>
          {title ? `${title} - Abdoulaye Dialo` : 'Abdoulaye Dialo'}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <a name="top"></a>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar className={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <NextLink href="/" passHref>
                <Link>
                  <Typography variant="h2">HDelivery</Typography>
                </Link>
              </NextLink>
            </Box>
            <Drawer
              anchor="left"
              open={sidbarVisible}
              onClose={sidebarCloseHandler}
            >
              <List>
                <ListItem>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography>Shopping by category</Typography>
                    <IconButton
                      aria-label="close"
                      onClick={sidebarCloseHandler}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider light />
                {categories.map((category) => (
                  <NextLink
                    key={category}
                    href={`/search?category=${category}`}
                    passHref
                  >
                    <ListItem
                      button
                      component="a"
                      onClick={sidebarCloseHandler}
                    >
                      <ListItemText primary={category}></ListItemText>
                    </ListItem>
                  </NextLink>
                ))}
              </List>
            </Drawer>

            <form
              onSubmit={submitHandler}
              className="hidden sm:flex items-center h-9 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 ml-4"
            >
              <input
                name="query"
                className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
                placeholder="Search products"
                onChange={queryChangeHandler}
              />
              <IconButton
                type="submit"
                className="h-12 p-4"
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </form>

            <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
              {/*  */}
              <div
                onClick={() => router.push('/cart')}
                className=" relative link flex items-center"
              >
                <span className="absolute top-0 right-0 md:right-10 h-5 w-4 bg-yellow-400 text-center rounded-full text-black font-bold ">
                  {cart.cartItems.length > 0 ? (
                    <Badge badgeContent={cart.cartItems.length}></Badge>
                  ) : (
                    '0'
                  )}
                </span>
                <ShoppingCartIcon className="h-10" />
                <p className=" hidden md:inline font-extrabold md:text-sm">
                  Basket
                </p>
              </div>
            </div>
            {/*  */}
            <div>
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    <div sx={{ display: 'block' }}>
                      <p className="text-xs">Hello {userInfo.name}</p>

                      <p className=" font-bold text-xs">Account Left</p>
                    </div>
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, '/order-history')
                      }
                    >
                      Order Hisotry
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, '/admin/dashboard')
                        }
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>
                    <Typography component="span">Login</Typography>
                  </Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <div className='pb-2 px-4 bg-black sm:hidden '>
        <form
              onSubmit={submitHandler}
              className="flex items-center h-8 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500"
            >
              <input
                name="query"
                className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
                placeholder="Search products"
                onChange={queryChangeHandler}
              />
              <IconButton
                type="submit"
                className="h-12 p-4"
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </form>
            </div>
        <div className="flex items-center p-2 pl-5 bg-amazon_blue-light text-white text-sm md:pl-8 ">
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={sidebarOpenHandler}
            className={classes.menuButton}
          >
            <MenuIcon className={classes.navbarButton} />
          </IconButton>
          
          <div className="flex items-center space-x-3   overflow-x-visible overflow-hidden whitespace-nowrap ">
            <p className="link pl-3">Prime videos</p>
            <p className="link ">Abdoulaye Bussiness </p>
            <p className="link ">Todays deals</p>
            <p className="link hidden lg:inline-flex">Buy Again</p>
            <p className="link hidden lg:inline-flex">Shopper Toolkt</p>
            <p className="link hidden lg:inline-flex">Health & Personal care</p>
          </div>
        </div>

        <div className={classes.main}>{children}</div>

        <button className=" w-full py-3 text-white mt-8 bg-amazon_blue-light ">
          <a href="#top">Back to top of page</a>
        </button>
        <footer className={classes.footer}>
          <Typography variant="h6" className={classes.tFooter}>
            Conditions of UsePrivacy NoticeInterest-Based Ads© 2022,
            Delivery.com, Inc. or its affiliates
          </Typography>
          <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
        </footer>
      </ThemeProvider>
    </div>
  );
}
