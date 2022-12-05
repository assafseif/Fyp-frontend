import React from "react";
import { SectionContainer } from "./styles";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
const Footer = () => {
  return (
    <SectionContainer>
      <h1>Join Us</h1>
      <span>
        We will let you know when we have new events and new Courses don't
      </span>
      <br />
      <span>
        worry we send them infrequently, just a friendly hi now and again!
      </span>
      <br />
      <br />
      <form>
        <input type="email" placeholder="Enter Your Email"></input>
        <i>
          <EmailOutlinedIcon
            style={{
              fontSize: "25px",
            }}
          />
        </i>
      </form>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <InstagramIcon
          style={{
            fontSize: "100px",
          }}
        />
        <FacebookTwoToneIcon
          style={{
            fontSize: "100px",
          }}
        />
      </div>
      <br />
      <span>© 2022 Seif Oud Owner</span>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </SectionContainer>
  );
};

export default Footer;
