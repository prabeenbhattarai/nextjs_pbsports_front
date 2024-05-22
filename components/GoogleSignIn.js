import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

const GoogleSignIn = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        google.accounts.id.initialize({
          client_id: process.env.GOOGLE_ID,
          callback: handleCredentialResponse,
          auto_select: true, // Automatically select the account if there's only one
          cancel_on_tap_outside: false, // Prevent the One Tap UI from closing if the user clicks outside
        });

        if (!session) {
          google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
              console.log('One Tap prompt not displayed or skipped');
            } else {
              console.log('One Tap prompt displayed');
            }
          });
        }
      }
    };

    const handleCredentialResponse = (response) => {
      signIn('google', { id_token: response.credential });
    };

    if (typeof window !== 'undefined') {
      initializeGoogleSignIn();
    }
  }, [session]);

  return null; // This component doesn't render anything
};

export default GoogleSignIn;
