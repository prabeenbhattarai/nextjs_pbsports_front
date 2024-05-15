import Link from "next/link";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useSession } from "next-auth/react";
import Center from "@/components/Layout/Center";

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

const NavLink = styled(Link)`
  display: block;
  color: ${({ scrolled }) => (scrolled ? "#ffffff" : "#ffffff")};
  text-decoration: none;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    color: #ff4803;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
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
  padding: 0.5rem 5rem .5rem 2rem;
  border: #fff;
  border-radius: 20px;
  outline: none;
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 1rem;
  cursor: pointer;
`;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const {data: session} = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledHeader scrolled={scrolled}>
      <Center>
        <Wrapper>
          <Link href="/">
            <Logo src="/logo.png" alt="Pb-Sports" />
          </Link>
          <SearchInput  scrolled={scrolled} type="text" placeholder="Search..." />
          <StyledNav>
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
            <ButtonWrapper>
                
                <ButtonLink href={} primary size="l">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-discord" viewBox="0 0 16 16">
  <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
</svg>
                  Watch Now
                </ButtonLink>
              </ButtonWrapper>
            {session ? (
               <Link href="/user/Auth/login">
              <UserPhoto src={session?.user?.image} alt="Pbsports" />
              </Link>
            ) : (
              <Link href="/user/Auth/login">

              <LoginIcon >
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  color="#EC1C07"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </LoginIcon>
              </Link>

            )}
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
