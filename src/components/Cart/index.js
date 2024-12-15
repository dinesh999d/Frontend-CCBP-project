import {Component} from 'react'
import {withRouter} from 'react-router-dom'
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
  }

  handleInputChange = ({target: {name, value}}) => {
    this.setState(prevState => ({
      formData: {...prevState.formData, [name]: value},
    }))
  }

  handleSubmit = e => {
    e.preventDefault()
    const {formData} = this.state
    localStorage.setItem('name', formData.name)
    localStorage.setItem('address', formData.address)
    localStorage.setItem('payment', formData.payment)
    const {history} = this.props
    history.push('/checkout')
  }

  render() {
    const {isCheckout, formData} = this.state

    return (
      <CartContext.Consumer>
        {({cartList, removeAllCartItems}) => {
          const isEmpty = cartList.length === 0

          return (
            <>
              <Header />
              <div className="cart-container">
                {isEmpty ? (
                  <EmptyCartView />
                ) : (
                  <div className="cart-content-container">
                    <h1 className="cart-heading">My Cart</h1>
                    <button
                      type="button"
                      className="remove-all-btn"
                      onClick={removeAllCartItems}
                    >
                      Remove All
                    </button>
                    <CartListView />
                    <CartSummary />
                    {!isCheckout ? (
                      <button
                        type="button"
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

export default withRouter(Cart)
