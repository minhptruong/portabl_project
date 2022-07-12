export class DataStore {
	constructor() {
		this.data = [];
	}

	addData(item) {
		var data_item = item.results[0];
		data_item.time = Date.now();

		this.data.push(data_item);
	}

	getAllData() {
		return this.data;
	}

	getDataRange(start, end) {
		const results = this.data.filter(item => item.time >= start && item.time <= end);
		return results;
	}
}