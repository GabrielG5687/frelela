import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/GlobalStyles';
import { Header } from '../components/Header';
import { JobCard } from '../components/JobCard';
import { JobService } from '../services/job';
import { Job } from '../types';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${colors.lightGray};
  border-radius: 12px;
  font-size: 1rem;
  margin-bottom: 2rem;
  background-color: ${colors.white};

  &:focus {
    border-color: ${colors.primary};
  }
`;

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${colors.textSecondary};
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${colors.textSecondary};
  font-size: 1.2rem;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${colors.danger};
`;

export const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = jobs.filter(job =>
        job.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.descricao.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchQuery, jobs]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await JobService.getJobs();
      setJobs(data);
      setFilteredJobs(data);
    } catch (err) {
      setError('Erro ao carregar trabalhos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header />
      <Content>
        <SearchBar
          type="text"
          placeholder="Buscar trabalhos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {loading && <LoadingState>Carregando trabalhos...</LoadingState>}
        {error && <ErrorState>{error}</ErrorState>}
        {!loading && !error && filteredJobs.length === 0 && (
          <EmptyState>
            {searchQuery ? 'Nenhum trabalho encontrado' : 'Nenhum trabalho disponível'}
          </EmptyState>
        )}
        <JobsGrid>
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </JobsGrid>
      </Content>
    </Container>
  );
};
