import { defineMessages } from 'react-intl';

export default defineMessages({
  appTitle: {
    id: 'views.app_title',
    description: 'Application name',
    defaultMessage: 'TRANSLATE_ME MyCharts',
  },
  appSubtitle: {
    id: 'views.app_subtitle',
    description: 'Application subtitle',
    defaultMessage: 'TRANSLATE_ME Make your charts online',
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
  back: {
    id: 'views.recover_password.back',
    description: 'Back button text',
    defaultMessage: 'TRANSLATE_ME Back to sign in',   
  },
  emailSended: {
    id: 'views.recover_password.email_sended_info',
    description: 'Message after correctly sended email to change password',
    defaultMessage: 'TRANSLATE_ME Email was send successfully'
  }
});