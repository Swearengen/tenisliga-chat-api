import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { allowAccesOrigin } from './utils'
import { chatkit } from '../chatkit'

export const authenticate: APIGatewayProxyHandler = async (event) => {
	const authData = await chatkit.authenticate(event.queryStringParameters.user_id)

	return {
		statusCode: authData.status,
		headers: allowAccesOrigin,
		body: JSON.stringify(authData.body),
	}
}