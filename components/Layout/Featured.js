import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Center from './Center';
import Image from 'next/image';

const Bg = styled.div`
  background-color: #000;
  color: #000;
  padding: 50px 0;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const ColumnWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
`;

const FadeOffImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ active }) => (active ? 1 : 0)};
`;

export default function Featured({ schedule }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState(['/image3.png', '/image2.png']);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <Bg>
      <Center>
        <ColumnWrapper>
          {images.map((src, index) => (
            <FadeOffImage
              key={src}
              src={src}
              alt=""
              width={1000}
              height={700}
              active={index === activeIndex}
            />
          ))}
        </ColumnWrapper>
      </Center>
    </Bg>
  );
}
