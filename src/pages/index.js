import * as React from "react";
import { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from 'axios';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../layouts";
import { Link } from "gatsby-theme-material-ui";
import LikeButton from "../components/LikeButton";
import PostCard from "../components/Article";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const defaultTheme = createTheme();

export default function HomePage() {

  const [data, setData] = useState([]);

  function fDateTime(rawDate) {
    const formattedDate = new Date(rawDate);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = formattedDate.toLocaleDateString("en-US", options);
    
    return date;
  }

  useEffect(() => {
    const apiUrl = 'https://content.guardianapis.com/search?page-size=15&api-key=deda27a9-4ba6-451f-a8a0-183a2fbeae42&show-fields=all';

    axios.get(apiUrl)
      .then(response => {
        setData(response.data.response.results);
        console.log(response.data.response.results)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    const updatedData = data.map((article) => ({
      ...article,
      isLiked: localStorage.getItem(`${article.apiUrl}`) === 'true',
    }));

    setData(updatedData);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Layout>
        <main>
          <Box 
            sx={{
              minHeight: "100vh",
              minWidth: "100%",
              width:1,
              pt: 8,
      
              display: "grid",
              gridTemplateColumns: "100%",
              gap: { zero: 3, sm: 10 },
            }}>
     
            <Grid container spacing={2}>
            { data ? (
              data.map((card, index) => (
                <Grid item key={card.id} xs={12} sm={6} md={4} l={12} xl={6}>
                  <Card
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
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="p">
                        Loading data...
                      </Typography>
              // <p sx= {{
              //   height: "100%",
              //   display: "flex",
              //   flexDirection: "column",
              // }} >Loading data...</p>
            )}
            </Grid>
          </Box>
        </main>
      </Layout>
    </ThemeProvider>
  );
}
