import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Link } from "gatsby-theme-material-ui";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../../layouts";


const defaultTheme = createTheme();

const NewsDetail = ({ location }) => {
  console.log(location.state.apiUrl)
  console.log(location.state)
  const { webTitle, fields } = location.state;
  return (
    <ThemeProvider theme={defaultTheme}>
    <Layout>
      <main>
        {/* Hero unit */}
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Card>
            <CardContent>
              <Typography variant="h6">{webTitle}</Typography>
              <Typography variant="body2">{fields.bodyText}</Typography>
              <Button component={Link} to="/">Back to News List</Button>
            </CardContent>
          </Card>
        </Container>
      </main>
    </Layout>
  </ThemeProvider>
  );
};

export default NewsDetail;