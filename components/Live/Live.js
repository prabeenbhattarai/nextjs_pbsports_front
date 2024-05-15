import { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import LiveBox from "../LiveBox";
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
  overflow-x: scroll;
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
  display: flex;
  justify-content: center;
  align-items: center;
  /* Use border-radius to create a square shape */
  border-radius: 10px; 
  ${({ hide }) => hide && "display: none;"} /* Hide the button when 'hide' prop is true */
`;

const LeftScrollButton = styled(ScrollButton)`
  left: 0;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')}; /* Show left scroll button only when right scroll button is clicked */
`;

const RightScrollButton = styled(ScrollButton)`
  right: 0;
`;
const Tag = styled.div`
  position: absolute;
  bottom: 80px;
  left: 5px;
  padding: 5px;
  background-color:#CAC9C9; /* Adjust background color and opacity */
  color: black; /* Adjust text color */
  font-size: 10px;
  border-radius:10px;
  font-weight: bold;
`;

const Live = ({ schedule }) => {
  const liveScrollRef = useRef(null);
  const recentlyScheduledScrollRef = useRef(null);
  const [showLiveLeftScroll, setShowLiveLeftScroll] = useState(false);
  const [showLiveRightScroll, setShowLiveRightScroll] = useState(false);
  const [showRecentlyScheduledLeftScroll, setShowRecentlyScheduledLeftScroll] = useState(false);
  const [showRecentlyScheduledRightScroll, setShowRecentlyScheduledRightScroll] = useState(false);
  const [liveItems, setLiveItems] = useState([]);
  const [recentlyScheduledItems, setRecentlyScheduledItems] = useState([]);

  useEffect(() => {
    const now = new Date();

    const live = [];
    const recentlyScheduled = [];

    schedule.forEach(item => {
      const scheduledTime = new Date(item.time);

      if (scheduledTime <= now && scheduledTime >= new Date(now.getTime() - 3 * 60 * 60 * 1000)) {
        live.push(item);
      } else if (scheduledTime > now) {
        recentlyScheduled.push(item);
      }
    });

    setLiveItems(live);
    setRecentlyScheduledItems(recentlyScheduled);

    if (liveScrollRef.current) {
      liveScrollRef.current.scrollLeft = 0;
      setShowLiveLeftScroll(false);
    }
    if (recentlyScheduledScrollRef.current) {
      recentlyScheduledScrollRef.current.scrollLeft = 0;
      setShowRecentlyScheduledLeftScroll(false);
    }
  }, [schedule]);

  const handleLiveScroll = (scrollOffset) => {
    liveScrollRef.current.scrollBy({
      left: scrollOffset,
      behavior: 'smooth',
    });

    setShowLiveLeftScroll(true);
  };

  const handleRecentlyScheduledScroll = (scrollOffset) => {
    recentlyScheduledScrollRef.current.scrollBy({
      left: scrollOffset,
      behavior: 'smooth',
    });

    setShowRecentlyScheduledLeftScroll(true);
  };

  return (
    <Center>
      <>
        <SectionTitle hide={liveItems.length === 0}>Buzz Alert</SectionTitle>
        <ScheduleGridContainer>
          {liveItems.length > 6 && (
            <>
              <LeftScrollButton show={showLiveLeftScroll} onClick={() => handleLiveScroll(-300)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#000000">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M18 12l-4-4v3H6v2h8v3z"/>
                </svg>
              </LeftScrollButton>
              <RightScrollButton show={showLiveRightScroll} onClick={() => handleLiveScroll(300)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#000000">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M6 12l4 4v-3h8v-2H10V8z"/>
                </svg>
              </RightScrollButton>
            </>
          )}
       <ScheduleGrid ref={liveScrollRef}>
  {liveItems.map((item) => {
    console.log("Rendering item:", item); // Check if the loop is iterating over each item
    return (
      <div key={item._id}>
        <LiveBox {...item} />
        <Tag>🔴 Live now</Tag> {/* Move the tag inside the loop */}
      </div>
    );
  })}
</ScheduleGrid>


        </ScheduleGridContainer>

        <SectionTitle hide={recentlyScheduledItems.length === 0}>Upcoming Cricket Events</SectionTitle>
        <ScheduleGridContainer>
          {recentlyScheduledItems.length > 6 && (
            <>
              <LeftScrollButton show={showRecentlyScheduledLeftScroll} onClick={() => handleRecentlyScheduledScroll(-300)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#000000">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M18 12l-4-4v3H6v2h8v3z"/>
                </svg>
              </LeftScrollButton>
              <RightScrollButton show={showRecentlyScheduledRightScroll} onClick={() => handleRecentlyScheduledScroll(300)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#000000">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M6 12l4 4v-3h8v-2H10V8z"/>
                </svg>
              </RightScrollButton>
            </>
          )}
          <ScheduleGrid ref={recentlyScheduledScrollRef}>
            {recentlyScheduledItems.map((item) => (
              <LiveBox key={item._id} {...item} showScheduledTimeTag={true} />
              
            ))}
           
          </ScheduleGrid>
        </ScheduleGridContainer>
      </>
    </Center>
  );
};

export default Live;
