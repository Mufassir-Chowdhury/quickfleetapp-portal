import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const stats = {
		activeJobs: 12,
		availableDrivers: 8,
		completedToday: 24,
		pendingRequests: 5
	};

	const activeJobs = [
		{
			id: 'JOB001',
			pickup: '123 Oxford St, London',
			dropoff: '456 Baker St, London',
			driver: 'John Doe',
			status: 'in-transit',
			estimatedTime: '15:30',
			createdAt: '10:15 AM'
		},
		{
			id: 'JOB002',
			pickup: '789 Piccadilly, London',
			dropoff: '321 Bond St, London',
			driver: 'Jane Smith',
			status: 'assigned',
			estimatedTime: '16:00',
			createdAt: '10:30 AM'
		}
	];

	const availableDrivers = [
		{
			id: 'DRV001',
			name: 'John Doe',
			status: 'available',
			vehicle: 'SUV',
			lastActive: '2 mins ago'
		},
		{
			id: 'DRV002',
			name: 'Jane Smith',
			status: 'busy',
			vehicle: 'Sedan',
			lastActive: 'Now'
		}
	];

	const recentActivity = [
		{
			id: 'ACT001',
			type: 'job_completed',
			message: 'Job #JOB001 completed by John Doe',
			time: '10 mins ago'
		},
		{
			id: 'ACT002',
			type: 'new_job',
			message: 'New job request from Oxford Street',
			time: '15 mins ago'
		}
	];

	return {
		props: {
			stats,
			activeJobs,
			availableDrivers,
			recentActivity
		}
	};
};
