import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Typography,
  CardContent,
  Grid,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import images1 from "../images/Alaf.jpg";
import images2 from "../images/Nicole.jpg";
import images3 from "../images/Sam.jpg";
import images4 from "../images/Neetha.png";
import images5 from "../images/Eva.jpg";
import { Container } from "@mui/system";

const About = () => {
  const teamNames = [
    {
      id: 1,
      image: images1,
      name: "Emmanuel Alafonye",
      profession: "Software & Petroleum Engineer",
      github: "https://github.com/Ataene",
      linkedIn: "https://www.linkedin.com/in/alafonye-emmanuel/",
    },
    {
      id: 2,
      image: images2,
      name: "Nicole Dubois",
      profession: "Software Engineer & Nurse",
      github: "https://github.com/nicoleamdubois",
      linkedIn: "https://www.linkedin.com/in/nicole-dubois-37b631219/",
    },
    {
      id: 3,
      image: images3,
      name: "Samuel Ojagbohunmi",
      profession: "Software & MBA",
      github: "https://github.com/samm40me",
      linkedIn: "https://linkedin.com/SamuelOjagbohunmi",
    },
    {
      id: 4,
      image: images4,
      name: "Neetha Pappala",
      profession: "Software & Electronics Engineer",
      github: "https://github.com/snjcoder",
      linkedIn: "https://www.linkedin.com/in/neetha-pappala/",
    },
  ];
  return (
    <Container style={{ backgroundColor: "#fafafa" }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          alignItem: "center",
          marginTop: "50px",
          marginBottom: "30px",
          fontFamily: "Montserrat",
        }}
      >
        About Hundie
      </Typography>
      <Container>
        <Typography
          variant="h6"
          sx={{ alignItem: "center", fontFamily: "Montserrat" }}
        >
          The Hundie App grew from our Scrum Master/Product owner Eva's lived
          experience. Eva, along with her family, live in beautiful rural
          Alberta. Eva shared a common experience when living in a rural
          community: trading goods and services for other goods and services.
          Her idea is what became the vision for the Hundie App and helped guide
          the development.
        </Typography>
      </Container>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          alignItem: "center",
          marginTop: "30px",
          marginBottom: "30px",
          fontFamily: "Montserrat",
        }}
      >
        Scrum Master
      </Typography>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            maxWidth: 345,
            height: "30rem",
            marginTop: "20px",
            margin: "15px",
          }}
        >
          <CardMedia
            component="img"
            alt="Team Images"
            height="250"
            image={images5}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Eva Lapp
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Software Engineer
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <GitHubIcon />
            </Button>
            <Button size="small">
              <LinkedInIcon />
            </Button>
          </CardActions>
        </Card>
      </Container>
      <Container>
        <Typography
          variant="h6"
          sx={{ alignItem: "center", fontFamily: "Montserrat" }}
        >
          The idea is simple, trade to have goods and services you need for
          stuff you don't! In the Hundie App, you will find a streamlined
          experience from sign up to meeting a "trader". Ad matching is quick
          and simple! You enter your Postal Code, add 3 items to your wishlist
          and begin seeing potential trades near you! Once you find your trade,
          send a message to set up meeting details, meet and complete your first
          trade. We hope you enjoy trading in our App, Cheers!
        </Typography>
      </Container>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          alignItem: "center",
          marginTop: "100px",
          marginBottom: "10px",
          fontFamily: "Montserrat",
        }}
      >
        Meet the Team
      </Typography>
      <Grid container sx={{ justifyContent: "center", display: "flex" }}>
        <Grid
          item
          sx={{ justifyContent: "center", display: "flex", flexWrap: "wrap" }}
        >
          {teamNames.map((names) => (
            <Card
              sx={{
                maxWidth: "345px",
                // height: "30rem",
                marginTop: "20px",
                margin: "15px",
              }}
              key={names.id}
            >
              <CardMedia
                component="img"
                alt="Team Images"
                height="250"
                image={names.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {names.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {names.profession}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => names.github}>
                  <GitHubIcon />
                </Button>
                <Button size="small" onClick={names.github}>
                  <LinkedInIcon />
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
