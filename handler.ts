import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { chatkit } from './chatkit'

export const hello: APIGatewayProxyHandler = async () => {
  const generalRoomId = chatkit.envVarTest()

  return {
    statusCode: 200,
    body: generalRoomId,
  };
}
