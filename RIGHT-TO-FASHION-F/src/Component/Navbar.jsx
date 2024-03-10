import React, { useContext, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import "../Asset/Css/Style.css"
import { Link, useNavigate } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { UserContext } from '../Store/UserContextProvider';
const settings = ['Profile', 'Cart', 'Logout', 'LogoutFromAll'];
const Navbar = () => {
    const [pages, setpages] = useState(['Home', 'Shop', 'Contact'])
    var [search, setsearch] = useState("None")
    const navigate = useNavigate()
    const [user, setuser] = useState()
    var { getUser } = useContext(UserContext)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    async function logout() {
        var item = {
            username: localStorage.getItem("username"),
            token: localStorage.getItem("token")
        }
        var response = await fetch("/logout", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        })
        response = await response.json()
        if (response.result === "Done") {
            localStorage.clear()
            {
                navigate("/login")
                setpages(['Home', 'Shop', 'Contact'])
            }
        }
        else
            alert(response.message)
    }
    async function logoutAll() {
        var item = {
            username: localStorage.getItem("username"),
            token: localStorage.getItem("token")
        }
        var response = await fetch("/logoutAll", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        })
        response = await response.json()
        if (response.result === "Done") {
            localStorage.clear()
            {
                navigate("/login")
                setpages(['Home', 'Shop', 'Contact'])
            }
        }
        else
            alert(response.message)

    }
    async function getAPIData() {
        let response = await getUser()
        setuser(response.data)
        if (response.data.role === "Admin")
            setpages(['Home', 'Shop', 'Contact', 'Admin'])

    }
    let puc = localStorage.getItem("pic")
    useEffect(() => {
        getAPIData()
    }, [puc])

    async function postData(e) {
        e.preventDefault()
        navigate(`/shop/All/All/All/${search}`)
    }
    return (
        <>
            <AppBar className='background sticky-top'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            style={{ color: "white", textDecoration: "none" }}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            RightToFashion
                        </Typography>


                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton

                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
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
                                        <Typography

                                            component={Link}
                                            style={{ color: "black", textDecoration: "none" }}
                                            to={page === "Home" ? "/" : page === "Shop" ? "/shop/All/All/All/None" : `/${page}`}

                                            textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Typography
                            variant="h5"
                            noWrap
                            component={Link}
                            style={{ color: "white", textDecoration: "none" }}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,

                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            RTFashion
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button

                                    key={page}
                                    component={Link}
                                    style={{ color: "white", textDecoration: "none" }}
                                    to={page === "Home" ? "/" : page === "Shop" ? "/shop/All/All/All/None" : `/${page}`}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <form className='d-flex' role="search" onSubmit={postData} style={{ width: "40%" }} >
                            <input className='form-control me-2 ' name="search" type="search" placeholder='Search' area-label="Search" style={{ width: "40%", margin: "auto" }} onChange={(e) => setsearch(e.target.value)} />
                            <button className='btn btn-outline-light' type='submit' style={{ marginRight: "8px" }}>  <SearchIcon /></button>
                        </form>
                        {
                            localStorage.getItem("login") ?
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="User" src={user?.pic ? `/public/images/${user?.pic}` : ""} />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu

                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleCloseUserMenu}>

                                                <Button
                                                    style={{ color: "black", textDecoration: "none" }}
                                                    onClick={() => {
                                                        if (setting === "Logout") {
                                                            logout()
                                                        }
                                                        if (setting === "LogoutFromAll") {
                                                            logoutAll()
                                                        }
                                                        else
                                                            navigate(`/${setting}`)
                                                    }}>
                                                    {
                                                        setting === "Cart" ? <div>
                                                            <ShoppingBagIcon />Cart
                                                        </div> : setting
                                                    }
                                                </Button>



                                            </MenuItem>

                                        ))}
                                    </Menu>
                                </Box>
                                : <Link to="/Login" color="inherit" className='text-decoration-none text-light'>Login</Link>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            <br />
            <br />
            <br />

        </>
    );
};
export default Navbar;
