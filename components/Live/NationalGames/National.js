
import { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import LiveBox from "../LiveBox";
import Center from "../Layout/Center";
import NationalBox from "./NationalBox";

const ScheduleGridContainer = styled.div`
  overflow-x: hidden;
  position: relative;
`;

const ScheduleGrid = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  scroll-behavior: smooth;
  overflow-x: auto;
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

const NationalLive = ({ national }) => {
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

    national.forEach(item => {
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
      setShowLiveRightScroll(live.length > 6);
    }
    if (recentlyScheduledScrollRef.current) {
      recentlyScheduledScrollRef.current.scrollLeft = 0;
      setShowRecentlyScheduledLeftScroll(false);
      setShowRecentlyScheduledRightScroll(recentlyScheduled.length > 6);
    }
  }, [national]);

  const handleLiveScroll = (scrollOffset) => {
    if (liveScrollRef.current) {
      liveScrollRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth',
      });

      setShowLiveLeftScroll(liveScrollRef.current.scrollLeft > 0);
      setShowLiveRightScroll(
        liveScrollRef.current.scrollLeft + liveScrollRef.current.clientWidth <
        liveScrollRef.current.scrollWidth
      );
    }
  };

  const handleRecentlyScheduledScroll = (scrollOffset) => {
    if (recentlyScheduledScrollRef.current) {
      recentlyScheduledScrollRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth',
      });

      setShowRecentlyScheduledLeftScroll(recentlyScheduledScrollRef.current.scrollLeft > 0);
      setShowRecentlyScheduledRightScroll(
        recentlyScheduledScrollRef.current.scrollLeft + recentlyScheduledScrollRef.current.clientWidth <
        recentlyScheduledScrollRef.current.scrollWidth
      );
    }
  };

  return (
    <Center>
      <>
        <SectionTitle hide={liveItems.length === 0}>National Games Alert</SectionTitle>
        <ScheduleGridContainer>
          {liveItems.length > 6 && (
            <>
              <LeftScrollButton hide={!showLiveLeftScroll} onClick={() => handleLiveScroll(-300)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#000000">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M18 12l-4-4v3H6v2h8v3z"/>
                </svg>
              </LeftScrollButton>
              <RightScrollButton hide={!showLiveRightScroll} onClick={() => handleLiveScroll(300)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#000000">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M6 12l4 4v-3h8v-2H10V8z"/>
                </svg>
              </RightScrollButton>
            </>
          )}
          <ScheduleGrid ref={liveScrollRef}>
            {liveItems.map((item) => (
              <div key={item._id} style={{ position: 'relative' }}>
                <NationalBox {...item} />
                <Tag>🔴 Live now</Tag>
              </div>
            ))}
          </ScheduleGrid>
        </ScheduleGridContainer>

        <SectionTitle hide={recentlyScheduledItems.length === 0}>Upcoming National Events</SectionTitle>
        <ScheduleGridContainer>
          {recentlyScheduledItems.length > 6 && (
            <>
              <LeftScrollButton hide={!showRecentlyScheduledLeftScroll} onClick={() => handleRecentlyScheduledScroll(-300)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#000000">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M18 12l-4-4v3H6v2h8v3z"/>
                </svg>
              </LeftScrollButton>
              <RightScrollButton hide={!showRecentlyScheduledRightScroll} onClick={() => handleRecentlyScheduledScroll(300)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#000000">
                  <path d="M6 12l4 4v-3h8v-2H10V8z"/>
                </svg>
              </RightScrollButton>
            </>
          )}
          <ScheduleGrid ref={recentlyScheduledScrollRef}>
            {recentlyScheduledItems.map((item) => (
              <NationalBox key={item._id} {...item} showScheduledTimeTag={true} />
            ))}
          </ScheduleGrid>
        </ScheduleGridContainer>
      </>
    </Center>
  );
};

export default NationalLive;
