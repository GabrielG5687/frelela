import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../styles/GlobalStyles';
import { AuthService } from '../services/auth';

const HeaderContainer = styled.header`
  background-color: ${colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: ${colors.primary};
  font-size: 1.5rem;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled.button<{ $active?: boolean }>`
  background: none;
  color: ${props => props.$active ? colors.primary : colors.text};
  font-size: 1rem;
  font-weight: ${props => props.$active ? '600' : '400'};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: ${colors.lightGray};
  }
`;

const LogoutButton = styled.button`
  background-color: ${colors.danger};
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo onClick={() => navigate('/')}>FreelaFácil</Logo>
        <Nav>
          <NavLink 
            $active={location.pathname === '/'} 
            onClick={() => navigate('/')}
          >
            Trabalhos
          </NavLink>
          <NavLink 
            $active={location.pathname === '/create'} 
            onClick={() => navigate('/create')}
          >
            Criar Trabalho
          </NavLink>
          <NavLink 
            $active={location.pathname === '/profile'} 
            onClick={() => navigate('/profile')}
          >
            Perfil
          </NavLink>
          <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};
