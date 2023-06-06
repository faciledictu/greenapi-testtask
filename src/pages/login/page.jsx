import { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { useAuth } from '../../providers/AuthProvider.jsx';

const LoginPage = () => {
  const [authError, setAuthError] = useState(null);
  const { logIn } = useAuth();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      idInstance: '',
      apiTokenInstance: '',
    },
    onSubmit: async (values) => {
      try {
        setAuthError(null);
        await logIn(values);
      } catch (error) {
        if (error.isAxiosError) {
          switch (error.response?.status) {
            case 401:
            case 403:
              setAuthError('authFailed');
              break;
            default:
              toast.error(t('errors.noConnection'));
          }
        }
        if (error.isAuthError) {
          switch (error.message) {
            case 'notAuthorized':
              setAuthError('notAuthorized');
              break;
            case 'blocked':
              setAuthError('blocked');
              break;
            default:
              setAuthError('authError');
          }
        }
      }
      formik.setSubmitting(false);
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={8} xxl={4}>
          <Card>
            <Card.Body className="row p-5">
              <Form onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4 h3">{t('logIn.header')}</h1>

                <FloatingLabel
                  controlId="idInstance"
                  label={t('logIn.idInstance')}
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    value={formik.values.idInstance}
                    placeholder={t('logIn.idInstance')}
                    name="idInstance"
                    onChange={formik.handleChange}
                    required
                    autoFocus
                    disabled={formik.isSubmitting}
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="apiTokenInstance"
                  label={t('logIn.apiTokenInstance')}
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    value={formik.values.apiTokenInstance}
                    placeholder={t('logIn.apiTokenInstance')}
                    name="apiTokenInstance"
                    onChange={formik.handleChange}
                    required
                    disabled={formik.isSubmitting}
                  />
                </FloatingLabel>

                {authError ? <Alert variant="danger">{t(`errors.${authError}`)}</Alert> : null}

                <Button
                  variant="outline-primary"
                  type="submit"
                  size="lg"
                  className="mb-3 w-100"
                  disabled={formik.isSubmitting}
                >
                  {t('logIn.logInButton')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-muted text-center">
                <p>
                  {`${t('logIn.getInstanceHint')} `}
                  <a href="https://green-api.com/">green-api.com</a>
                </p>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
