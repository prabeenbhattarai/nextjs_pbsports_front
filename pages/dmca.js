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
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
`;

export default function DMCA() {
  return (
 
    <Container>
        </Header>
      <Section>
        <Subtitle>Introduction</Subtitle>
        <Text>
          Welcome to PBSports. We stream live matches and events held across the world. Please note that PBSports does not host any games or events nor are we the original streamer. We use third-party sites to fetch live streams. If you have any queries or copyright concerns, please contact the original broadcaster or streamer.
        </Text>
      </Section>
      <Section>
        <Subtitle>Copyright Notice</Subtitle>
        <Text>
          All content, including live streams and broadcasts, belong to their respective original broadcasters and streamers. PBSports claims no ownership over any content streamed on our platform. Our service is merely an aggregator of third-party streams available publicly.
        </Text>
      </Section>
      <Section>
        <Subtitle>DMCA Compliance</Subtitle>
        <Text>
          If you are a copyright owner or an agent thereof and believe that any content available on PBSports infringes upon your copyrights, you may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our support team with the following information in writing:
        </Text>
        <Text>
          1. A physical or electronic signature of a person authorized to act on behalf of the owner of the copyright that has been allegedly infringed;<br/>
          2. Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works;<br/>
          3. Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit the service provider to locate the material;<br/>
          4. Information reasonably sufficient to permit the service provider to contact you, such as an address, telephone number, and, if available, an electronic mail address;<br/>
          5. A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and<br/>
          6. A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
        </Text>
      </Section>
      <Section>
        <Subtitle>User Privacy</Subtitle>
        <Text>
          We use Google details for login purposes and we take the security of our users' personal information seriously. Your details are completely safe with us. If you have any concerns regarding your personal information, please do not hesitate to contact us at <a href="mailto:support@pbsports.net">support@pbsports.net</a>.
        </Text>
      </Section>
          </Center>
    </Container>
          
          </Footer>
         
  );
}
