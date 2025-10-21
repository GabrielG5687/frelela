import React from 'react';
import styled from 'styled-components/native';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onPress: () => void;
}

const Container = styled.TouchableOpacity`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 3;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  line-height: 20px;
`;

const ValueText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #007AFF;
`;

const AuthorText = styled.Text`
  font-size: 12px;
  color: #888;
  margin-top: 8px;
`;

export const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {
  return (
    <Container onPress={onPress}>
      <Title>{job.titulo}</Title>
      <Description numberOfLines={2}>{job.descricao}</Description>
      <ValueText>R$ {parseFloat(job.valorSugerido).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</ValueText>
      <AuthorText>Por: {job.usuario.nome}</AuthorText>
    </Container>
  );
};