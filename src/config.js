const dev = {
  STRIPE_KEY: "pk_test_51HMUVZAJXU2y8Uo9l84fiTHoDK6rugHqy376fIQw5TbYeuDrKLPihJqq1C6PFrQi23gOEiA5msR2tLRivUkq2aJR00ep8M8jHy",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-api-dev-serverlessdeploymentbucket-1kzn60rexlghi"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://yue8kto1xh.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_7ioZBbJb1",
    APP_CLIENT_ID: "7rnmtjs06pum3acrt0jtas8lo5",
    IDENTITY_POOL_ID: "us-east-1:5797f968-ea5d-4536-874e-0aeb0a669d35"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_51HMUVZAJXU2y8Uo9l84fiTHoDK6rugHqy376fIQw5TbYeuDrKLPihJqq1C6PFrQi23gOEiA5msR2tLRivUkq2aJR00ep8M8jHy",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1v9w7kkxnznb7"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.serverless-stack.seed-demo.club/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_mLbfKylhm",
    APP_CLIENT_ID: "mli2vaupiq3ga29m4698m6mrl",
    IDENTITY_POOL_ID: "us-east-1:4e377eff-0617-4098-b218-673490ffab8d"
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