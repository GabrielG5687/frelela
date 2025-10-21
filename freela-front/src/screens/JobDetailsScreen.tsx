import React, { useState, useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Job } from '../types';
import { JobService } from '../services/job';

type JobDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'JobDetails'>;
type JobDetailsScreenRouteProp = RouteProp<RootStackParamList, 'JobDetails'>;

interface Props {
  navigation: JobDetailsScreenNavigationProp;
  route: JobDetailsScreenRouteProp;
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f5f5f5;
`;

const Content = styled.View`
  padding: 20px;
`;

const Card = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 4;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
`;

const ValueText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #007AFF;
  margin-bottom: 16px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #666;
  line-height: 24px;
  margin-bottom: 20px;
`;

const AuthorInfo = styled.View`
  border-top-width: 1px;
  border-top-color: #eee;
  padding-top: 16px;
`;

const AuthorName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const PhoneText = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
`;

const WhatsAppButton = styled.TouchableOpacity`
  background-color: #25D366;
  border-radius: 8px;
  padding: 15px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const LoadingText = styled.Text`
  font-size: 16px;
  color: #666;
`;

export const JobDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const { jobId } = route.params;

  useEffect(() => {
    loadJobDetails();
  }, [jobId]);

  const loadJobDetails = async () => {
    try {
      const jobData = await JobService.getJobById(jobId);
      setJob(jobData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do trabalho.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppPress = () => {
    if (!job) return;
    
    const message = encodeURIComponent(`Olá! Vi seu trabalho "${job.titulo}" no FreelaFácil e gostaria de conversar.`);
    const url = `whatsapp://send?phone=55${job.usuario.telefone}&text=${message}`;
    
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Erro', 'WhatsApp não está instalado no dispositivo.');
        }
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.');
      });
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <LoadingText>Carregando...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <Container>
      <Content>
        <Card>
          <Title>{job.titulo}</Title>
          <ValueText>R$ {parseFloat(job.valorSugerido).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</ValueText>
          
          <SectionTitle>Descrição</SectionTitle>
          <Description>{job.descricao}</Description>
          
          <AuthorInfo>
            <SectionTitle>Contato</SectionTitle>
            <AuthorName>{job.usuario.nome}</AuthorName>
            <PhoneText>Telefone: {job.usuario.telefone}</PhoneText>
            
            <WhatsAppButton onPress={handleWhatsAppPress}>
              <ButtonText>📱 Abrir no WhatsApp</ButtonText>
            </WhatsAppButton>
          </AuthorInfo>
        </Card>
      </Content>
    </Container>
  );
};