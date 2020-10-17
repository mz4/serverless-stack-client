export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: "pk_test_51HMUVZAJXU2y8Uo9l84fiTHoDK6rugHqy376fIQw5TbYeuDrKLPihJqq1C6PFrQi23gOEiA5msR2tLRivUkq2aJR00ep8M8jHy",
  s3: {
    REGION: "eu-west-1",
    BUCKET: "notes-app-api-prod-serverlessdeploymentbucket-1wbcltx86or6r"
  },
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://u6p0znjckd.execute-api.eu-west-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_fTw70Vnwh",
    APP_CLIENT_ID: "32snsneckpga32kjvmt91v712d",
    IDENTITY_POOL_ID: "eu-west-1:6572fa2b-40c7-4578-bd55-68b7771c8423"
  }
};

export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: "pk_test_51HMUVZAJXU2y8Uo9l84fiTHoDK6rugHqy376fIQw5TbYeuDrKLPihJqq1C6PFrQi23gOEiA5msR2tLRivUkq2aJR00ep8M8jHy",
  s3: {
    REGION: "eu-west-1",
    BUCKET: "notes-app-api-prod-serverlessdeploymentbucket-1wbcltx86or6r"
  },
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://u6p0znjckd.execute-api.eu-west-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_fTw70Vnwh",
    APP_CLIENT_ID: "32snsneckpga32kjvmt91v712d",
    IDENTITY_POOL_ID: "eu-west-1:6572fa2b-40c7-4578-bd55-68b7771c8423"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};