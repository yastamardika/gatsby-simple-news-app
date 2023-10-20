import * as React from "react";
import { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import FavoriteIcon from '@mui/icons-material/Favorite';

const LikeButton = ({ news, articleId, isLiked, handleLikeToggle }) => {
    const [liked, setLiked] = useState(isLiked);
    
    const likeArticle = (news) => {

      // const allNews = localStorage.getItem("article");
      // console.log(allNews)
      const existingArticles = JSON.parse(localStorage.getItem("article")) || [];
      
      const findArticle = existingArticles.find((article => article.id == news.id ));
      console.log(findArticle)
      if (!findArticle){
        existingArticles.push(news);
  
        localStorage.setItem("article", JSON.stringify(existingArticles));
        setLiked(!liked)
      }else{
        const deletedTask = existingArticles.filter((article) => article.id !== news.id);
        localStorage.setItem("article", JSON.stringify(deletedTask));
        setLiked(!liked)
      }
    }

    return (
      <Button 
        // onClick={likeArticle(news)}
        onClick = { () => likeArticle(news)}
      >
        <FavoriteIcon />
        {liked ? 'Unlike' : `Like` }
      </Button>
    );
  };


export default LikeButton;