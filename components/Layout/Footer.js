import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";

const FooterWrapper = styled.footer`
  background-color: #000; /* Black background color */
  color: #fff; /* White text color */
  padding: 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 100px; /* Adjust the width of the logo */
`;

const Links = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
`;

const LinkItem = styled.li`
  font-size: 14px; /* Adjust the font size of the links */
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
  position: relative;

  &:hover {
    color: #f07c0f; /* Change color on hover */
  }

  &:hover::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #f07c0f; /* Underline on hover */
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 20px; /* Adjust spacing from the links */
  font-size: 0.8rem;
  color: #aaa;
`;
const Text = styled.div`
  text-align: center;
  margin-top: 20px; /* Adjust spacing from the links */
  font-size: 0.6rem;
  color: #aaa;
  margin-left: 30px;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Center>
        <Container>
          <div>
            <Logo src="/logo.png" alt="Logo" /> {/* Replace with your logo image */}
          </div>
          <Text>
            The live stream content provided on this website is sourced from third-party platforms. We are not the original event broadcaster and utilize these platforms to fetch live streams for our users. All rights and copyrights for the content belong to the respective broadcasters. We do not claim ownership of the content streamed through our platform. If you have any concerns regarding the content, please contact the original broadcaster directly.
          </Text>
        </Container>
        <Copyright>
          &copy; {new Date().getFullYear()} PbSports | Live Anytime, Anywhere | All Right Reserved. {/* Update with your company name */}
        </Copyright>
      </Center>
    </FooterWrapper>
  );
}
