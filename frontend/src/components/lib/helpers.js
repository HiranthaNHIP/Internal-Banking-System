export function getOrderStatus(status) {
	switch (status) {
		case 'CLOSED':
			return (
				<span className="w-[70px] h-[30px] flex justify-center items-center capitalize rounded text-[12pt] text-white bg-red-500">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'HOLD':
			return (
				<span className="w-[70px] h-[30px] flex justify-center items-center capitalize rounded text-[12pt] text-white bg-yellow-500">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'ACTIVE':
			return (
				<span className="w-[70px] h-[30px] flex justify-center items-center capitalize rounded text-[12pt] text-white bg-green-500">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		default:
			return (
				<span className="w-[90px] h-[30px] flex justify-center items-center capitalize rounded text-[12pt] text-white bg-green-500">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
	}
}

export function getNumberOfAccount(status) {
	switch (status) {
		case 'CLOSED':
			return (
				<span className="w-[70px] h-[30px] flex justify-center items-center capitalize rounded text-[12pt] text-white bg-red-500">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'HOLD':
			return (
				<span className="w-[70px] h-[30px] flex justify-center items-center capitalize rounded text-[12pt] text-white bg-yellow-500">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'ACTIVE':
			return (
				<span className="w-[70px] h-[30px] flex justify-center items-center capitalize rounded text-[12pt] text-white bg-green-500">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		default:
			return (
				<span className="w-[70px] h-[30px] flex justify-center items-center capitalize rounded text-[12pt] text-white bg-gray-500">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
	}
}