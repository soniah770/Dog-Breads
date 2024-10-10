import React, { Suspense, lazy } from 'react';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { useFetchBreeds } from '../hooks/useFetchBreeds';

const DogBreedCard = lazy(() => import('../components/DogBreedCard'));

const Home: React.FC = () => {
  const { data, error, isLoading } = useFetchBreeds();

  if (error) return <div>Failed to load</div>;
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#E6E0E9', minHeight: '100vh', padding: '20px' }}>
      <Container>
        <Box display="flex" justifyContent="flex-start" alignItems="center" mb={4}>
          <Typography variant="h6" sx={{ fontWeight: 500, marginRight: '8px' }}>Breeds:</Typography>
          <Typography variant="h6" sx={{ color: '#666666', fontWeight: 300 }}>{data.length}</Typography>
        </Box>

        <Suspense fallback={<CircularProgress />}>
          <Grid container spacing={3}>
            {data?.map((breed) => (
              <Grid item key={breed.id} xs={12} sm={6} md={4} lg={3}>
                <DogBreedCard
                  name={breed.name}
                  weight={breed.weight.metric}
                  temperament={breed.temperament}
                  origin={breed.origin}
                  lifeSpan={breed.life_span}
                  imageUrl={breed.reference_image_id ? `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg` : '/images/placeholder.png'}
                />
              </Grid>
            ))}
          </Grid>
        </Suspense>
      </Container>
    </Box>
  );
};

export default Home;
