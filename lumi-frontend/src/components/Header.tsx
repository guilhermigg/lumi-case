import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function Header({title}: {title: string}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          <Box sx={{padding: 1}}>
            <img src="https://uploads-ssl.webflow.com/62f9249c43126cafce10bc33/62fd12497ffcb83b28ea3309_logo-lumi-white.svg" width={110} />
          </Box>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button sx={{ color: '#fff' }}>
                <Link to="/dashboard" style={{color: 'white', textDecoration: 'none', textDecorationColor: 'white'}}>
                  Dashboard
                </Link>
              </Button>

              <Button sx={{ color: '#fff' }}>
                <Link to="/library" style={{color: 'white', textDecoration: 'none', textDecorationColor: 'white'}}>
                  Faturas
                </Link>
              </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/dashboard"> Dashboard </Link>
          </Typography>

          <Typography variant="h6">
            <Link to="/dashboard"> Dashboard </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );

}
