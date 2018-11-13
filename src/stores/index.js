// import all stores
import configStore from './config';
import authStore from './auth';
import dataStore from './data';

// charts settings
import lineChartSettingsStore from './lineChartSettings';

// all stores in application
const exportStores = {
	configStore,
	authStore,
	dataStore,
	lineChartSettingsStore
}

// export all stores as default
export default exportStores;