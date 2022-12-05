import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Head from "next/head";
import Container from "@mui/material/Container";

export default function SimpleContainer() {
  return (
    <>
      <Head>
        <title>About Page</title>
      </Head>
      <React.Fragment>
        <CssBaseline />
        <Container
          style={{
            paddingTop: "5px",
          }}
        >
          <Box
            sx={{
              bgcolor: "#A89E9A",
              height: "70vh",
              width: "180vh",
              borderRadius: "50px",
            }}
          >
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
                padding: 100,
              }}
            >
              <Box
                sx={{
                  bgcolor: "#56433B",
                  height: "25vh",
                  width: "140vh",
                  borderRadius: "50px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  <p>
                    Hello, I am so happy and grateful that you are here, and I
                    <br />
                    will work towards your musical goals as <br /> I have
                    achieved the goals of thousands of students before.
                    <h3>I'm excited to make a change, and you?</h3>
                  </p>
                </div>
              </Box>
            </Container>
          </Box>
        </Container>
      </React.Fragment>
    </>
  );
}
