import * as _ from 'lodash'

export default class RequestBodyParser {

	private body: Object

	public constructor (body: Object) {
		this.body = body
	}

	public appId (): string {
		return _.get(this.body, 'context.System.application.applicationId')
	}

	public type (): string {
		return _.get(this.body, 'request.type')
	}

	public intent (): any {
		if (this.type() !== 'IntentRequest') {
			return undefined
		}
		return _.get(this.body, 'request.intent')
	}

	public slots (): any {
		if (this.type() !== 'IntentRequest' || !this.intent()) {
			return undefined
		}
		return _.get(this.body, 'request.intent.slots')
	}
}
