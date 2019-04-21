import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { chatkit } from '../chatkit'

export const authenticate: APIGatewayProxyHandler = async (event) => {
	const authData = await chatkit.authenticate(event.queryStringParameters.user_id)

	return {
		statusCode: authData.status,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
		},
		body: JSON.stringify(authData.body),
	}
}