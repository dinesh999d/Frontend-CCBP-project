import {Component} from 'react'
import CartContext from '../../context/CartContext'

import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'

import './index.css'

class Cart extends Component {
  state = {
    isCheckout: false,
    formData: {name: '', address: '', payment: ''},
    isFormSubmitted: false,
  }

  handleInputChange = ({target: {name, value}}) => {
    this.setState(prevState => ({
      formData: {...prevState.formData, [name]: value},
    }))
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({isFormSubmitted: true})
  }

  render() {
    const {isCheckout, formData, isFormSubmitted} = this.state

    return (
      <CartContext.Consumer>
        {({cartList, removeAllCartItems}) => {
          const isEmpty = cartList.length === 0

          return isFormSubmitted ? (
            <div className="confirmation-container">
              <h1 className="confirmation-name">Thank you, {formData.name}!</h1>
              <h1 className="confirmation-heading">
                Your Order Placed Successfully
              </h1>
              <p className="confirmation-address">
                Address: {formData.address}
              </p>
              <p className="confirmation-payment">
                Paid with {formData.payment}
              </p>
            </div>
          ) : (
            <>
              <Header />
              <div className="cart-container">
                {isEmpty ? (
                  <EmptyCartView />
                ) : (
                  <div className="cart-content-container">
                    <h1 className="cart-heading">My Cart</h1>
                    <button
                      className="remove-all-btn"
                      onClick={removeAllCartItems}
                    >
                      Remove All
                    </button>
                    <CartListView />
                    <CartSummary />
                    {!isCheckout ? (
                      <button
                        className="checkout-btn"
                        onClick={() => this.setState({isCheckout: true})}
                      >
                        Proceed to Checkout
                      </button>
                    ) : (
                      <form
                        onSubmit={this.handleSubmit}
                        className="checkout-form"
                      >
                        <h1 className="checkout-heading">Checkout</h1>
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                            required
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="address">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={this.handleInputChange}
                            required
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="payment">Payment</label>
                          <input
                            type="text"
                            name="payment"
                            value={formData.payment}
                            onChange={this.handleInputChange}
                            required
                            className="form-input"
                          />
                        </div>
                        <button type="submit" className="submit-button">
                          Submit Order
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
