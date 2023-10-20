import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
export default function SavedArticles() {
    const [newsData, setNewsData] = useState([]);
    const data = JSON.parse(localStorage.getItem("article"));
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
                <Container spacing={2} maxWidth="sm">
                { data ? (
                data.map((card, index) => (
                    <Grid item key={card.id} xs={12} sm={6} md={4} l={6} xl={6}>
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
                            {/* Published: {fDateTime(card.webPublicationDate)} */}
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
                                setNewsData((prevData) =>
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
                <Typography variant="p" textAlign={'center'} alignItems={'center'}
                    sx={{
                    height: "100%",
                    display: "flex",
                    textAlign: "center",
                    flexDirection: "column",
                    }}>
                            You haven't liked any news yet! 
                </Typography>
                )}
                </Container>
            </Box>
            </main>
        </Layout>
        
        </ThemeProvider>
    );
}