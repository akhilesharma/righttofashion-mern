import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';


import { useNavigate } from 'react-router-dom';
export default function ForgetOTP() {
    let [otp, setotp] = useState(0)
    var navigate = useNavigate()
    function getData(value) {
        setotp(value)
    }
    async function postData() {
        var item = {
            otp: parseInt(otp),
            username: localStorage.getItem("resetuser")
        }
        var response = await fetch("/reset-password-otp", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        })
        response = await response.json()
        if (response.result === "Done") {
            localStorage.setItem("otp", otp)
            navigate("/forget-password")
        }
        else
            alert(response.message)
    }
    return (
        <Grid container spacing={2}>
            <Grid item md={2} xs={12} >
            </Grid>
            <Grid item md={8} xs={12} >
                <h5 className='background text-light text-center p-2'>Forget Password Section</h5>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '98%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        onChange={(e) => {
                            getData(e.target.value)
                        }}
                        id="outlined-Username-input"
                        label="OTP*"
                        type="number"
                        autoComplete="otp"
                        placeholder='Enter OTP which is Sent On Your Registered Email ID'
                        name="otp"
                    />
                    <Button variant="contained" className="background" onClick={postData}>Send OTP</Button>
                </Box>
            </Grid>
            <Grid item md={2} xs={12} >
            </Grid>
        </Grid>
    )
}
