import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image';
import styled from "styled-components";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { useRouter } from 'next/router';

const StyledContainer = styled.div`
  position: relative;
  padding-top: 4rem;
  background-color: #000;
  color: #fff;
`;

const ContentContainer = styled.div`
  position: relative;
  max-width: 30rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
  border-radius: 20px;
  border: 2px solid #fff;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);

  @media screen and (min-width: 768px) {
    padding: 0 2rem;
  }

  @media screen and (min-width: 1024px) {
    padding: 0 4rem;
  }
`;

const CardContainer = styled.div`
  margin: 0 auto;
  max-width: 30rem;
  background-color: #000;
  border-radius: 1rem;
  padding: 2rem;
  color: #fff;

  @media screen and (max-width: 480px) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 2rem;

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  border: 2px solid #fff;
  border-radius: 9999px;
  background-color: #000;
  color: #fff;
  font-size: 0.875rem;
  font-weight: bold;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #d20d0d;
    color: #d20d0d;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 480px) {
    height: 2.5rem;
    font-size: 0.75rem;
  }
`;

const ButtonText = styled.span`
  margin-left: 0.5rem;
`;

const Divider = styled.div`
  margin-top: 4rem;
  margin-bottom: -1rem;
  color: #718096;

  & > span {
    display: inline-block;
    background-color: #fff;
    padding: 0 1rem;
    font-size: 0.75rem;
  }
`;

const UserPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;

  @media screen and (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const AgreementText = styled.p`
  color: #718096;
  font-size: 0.75rem;
  margin-top: 1rem;

  & a {
    color: #4299e1;
    text-decoration: underline;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 20px; 
  font-size: 0.8rem;
  color: #aaa;

  @media screen and (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const { callbackUrl } = router.query;

  useEffect(() => {
    if (session) {
      router.push(callbackUrl || '/');
    }
  }, [session, router, callbackUrl]);

  const handleSignIn = () => {
    signIn('google', { callbackUrl: callbackUrl || '/' });
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <>
      <Header />
      <StyledContainer>
        <ContentContainer>
          <CardContainer>
            {!session ? (
              <>
                <Title>Now just one click to unlock the best</Title>
                <p style={{ color: 'red' }}>Log in with</p>
                <Button onClick={handleSignIn}>
                  <Image
                    src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                    alt="google logo"
                    width={30}
                    height={30}
                  />
                  <ButtonText>Continue with Google</ButtonText>
                </Button>
              </>
            ) : (
              <>
                <Title>You are logged in as</Title>
                <div>
                  <UserPhoto src={session.user.image} alt="User Photo" />
                  <h4>{session.user.name}</h4>
                  <h4>{session.user.email}</h4>
                </div>
                <Button onClick={handleLogout} style={{ backgroundColor: '#000' }}>
                  Logout
                </Button>
              </>
            )}
            <Divider></Divider>
            <AgreementText>
              This site is protected by reCAPTCHA and the{" "}
              <a href="https://www.google.com/policies/privacy/archive/20010104-20040701/">Google Privacy Policy</a> and{" "}
              <a href="https://policies.google.com/terms?hl=en-GB">Terms of Service</a> apply.
            </AgreementText>
          </CardContainer>
        </ContentContainer>
      </StyledContainer>
      <Copyright>
        &copy; {new Date().getFullYear()} PbSports | Live Anytime, Anywhere | All Rights Reserved.
      </Copyright>
    </>
  );
}
