import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as Lien, Navigate } from 'react-router-dom'
import api from "../../../utils/api"

const theme = createTheme();

export default function SignUp() {
  const [errPass, seterrPass] = React.useState<String | null>(null)
  const [isErrorEmail, setIsErrorEmail] = React.useState<String | null>(null)
  const [responseBddStatus,setResponseBddStatus]= React.useState<Number>(404);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const body = {
      email: data.get('email'),
      password: data.get('password')
    }

    if(!String(data.get('email')).length) {      
      setIsErrorEmail('Your email is invalid or empty!')
      return false
    } else {
      setIsErrorEmail(null)
    }

    if(data.get('password') !== data.get('confirm-password')) {
      seterrPass('the password doesn\'t match !')
      return false
    } else {
      seterrPass(null)
    }

    try {
      const axiosResponse = await api.post("/users/auth/register", body)
      
      console.log(axiosResponse.data);
      console.log(axiosResponse.status);
      setResponseBddStatus(axiosResponse.status)
      
      
      if(axiosResponse.status === 201){
        setResponseBddStatus(201);
      }else{
        console.log("save data doesnt work");
      }
      
      
      
    } catch (err) {
      console.error(err)
    }
  }

  
  if(responseBddStatus===201){
    return <Navigate to='/'/>
  }
 

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={isErrorEmail ? true : false}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={isErrorEmail ? isErrorEmail : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errPass ? true : false}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errPass ? true : false}
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm your password"
                  type="password"
                  id="confirm-password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Lien to="/login">
                  <Link  variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Lien>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
