import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1> Trending items</h1>
        <h1 className="home-heading">Women's latest fashion sale</h1>
        <h1 className="home-price">starting at $ 20.00</h1>
        <Link to="/products">
          <button type="button" className="shop-now-button">
            Shop Now
          </button>
        </Link>
        <img
          src="https://codewithsadee.github.io/anon-ecommerce-website/assets/images/banner-1.jpg"
          alt="clothes that get you noticed"
          className="home-mobile-img imgg"
        />
      </div>
      <img
        src="https://codewithsadee.github.io/anon-ecommerce-website/assets/images/banner-1.jpg"
        alt="clothes that get you noticed"
        className="home-desktop-img imgg"
      />
    </div>
  </>
)

export default Home
