import type { JobStatus } from './types';

export function getDriverStatusColor(status: string): string {
	const colors: { [key: string]: string } = {
		available: 'bg-green-100 text-green-800',
		busy: 'bg-yellow-100 text-yellow-800',
		offline: 'bg-gray-100 text-gray-800',
		'in-transit': 'bg-blue-100 text-blue-800',
		assigned: 'bg-purple-100 text-purple-800',
		completed: 'bg-green-100 text-green-800'
	};
	return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getJobStatusColor(status: JobStatus): string {
	const colors = {
		pending: 'bg-yellow-100 text-yellow-800',
		assigned: 'bg-blue-100 text-blue-800',
		'in-transit': 'bg-purple-100 text-purple-800',
		completed: 'bg-green-100 text-green-800',
		cancelled: 'bg-red-100 text-red-800'
	};
	return colors[status] || 'bg-gray-100 text-gray-800';
}
