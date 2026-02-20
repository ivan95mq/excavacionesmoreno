import { map, computed } from 'nanostores';

export interface CartItem {
  id: string;
  name: string;
  unit: string;
  unitLabel: string;
  price: number;
  quantity: number;
  category: string;
}

export const cartItems = map<Record<string, CartItem>>({});

export const cartCount = computed(cartItems, (items) =>
  Object.values(items).reduce((sum, item) => sum + item.quantity, 0)
);

export const cartTotal = computed(cartItems, (items) =>
  Object.values(items).reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export function addToCart(
  product: { id: string; name: string; unit: string; unitLabel: string; price: number; category: string },
  qty: number = 1
) {
  const current = cartItems.get()[product.id];
  if (current) {
    cartItems.setKey(product.id, { ...current, quantity: current.quantity + qty });
  } else {
    cartItems.setKey(product.id, { ...product, quantity: qty });
  }
}

export function removeFromCart(id: string) {
  const items = { ...cartItems.get() };
  delete items[id];
  cartItems.set(items);
}

export function updateQuantity(id: string, qty: number) {
  if (qty <= 0) {
    removeFromCart(id);
    return;
  }
  const current = cartItems.get()[id];
  if (current) {
    cartItems.setKey(id, { ...current, quantity: qty });
  }
}

export function clearCart() {
  cartItems.set({});
}

export function generateWhatsAppMessage(): string {
  const items = Object.values(cartItems.get());
  if (items.length === 0) return '';

  const categoryGroups: Record<string, CartItem[]> = {};
  items.forEach((item) => {
    if (!categoryGroups[item.category]) categoryGroups[item.category] = [];
    categoryGroups[item.category].push(item);
  });

  const categoryEmoji: Record<string, string> = {
    aridos: '🪨',
    maquinaria: '🚜',
    transportes: '🚛',
  };

  const categoryNames: Record<string, string> = {
    aridos: 'Áridos',
    maquinaria: 'Maquinaria',
    transportes: 'Transportes y Retirada',
  };

  let message = '🏗️ *Solicitud de Presupuesto*\n*Excavaciones Moreno*\n\n';

  Object.entries(categoryGroups).forEach(([cat, catItems]) => {
    message += `${categoryEmoji[cat] || '📦'} *${categoryNames[cat] || cat}:*\n`;
    catItems.forEach((item) => {
      const subtotal = (item.price * item.quantity).toFixed(2);
      message += `  • ${item.name}: ${item.quantity} ${item.unit} × ${item.price.toFixed(2)}€ = ${subtotal}€\n`;
    });
    message += '\n';
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `💰 *Total estimado: ${total.toFixed(2)}€* (+ IVA)\n\n`;
  message += `📍 Dirección de obra: ___________\n`;
  message += `📅 Fecha deseada: ___________`;

  return message;
}

export function getWhatsAppUrl(): string {
  const message = generateWhatsAppMessage();
  return `https://wa.me/34625309277?text=${encodeURIComponent(message)}`;
}
