export interface Message {
	id: string;
	senderId: string;
	senderName: string;
	content: string;
	timestamp: string;
	isOperator: boolean;
}

export interface Notification {
	id: string;
	type: NotificationType;
	title: string;
	message: string;
	timestamp: string;
	read: boolean;
	jobId?: string;
	driverId?: string;
}

export type NotificationType =
	| 'job_created'
	| 'job_assigned'
	| 'job_completed'
	| 'message'
	| 'system';
