import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProdCard({prod}) {
    console.log(prod);
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={prod?.image} alt = "prod" />
      <Card.Body>
        <Card.Title>{prod.nameProdut}</Card.Title>
        <Card.Text>
          {prod.productDescription}
          <br/>
          {prod.price}
          <br/>
          {prod.postedBy.firstName}
          <br/>
          {prod.category?.nameCat}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

  
  export default ProdCard;