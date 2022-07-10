import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as Lien, Navigate } from "react-router-dom";
import api from "../../utils/api";
import "./SignUp.css";

const theme = createTheme();

export default function SignUp() {
  const [errPass, seterrPass] = React.useState<String | null>(null);
  const [isErrorEmail, setIsErrorEmail] = React.useState<String | null>(null);
  const [isErrorFirstname, setIsErrorFirstname] = React.useState<String | null>(
    null
  );
  const [isErrorLastname, setIsErrorLastname] = React.useState<String | null>(
    null
  );
  const [isErrorAddress, setIsErrorAddress] = React.useState<String | null>(
    null
  );
  const [responseBddStatus, setResponseBddStatus] = React.useState<Number>(404);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const body = {
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      address: data.get("address"),
      email: data.get("email"),
      password: data.get("password"),
    };

    if (!String(data.get("firstname")).length) {
      setIsErrorFirstname("Your firstname is invalid or empty!");
      return false;
    } else {
      setIsErrorFirstname(null);
    }
    if (!String(data.get("lastname")).length) {
      setIsErrorLastname("Your lastname is invalid or empty!");
      return false;
    } else {
      setIsErrorLastname(null);
    }
    if (!String(data.get("address")).length) {
      setIsErrorAddress("Your address is invalid or empty!");
      return false;
    } else {
      setIsErrorAddress(null);
    }

    if (!String(data.get("email")).length) {
      setIsErrorEmail("Your email is invalid or empty!");
      return false;
    } else {
      setIsErrorEmail(null);
    }

    if (data.get("password") !== data.get("confirm-password")) {
      seterrPass("the password doesn't match !");
      return false;
    } else {
      seterrPass(null);
    }

    try {
      const axiosResponse = await api.post("/user/auth/register", body);

      console.log(axiosResponse.data);
      console.log(axiosResponse.status);
      setResponseBddStatus(axiosResponse.status);

      if (axiosResponse.status === 201) {
        setResponseBddStatus(201);
      } else {
        console.log("save data doesnt work");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (responseBddStatus === 201) {
    return <Navigate to="/homePage" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={6} md={4}>
          <img
            className="register__img"
            src="https://scalebranding.com/wp-content/uploads/2021/08/Chat-House-Logo.jpg"
            alt=""
          />
        </Grid>

        <Grid item xs={10} sm={5}>
          <CssBaseline />

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              S'inscrire
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={isErrorFirstname ? true : false}
                  required
                  fullWidth
                  id="firstname"
                  label="Prénom"
                  name="firstname"
                  autoComplete="firstname"
                  helperText={isErrorFirstname ? isErrorFirstname : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={isErrorLastname ? true : false}
                  required
                  fullWidth
                  id="lastname"
                  label="Nom"
                  name="lastname"
                  autoComplete="lastname"
                  helperText={isErrorLastname ? isErrorLastname : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={isErrorAddress ? true : false}
                  required
                  fullWidth
                  id="address"
                  label="Adresse complète : n°, rue, batiment, ét, pte, ville"
                  name="address"
                  autoComplete="address"
                  helperText={isErrorAddress ? isErrorAddress : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={isErrorEmail ? true : false}
                  required
                  fullWidth
                  id="email"
                  label="Adresse mail"
                  name="email"
                  autoComplete="emil"
                  helperText={isErrorEmail ? isErrorEmail : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errPass ? true : false}
                  required
                  fullWidth
                  name="password"
                  label="Mot de Passe"
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
                  label="Confirmer le mot de passe"
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
              Enregistrer
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Lien to="/login">J'ai déjà un compte? Se logger</Lien>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {/* </Container> */}
    </ThemeProvider>
  );
}
