import { makeAutoObservable } from 'mobx';
import PlanStore from './PlanStore';

class RootStore {
  planStore = new PlanStore();

  constructor() {
    makeAutoObservable(this);
  }
}

const rootStore = new RootStore();
export default rootStore;