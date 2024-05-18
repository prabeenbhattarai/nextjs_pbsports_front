import { useRef } from "react";
import { styled } from "styled-components";
import HighlightBox from "./HighlightBox";
import Center from "../Layout/Center";

const ScheduleGridContainer = styled.div`
  overflow-x: hidden; /* Hide horizontal scrollbar */
  position: relative; /* Position relative for absolute positioning of scroll buttons */
`;

const ScheduleGrid = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px; /* Set scroll behavior for smooth scrolling */
  scroll-behavior: smooth;
  /* Ensure the grid can be scrolled horizontally */
  overflow-x: auto;
  /* Hide the scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    display: none; /* WebKit */
  }
`;
const SectionTitle = styled.h3`
  color: #d60202;
  margin-right: 20px;
  margin-bottom: 0;
  font-size: 1.1rem; /* Add margin to separate LiveNow from ScheduleGrid */
  display: ${({ hide }) => (hide ? "none" : "block")}; /* Hide the title if there's no content */
`;

const ScrollButton = styled.button`
  background-color: #f77f06;
  border: none;
  cursor: pointer;
  position: absolute;
  top: calc(50% - 24px); /* Adjust position to be centered relative to the image */
  transform: translateY(-50%);
  z-index: 1; /* Ensure the buttons are above the content */
  width: 48px; /* Adjust width and height of the buttons */
  height: 48px;
  display: ${({ hide }) => (hide ? 'none' : 'flex')}; /* Hide the button if not needed */
  justify-content: center;
  align-items: center;
  /* Use border-radius to create a square shape */
  border-radius: 10px; 
`;

const LeftScrollButton = styled(ScrollButton)`
  left: 0;
`;

const RightScrollButton = styled(ScrollButton)`
  right: 0;
`;

const ScrollIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: white;
`;

const LeftScrollIcon = styled(ScrollIcon)`
  transform: rotate(0deg); /* Rotate the right-facing arrow icon to face left */
`;

const RightScrollIcon = styled(ScrollIcon)``;

const Highlights = ({ highlight }) => {
  const scrollRef = useRef(null);

  return (
    <Center>
      <>
        <SectionTitle>Cricket Replay</SectionTitle>

        <ScheduleGridContainer>
          {highlight.length > 6 && (
            <LeftScrollButton hide={scrollRef.current?.scrollLeft === 0} onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })}>
              <LeftScrollIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M8 5v14l-7-7 7-7zm8 0v14l-7-7 7-7z"/>
              </LeftScrollIcon>
            </LeftScrollButton>
          )}
          <ScheduleGrid ref={scrollRef}>
            {highlight.map((highlightItem) => (
              <HighlightBox key={highlightItem._id} {...highlightItem} />
            ))}
          </ScheduleGrid>
          {highlight.length > 6 && (
            <RightScrollButton hide={scrollRef.current?.scrollLeft === (scrollRef.current?.scrollWidth - scrollRef.current?.clientWidth)} onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })}>
              <RightScrollIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M16 5v14l7-7-7-7zm-8 0v14l7-7-7-7z"/>
              </RightScrollIcon>
            </RightScrollButton>
          )}
        </ScheduleGridContainer>
      </>
    </Center>
  );
};

export default Highlights;
