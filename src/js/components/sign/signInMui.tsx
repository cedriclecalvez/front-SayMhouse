import * as React from "react";
// import { useSelector, useDispatch } from 'react-redux'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as Lien, Navigate } from "react-router-dom";
import api from "../../../utils/api";
// import LOGIN_SUCCESS from '../../..store/types'
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";

import "./SignIn.css";
import { Alert } from "@mui/material";
import {useDispatch} from "react-redux"
import { login } from "../../../store/user.reducer";
const theme = createTheme();

export default function SignInMui() {
  // const dispatch = useDispatch()
  const [errPass, seterrPass] = React.useState<String | null>(null);
  const [isErrorEmail, setIsErrorEmail] = React.useState<String | null>(null);
  const [responseBddStatus, setResponseBddStatus] =
    React.useState<Number | null>(null);
  const [alert, setAlert] = React.useState(false);
  const [alertContent, setAlertContent] = React.useState("");

  const dispatch = useDispatch()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const body = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (!String(data.get("email")).length) {
      setIsErrorEmail("Your email is invalid or empty!");
      return false;
    } else {
      setIsErrorEmail(null);
    }

    if (!String(data.get("password")).length) {
      seterrPass("Your password is empty !");
      return false;
    } else {
      seterrPass(null);
    }

    try {
      const axiosResponse = await api.post("/user/auth/login", body);

      console.log(axiosResponse.data);
      console.log("statuslog", axiosResponse.status);

      console.log("axiosResponse.headers.authorization===>",axiosResponse.headers.authorization.substring(7, axiosResponse.headers.authorization.length));
      const user: any = axiosResponse.headers.authorization.substring(7, axiosResponse.headers.authorization.length)

      setResponseBddStatus(axiosResponse.status); 
      dispatch(login(user))
    } catch (err: any) {
      console.error(err.response.data);
      setAlertContent(err.response.data.message);
      setAlert(true);
    }
  };

  if (responseBddStatus === 200) {
    return <Navigate to="/HomePage" />
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        
        <Container component="main" maxWidth="xs"  >
          <CssBaseline />
          {alert && <Alert severity="error">{alertContent}</Alert>}

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              className="login__img"
              src="https://scalebranding.com/wp-content/uploads/2021/08/Chat-House-Logo.jpg"
              alt=""
            />
            {/* <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <MapsHomeWorkOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              Se connecter à SayMhouse
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                error={isErrorEmail ? true : false}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse mail"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={isErrorEmail ? isErrorEmail : null}
              />
              <TextField
                error={errPass ? true : false}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={errPass ? errPass : null}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Se connecter
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                <Lien  to="/register">
                  <Link variant="body2">
                    {"Je n'ai pas de compte ? Inscription"}
                  </Link>
                </Lien>
              </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}
