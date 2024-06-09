import Center from "@/components/Layout/Center";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Schedule } from "@/models/Schedule";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/router';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 5px;
  background-color: #000;
  padding-bottom: 100px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  position: relative;
`;

const VideoFrame = styled.iframe`
  height: 100vh !important;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const RightSide = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  border-radius: 20px;
  opacity: 0.5;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const WatchingText = styled.h2`
  font-size: 0.9rem;
  color: #fff;
  margin: 10px 10px 10px 0;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  color: #fe7706;
  margin: 10px 0;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Desc = styled.p`
  font-size: 0.8rem;
  color: #fff;
  margin: 10px 0;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const TimerContainer = styled.div`
  margin: 10px 0;
  color: #dc5b0d;
  font-size: 1.5rem;
  text-align: center;
  font-family: 'Arial', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  background-color: #dc5b0d;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const AlreadyUserText = styled.p`
  color: #dc5b0d;
`;

export default function SchedulePage({ schedule,formula }) {
  const { data: session } = useSession();
  const [showVideo, setShowVideo] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const router = useRouter();

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

  useEffect(() => {
    if (showVideo && !session) {
      router.push('/user/Auth/login'); // Redirect to login page if not logged in
    }
  }, [showVideo, session, router]);

  return (
    <>
      <Header />
      <Container>
        {showVideo ? (
          session ? (
            <VideoContainer>
              <VideoFrame
                src={schedule.url}
                allowFullScreen
                allowTransparency="true"
                frameBorder="0"
              ></VideoFrame>
              <Center>
                <WatchingText>Now Watching:</WatchingText>
                <Title>{schedule.title}</Title>
                <Desc>{schedule.description}</Desc>
              </Center>
            </VideoContainer>
          ) : (
            <RightSide>
              <Image src={schedule.images[0]} alt="Scheduled Event" />
              <Overlay>
                <Title>Please log in to watch the video</Title>
                <Link href="/user/Auth/login">
                  <LoginButton>Login</LoginButton>
                </Link>
              </Overlay>
            </RightSide>
          )
        ) : (
          <RightSide>
            <Image src={schedule.images[0]} alt="Scheduled Event" />
            <Overlay>
              <TimerContainer>
                {timeLeft > 0 ? `${formatTimeLeft(timeLeft)}` : ''}
              </TimerContainer>
              <Title>{schedule.title}</Title>
              <Desc>{schedule.description}</Desc>
              {!session && (
                <ButtonContainer>
                  <Link href="/user/Auth/login">
                    <LoginButton>Login</LoginButton>
                  </Link>
                  <AlreadyUserText>Already a user?</AlreadyUserText>
                </ButtonContainer>
              )}
            </Overlay>
          </RightSide>
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

  return `${days}D ${hours}H :${minutes}M :${seconds}s`;
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const schedule = await Schedule.findById(id);
    const formula = await Schedule.find({}, null, {sort: {'_id':-1}, limit:10});

  return {
    props: {
      schedule: JSON.parse(JSON.stringify(schedule)),
      formula: JSON.parse(JSON.stringify(formula))},
    }
  };
}
