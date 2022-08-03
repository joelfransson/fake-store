export type Order = {
  id: number;
  title: string;
  quantity: number;
};

export type Cart = Record<number, Order>;
let shoppingBag: Cart;

declare global {
  var shoppingBag: Cart;
}

if (!global.shoppingBag) {
  global.shoppingBag = {};
}
shoppingBag = global.shoppingBag;

export function loadCart() {
  return shoppingBag;
}

export function addToCard(order: Order) {
  if (!shoppingBag[order.id]) {
    shoppingBag[Number(order.id)] = {
      id: order.id,
      title: order.title,
      quantity: 0,
    };
  }
  shoppingBag[order.id].quantity += order.quantity;

  return shoppingBag;
}
