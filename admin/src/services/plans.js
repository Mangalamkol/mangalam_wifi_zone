import api from './api';

export const getPlans = () => {
  return api.get('/plans');
};

export const createPlan = (plan) => {
  return api.post('/plans', plan);
};
