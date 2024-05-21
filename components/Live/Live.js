import { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import LiveBox from "../LiveBox";
import Center from "../Layout/Center";

const ScheduleGridContainer = styled.div`
  overflow-x: hidden;
  position: relative;
`;

const ScheduleGrid = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  scroll-behavior: smooth;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SectionTitle = styled.h3`
  color: #d60202;
  margin-right: 20px;
  margin-bottom: 0;
  font-size: 1.1rem;
  display: ${({ hide }) => (hide ? "none" : "block")};
`;

const ScrollButton = styled.button`
  background-color: #f77f06;
  border: none;
  cursor: pointer;
  position: absolute;
  top: calc(50% - 24px);
  transform: translateY(-50%);
  z-index: 1;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  ${({ hide }) => hide && "display: none;"}
`;

const LeftScrollButton = styled(ScrollButton)`
  left: 0;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
`;

const RightScrollButton = styled(ScrollButton)`
  right: 0;
`;

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
      {liveItems.length > 0 && (
        <>
          <SectionTitle>Cricket Buzz Alert</SectionTitle>
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
                    <path d="M6 12l4 4v-3h8v-2H10V8z"/>
                  </svg>
                </RightScrollButton>
              </>
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
          </ScheduleGridContainer>
        </>
      )}

      {recentlyScheduledItems.length > 0 && (
        <>
          <SectionTitle>Upcoming Cricket Events</SectionTitle>
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
      )}
    </Center>
  );
};

export default Live;
