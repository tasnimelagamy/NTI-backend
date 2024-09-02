declare namespace NodeJs{
   interface ProcessEnv{
  readonly  PORT:any;
  readonly BASE_URL:string;
  readonly  DB:string;
  readonly NODE_ENV: String;
  readonly JWT_SECRET_KEY:string;
  readonly JWT_EXPIRED_TIME:string;
  readonly JWT_RESET_EXPIRED_TIME:string;
  readonly EMAIL_HOST:string;
  readonly EMAIL_USERNAME:string;
  readonly EMAIL_PASSWORD:string;
  readonly APP_NAME:string;
   } 
}