import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ListItems from './ListItems';
import AppBar from '@mui/material/AppBar';
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  root:{
      display:'flex',
      justifyContent:'center',
      alignItem:'center',
  }
})


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        BestGoods All rights reserved to Numeric Infosystems Pvt Ltd.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function DashboardContent() {
  const classes = useStyles();
  const [view, setView] = React.useState("");
  const setComponent=(component)=>{
    setView(component)
  }

  return (
      <Box className={classes.root}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Administrator Dashboard
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <Grid container space={1}>
        <Grid item xs={2}>
          <ListItems setComponent={setComponent}/>
          </Grid>
          <Grid item xs={10}>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {view}
          </Container>
          </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
  );
}

export default function Dashboard(props) {
  return <DashboardContent />;
}