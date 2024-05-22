import CarItem from "./CartItem";
import { useGlobalContext } from "../context/Context";

const CartContainer = () => {
  const { cart, clearCart, totalCost } = useGlobalContext();
  const cartArray = Array.from(cart.entries());
  
  if (cartArray.length === 0) {
    return (
      <section className="cart">
      <header>
        <h2>your bag</h2>
        <h4 className="empty-cart">is currently empty</h4>
      </header>
    </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {
          cartArray.map((cartItem) => {
            const [id, item] = cartItem;
            return (
              <CarItem 
                key={id}
                {...item}
              />
            );
          })
        }
      </div>
      <footer>
        <hr />
        <div>
          <h5 className="cart-total">
            total<span>$ {totalCost.toFixed(2)}</span>
          </h5>
        </div>
        <button
          type="button"
          className="btn btn-hipster"
          onClick={clearCart}
        >
          clear cart
        </button>
      </footer>
    </section>
  )
}
export default CartContainer