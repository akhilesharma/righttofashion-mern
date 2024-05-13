import React, { useContext, useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { UserContext } from "../Store/UserContextProvider"
import { useNavigate } from 'react-router-dom';
export default function UpdateProfile() {
    var [user, setuser] = useState({})
    var { getUser, updateUser } = useContext(UserContext)
    var navigate = useNavigate()
    function getData(name, value) {
        setuser((oldData) => {
            return {
                ...oldData,
                [name]: value
            }
        })
    }
    function getFile(name, file) {
        setuser((oldData) => {
            return {
                ...oldData,
                [name]: file
            }
        })
    }
    async function postData() {
        var formData = new FormData()
        formData.append("_id", user._id)
        formData.append("name", user.name)
        formData.append("username", user.username)
        formData.append("phone", user.phone)
        formData.append("email", user.email)
        formData.append("addressline1", user.addressline1)
        formData.append("addressline2", user.addressline2)
        formData.append("addressline3", user.addressline3)
        formData.append("pin", user.pin)
        formData.append("city", user.city)
        formData.append("state", user.state)
        formData.append("pic", user.pic)
        var response = await updateUser(formData)
        if (response.result === "Done") {
            navigate("/profile")
            localStorage.setItem("pic", response.data.pic)
        }
        else
            alert(response.message)
    }
    async function getAPIData() {
        var response = await getUser()
        setuser(response.data)
        console.log(response.data);

    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <Grid container spacing={2}>
            <Grid item md={2} xs={12} >
            </Grid>
            <Grid item md={8} xs={12} >
                <h5 className='background text-light text-center p-2'>Update Profile Section</h5>
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
                            getData(e.target.name, e.target.value)
                        }}
                        id="outlined-name-input"
                        label=""
                        type="text"
                        autoComplete="current-name"
                        placeholder='Enter Name'
                        name="name"
                        value={user.name}
                    />
                    <TextField
                        onChange={(e) => {
                            getData(e.target.name, e.target.value)
                        }}
                        id="outlined-email-input"
                        label=""
                        type="email"
                        autoComplete="current-email"
                        placeholder='Enter Email Id'
                        name="email"
                        value={user.email}
                    />
                    <TextField
                        onChange={(e) => {
                            getData(e.target.name, e.target.value)
                        }}
                        id="outlined-phone-input"
                        label=""
                        type="text"
                        autoComplete="current-phone"
                        placeholder='Enter Phone Number'
                        name="phone"
                        value={user.phone}
                    />
                    <TextField
                        onChange={(e) => {
                            getData(e.target.name, e.target.value)
                        }}
                        id="outlined-addressline1-input"
                        label=""
                        type="text"
                        autoComplete="current-addressline1"
                        placeholder='Enter House Number or Building Number'
                        name="addressline1"
                        value={user.addressline1}
                    />
                    <TextField
                        onChange={(e) => {
                            getData(e.target.name, e.target.value)
                        }}
                        id="outlined-addressline1-input"
                        label=""
                        type="text"
                        autoComplete="current-addressline1"
                        placeholder='Enter Street Number or Near By'
                        name="addressline2"
                        value={user.addressline2}
                    />
                    <TextField
                        onChange={(e) => {
                            getData(e.target.name, e.target.value)
                        }}
                        id="outlined-addressline1-input"
                        label=""
                        type="text"
                        autoComplete="current-addressline1"
                        placeholder='Enter Village or Locality'
                        name="addressline3"
                        value={user.addressline3}
                    />
                    <TextField
                        onChange={(e) => {
                            getData(e.target.name, e.target.value)
                        }}
                        id="outlined-pin-input"
                        label=""
                        type="number"
                        autoComplete="current-pin"
                        placeholder='Enter Pin Number'
                        name="pin"
                        value={user.pin}
                    />
                    <TextField
                        onChange={(e) => {
                            getData(e.target.name, e.target.value)
                        }}
                        id="outlined-city-input"
                        label=""
                        type="text"
                        autoComplete="current-city"
                        placeholder='Enter City Name'
                        name="city"
                        value={user.city}
                    />
                    <TextField
                        onChange={(e) => {
                            getData(e.target.name, e.target.value)
                        }}
                        id="outlined-state-input"
                        label=""
                        type="text"
                        autoComplete="current-state"
                        placeholder='Enter State Number'
                        name="state"
                        value={user.state}
                    />
                    <TextField
                        onChange={(e) => {
                            getFile(e.target.name, e.target.files[0])
                        }}
                        id="outlined-pic-input"
                        label=""
                        type="file"
                        name="pic"
                    />
                    <Button variant="contained" className="background" onClick={postData}>Update</Button>
                </Box>
            </Grid>
            <Grid item md={2} xs={12} >
            </Grid>
        </Grid>
    )
}
