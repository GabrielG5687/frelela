import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../styles/GlobalStyles';
import { Header } from '../components/Header';
import { JobCard } from '../components/JobCard';
import { JobService } from '../services/job';
import { AuthService } from '../services/auth';
import { Job, User } from '../types';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileCard = styled.div`
  background-color: ${colors.white};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const ProfileInfo = styled.div``;

const Name = styled.h1`
  color: ${colors.text};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Detail = styled.p`
  color: ${colors.textSecondary};
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

const EditButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Section = styled.div`
  margin-top: 3rem;
`;

const SectionTitle = styled.h2`
  color: ${colors.text};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${colors.textSecondary};
  background-color: ${colors.white};
  border-radius: 12px;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${colors.textSecondary};
`;

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const userData = AuthService.getCurrentUser();
      setUser(userData);
      
      const userJobs = await JobService.getUserJobs();
      setJobs(userJobs);
    } catch (err) {
      console.error('Erro ao carregar perfil:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Header />
        <Content>
          <LoadingState>Carregando perfil...</LoadingState>
        </Content>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Header />
        <Content>
          <EmptyState>Erro ao carregar perfil</EmptyState>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Content>
        <ProfileCard>
          <ProfileHeader>
            <ProfileInfo>
              <Name>{user.nome}</Name>
              <Detail>📧 {user.email}</Detail>
              <Detail>📱 {user.telefone}</Detail>
              <Detail>📍 {user.endereco}</Detail>
            </ProfileInfo>
            <EditButton onClick={() => navigate('/edit-profile')}>
              Editar Perfil
            </EditButton>
          </ProfileHeader>
        </ProfileCard>

        <Section>
          <SectionTitle>Meus Trabalhos ({jobs.length})</SectionTitle>
          {jobs.length === 0 ? (
            <EmptyState>
              Você ainda não publicou nenhum trabalho.
              <br />
              <EditButton 
                onClick={() => navigate('/create')}
                style={{ marginTop: '1rem' }}
              >
                Criar Primeiro Trabalho
              </EditButton>
            </EmptyState>
          ) : (
            <JobsGrid>
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </JobsGrid>
          )}
        </Section>
      </Content>
    </Container>
  );
};
