import React from "react";
import { CircularProgress, Container } from "@mui/material";

const Loader = () => {
  return (
    <Container maxWidth={"sm"} sx={{ mt: 45, textAlign: "center" }}>
      <CircularProgress color={"secondary"} />
    </Container>
  );
};

export default Loader;
