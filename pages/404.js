// pages/404.js
import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Image from "next/image";
import Center from "@/components/Layout/Center";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #000000;
  color: #fff;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
`;
const SVGWrapper = styled.div`
  width: 73px; /* Adjust width as needed */
  height: 73px; /* Adjust height as needed */
  margin-bottom: 20px; /* Space between SVG and title */
`;


const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin: 20px 0;
`;

const HomeButton = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #fff;
  color: #f06;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #E91D0C;
    color: #fff;
  }
`;

const NotFoundImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 20px;
`;

export default function Custom404() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
    <Header/>
    <Center>
    <Wrapper>
    <Image
             
              src='/error.svg'
              alt='Banner'
            width={100} height={100}
              />
      <Subtitle>Oops! Unable to fetch Match or Highlights</Subtitle>
      {isClient && (
        <Link href="/" passHref>
          <HomeButton>Go Back Home</HomeButton>
        </Link>
      )}
     
    </Wrapper>
    <Footer/>
    </Center>
    
    </>
    
  );
}
