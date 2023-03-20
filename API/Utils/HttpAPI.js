/**
 *
 * @param response
 * @param data
 * @return {{headers: {"Access-Control-Allow-Origin": string, "Access-Control-Allow-Methods": string, "Access-Control-Allow-Headers": string}, body: string, statusCode: number}}
 */
module.exports.successResponse = (response, data) => {
	
	return response.status(200).json({...data})
	
}

module.exports.serverErrorResponse = (response, data) => {
	return response.status(500).json({...data})
}

module.exports.errorResponse = (response,status, data) => {
	return response.status(status).json({...data})
}
