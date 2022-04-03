import { Typography } from '@mui/material';

function Header() {
  return (
    <header>
      <Typography variant="h2" align="center">
        {"<flare />"} 
      </Typography>
      <Typography variant="h5" align="center">
        A webcam tuner baked in your browser   
      </Typography>
    </header>
  );
}

export default Header;
