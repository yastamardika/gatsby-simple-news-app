import * as React from "react";
import { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import FavoriteIcon from '@mui/icons-material/Favorite';

const LikeButton = ({ news, articleId, isLiked, handleLikeToggle }) => {
    const [liked, setLiked] = useState(isLiked);
  
    useEffect(() => {
      // Update local storage when the liked status changes
      localStorage.setItem(articleId, liked);
    }, [articleId, liked]);
  
    return (
      <Button onClick={() => setLiked(!liked)}>
        <FavoriteIcon />
        {liked ? 'Unlike' : `Like` }
      </Button>
    );
  };


export default LikeButton;