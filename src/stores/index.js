// import all stores
import configStore from './config.store';
import authStore from './auth.store';

// all stores in application
const exportStores = {
    configStore,
    authStore
}

// export all stores as default
export default exportStores;