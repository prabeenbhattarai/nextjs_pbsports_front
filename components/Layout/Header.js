import Link from "next/link";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useSession } from "next-auth/react";
import Center from "@/components/Layout/Center";
import ButtonLink from "../Button/ButtonLink";

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

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
  padding: 0.5rem 5rem 0.5rem 2rem;
  border: #fff;
  border-radius: 20px;
  outline: none;
`;

const SearchResults = styled.div`
  position: absolute;
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
  width: 300px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1001;
  top: 50px;
  left: 0;
  right: 0;
  margin: auto;
`;

const SearchResultItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;

  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

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

  useEffect(() => {
    if (searchQuery.length > 2) {
      const fetchSearchResults = async () => {
        const response = await fetch(`/api/search?query=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data);
      };

      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <StyledHeader scrolled={scrolled}>
      <Center>
        <Wrapper>
          <Link href="/">
            <Logo src="/logo.png" alt="Pb-Sports" />
          </Link>
          <div style={{ position: 'relative' }}>
            <SearchInput
              scrolled={scrolled}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onBlur={() => setTimeout(() => setShowResults(false), 100)}
            />
            {showResults && searchResults.length > 0 && (
              <SearchResults>
                {searchResults.map((result, index) => (
                  <SearchResultItem key={index}>
                    <Link href={`/details/${result._id}`}>
                      {result.name}
                    </Link>
                  </SearchResultItem>
                ))}
              </SearchResults>
            )}
          </div>
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
              <ButtonLink href={'https://discord.gg/744eMdX2'} primary size="l">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-discord" viewBox="0 0 16 16">
                  <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9
