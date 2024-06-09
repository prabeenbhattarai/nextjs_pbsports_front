
import Link from "next/link";
import { styled } from "styled-components";

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  cursor:pointer;
`;

const LiveWrapper = styled.div`
  position: relative;
  display: inline-block;
  text-decoration: none;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 220px; /* Set fixed width */
  height: 130px; /* Set fixed height */
  object-fit: cover; /* Ensure image fills the container while maintaining aspect ratio */
  border-radius: 10px; /* Optional: Add border radius */
  transition: transform 0.2s ease-in-out; /* Add transition effect */
  position: relative;
  cursor: pointer; /* Add pointer cursor */
  
  &:hover {
    transform: scale(1.05); /* Scale the image on hover */
  }
`;

const PlayIcon = styled.svg`
  width: 64px;
  height: 64px;
  fill: #FF9999;
`;

const Title = styled.p`
  color: #DDDADA;
  font-weight: bold;
  padding-top: 6px;
  font-size: 0.9rem;
  margin: 0; /* Remove margin */
  overflow: hidden; /* Hide overflowing content */
  white-space: nowrap; /* Prevent text wrapping */
  text-overflow: ellipsis; /* Add ellipsis for text overflow */
  text-decoration: none;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666666; /* Grey color */
  text-decoration: none;
  overflow: hidden; /* Hide overflowing content */
  white-space: nowrap; /* Prevent text from wrapping */
  text-overflow: ellipsis; /* Add ellipsis for text overflow */
  max-width: 220px;
`;

const Tag = styled.div`
  position: absolute;
  bottom: 10px;
  left: 5px;
  padding: 5px;
  background-color: #F6F6F6; /* Adjust background color and opacity */
  color: #000; /* Adjust text color */
  font-size: 10px;
  border-radius: 10px;
  font-weight: bold;
`;

export default function CopaBox({ _id, title, description, url, time, images, showScheduledTimeTag }) {
  // Ensure that required properties are present before rendering the component
  if (!title || !description || !images || images.length === 0) {
    return null; // Do not render the component if required properties are missing
  }

  const link = '/Games/schedule/football/CopaAmerica/' + _id;

  return (
    <Link href={link} passHref>
      <LiveWrapper>
        <ImageContainer>
          <Image src={images[0]} alt="Pbsports" />
          {showScheduledTimeTag && (
            <Tag>
              {new Intl.DateTimeFormat('en-US', { weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date(time))}
            </Tag>
          )}
        </ImageContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </LiveWrapper>
    </Link>
  );
}
