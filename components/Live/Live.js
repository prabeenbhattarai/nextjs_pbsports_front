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

const Tag = styled.div`
  position: absolute;
  bottom: 80px;
  left: 5px;
  padding: 5px;
  background-color: #CAC9C9;
  color: black;
  font-size: 10px;
  border-radius: 10px;
  font-weight: bold;
`;

const Live = ({ schedule }) => {
  const liveScrollRef = useRef(null);
  const recentlyScheduledScrollRef = useRef(null);
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
    }
    if (recentlyScheduledScrollRef.current) {
      recentlyScheduledScrollRef.current.scrollLeft = 0;
    }
  }, [schedule]);

  const handleLiveScroll = (scrollOffset) => {
    liveScrollRef.current.scrollBy({
      left: scrollOffset,
      behavior: 'smooth',
    });
  };

  const handleRecentlyScheduledScroll = (scrollOffset) => {
    recentlyScheduledScrollRef.current.scrollBy({
      left: scrollOffset,
      behavior: 'smooth',
    });
  };

  return (
    <Center>
      {liveItems.length > 0 && (
        <>
          <SectionTitle>Cricket Buzz Alert</SectionTitle>
          <ScheduleGridContainer>
            {liveItems.length > 6 && (
              <LeftScrollButton hide={liveScrollRef.current?.scrollLeft === 0} onClick={() => handleLiveScroll(-300)}>
                <LeftScrollIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M8 5v14l-7-7 7-7zm8 0v14l-7-7 7-7z"/>
                </LeftScrollIcon>
              </LeftScrollButton>
            )}
            <ScheduleGrid ref={liveScrollRef}>
              {liveItems.map((item) => {
                return (
                  <div key={item._id} style={{ position: 'relative' }}>
                    <LiveBox {...item} />
                    <Tag>🔴 Live now</Tag>
                  </div>
                );
              })}
            </ScheduleGrid>
            {liveItems.length > 6 && (
              <RightScrollButton hide={liveScrollRef.current?.scrollLeft === (liveScrollRef.current?.scrollWidth - liveScrollRef.current?.clientWidth)} onClick={() => handleLiveScroll(300)}>
                <RightScrollIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M16 5v14l7-7-7-7zm-8 0v14l7-7-7-7z"/>
                </RightScrollIcon>
              </RightScrollButton>
            )}
          </ScheduleGridContainer>
        </>
      )}

      {recentlyScheduledItems.length > 0 && (
        <>
          <SectionTitle>Upcoming Cricket Events</SectionTitle>
          <ScheduleGridContainer>
            {recentlyScheduledItems.length > 6 && (
              <LeftScrollButton hide={recentlyScheduledScrollRef.current?.scrollLeft === 0} onClick={() => handleRecentlyScheduledScroll(-300)}>
                <LeftScrollIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M8 5v14l-7-7 7-7zm8 0v14l-7-7 7-7z"/>
                </LeftScrollIcon>
              </LeftScrollButton>
            )}
            <ScheduleGrid ref={recentlyScheduledScrollRef}>
              {recentlyScheduledItems.map((item) => (
                <LiveBox key={item._id} {...item} showScheduledTimeTag={true} />
              ))}
            </ScheduleGrid>
            {recentlyScheduledItems.length > 6 && (
              <RightScrollButton hide={recentlyScheduledScrollRef.current?.scrollLeft === (recentlyScheduledScrollRef.current?.scrollWidth - recentlyScheduledScrollRef.current?.clientWidth)} onClick={() => handleRecentlyScheduledScroll(300)}>
                <RightScrollIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M16 5v14l7-7-7-7zm-8 0v14l7-7-7-7z"/>
                </RightScrollIcon>
              </RightScrollButton>
            )}
          </ScheduleGridContainer>
        </>
      )}
    </Center>
  );
};

export default Live;
