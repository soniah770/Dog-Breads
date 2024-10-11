// Home.tsx
import React, { Suspense, lazy, useState } from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Button } from '@mui/material';
import { useFetchBreeds } from '../hooks/useFetchBreeds';

const DogBreedCard = lazy(() => import('../components/DogBreedCard'));

const Home: React.FC = () => {
  const [page, setPage] = useState(1); 
  const { data, error, isLoading } = useFetchBreeds(page, 12); 
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (error) return <div>Failed to load</div>;

  return (
    <Box sx={{ backgroundColor: '#E6E0E9', minHeight: '100vh', padding: '20px' }}>
      <Container>
        <Box display="flex" justifyContent="flex-start" alignItems="center" mb={4}>
          <Typography variant="h6" sx={{ fontWeight: 500, marginRight: '8px' }}>Breeds:</Typography>
          <Typography variant="h6" sx={{ color: '#666666', fontWeight: 300 }}>{data?.length || 0}</Typography>
        </Box>

        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <>
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

            {/* Pagination Controls */}
            <Box mt={4} display="flex" justifyContent="center" alignItems="center">
              <Button onClick={handlePreviousPage} disabled={page === 1} sx={{ mr: 2 }}>
                Previous
              </Button>
              <Typography>Page {page}</Typography>
              <Button onClick={handleNextPage} sx={{ ml: 2 }}>
                Next
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Home;
