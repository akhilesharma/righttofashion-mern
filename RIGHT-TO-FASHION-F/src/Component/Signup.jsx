import React,{useState} from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';

import {useNavigate} from  "react-router-dom"

export default function Signup() {
    let [register, setregister] = useState({
        name: "",
        username: "",
        phone: "",
        email: "",
        password: "",
        cpassword:""
        
    })
    var navigate = useNavigate()
    function getData(name,value) {
        setregister((oldData) => {
            return {
                ...oldData,
                [name]:value
        }
    })
    }
    async function postData() {
        if (register.password === register.cpassword) {
            var item = {
                name:register.name,
                username:register.username,
                email:register.email,
                phone:register.phone,
                password:register.password
            }
            var response = await fetch("/user", {
                method: "post",
                headers: {
                    "content-type":"application/json"
                },
                body:JSON.stringify(item)
            })
            response = await response.json()
            if (response.result === "Done")
                navigate("/login")
            else
                alert(response.message)
        }
    
            
        else
            alert("password and confirm password are not match")
    }
    return (
        <Grid container spacing={2}>
            <Grid item md={2} xs={12}>
            </Grid>
            <Grid item md={8} xs={12}>
               
                    <h5 className='background text-center text-light p-1'>Signup Section</h5>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '98%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                        onChange={(e)=>{
                            getData(e.target.name,e.target.value)
                        }}
                            id="outlined-name-input"
                            label="Name*"
                            type="text"
                            autoComplete="current-name"
                            placeholder='Enter your name'
                            name='name'
                        />
                        <TextField
                        onChange={(e)=>{
                            getData(e.target.name,e.target.value)
                        }}
                            id="outlined-username-input"
                            label="Username*"
                            type="text"
                            autoComplete="current-username"
                            placeholder='Enter your username'
                            name='username'
                        />
                        <TextField
                        onChange={(e)=>{
                            getData(e.target.name,e.target.value)
                        }}
                            id="outlined-phone-input"
                            label="Phone*"
                            type="text"
                            autoComplete="current-phone"
                            placeholder='Enter your phone no'
                            name='phone'
                        />
                        <TextField
                        onChange={(e)=>{
                            getData(e.target.name,e.target.value)
                        }}
                            id="outlined-email-input"
                            label="Email*"
                            type="email"
                            autoComplete="current-email"
                            placeholder='Enter your email'
                            name='email'
                        />
                        <TextField
                        onChange={(e)=>{
                            getData(e.target.name,e.target.value)
                        }}
                            id="outlined-password-input"
                            label="Password*"
                            type="password"
                            autoComplete="current-password"
                            placeholder='Enter your password'
                            name='password'
                        />
                        <TextField
                        onChange={(e)=>{
                            getData(e.target.name,e.target.value)
                        }}
                            id="outlined-cpassword-input"
                            label="Confirm Password*"
                            type="password"
                            autoComplete="current-password"
                            placeholder='Confirm your password'
                            name='cpassword'
                        />
                        <Button variant="contained" className='background' color="success" onClick={postData}>
                            Signup
                        </Button>
                    
                            <Link href="#" color="inherit" underline="none">Forget Password?</Link>
                            <Link href="/login" color="inherit" underline="none">already user? login  your account</Link>
                       
                    </Box>
               
            </Grid>
            <Grid item md={2} xs={12}>
            </Grid>
        </Grid>
    )
}
