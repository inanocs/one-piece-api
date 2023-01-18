import dotenv from 'dotenv'
dotenv.config()
export const CONFIG = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || 'dev',
}
