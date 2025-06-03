import * as React from 'react';

const products = [
  { id: 1, name: 'Poké Ball', price: 10 },
  { id: 2, name: 'Great Ball', price: 20 },
  { id: 3, name: 'Ultra Ball', price: 30 },
];

function calculateTotal(cart) {
  const parsedItems = Array.isArray(cart) ? cart : [];
  const total = parsedItems.reduce(
    (current, item) => current + item.price * item.count,
    0
  );
  return total;
}

const initialState = [];

function reducer(cart, action) {
  switch (action.type) {
    case 'add': {
      const inCart = Boolean(cart.find((item) => item.id === action.id));

      if (!inCart) {
        const add = products.find((item) => item.id === action.id);
        return [...cart, { ...add, count: 1 }];
      } else {
        return cart.map((item) =>
          item.id === action.id ? { ...item, count: item.count++ } : item
        );
      }
    }

    case 'update': {
      if (action.adjustment === 'decrement') {
        return cart
          .map((item) =>
            item.id === action.id && item.count > 0
              ? { ...item, count: item.count - 1 }
              : item
          )
          .filter((item) => item.count > 0);
      }
      if (action.adjustment === 'increment') {
        return cart.map((item) =>
          item.id === action.id ? { ...item, count: item.count + 1 } : item
        );
      }
      break;
    }
    default:
      return cart;
  }
}

export function ShoppingCart() {
  const [cart, dispatch] = React.useReducer(reducer, initialState);

  const handleAddToCart = (id) => {
    dispatch({ type: 'add', id });
  };
  const handleUpdateQuantity = (id, adjustment) => {
    dispatch({
      type: 'update',
      id,
      adjustment,
    });
  };

  React.useEffect(() => {
    calculateTotal(cart);
  }, [cart]);

  return (
    <main>
      <h1>Poké Mart</h1>
      <section>
        <div>
          <ul className="products">
            {products.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price} $
                <button className="primary" onClick={() => handleAddToCart(item.id)}>
                  Add to Chart
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <br />
      <aside>
        <div>
          <h2>Shopping Chart</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - {item.count}
                <div>
                  <button onClick={() => handleUpdateQuantity(item.id, 'decrement')}>
                    -
                  </button>
                  {item.quantity}
                  <button onClick={() => handleUpdateQuantity(item.id, 'increment')}>
                    +
                  </button>
                </div>
              </li>
            ))}
            {!cart.length && <li>Cart is empty</li>}
          </ul>
        </div>
      </aside>
      <br />
      <div>Total - {calculateTotal(cart)}$</div>
    </main>
  );
}

export default function App() {
  return ShoppingCart();
}
