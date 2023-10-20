import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import LikeButton from '../LikeButton';
import { Link } from 'gatsby';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '200%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '12ch',
      },
    },
  },
}));


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Saved'];
const navUrl = ['/', 'about', 'saved'];
const modalStyle = {
  position: 'absolute',
  overflow:'scroll',
  height:'50%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  boxShadow: 36,
  p: 4,
};

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {setOpen(true)};
  const handleClose = () => setOpen(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Newsify
      </Typography>
      <Divider />
      <List>
        {navItems.map((item,i) => (
          <ListItem key={navUrl[i]} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Button href={navUrl[i]} key={item}>
                <ListItemText to={navUrl[i]} primary={item} />
              </Button>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // useEffect(() => {
  //   if (input) {
  //     console.log(input)
  //     axios.get(`https://content.guardianapis.com/search?q=${input}&show-fields=all&api-key=deda27a9-4ba6-451f-a8a0-183a2fbeae42`).then((response) => {
  //       setResults(response.data.response.results);
  //       console.log(results)
  //     });
  //   } else {
  //     setResults([]);
  //   }
  // }, [input]);

  const fetchData = (value) => {
    fetch(`https://content.guardianapis.com/search?q=${value}&show-fields=all&api-key=deda27a9-4ba6-451f-a8a0-183a2fbeae42`)
      .then((response) => response.json())
      .then((json) => {
        const result = json.response.results.filter((response) => {
          return (
            // response &&
            // user &&
            response.fields.shortUrl
            // user.name.toLowerCase().includes(value)
          );
        });
        setResults(result);
        console.log([result])
      });
  };

  let throttleTimeout;
  const throttleInterval = 1000;
  const handleChange = (value) => {
    // Ignore input changes if a previous event is already scheduled
    if (!throttleTimeout) {
      // Set a new timeout to execute the function after the interval
      throttleTimeout = setTimeout(() => {
        // Process the event here, e.g., make an API request
        console.log("Throttled value: " + value);
        throttleTimeout = null; // Reset the timeout
      }, throttleInterval);
    }
    setInput(value);
    fetchData(value);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', marginBottom: 10 }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Newsify
          </Typography>
          <Modal 
              // hideBackdrop
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    
                    <StyledInputBase
                      type='text'
                      placeholder="Search…"
                      value={input}
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </Search>
                  {/* <pre>
                    test: {console.log(results.map((card, index) => (card.id)))}
                  </pre> */}
                  <Typography variant="p">
                  </Typography>
                  { results ? (
                    results.map((card, index) => (
                      <Grid item key={card.id} xs={12} sm={6} md={4} l={12} xl={6} sx={{
                        height: "50%",
                        display: "flex",
                        flexDirection: "column",
                      }}>
                        {/* <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardMedia
                            component="div"
                            sx={{
                              // 16:9
                              pt: "56.25%",
                            }}
                            image={card.fields.thumbnail}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="p" component="h2">
                              {card.webTitle}
                            </Typography>
                            <Typography variant="p">
                              {card.fields.trailText}
                            </Typography>
                            <br/>
                            <Typography variant="body2" color="text.secondary">
                              Author: {card.fields.byline}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Published: {fDateTime(card.webPublicationDate)}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button component={Link} size="small" state={card} to={`/news/${card.webPublicationDate}`}>Read</Button>
                            <LikeButton
                              articleId={card.apiUrl}
                              news={card}
                              isLiked={card.isLiked}
                              handleLikeToggle={(isLiked) => {
                                // Update the liked status in news state
                                setData((prevData) =>
                                  prevData.map((item) =>
                                    item.id === card.id ? { ...item, isLiked } : item
                                  )
                                );
                              }}
                            />
                          </CardActions>
                        </Card> */}
                        <Card sx={{ display: 'flex' }}>
                          <CardMedia
                              component="img"
                              sx={{ width: 151 }}
                              image={card.fields.thumbnail}
                              alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                  {card.webTitle}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  {card.fields.trailText}
                                </Typography>
                              </CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                <Button component={Link} size="small" state={card} to={`/news/${card.webPublicationDate}`}>Read More...</Button>
                              </Box>
                            </Box>
                            
                          </Card>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="p">
                              Loading data...
                            </Typography>
                  )}
              </Box>
            </Modal>
          
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button onClick={handleOpen} sx={{ color: '#fff' }}>
                <SearchIcon />
                Search
            </Button>
            {navItems.map((item,i) => (
              <Button href={navUrl[i]} key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
