import {Link} from 'react-router-dom'
import Header from '../components/Header'
import CartContext from './CartContext'
import './checkout.css'

const Checkout = () => {
  const name = localStorage.getItem('name')
  const address = localStorage.getItem('address')
  const payment = localStorage.getItem('payment')

  return (
    <CartContext.Consumer>
      {value => {
        const {removeAllCartItems} = value
        return (
          <>
            <Header />
            <div className="confirmation-container">
              <h1 className="confirmation-name">Thank you, {name}!</h1>
              <h1 className="confirmation-heading">
                Your Order Placed Successfully
              </h1>
              <p className="confirmation-address">Address: {address}</p>
              <p className="confirmation-payment">Paid with {payment}</p>
            </div>
            <Link to="/products" className="shopping-link">
              <button
                type="button"
                className="continue-shopping-btn"
                onClick={removeAllCartItems}
              >
                Continue Shopping
              </button>
            </Link>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Checkout

