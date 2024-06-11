// pages/dmca.js
import Head from 'next/head';
import styled from 'styled-components';
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Center from "@/components/Layout/Center";

const Container = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Subtitle = styled.h2`
  font-size: 1.8em;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default function StreamingDetails() {
  return (
    <>
      <Header />
      <Container>
        <Head>
          <title>Streaming Details - PBSports</title>
        </Head>
        <Title>What We Stream</Title>
        
        <Section>
          <Subtitle>Football</Subtitle>
          <Text>
            We stream a wide range of football tournaments and leagues, including:
          </Text>
          <List>
            <ListItem>UEFA Champions League</ListItem>
            <ListItem>La Liga</ListItem>
            <ListItem>Euro Cup</ListItem>
            <ListItem>Copa America</ListItem>
            <ListItem>Premier League</ListItem>
            <ListItem>Serie A</ListItem>
            <ListItem>Bundesliga</ListItem>
            <ListItem>Ligue 1</ListItem>
          </List>
          <LogoContainer>
            <Logo src="/logos/uefa-champions-league.png" alt="UEFA Champions League" />
            <Logo src="/logos/laliga.png" alt="La Liga" />
            <Logo src="/logos/euro-cup.png" alt="Euro Cup" />
            <Logo src="/logos/copa-america.png" alt="Copa America" />
            <Logo src="/logos/premier-league.png" alt="Premier League" />
            <Logo src="/logos/serie-a.png" alt="Serie A" />
            <Logo src="/logos/bundesliga.png" alt="Bundesliga" />
            <Logo src="/logos/ligue-1.png" alt="Ligue 1" />
          </LogoContainer>
        </Section>
        
        <Section>
          <Subtitle>Cricket</Subtitle>
          <Text>
            Our cricket streaming includes major tournaments and leagues such as:
          </Text>
          <List>
            <ListItem>ICC Cricket World Cup</ListItem>
            <ListItem>Indian Premier League (IPL)</ListItem>
            <ListItem>Big Bash League (BBL)</ListItem>
            <ListItem>Pakistan Super League (PSL)</ListItem>
            <ListItem>The Ashes</ListItem>
            <ListItem>Caribbean Premier League (CPL)</ListItem>
          </List>
          <LogoContainer>
            <Logo src="/logos/icc-world-cup.png" alt="ICC Cricket World Cup" />
            <Logo src="/logos/ipl.png" alt="IPL" />
            <Logo src="/logos/bbl.png" alt="BBL" />
            <Logo src="/logos/psl.png" alt="PSL" />
            <Logo src="/logos/ashes.png" alt="The Ashes" />
            <Logo src="/logos/cpl.png" alt="CPL" />
          </LogoContainer>
        </Section>

        <Section>
          <Subtitle>Formula 1</Subtitle>
          <Text>
            Experience the thrill of Formula 1 racing with coverage of all Grand Prix events:
          </Text>
          <List>
            <ListItem>Australian Grand Prix</ListItem>
            <ListItem>Monaco Grand Prix</ListItem>
            <ListItem>British Grand Prix</ListItem>
            <ListItem>Italian Grand Prix</ListItem>
            <ListItem>Singapore Grand Prix</ListItem>
            <ListItem>United States Grand Prix</ListItem>
          </List>
          <LogoContainer>
            <Logo src="/logos/f1.png" alt="Formula 1" />
            <Logo src="/logos/australian-gp.png" alt="Australian Grand Prix" />
            <Logo src="/logos/monaco-gp.png" alt="Monaco Grand Prix" />
            <Logo src="/logos/british-gp.png" alt="British Grand Prix" />
            <Logo src="/logos/italian-gp.png" alt="Italian Grand Prix" />
            <Logo src="/logos/singapore-gp.png" alt="Singapore Grand Prix" />
            <Logo src="/logos/us-gp.png" alt="United States Grand Prix" />
          </LogoContainer>
        </Section>

        <Section>
          <Subtitle>UFC</Subtitle>
          <Text>
            Catch all the action from the Ultimate Fighting Championship (UFC) events:
          </Text>
          <List>
            <ListItem>UFC Fight Night</ListItem>
            <ListItem>UFC on ESPN</ListItem>
            <ListItem>UFC Pay-Per-View Events</ListItem>
          </List>
          <LogoContainer>
            <Logo src="/logos/ufc.png" alt="UFC" />
            <Logo src="/logos/ufc-fight-night.png" alt="UFC Fight Night" />
            <Logo src="/logos/ufc-espn.png" alt="UFC on ESPN" />
            <Logo src="/logos/ufc-ppv.png" alt="UFC Pay-Per-View" />
          </LogoContainer>
        </Section>
      </Container>
      <Footer />
    </>
  );
}
