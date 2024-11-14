import type { Job } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const sampleJob: Job = {
		id: 'JOB001',
		customerName: 'John Smith',
		pickup: {
			address: '123 Oxford St, London',
			latitude: 51.5152,
			longitude: -0.1414
		},
		dropoff: {
			address: '456 Baker St, London',
			latitude: 51.5237,
			longitude: -0.1583
		},
		date: '2024-11-14',
		time: '15:30',
		passengers: 2,
		vehicleType: 'sedan',
		estimatedDuration: '30 minutes',
		fare: 25.5,
		status: 'pending',
		notes: 'Priority pickup',
		createdAt: '2024-11-14T10:15:00Z',
		updatedAt: '2024-11-14T10:15:00Z'
	};
	return {
		props: {
			job: sampleJob
		}
	};
};
