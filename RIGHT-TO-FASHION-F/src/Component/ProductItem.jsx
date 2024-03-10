import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom"
export default function ProductItem(props) {
  return (
      <Card sx={{ maxWidth: "100%" }}>
          <CardMedia
              component="img"
              height="200"
              image={`/public/images/${props.pic}`}
              alt="green iguana"
          />
          <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ height: "100px" }}>
                  {props.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  Price &#8377;<del>{props.baseprice}</del> {props.finalprice}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  Price {props.discount}%
              </Typography>
          </CardContent>
          <CardActions>
             
              <Link to={`/single-product-page/${props._id}`} className="btn background text-light w-100 btn-sm">Add to cart</Link>
          </CardActions>
      </Card>
  )
}
