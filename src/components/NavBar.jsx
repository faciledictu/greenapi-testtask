import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useAuth } from '../providers/AuthProvider.jsx';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const { changeLanguage, resolvedLanguage } = i18n;

  return (
    <NavDropdown title={t('language')}>
      {i18n.languages
        .filter((lng) => lng !== resolvedLanguage)
        .map((lng) => (
          <NavDropdown.Item key={lng} onClick={() => changeLanguage(lng)}>
            {i18n.getFixedT(lng)('language')}
          </NavDropdown.Item>
        ))}
    </NavDropdown>
  );
};

const LoginSection = () => {
  const { loggedIn, getInstanceData, logOut } = useAuth();
  const { t } = useTranslation();

  if (loggedIn) {
    return (
      <>
        <Navbar.Text className="ms-auto">{`${t('logIn.idInstance')} ${
          getInstanceData().idInstance
        }`}</Navbar.Text>
        <Button variant="outline-secondary" size="sm" onClick={logOut}>
          {t('navBar.logOut')}
        </Button>
      </>
    );
  }

  return null;
};

const NavBar = () => {
  const { t } = useTranslation();
  return (
    <Navbar bg="white" expand="sm" variant="light" className="border-bottom">
      <Container className="gap-2">
        <Navbar.Brand as={Link} to="/">
          {t('appName')}
        </Navbar.Brand>
        <Navbar.Collapse id="navbar-settings">
          <Nav className="me-auto">
            <LanguageSelector />
          </Nav>
        </Navbar.Collapse>
        <LoginSection />
        <Navbar.Toggle aria-controls="navbar-settings" />
      </Container>
    </Navbar>
  );
};

export default NavBar;
