import React, { useState } from 'react'
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'

interface DogBreedCardProps {
  name: string
  weight: string
  temperament: string
  origin: string
  lifeSpan: string
  imageUrl: string
}

const DogBreedCard: React.FC<DogBreedCardProps> = ({
  name,
  weight,
  temperament,
  origin,
  lifeSpan,
  imageUrl,
}) => {
  const [errorImage, setErrorImage] = useState(false)

  const placeholderImage = '/images/placeholder.png'

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        backgroundColor: '#FEF7FF',
        fontFamily: 'Roboto',
      }}
    >
      <CardMedia
        component="img"
        src={errorImage ? placeholderImage : imageUrl}
        alt={name}
        sx={{ height: 230, objectFit: 'cover' }}
        onError={() => setErrorImage(true)}
        loading="lazy"
      />
      <CardContent sx={{ padding: '10px', textAlign: 'left' }}>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 500, fontSize: '16px', marginBottom: '8px' }}
          >
            {name}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: '4px' }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 400, fontSize: '14px' }}
          >
            <strong>Weight:</strong> {weight} kg
          </Typography>
        </Box>
        <Box sx={{ marginBottom: '4px' }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 400, fontSize: '14px' }}
          >
            <strong>Temperament:</strong> {temperament}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: '4px' }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 400, fontSize: '14px' }}
          >
            <strong>Origin:</strong> {origin || 'Unknown'}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 400, fontSize: '14px' }}
          >
            <strong>Life Span:</strong> {lifeSpan} years
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default DogBreedCard
