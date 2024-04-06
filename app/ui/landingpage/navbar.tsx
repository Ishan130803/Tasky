'use client';
import React,{useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';

const pages = ['Products', 'Pricing', 'Blog'];

function Appbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event:React.MouseEvent<HTMLElement, MouseEvent>) => {
    let target  = event.currentTarget;
    setAnchorElNav(target);
  };
  

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  

  return (
    <>
    <Box className='w-[80vw] mx-auto py-6 relative' >
    <AppBar position="static" className=' min-w-min rounded-full w-full' sx={{backgroundColor:'#f0f7ff'}} >
      <Container  className='bg-[#f0f7ff] text-black rounded-full w-full' >
        <Toolbar disableGutters>
          <AdbIcon className='text-black' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color:'inherit',
              textDecoration: 'none',
            }}
          >
            Tasky
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}

              <MenuItem key={'SignIn'}>
                <Link href={'/login'}>
                  <Typography textAlign="center">Sign In</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Tasky
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'inherit', display: 'block' }}

              >
                <span className='hover:underline-offset-2 hover:underline hover:decoration-black'>{page}</span>
              </Button>
            ))}
          </Box>
					
						<Button variant='contained' onClick={()=>{

						}}
              sx={{
                display:{xs:'none',md:'block'}
              }}
            >
              <Link href='/login'>
  							<span className='block'>Sign in</span>

              </Link>
						</Button>
          
					
        </Toolbar>
      </Container>
    </AppBar>

    </Box>
    </>
  );
}
export default Appbar;
