import React, {useState} from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import InputAdornment from '@mui/material/InputAdornment';
import InfoIcon from '@mui/icons-material/Info';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import {State} from 'country-state-city';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Axios from "axios";
import "./style.css"

function Form() {
  const canadaProvince = [];
  State.getStatesOfCountry("CA").forEach((state, index)=>{
    canadaProvince.push(state.name)
  })
  const usProvince = [];
  State.getStatesOfCountry("US").forEach((state, index)=>{
    usProvince.push(state.name)
  })

  const mobile = useMediaQuery('(max-width:767px)');
  const tablet = useMediaQuery('(max-width:1025px)');

  const [dialogOpen, setDialogOpen] = useState(false);

  const [firstName, setFirstName] = useState("")
  const [firstNameError, setFirstNameError] = useState(false)

  const [lastName, setLastName] = useState("")
  const [lastNameError, setLastNameError] = useState(false)

  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(false)

  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState("")
  const [phoneNumberError, setPhoneNumberError] = useState(false)

  const [address, setAddress] = useState("")
  const [addressError, setAddressError] = useState(false)

  const [city, setCity] = useState("")
  const [cityError, setCityError] = useState(false)

  const [province, setProvince] = useState("")
  const [provinceError, setProvinceError] = useState(false)

  const [country, setCountry] = useState("")
  const [countryError, setCountryError] = useState(false)

  function nameHandler(event) {
    const regex = /^[a-zA-Z]+$/;

    if(event.target.name === "firstName") {
      setFirstName(event.target.value);
      if(!regex.test(event.target.value)) {
        setFirstNameError(true);
      } else {
        setFirstNameError(false);
      }
    } else if (event.target.name === "lastName") {
      setLastName(event.target.value);
      if(!regex.test(event.target.value)) {
        setLastNameError(true);
      } else {
        setLastNameError(false);
      }
    }
  }

  function emailHandler(event) {
    setEmail(event.target.value);
    const regex = /^[\w-.]+@([\w-]+\.)+[\w]{2,3}$/;
    if(!regex.test(event.target.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }

  function passwordHandler(event) {
    setPassword(event.target.value);
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if(!regex.test(event.target.value)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }
  
  function openPasswordInfo(event) {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  function closePasswordInfo() {
    setAnchorEl(null)
    setOpen(false)
  }

  function phoneNumberHandler(event) {
    setPhoneNumber(event.target.value)
    const regex = /^\d{10}$/;
    if(!regex.test(event.target.value)) {
      setPhoneNumberError(true);
    } else {
      setPhoneNumberError(false);
    }
  }

  function addressHandler(event) {
    setAddress(event.target.value);
    const regex = /^\w[\w\&\.\#\-\,\s]*$/;
    if(!regex.test(event.target.value)) {
      setAddressError(true);
    } else {
      setAddressError(false);
    }
  }

  function cityHandler(event) {
    setCity(event.target.value);
    const regex = /^[a-zA-Z][a-zA-Z\s]*$/;
    if(!regex.test(event.target.value)) {
      setCityError(true);
    } else {
      setCityError(false);
    }
  }

  function provinceHandler(event) {
    setProvince(event.target.value)
    setProvinceError(false)
    if(canadaProvince.includes(event.target.value)) {
      setCountry("Canada");
    } else if (usProvince.includes(event.target.value)) {
      setCountry("USA");
    }
    setCountryError(false);
  }

  function provinceOnClick(event) {
    if(event.target.type === undefined && province === "") {
      setProvinceError(true)
    } else {
      setProvinceError(false)
    }
  }

  function countryHandler(event) {
    setCountry(event.target.value);
    setCountryError(false)
  }

  function countryOnClick(event) {
    if(event.target.type === undefined && country === "") {
      setCountryError(true)
    } else {
      setCountryError(false)
    }
  }

  function handleDialogOpen() {
    setDialogOpen(true);
  };

  function handleDialogClose() {
    setDialogOpen(false);
  };

  function submitAccount(event) {
    event.preventDefault();

    var empty = false;
    if(firstName === "") {
      setFirstNameError(true);
      empty = true;
    }
    if(lastName === "") {
      setLastNameError(true);
      empty = true;
    }
    if(email === "") {
      setEmailError(true);
      empty = true;
    }
    if(password === "") {
      setPasswordError(true);
      empty = true;
    }
    if(phoneNumber === "") {
      setPhoneNumberError(true);
      empty = true;
    }
    if(address === "") {
      setAddressError(true);
      empty = true;
    }
    if(city === "") {
      setCityError(true);
      empty = true;
    }
    if(province === "") {
      setProvinceError(true);
      empty = true;
    }
    if(country === "") {
      setCountryError(true);
      empty = true;
    }

    const error = firstNameError || lastNameError || emailError || passwordError || phoneNumberError || cityError || provinceError || countryError;

    if(!error && !empty) {
      Axios.post("http://localhost:8000/user", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
        city: city,
        province: province,
        country: country
      }).then((response) => {
        //get response from backend, if no error show success message
        const res = response.data
        if(!res.error) {
          handleDialogOpen()
        }
      })
    } 
  }

  return (
    <Box className="container">
      <form onSubmit={submitAccount} noValidate>
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
        >
          <DialogTitle>
            {"Congratulation!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your account has been successfully created
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} autoFocus>
              Login
            </Button>
          </DialogActions>
        </Dialog>

        <Typography
            sx={{
              fontWeight: "700",
              fontSize: "2rem",
              textAlign: "center",
              marginTop: "20px"
            }}
          >
            Register Account
        </Typography>

        <Divider
          sx={{
            margin: "20px"
          }}
        /> 

        <Box className="formContainer"
        >
          <TextField
            required
            name="firstName"
            variant="outlined"
            label="First Name"
            size="small"
            sx={{
              gridColumn: mobile ? "span 12" : "span 6"
            }}
            inputProps= {{ maxLength: 255 }}
            onChange={nameHandler}
            onBlur={nameHandler}
            error={firstNameError}
            helperText={firstNameError ? "Please enter a valid first name" : " "}
          />
          <TextField
            required
            name="lastName"
            variant="outlined"
            label="Last Name"
            size="small"
            sx={{
              gridColumn: mobile ? "span 12" : "span 6"
            }}
            inputProps= {{ maxLength: 255 }}
            onChange={nameHandler}
            onBlur={nameHandler}
            error={lastNameError}
            helperText={lastNameError ? "Please enter a valid last name" : " "}
          />
          <TextField
            required
            variant="outlined"
            label="Email"
            size="small"
            sx={{
              gridColumn: tablet ? "span 12" : "span 5"
            }}
            inputProps= {{ maxLength: 320 }}
            onChange={emailHandler}
            onBlur={emailHandler}
            error={emailError}
            helperText={emailError ? "Please enter a valid email" : " "}
          />
          <TextField
            required
            variant="outlined"
            label="Password"
            type="password"
            size="small"
            sx={{
              gridColumn: mobile ? "span 12" : tablet ? "span 6" : "span 4"
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <InfoIcon onClick={openPasswordInfo} />
              </InputAdornment>,
              inputProps: { maxLength: 16 }
            }}
            onChange={passwordHandler}
            onBlur={passwordHandler}
            error={passwordError}
            helperText={passwordError ? "Please enter a valid password" : " "}
          />
          <Popover variant="contained"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={open}
            anchorEl={anchorEl}
            onClose={closePasswordInfo}
            slotProps={{
              paper: {
                sx: {
                  width: mobile ? "40%" : "20%",
                  marginLeft: "10px"
                }
              }
            }}
          >
            <Typography sx={{ p: 1, fontSize: "0.7rem" }}>Password should be 8-16 characters and consist of at least 1 lowercase, 1 uppercase, 1 symbol, and 1 number</Typography>
          </Popover>
          <TextField
            required
            type="number"
            variant="outlined"
            label="Phone Number"
            size="small"
            sx={{
              gridColumn: mobile ? "span 12" : tablet ? "span 6" : "span 3"
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">+1</InputAdornment>,
              inputProps: { maxLength: 10 }
            }}
            onChange={phoneNumberHandler}
            onBlur={phoneNumberHandler}
            error={phoneNumberError}
            helperText={phoneNumberError ? "Please enter a valid phone number" : " "}
          />
          <TextField
            required
            variant="outlined"
            label="Address"
            size="small"
            sx={{
              gridColumn: "span 12"
            }}
            onChange={addressHandler}
            onBlur={addressHandler}
            error={addressError}
            helperText={addressError ? "Please enter a valid address" : " "}
          />
          <TextField
            required
            variant="outlined"
            label="City"
            size="small"
            sx={{
              gridColumn: tablet ? "span 12" : "span 4"
            }}
            onChange={cityHandler}
            onBlur={cityHandler}
            error={cityError}
            helperText={cityError ? "Please enter a valid city" : " "}
          />
          <FormControl
            required
            size="small"
            sx={{
              gridColumn: mobile ? "span 12" : tablet ? "span 6" : "span 4"
            }}
            
          >
            <InputLabel error={provinceError}>Province</InputLabel>
            <Select 
              error={provinceError}
              defaultValue="" 
              label="Province"
              onChange={provinceHandler}
              onClick={provinceOnClick}
              displayEmpty={false}
              MenuProps={{
                anchorOrigin: {
                  vertical: mobile ? "center" : "bottom",
                  horizontal: mobile ? "center" :"left"
                },
                transformOrigin: {
                  vertical: mobile ? "center" : "top",
                  horizontal: mobile ? "center" : "left"
                },
                sx: {
                  height: mobile ? "100%" : "50%"
                }
              }}
            >
              <ListSubheader
                sx={{
                  color: "rgba(0, 0, 0)",
                  fontWeight: "800",
                  fontSize: "1rem"
                }}
              >Canada
              </ListSubheader>
                {
                  canadaProvince.map((state, index)=>{
                    return(
                      <MenuItem key={index} value={state}>{state}</MenuItem>
                    );
                  })
                }
                <ListSubheader
                  sx={{
                    color: "rgba(0, 0, 0)",
                    fontWeight: "800",
                    fontSize: "1rem"
                  }}
                >USA
                </ListSubheader>
                {
                  usProvince.map((state, index)=>{
                    return(
                      <MenuItem key={index} value={state}>{state}</MenuItem>
                    );
                  })
                }
            </Select>
            <FormHelperText 
              error={provinceError}
            >
              {provinceError ? "Please select a province" : " "}
            </FormHelperText>
          </FormControl>
          <FormControl
            required
            error={countryError}
            size="small"
            sx={{
              gridColumn: mobile ? "span 12" : tablet ? "span 6" : "span 4"
            }}
          >
            <InputLabel>Country</InputLabel>
            <Select
              label="Country"
              defaultValue={""}
              value={country}
              error={countryError}
              onChange={countryHandler}
              onClick={countryOnClick}
            >
              <MenuItem value="Canada" disabled={country === "USA" && province !== ""}>Canada</MenuItem>
              <MenuItem value="USA" disabled={country === "Canada" && province !== ""}>USA</MenuItem>
            </Select>
            <FormHelperText 
              error={countryError}
            >
              {countryError ? "Please select a country" : " "}
            </FormHelperText>
          </FormControl>
        </Box>
        <Divider
          sx={{
            margin: "0px 20px 20px 20px"
          }}
        />
        <Box className="buttonContainer">
          <Button 
            variant="contained" 
            color="success"
            type="submit"
            sx={{
              textTransform: "capitalize",
              fontWeight: "550",
            }}
          >
            Submit
          </Button>
        </Box> 
      </form>
    </Box>
  );
}

export default Form;