import React from "react";
import { Container } from "@mui/material";

const ErrorConnecting = () => {
  return (
    <Container maxWidth={"md"} sx={{ mt: 45, textAlign: "center" }}>
      <h1>Something went wrong please try later.</h1>
    </Container>
  );
};

export default ErrorConnecting;
