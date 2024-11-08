import * as React from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'

export function StarRating({ value }) {

    return <Box sx={{ '& > legend': { mt: 2 } }}>
        <Rating className="rate star-rating" name="half-rating-read" size="small"
            value={value} precision={0.5} readOnly />
    </Box>
}
