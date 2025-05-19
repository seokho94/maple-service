import { Injectable } from '@nestjs/common';

export type RequestEventHandler = {
	processRewardRequest(eventId: string, userId: string): Promise<any>;
};

@Injectable()
export class RequestEventFactory {
	private readonly handlers = new Map<string, RequestEventHandler>();

	registerHandler(eventType: string, handler: RequestEventHandler) {
		this.handlers.set(eventType, handler);
	}

	getHandler(eventType: string): RequestEventHandler {
		const handler = this.handlers.get(eventType);
		if (!handler) {
			throw new Error(`Unsupported event type: ${eventType}`);
		}
		return handler;
	}
}