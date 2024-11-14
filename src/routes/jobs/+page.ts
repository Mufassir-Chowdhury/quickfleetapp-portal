import type { Job } from '$lib/types';
import type { PageLoad } from '../$types';

export const load: PageLoad = async () => {
	const sampleJobs: Job[] = [
		{
			id: 'JOB001',
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
			driver: {
				id: 'DRV001',
				name: 'John Doe',
				vehicle: 'SUV',
				phoneNumber: '+44 123 456 7890'
			},
			status: 'in-transit',
			estimatedDuration: '15:30',
			fare: 25.5,
			createdAt: '2024-11-14T10:15:00Z',
			notes: 'Priority pickup',
			customerName: null,
			date: null,
			time: null,
			passengers: null,
			vehicleType: '',
			updatedAt: ''
		},
		{
			id: 'JOB002',
			pickup: {
				address: '789 Piccadilly, London',
				latitude: 51.5099,
				longitude: -0.1337
			},
			dropoff: {
				address: '321 Bond St, London',
				latitude: 51.5142,
				longitude: -0.1428
			},
			status: 'pending',
			estimatedDuration: '16:00',
			fare: 30.0,
			createdAt: '2024-11-14T10:30:00Z',
			customerName: null,
			date: null,
			time: null,
			passengers: null,
			vehicleType: '',
			notes: '',
			updatedAt: ''
		}
	];

	return {
		props: {
			sampleJobs
		}
	};
};
