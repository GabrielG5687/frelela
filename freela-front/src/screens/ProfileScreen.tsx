import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { TabParamList, User, Job } from '../types';
import { AuthService } from '../services/auth';
import { JobService } from '../services/job';

type ProfileScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f5f5f5;
`;

const Header = styled.View`
  background-color: #007AFF;
  padding: 20px;
  padding-top: 50px;
  padding-bottom: 30px;
  align-items: center;
`;

const ProfileImage = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: white;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const ProfileInitial = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #007AFF;
`;

const UserName = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const UserPhone = styled.Text`
  color: white;
  font-size: 16px;
  opacity: 0.9;
`;

const Content = styled.View`
  padding: 20px;
`;

const Section = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 4;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const InfoLabel = styled.Text`
  font-size: 14px;
  color: #666;
  font-weight: bold;
`;

const InfoValue = styled.Text`
  font-size: 14px;
  color: #333;
  flex: 1;
  text-align: right;
`;

const JobItem = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  padding-vertical: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const JobInfo = styled.View`
  flex: 1;
`;

const EditJobButton = styled.TouchableOpacity`
  background-color: #007AFF;
  border-radius: 6px;
  padding: 8px 12px;
`;

const EditJobButtonText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const JobTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const JobValue = styled.Text`
  font-size: 14px;
  color: #007AFF;
  font-weight: bold;
`;

const ButtonRow = styled.View`
  margin-top: 20px;
  gap: 10px;
`;

const EditButton = styled.TouchableOpacity`
  background-color: #007AFF;
  border-radius: 8px;
  padding: 15px;
  align-items: center;
`;

const LogoutButton = styled.TouchableOpacity`
  background-color: #FF3B30;
  border-radius: 8px;
  padding: 15px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const EmptyText = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: center;
  padding: 20px;
`;

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  // Atualiza os dados quando a tela recebe foco (ex: após criar um trabalho)
  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      const userData = await AuthService.getCurrentUser();
      const jobsData = await JobService.getUserJobs();
      
      setUser(userData);
      setUserJobs(jobsData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    // @ts-ignore - Navigation to root stack
    navigation.getParent()?.navigate('EditProfile');
  };

  const handleEditJob = (jobId: string) => {
    // @ts-ignore - Navigation to root stack
    navigation.getParent()?.navigate('EditJob', { jobId });
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: async () => {
            await AuthService.logout();
            // @ts-ignore - Navigation reset to root stack
            navigation.getParent()?.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };

  if (loading || !user) {
    return (
      <Container>
        <Header>
          <UserName>Carregando...</UserName>
        </Header>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <ProfileImage>
          <ProfileInitial>{user.nome.charAt(0).toUpperCase()}</ProfileInitial>
        </ProfileImage>
        <UserName>{user.nome}</UserName>
        <UserPhone>{user.telefone}</UserPhone>
      </Header>

      <Content>
        <Section>
          <SectionTitle>Informações Pessoais</SectionTitle>
          
          <InfoRow>
            <InfoLabel>Nome:</InfoLabel>
            <InfoValue>{user.nome}</InfoValue>
          </InfoRow>
          
          <InfoRow>
            <InfoLabel>Telefone:</InfoLabel>
            <InfoValue>{user.telefone}</InfoValue>
          </InfoRow>
          
          {user.email && (
            <InfoRow>
              <InfoLabel>Email:</InfoLabel>
              <InfoValue>{user.email}</InfoValue>
            </InfoRow>
          )}
          
          <InfoRow>
            <InfoLabel>Endereço:</InfoLabel>
            <InfoValue>{user.endereco}</InfoValue>
          </InfoRow>
        </Section>

        <Section>
          <SectionTitle>Meus Trabalhos ({userJobs.length})</SectionTitle>
          
          {userJobs.length > 0 ? (
            userJobs.map((job) => (
              <JobItem key={job.id}>
                <JobInfo>
                  <JobTitle>{job.titulo}</JobTitle>
                  <JobValue>R$ {parseFloat(job.valorSugerido).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</JobValue>
                </JobInfo>
                <EditJobButton onPress={() => handleEditJob(job.id)}>
                  <EditJobButtonText>Editar</EditJobButtonText>
                </EditJobButton>
              </JobItem>
            ))
          ) : (
            <EmptyText>Você ainda não publicou nenhum trabalho.</EmptyText>
          )}
        </Section>

        <ButtonRow>
          <EditButton onPress={handleEditProfile}>
            <ButtonText>Editar Perfil</ButtonText>
          </EditButton>

          <LogoutButton onPress={handleLogout}>
            <ButtonText>Sair da Conta</ButtonText>
          </LogoutButton>
        </ButtonRow>
      </Content>
    </Container>
  );
};