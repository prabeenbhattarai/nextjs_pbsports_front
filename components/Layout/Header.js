import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import Center from "@/components/Layout/Center";
import Link from "next/link";

const Logo = styled.img`
  width: 100px;
  height: auto;
  position: relative;
  z-index: 3;
`;

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${({ scrolled }) => (scrolled ? "#020B2A" : "#000000")};
  color: ${({ scrolled }) => (scrolled ? "#ffffff" : "#ffffff")};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const NavLink = styled.a`
  display: block;
  color: ${({ scrolled }) => (scrolled ? "#ffffff" : "#ffffff")};
  text-decoration: none;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    color: #ff4803;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: ${({ showMenu }) => (showMenu ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background-color: #020B2A;
    padding: 10px;
    border-radius: 8px;
    width: 100%;
  }
`;

const LoginIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: #ffffff;
  cursor: pointer;
`;

const UserPhoto = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const SearchInput = styled.input`
  padding: 0.5rem 5rem 0.5rem 2rem;
  border: #fff;
  border-radius: 20px;
  outline: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MenuIcon = styled.div`
  display: none;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: block;
    color: red;
  }
`;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Disable right-click
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    // Disable certain keyboard shortcuts
    const handleKeyDown = (event) => {
      if (event.ctrlKey && (event.key === 'Shift' || event.key === 'I' || event.key === 'J' || event.key === 'C')) {
        event.preventDefault();
      }
      if (event.ctrlKey && event.key === 'U') {
        event.preventDefault();
      }
      if (event.key === 'F12') {
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
     <Head>
        <title>PBsports | Live Anytime, Anywhere</title>
        <meta name="description" content="PBsports is live streaming platform that stream live events and matches like Cricket, Football, Formula1 as well as UFc boxing and their highlights too ." />
        <meta name="keywords" content="PBSPORTS, pbsports.net, pbSports, Cricket, Football, cricket football live stream, nepali live stream, free pbsports live stream, highlight, pbsports highlight,PBSPORTS, NEPALI STREAMER, nepals crixket team, CANN, pbsports live
" />
        <link rel="canonical" href="https://www.pbsports.net/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="PBSports : Live Anytime, Anywhere" />
        <meta property="og:description" content="PBsports : Watch Live Anytime, Anywhere" />
        <meta property="og:image" content="https://www.pbsports.net/logo.png" />
        <meta property="og:url" content="https://www.pbsports.net/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PBsports : Watch Live Anytime, Anywhere" />
        <meta name="twitter:description" content="PBsports : Watch Live Anytime, Anywhere" />
        <meta name="twitter:image" content="https://www.pbsports.net/logo.png" />
        <meta name="author" content="PBsports" />
        <link rel="alternate" href="https://www.pbsports.net/" hreflang="es" />
        <meta charset="UTF-8" />
      </Head>
    
    <StyledHeader scrolled={scrolled}>
      <Center>
        <Wrapper>
          <Link href="/" passHref>
            <Logo src="/logo.png" alt="Pb-Sports" />
          </Link>
        
          <StyledNav showMenu={showMenu}>
            <NavLink href={"/Highlight"} scrolled={scrolled}>
              Highlight
            </NavLink>
            <NavLink href={"/Cricket"} scrolled={scrolled}>
              Cricket
            </NavLink>
            <NavLink href={"/Football"} scrolled={scrolled}>
              Football
            </NavLink>
            <NavLink href={"/support"} scrolled={scrolled}>
              Support & FAQs
            </NavLink>
            {session ? (
              <NavLink href="/user/Auth/login">
                <UserPhoto src={session?.user?.image} alt="Pbsports" />
              </NavLink>
            ) : (
              <NavLink href="/user/Auth/login">
                <LoginIcon>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    color="#EC1C07"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </LoginIcon>
              </NavLink>
            )}
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
            </>
  );
}
