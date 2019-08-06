export default class ResponseBuilder {

	private body = {
		version: '1.0',
		response: {
			shouldEndSession: false
		}
	}

	private isMalformedSSML (ssml: string): boolean {
		return (ssml.startsWith('<speak>') && !ssml.endsWith('</speak>'))
			|| (!ssml.startsWith('<speak>') && ssml.endsWith('</speak>'))
	}

	private isValidSSML (text: string): boolean {
		return text.startsWith('<speak>') && text.endsWith('</speak>')
	}

	public say (ssml: string): ResponseBuilder {
		if (this.isMalformedSSML(ssml)) {
			throw new Error('Malformed SSML tags')
		}
		if (!this.isValidSSML(ssml)) {
			ssml = `<speak>${ssml}</speak>`
		}
		Object.assign(this.body.response, {
			outputSpeech: {
				type: 'SSML',
				ssml
			}
		})
		return this
	}

	public endSession (): ResponseBuilder {
		this.body.response.shouldEndSession = true
		return this
	}

	public build (): Object {
		return this.body
	}
}
