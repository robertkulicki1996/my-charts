import { defineMessages } from 'react-intl';

export default defineMessages({
  appName: {
    id: 'views.app_name',
    description: 'Application name',
    defaultMessage: 'TRANSLATE_ME MyCharts',
  },
  recoverPasswordHeader: {
    id: 'views.recover_password.header',
    description: 'Recover password form header',
    defaultMessage: 'TRANSLATE_ME Recover password',
  },
  recoverPasswordSubheader: {
    id: 'views.recover_password.subheader',
    description: 'Recover password form subheader',
    defaultMessage: 'TRANSLATE_ME Enter the email you used to sign up.',
  },
  emailPlaceholder: {
    id: 'views.recover_password.email_field.placeholder',
    description: 'Email input placeholder',
    defaultMessage: 'TRANSLATE_ME Email',
  },
  submit: {
    id: 'views.recover_password.submit',
    description: 'Submit button text',
    defaultMessage: 'TRANSLATE_ME Submit',
  },
  emailSended: {
    id: 'views.recover_password.email_sended_info',
    description: 'Message after correctly sended email to change password',
    defaultMessage: 'TRANSLATE_ME Email was send successfully'
  }
});