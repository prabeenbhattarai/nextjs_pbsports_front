import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import React from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: white;
`;

const SidebarContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-shrink: 0; /* Ensures the sidebar does not shrink */
  width: 240px; /* Sidebar container width for centering */
  padding: 20px 0; /* Space on the top and bottom */
`;

const Sidebar = styled.aside`
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SidebarItem = styled.li`
  margin: 10px 0;
`;

const SidebarLink = styled.a`
  text-decoration: none;
  color: grey;
  font-weight: bold;

  &:hover {
    color: #007BFF;
  }
`;

const Content = styled.main`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  max-height: 100vh;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionHeading = styled.h2`
  color: #007BFF;
`;


const FAQPage = () => (
<div>
  <Header />
  <Container>
    <center><p>This section is under Maintainance</p></center>
  </Container>
<Footer />
</div>
  );

export default FAQPage;
