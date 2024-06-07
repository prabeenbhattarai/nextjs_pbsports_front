import { styled } from "styled-components";
import Center from "./Center";
import ButtonLink from "../Button/ButtonLink";
import Image from "next/image";
import { useState, useEffect } from "react";

const Bg = styled.div`
  background-color: #000;
  color: #000;
  padding: 10px 0;
  border-bottom-left-radius: 20px; /* Add border radius to bottom-left corner */
  border-bottom-right-radius: 20px;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 100%;
  font-size: 2.5rem;
  font-style: oblique;
  color: #fff;
`;

const Titleh1 = styled.h1`
  margin: 0;
  font-weight: 100%;
  font-size: 1rem;
  color: #EC250E;
  align-items: center;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 1rem;
`;

const DescTime = styled.p`
  color: #D9D9D9;
  font-size: 1rem;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media screen and (min-width: 768px){
    grid-template-columns: 1.1fr 0.9fr;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 500px; /* Adjust the height as needed */
  position: relative;
  border-radius: 25px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }

  img.active {
    opacity: 1;
  }
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  max-width: 50%;
  color: #fff;
`;

export default function Featured({ schedule }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [ "/image3.png",  "/image5.webp"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Function to convert time string to formatted time
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const options = { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Bg>
      <Center>
        <ImageWrapper>
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Banner image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className={index === currentImageIndex ? "active" : ""}
            />
          ))}
          <ContentWrapper>
            <Titleh1>Recently scheduled</Titleh1>
            <Title>{schedule.title}</Title>
            <Desc>{schedule.description}</Desc>
            <DescTime>{formatTime(schedule.time)}</DescTime>
            <ButtonWrapper>
              <ButtonLink href={'/Games/schedule/' + schedule._id} primary size="l">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
                Watch Now
              </ButtonLink>
            </ButtonWrapper>
          </ContentWrapper>
        </ImageWrapper>
      </Center>
    </Bg>
  );
}
