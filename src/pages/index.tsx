import React, { Suspense, lazy, useCallback } from 'react'
import useSWR from 'swr'
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material'

const DogBreedCard = lazy(() => import('../components/DogBreedCard'))

interface Breed {
  id: number
  name: string
  weight: { metric: string }
  temperament: string
  origin: string
  life_span: string
  reference_image_id: string | null
}
const Home: React.FC = () => {
  const fetchBreeds = useCallback(
    (url: string) => fetch(url).then((res) => res.json()),
    []
  )
  const { data, error } = useSWR(
    'https://api.thedogapi.com/v1/breeds',
    fetchBreeds
  )

  if (error) return <div>Failed to load</div>
  if (!data)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    )

  return (
    <Box
      sx={{ backgroundColor: '#E6E0E9', minHeight: '100vh', padding: '20px' }}
    >
      <Container>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h6" sx={{ fontWeight: 500, marginRight: '8px' }}>
            Breeds:
          </Typography>
          <Typography variant="h6" sx={{ color: '#666666', fontWeight: 300 }}>
            {data.length}
          </Typography>
        </Box>

        <Suspense fallback={<CircularProgress />}>
          <Grid container spacing={3}>
            {data.map((breed: Breed) => (
              <Grid item key={breed.id} xs={12} sm={6} md={4} lg={3}>
                <DogBreedCard
                  name={breed.name}
                  weight={breed.weight.metric}
                  temperament={breed.temperament}
                  origin={breed.origin}
                  lifeSpan={breed.life_span}
                  imageUrl={
                    breed.reference_image_id
                      ? `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
                      : '/images/placeholder.png'
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Suspense>
      </Container>
    </Box>
  )
}

export default Home
