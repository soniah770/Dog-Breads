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

const DetailRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <Box sx={{ marginBottom: '4px' }}>
    <Typography
      variant="body2"
      color="textSecondary"
      sx={{ fontWeight: 400, fontSize: '14px' }}
    >
      <strong>{label}:</strong> {value}
    </Typography>
  </Box>
)

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

        <DetailRow label="Weight" value={`${weight} kg`} />
        <DetailRow label="Temperament" value={temperament} />
        <DetailRow label="Origin" value={origin || 'Unknown'} />
        <DetailRow label="Life Span" value={`${lifeSpan} years`} />
      </CardContent>
    </Card>
  )
}

export default DogBreedCard
