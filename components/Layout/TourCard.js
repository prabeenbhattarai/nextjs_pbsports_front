// components/TourCard.js

import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
`;

const Card = styled.div`
  width: 250px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 10px;
  text-align: center;
`;

const TourTitle = styled.h3`
  margin: 10px 0;
  font-size: 18px;
`;

const TourDate = styled.p`
  margin: 0;
  color: #555;
`;

const tourData = [
  {
    imageSrc: '/tour/1.webp',
    title: 'F1 ARAMCO GRAN PREMIO DE ESPAÑA',
    date: '21 Jun - 23 Jun, 2024',
  },
  {
    imageSrc: '/tour/2.webp',
    title: 'Vitality Blast T20, 2024',
    date: '30 May - 14 Sep, 2024',
  },
  {
    imageSrc: '/tour/3.webp',
    title: 'Sher-E-Punjab T20, 2024',
    date: '10 Jun - 27 Jun, 2024',
  },
  {
    imageSrc: '/tour/4.webp',
    title: 'Copa America',
    date: '21 Jun - 15 Jul, 2024',
  },
  {
    imageSrc: '/tour/5.webp',
    title: 'Bengal Pro T20 League, 2024',
    date: '11 Jun - 28 Jun, 2024',
  },
];

const TourCard = () => (
  <CardContainer>
    {tourData.map((tour, index) => (
      <Card key={index}>
        <Image src={tour.imageSrc} alt={tour.title} />
        <Content>
          <TourTitle>{tour.title}</TourTitle>
          <TourDate>{tour.date}</TourDate>
        </Content>
      </Card>
    ))}
  </CardContainer>
);

export default TourCard;
