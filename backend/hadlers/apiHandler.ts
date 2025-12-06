import awsServerlessExpress from '@vendia/serverless-express';
import app from '../app';

const server = awsServerlessExpress({ app });

export const handler = server;
