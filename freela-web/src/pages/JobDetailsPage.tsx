import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../styles/GlobalStyles';
import { Header } from '../components/Header';
import { JobService } from '../services/job';
import { Job } from '../types';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const Card = styled.div`
  background-color: ${colors.white};
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  background: none;
  color: ${colors.primary};
  font-size: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  color: ${colors.text};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Price = styled.div`
  color: ${colors.success};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${colors.text};
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
`;

const Description = styled.p`
  color: ${colors.textSecondary};
  font-size: 1rem;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const AuthorInfo = styled.div`
  background-color: ${colors.background};
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const AuthorName = styled.p`
  color: ${colors.text};
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const AuthorDetail = styled.p`
  color: ${colors.textSecondary};
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
`;

const ContactButton = styled.a`
  display: inline-block;
  background-color: #25D366;
  color: ${colors.white};
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  transition: opacity 0.2s;
  text-decoration: none;

  &:hover {
    opacity: 0.9;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${colors.textSecondary};
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${colors.danger};
`;

export const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadJob(id);
    }
  }, [id]);

  const loadJob = async (jobId: string) => {
    try {
      setLoading(true);
      const data = await JobService.getJobById(jobId);
      setJob(data);
    } catch (err) {
      setError('Erro ao carregar detalhes do trabalho');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppContact = () => {
    if (job?.usuario.telefone) {
      const phone = job.usuario.telefone.replace(/\D/g, '');
      const message = encodeURIComponent(
        `Olá! Vi seu trabalho "${job.titulo}" no FreelaFácil e gostaria de conversar sobre ele.`
      );
      window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
    }
  };

  if (loading) {
    return (
      <Container>
        <Header />
        <Content>
          <LoadingState>Carregando...</LoadingState>
        </Content>
      </Container>
    );
  }

  if (error || !job) {
    return (
      <Container>
        <Header />
        <Content>
          <ErrorState>{error || 'Trabalho não encontrado'}</ErrorState>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Content>
        <BackButton onClick={() => navigate('/')}>
          ← Voltar
        </BackButton>
        <Card>
          <Title>{job.titulo}</Title>
          <Price>R$ {parseFloat(job.valorSugerido).toFixed(2)}</Price>
          
          <Section>
            <SectionTitle>Descrição</SectionTitle>
            <Description>{job.descricao}</Description>
          </Section>

          <Section>
            <SectionTitle>Informações do Contratante</SectionTitle>
            <AuthorInfo>
              <AuthorName>{job.usuario.nome}</AuthorName>
              <AuthorDetail>📧 {job.usuario.email}</AuthorDetail>
              <AuthorDetail>📱 {job.usuario.telefone}</AuthorDetail>
            </AuthorInfo>
          </Section>

          <ContactButton onClick={handleWhatsAppContact}>
            💬 Entrar em contato via WhatsApp
          </ContactButton>
        </Card>
      </Content>
    </Container>
  );
};
