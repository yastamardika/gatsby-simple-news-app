import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../layouts';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
export default function AboutPage() {
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      
      <Layout>  
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography variant="h2" align="center" gutterBottom>
                Welcome to Newsify: Your Personal News Companion 🌟📰
              </Typography>

              <Typography variant="body1">
                📱 Welcome to Newsify, your passport to the world of news! With Newsify, staying informed has never been this easy, enjoyable, and interactive. 🗞️
              </Typography>

              <Typography variant="h4" gutterBottom>
                Why Choose Newsify?
              </Typography>

              <List>
                <ListItem>
                  <ListItemText
                    primary="Explore the World, One Tap at a Time 🌎📲"
                    secondary="Get the latest news from around the globe delivered to your device. Whether you're interested in world affairs, tech trends, or entertainment gossip, we've got you covered."
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Interactive and User-Friendly Design 🎮👍"
                    secondary="Swipe, tap, and explore with ease. Our intuitive design ensures you have a seamless reading experience. Swipe down to refresh, tap to read more, and use emojis to express your reactions."
                  />
                </ListItem>
                {/* Add more list items as needed */}
              </List>

              <Typography variant="body1" gutterBottom>
                Are you ready to dive into the world of information, excitement, and exploration? Download Newsify now and embark on a journey to stay informed, entertained, and engaged. Your news adventure starts here! 🚀📱📰
              </Typography>

            </Container>
          </Box>
        </main>
      </Layout>
      
    </ThemeProvider>
  );
}