// pages/dmca.js
import Head from 'next/head';
import styled from 'styled-components';
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Center from "@/components/Layout/Center";

const Container = styled.div`
  font-family: Arial, sans-serif;
  color: #EEEEEE;
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
            <Logo src="/uefa.png" alt="UEFA Champions League" />
            <Logo src="/laliga.png" alt="La Liga" />
            <Logo src="/euro.png" alt="Euro Cup" />
            <Logo src="/copa.png" alt="Copa America" />
            <Logo src="/premier.jpeg" alt="Premier League" />
            <Logo src="/series.png" alt="Serie A" />

            <Logo src="/ligue1.png" alt="Ligue 1" />
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
            <ListItem>ICC Womens Cricket Worldcup</ListItem>
            <ListItem>ICC Cricket Test Worldcup</ListItem>
                        <ListItem>ICC Mens T20  Worldcup</ListItem>

           
          </List>
          <LogoContainer>
            <Logo src="/icc.jpg" alt="ICC Cricket World Cup" />
            <Logo src="/ipl.png" alt="IPL" />
            <Logo src="/icct20.png" alt="BBL" />
          
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
            <Logo src="/aus.jpeg" alt="Formula 1" />
            <Logo src="/monoco.webp" alt="Australian Grand Prix" />
            <Logo src="/british.png" alt="Monaco Grand Prix" />
            <Logo src="/italy.avif" alt="British Grand Prix" />
            <Logo src="/singa.png" alt="Italian Grand Prix" />
            <Logo src="/united.png" alt="Singapore Grand Prix" />
         
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
            <Logo src="/ufcfight.avif" alt="UFC" />
            <Logo src="/ufcespn.webp" alt="UFC Fight Night" />
            <Logo src="/ufc.png" alt="UFC on ESPN" />
            
          </LogoContainer>
        </Section>
      </Container>
      <Footer />
    </>
  );
}
