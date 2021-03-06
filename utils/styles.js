import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  navbar: {
    // backgroundColor: '#203040',
    backgroundColor: 'black',

    '& a': {
      color: '#ffffff',
      // marginLeft: 10,
    },
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    // backgroundColor:'#eaeded',
    minHeight: '80vh',
  },
  tFooter: {
    fontFamily: 'inerit',
    fontSize: '15px',
  },
  footer: {
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'white',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
    // marginLeft:10
  },
  form: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
    textAlign: 'center',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
  transparentBackgroud: {
    backgroundColor: 'transparent',
  },
  error: {
    color: '#f04040',
  },
  fullWidth: {
    width: '100%',
  },
  reviewForm: {
    maxWidth: 800,
    width: '100%',
  },
  reviewItem: {
    marginRight: '1rem',
    borderRight: '1px #808080 solid',
    paddingRight: '1rem',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  menuButton: { padding: 0 },
  // mt1: { marginTop: '1rem' },
  // search
  searchSection: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  searchForm: {
    border: '1px solid #ffffff',
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  searchInput: {
    paddingLeft: 5,
    color: '#000000',
    '& ::placeholder': {
      color: '#606060',
    },
  },
  iconButton: {
    backgroundColor: '#f8c040',
    padding: 5,
    borderRadius: '0 5px 5px 0',
    '& span': {
      color: '#000000',
    },
  },
  sort: {
    marginRight: 5,
  },

  fullContainer: { height: '100vh' },
  mapInputBox: {
    position: 'absolute',
    display: 'flex',
    left: 0,
    right: 0,
    margin: '10px auto',
    width: 300,
    height: 40,
    '& input': {
      width: 250,
    },
  },
  featuredImage: {
    height: '30rem',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 200,
      width: '100%',
    },
  },
  desc: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    // color: 'black',
    maxWidth:"200"
    
    // marginTop:'4px',
    // marginBottom:'4px',
  },
  raitin: {
    backgroundColor: '#cfccc6',
    [theme.breakpoints.between('300', '350')]: {
      display: 'none',
    },
  },
  linkCard: {
    cursor: 'pointer',
    margin: 'auto',
    height: '90px',
    width: '100%',
    [theme.breakpoints.between('lg', 'xl')]: {
      height: 200,
      width: 200,
    },
  },
  imgProduct: {
    // backgroundColor:'#fafafa',
    display: 'flex',
    justifyContent: 'center',
  },
  imgCheckout:{
    paddingTop:10,
    height:230,
    [theme.breakpoints.between('xs', 'md')]: {
      height: 'auto',
      
    },
  }
}));
export default useStyles;
