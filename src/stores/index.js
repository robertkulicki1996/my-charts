// import all stores
import configStore from './config';
import authStore from './auth';
import dataStore from './data';

// charts settings stores
import lineChartSettingsStore from './ChartSettings/LineChartSettings';
import barChartSettingsStore from './ChartSettings/BarChartSettings';
import radarChartSettingsStore from './ChartSettings/RadarChartSettings';
import doughnutAndPieChartSettingsStore from './ChartSettings/DoughnutAndPieChartSettings';
import polarAreaChartSettingsStore from './ChartSettings/PolarAreaChartSettings';
import bubbleChartSettingsStore from './ChartSettings/BubbleChartSettings';

const exportStores = {
	configStore,
	authStore,
	dataStore,
	lineChartSettingsStore,
	barChartSettingsStore,
	radarChartSettingsStore,
	doughnutAndPieChartSettingsStore,
	polarAreaChartSettingsStore,
	bubbleChartSettingsStore
}

// export all stores as default
export default exportStores;

export { lineChartSettingsStore };
export { barChartSettingsStore };
export { polarAreaChartSettingsStore };
export { doughnutAndPieChartSettingsStore };
export { bubbleChartSettingsStore };
export { radarChartSettingsStore };