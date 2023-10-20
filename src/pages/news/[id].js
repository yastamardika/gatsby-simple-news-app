import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardMedia from '@mui/material/CardMedia';
import { Link } from "gatsby-theme-material-ui";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Layout from "../../layouts";


const defaultTheme = createTheme();

const NewsDetail = ({ location }) => {
  const { webTitle, fields,webPublicationDate } = location.state;
  return (
    <ThemeProvider theme={defaultTheme}>
    <Layout>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
        <Button component={Link} to="/"><ArrowBackIosIcon/> Back to News List</Button>
          <Card>
            <CardMedia
              component="img"
              alt={webTitle}
              height="600"
              image={fields.thumbnail}
            />
            <CardContent>
              <Typography variant="h4" component="div">
                {webTitle}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Author: {fields.byline}
              </Typography>
              <Typography variant="body1" textAlign={"justify"}>{fields.bodyText}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Published: {new Date(webPublicationDate).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
          <Button component={Link} to="/"><ArrowBackIosIcon/>Back to News List</Button>
        </Container>
      </main>
    </Layout>
  </ThemeProvider>
  );
};

export default NewsDetail;