import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <div>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 5 }}
      >
        {"Copyright © "}
        <Link
          color="inherit"
          href="https://github.com/cedriclecalvez/SayMhouse"
        >
          SayMhouse
        </Link>{" "}
        {new Date().getFullYear()}
        {". by Cédric Le Calvez"}
      </Typography>
    </div>
  );
};

export default Footer;
