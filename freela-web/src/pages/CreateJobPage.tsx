import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../styles/GlobalStyles';
import { Header } from '../components/Header';
import { JobService } from '../services/job';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Card = styled.div`
  background-color: ${colors.white};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: ${colors.text};
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${colors.text};
  font-weight: 600;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    border-color: ${colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    border-color: ${colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: opacity 0.2s;
  background-color: ${props => props.$variant === 'secondary' ? colors.lightGray : colors.primary};
  color: ${props => props.$variant === 'secondary' ? colors.text : colors.white};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: ${colors.danger};
  font-size: 0.9rem;
`;

const SuccessMessage = styled.p`
  color: ${colors.success};
  font-size: 0.9rem;
`;

export const CreateJobPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    valorSugerido: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await JobService.createJob({
        ...formData,
        valorSugerido: parseFloat(formData.valorSugerido),
      });
      setSuccess('Trabalho criado com sucesso!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError('Erro ao criar trabalho. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header />
      <Content>
        <Card>
          <Title>Criar Novo Trabalho</Title>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="titulo">Título</Label>
              <Input
                id="titulo"
                type="text"
                name="titulo"
                placeholder="Ex: Desenvolvedor Web para projeto e-commerce"
                value={formData.titulo}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="descricao">Descrição</Label>
              <TextArea
                id="descricao"
                name="descricao"
                placeholder="Descreva os detalhes do trabalho..."
                value={formData.descricao}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="valorSugerido">Valor Sugerido (R$)</Label>
              <Input
                id="valorSugerido"
                type="number"
                name="valorSugerido"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={formData.valorSugerido}
                onChange={handleChange}
                required
              />
            </FormGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
            <ButtonGroup>
              <Button type="button" $variant="secondary" onClick={() => navigate('/')}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Criando...' : 'Criar Trabalho'}
              </Button>
            </ButtonGroup>
          </Form>
        </Card>
      </Content>
    </Container>
  );
};
