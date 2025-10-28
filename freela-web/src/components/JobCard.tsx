import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { colors } from '../styles/GlobalStyles';
import { Job } from '../types';

const Card = styled.div`
  background-color: ${colors.white};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  color: ${colors.text};
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: ${colors.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  color: ${colors.success};
  font-size: 1.25rem;
  font-weight: 600;
`;

const Author = styled.span`
  color: ${colors.textSecondary};
  font-size: 0.85rem;
`;

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/job/${job.id}`)}>
      <Title>{job.titulo}</Title>
      <Description>{job.descricao}</Description>
      <Footer>
        <Price>R$ {parseFloat(job.valorSugerido).toFixed(2)}</Price>
        <Author>Por {job.usuario.nome}</Author>
      </Footer>
    </Card>
  );
};
