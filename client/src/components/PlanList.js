import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import rootStore from '../stores/RootStore';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';

const PlanList = observer(() => {
  const { planStore } = rootStore;

  useEffect(() => {
    planStore.fetchPlans();
  }, [planStore]);

  if (planStore.loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2}>
      {planStore.plans.map((plan) => (
        <Grid item xs={12} sm={6} md={4} key={plan.key}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {plan.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {plan.description}
              </Typography>
              <Typography variant="body2">
                Price: ₹{plan.price}
              </Typography>
              <Typography variant="body2">
                Duration: {plan.durationMinutes} minutes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});

export default PlanList;
