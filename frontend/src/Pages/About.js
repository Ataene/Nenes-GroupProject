import React from 'react';
import { Button, Card, CardActions, CardMedia, Typography, CardContent, Grid } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import images1 from "../images/Alaf.jpg";
import images2 from "../images/Nicole.jpg";
import images3 from "../images/Sam.jpg";
import images4 from "../images/Neetha.png";
import { Container } from '@mui/system';

const About = () => {

  const teamNames = [{
    id: 1,
    image: images1,
    name: "Emmanuel Alafonye",
    profession: "Software & Petroleum Engineer",
    github: "https://github.com/Ataene",
    linkedIn: "https://www.linkedin.com/in/alafonye-emmanuel/"
  },
  {
    id: 2,
    image: images2,
    name: "Nicole Dubois",
    profession: "Software Engineer & Nurse",
    github: "https://github.com/nicoleamdubois",
    linkedIn: "https://www.linkedin.com/in/nicole-dubois-37b631219/"
  },
  {
    id: 3,
    image: images3,
    name: "Samuel Ojagbohunmi",
    profession: "Software & MBA",
    github: "https://github.com/samm40me",
    linkedIn: "https://linkedin.com/SamuelOjagbohunmi"
  },
  {
    id: 4,
    image: images4,
    name: "Neetha Pappala",
    profession: "Software & Technologist",
    github: "https://github.com/snjcoder",
    linkedIn: "https://www.linkedin.com/in/neetha-pappala/"
  }
]
  return (
    <>
      <div style={{backgroundColor: "#fafafa"}}>
        <Typography variant="h4" sx={{ textAlign: "center", alignItem: 'center', marginTop: "50px"}}>About Hundie</Typography> 
        <Typography variant="h4" sx={{ textAlign: "center", alignItem: 'center', marginTop: "100px"}}>Meet the Team</Typography>
        <Container >
          <Typography variant="h6" sx={{ alignItem: 'center'}}>
          lorem ipsum dolor sit amet, consectetur adipiscing elit, incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. 
          </Typography>
        </Container>
      <Grid container sx={{ justifyContent: "center"}}>
          <Grid item sx={{justifyContent: "center", display: "flex"}}>
          {teamNames.map((names) => (
          <Card sx={{ maxWidth: 345, height: "25rem", marginTop: "20px", margin: "15px" }}  key={names.id}>
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
            <Button size="small" onClick={() => (names.github)}><GitHubIcon /></Button>
            <Button size="small" onClick={names.github}><LinkedInIcon /></Button>
          </CardActions>
          </Card>
          ))}
          </Grid>
      </Grid>
      </div>
    </>
  )
}

export default About;