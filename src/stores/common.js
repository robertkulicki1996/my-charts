import { observable } from 'mobx';

export class CommonStore {

  // canvas reference
  @observable canvasRef = null;
    
  // Observable current line chart object required to globaly update
  @observable lineChartObject = null;
}

const commonStore = new CommonStore();

export default commonStore;