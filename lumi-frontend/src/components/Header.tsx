import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header({title}: {title: string}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src="https://uploads-ssl.webflow.com/62f9249c43126cafce10bc33/62fd12497ffcb83b28ea3309_logo-lumi-white.svg"></img>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Case
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
