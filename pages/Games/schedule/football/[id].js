import Center from "@/components/Layout/Center";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Schedule } from "@/models/Schedule";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Live from "@/components/Live/Live";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";




const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align items from the top */
  padding-top: 5px; /* Minimum gap from the top */
  background-color:#000;
  padding-bottom: 100px;


`;

const VideoContainer = styled.div`
width: 100%;
position: relative;
`;

const VideoFrame = styled.iframe`
  width: 100%;
  height: 580px;

`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 70px 20px;
`;

const RightSide = styled.div`
  width: 50%;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  opacity: 0.5; /* Adjust image opacity */
  border-radius: 20px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;

`;
const DescContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden; /* Hide overflowing content */
  text-overflow: ellipsis; /* Add ellipsis for text overflow */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
`;

const WatchingText = styled.h2`
  font-size: .9rem;
  color: #fff; /* Grey color for "Now Watching" section */
  margin: 10px 10px 10px 0; 
`;


const Title = styled.h1`
  font-size: .9rem;
  color: #FE7706; /* Title color as mentioned */
  margin: 10px 0;
  text-transform: uppercase; 

`;
const Desc = styled.h1`
  font-size: 0.7rem;
  color: #fff;
  margin: 10px 0;
  font-family: 'Arial', sans-serif; /* Change font family */
  overflow: hidden; /* Hide overflowing content */
  text-overflow: ellipsis; /* Add ellipsis for text overflow */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
`;

const Description = styled.p`
  margin: 10px 0;
  text-align: center;
  font-size: 1.2rem; /* Adjust font size */
  font-family: 'Arial', sans-serif; /* Change font family */
  color:#aaa;
  
`;

const TimerContainer = styled.div`
  margin: 10px 0;
  color: #DC5B0D;
  font-size: 1.5rem;
  text-align: center;
  font-family: 'Arial', sans-serif; /* Change font family */
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  background-color: #DC5B0D;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

`;

const AlreadyUserText = styled.p`
  color: #DC5B0D;
`;
const VideoFrameWrapper = styled.div`

`;

export default function SchedulePage({ schedule,footballSchedule}) {
  const { data: session } = useSession();
 

  const [showVideo, setShowVideo] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const scheduledTime = new Date(schedule.time).getTime();
    const currentTime = new Date().getTime();
    const fourHoursInMilliseconds = 4 * 60 * 60 * 1000;

    if (scheduledTime <= currentTime && currentTime <= scheduledTime + fourHoursInMilliseconds) {
      setShowVideo(true);
    } else if (scheduledTime > currentTime) {
      const timerInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const difference = scheduledTime - currentTime;

        if (difference <= 0) {
          setShowVideo(true);
          clearInterval(timerInterval);
        } else {
          setTimeLeft(difference);
        }
      }, 1000); // Update every second

      return () => clearInterval(timerInterval);
    }
  }, [schedule]);
  
  

  return (
    <>
      <Header />
        <Container>
          {showVideo ? (
            <VideoContainer>
            <VideoFrameWrapper>
              <VideoFrame
                src={schedule.url}
                frameborder="0"
                allowfullscreen
              ></VideoFrame>
            </VideoFrameWrapper>
            <Center>
            <TitleContainer>
              
  <WatchingText>Now Watching:</WatchingText>
  <Title>{schedule.title}</Title>
</TitleContainer>

<DescContainer>
  <Desc>{schedule.description}</Desc>
</DescContainer>
</Center>
          </VideoContainer>

          ) : (
            <Container>
              <LeftSide>
                <TimerContainer>
                  {timeLeft > 0 ? ` starts in: ${formatTimeLeft(timeLeft)}` : ''}
                </TimerContainer>
                <Title>{schedule.title}</Title>
                <Description>{schedule.description}</Description>
                {!session && (
 <ButtonContainer>
     <Link href="/user/Auth/login">
    <LoginButton >Login</LoginButton></Link>
    <AlreadyUserText>Already a user?</AlreadyUserText>
  </ButtonContainer>
)}
              </LeftSide>
              <RightSide>
                <Overlay />
                <Image src={schedule.images[0]} alt="Scheduled Event" />
              </RightSide>
            </Container>
          )}
        </Container>
       

      <Footer />
    </>
  );
}

function formatTimeLeft(timeLeft) {
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return ` ${days}D ${hours}H :${minutes}M :${seconds}s`;
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const schedule = await Schedule.findById(id);
  const footballSchedule = await Schedule.find({}, null, {sort: {'_id':-1}, limit:10});
  return {
    props: {
      schedule: JSON.parse(JSON.stringify(schedule)),
      liveSchedule: JSON.parse(JSON.stringify(footballSchedule))},

    }
  };

