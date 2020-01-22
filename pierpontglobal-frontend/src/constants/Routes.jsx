const ApplicationRoutes = {
  home: '/',
  changePassword: '/reset_password',
  oauthPage: '/oauth/login',
  marketplace: '/marketplace',
  carPage: '/marketplace/car',
  registrationPage: '/user/confirm',
  profilePage: {
    default: '/user',
    purchase: '/user/purchase',
    pending: '/user/pending',
    financial: '/user/financial',
    subscription: '/user/subscription',
    transactions: '/user/transactions',
  },
  notificationPage: '/user/notifications',
  contactPage: '/contact-us',
  supportPage: '/support',
  supportPageTutorial: '/support/:tutorial',
  constructionPage: '/construction',
  constructionCartPage: '/construction/cart',
}

export default ApplicationRoutes;