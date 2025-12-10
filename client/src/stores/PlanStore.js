import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

class PlanStore {
  plans = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchPlans() {
    this.loading = true;
    try {
      const response = await axios.get('/api/plans');
      runInAction(() => {
        this.plans = response.data;
        this.loading = false;
      });
    } catch (error) {
      console.error('Error fetching plans:', error);
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export default PlanStore;
