import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserPhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Button = styled.button`
  background-color: #4285F4;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #357ae8;
  }
`;

const GoogleSignIn = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log('One Tap prompt not displayed or skipped');
        } else {
          console.log('One Tap prompt displayed');
        }
      });

      google.accounts.id.renderButton(
        document.getElementById('google-sign-in-button'),
        { theme: 'outline', size: 'large' }
      );
    };

    const handleCredentialResponse = (response) => {
      console.log('Encoded JWT ID token: ' + response.credential);
      signIn('google', { id_token: response.credential });
    };

    if (typeof window !== 'undefined' && window.google) {
      initializeGoogleSignIn();
    } else {
      window.onload = initializeGoogleSignIn;
    }
  }, []);

  return (
    <Container>
      {user ? (
        <>
          <UserPhoto src={user.picture} alt="User Photo" />
          <div>{user.name}</div>
        </>
      ) : (
        <div id="google-sign-in-button"></div>
      )}
      <Button onClick={() => signIn('google')}>
        <img
          src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
          alt="Google logo"
          width={24}
          height={24}
        />
        <span>Sign in with Google</span>
      </Button>
    </Container>
  );
};

export default GoogleSignIn;
