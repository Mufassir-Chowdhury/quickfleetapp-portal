import type { Job } from '$lib/types';
import type { PageLoad } from '../$types';

export const load: PageLoad = async () => {
	const sampleJobs: Job[] = [
		{
			id: 'JOB003',
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
			date: '2024-11-14T10:15:00Z',
			time: null,
			passengers: null,
			vehicleType: '',
			notes: '',
			updatedAt: ''
		},
		{
			id: 'JOB001',
			pickup: {
				address: '123 Oxford St, London',
				latitude: 51.5144636,
				longitude: -0.1448506
			},
			dropoff: {
				address: '456 Baker St, London',
				latitude: 51.523685,
				longitude: -0.158784
			},
			driver: {
				id: 'DRV001',
				name: 'John Doe',
				vehicle: 'SUV',
				phoneNumber: '+44 123 456 7890'
			},
			status: 'in-transit',
			estimatedDuration: '15:30',
			createdAt: '10:15 AM',
			customerName: null,
			date: '2024-11-14T10:15:00Z',
			time: null,
			passengers: null,
			vehicleType: '',
			fare: 0,
			notes: '',
			updatedAt: ''
		},
		{
			id: 'JOB002',
			pickup: {
				address: '789 Piccadilly, London',
				latitude: 51.507351,
				longitude: -0.127758
			},
			dropoff: {
				address: '321 Bond St, London',
				latitude: 51.5144636,
				longitude: -0.1448506
			},
			driver: {
				id: 'DRV002',
				name: 'Jane Smith',
				vehicle: 'Sedan',
				phoneNumber: '+44 123 456 7890'
			},
			status: 'assigned',
			estimatedDuration: '16:00',
			createdAt: '10:30 AM',
			customerName: null,
			date: '2024-11-14T10:15:00Z',
			time: null,
			passengers: null,
			vehicleType: '',
			fare: 0,
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
