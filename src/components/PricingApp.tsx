import { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { products, categories, type Product } from '../data/products';
import {
  cartItems,
  cartCount,
  cartTotal,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getWhatsAppUrl,
} from '../stores/cart';

/* ═══════════════════════════════════════════
   CATEGORY TABS
   ═══════════════════════════════════════════ */

function CategoryTabs({
  active,
  onChange,
  counts,
}: {
  active: string;
  onChange: (id: string) => void;
  counts: Record<string, number>;
}) {
  return (
    <div className="flex overflow-x-auto sm:overflow-visible sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
      {categories.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`
              group relative flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl border transition-all duration-300
              font-heading text-xs sm:text-sm tracking-wider uppercase shrink-0
              ${isActive
                ? 'bg-white/[0.06] border-white/10 text-white shadow-lg'
                : 'bg-transparent border-white/[0.04] text-excavation-muted hover:bg-white/[0.03] hover:border-white/[0.08]'
              }
            `}
          >
            <img src={cat.icon} alt={cat.name} className="w-7 h-7 sm:w-9 sm:h-9 object-contain" />
            <div className="text-left">
              <span className="block font-semibold">{cat.name}</span>
              <span className={`hidden sm:block text-[10px] tracking-wide ${isActive ? 'text-excavation-muted' : 'text-excavation-muted/50'}`}>
                {cat.description} · {counts[cat.id] || 0} items
              </span>
            </div>
            {isActive && (
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-0.5 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PRODUCT CARD
   ═══════════════════════════════════════════ */

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const $cart = useStore(cartItems);
  const inCart = $cart[product.id];

  const catColorClass = {
    aridos: 'cat-accent-aridos',
    maquinaria: 'cat-accent-maquinaria',
    transportes: 'cat-accent-transportes',
  }[product.category];

  const catBgClass = {
    aridos: 'cat-bg-aridos',
    maquinaria: 'cat-bg-maquinaria',
    transportes: 'cat-bg-transportes',
  }[product.category];

  const catTextClass = {
    aridos: 'cat-text-aridos',
    maquinaria: 'cat-text-maquinaria',
    transportes: 'cat-text-transportes',
  }[product.category];

  const handleAdd = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        unit: product.unit,
        unitLabel: product.unitLabel,
        price: product.price,
        category: product.category,
      },
      qty
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
    setQty(1);
  };

  return (
    <div
      className={`shimmer-border group relative bg-excavation-card rounded-2xl border-t-2 ${catColorClass}
        border border-white/[0.04] hover:border-white/[0.08]
        transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30
        flex flex-col`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Popular badge */}
      {product.popular && (
        <div className="absolute -top-2.5 right-4 bg-excavation-red text-white text-[10px] font-heading font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg shadow-excavation-red/20">
          Popular
        </div>
      )}

      {/* Card body */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-heading text-base sm:text-lg font-semibold text-white leading-tight tracking-wide">
            {product.name}
          </h3>
          <p className="text-xs text-excavation-muted/60 mt-1 leading-relaxed line-clamp-2">
            {product.description}
          </p>
          {/* Unit badge */}
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-heading tracking-wider uppercase px-2 py-0.5 rounded-md mt-2 ${catBgClass} ${catTextClass}`}>
            <span className="w-1 h-1 rounded-full bg-current"></span>
            Por {product.unitLabel}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price */}
        <div className="flex items-end justify-between mb-4 mt-2">
          <div>
            <span className="font-mono text-4xl sm:text-5xl font-bold text-white tracking-tighter leading-none">
              {product.price.toFixed(2).replace('.', ',')}
            </span>
            <span className="text-excavation-muted ml-1 text-base sm:text-lg">€</span>
            <span className="text-excavation-muted/50 text-sm ml-0.5">/{product.unit}</span>
          </div>
          {inCart && (
            <span className="text-[11px] font-heading tracking-wider text-excavation-gold bg-excavation-gold/10 px-2 py-0.5 rounded">
              {inCart.quantity} {product.unit} en carrito
            </span>
          )}
        </div>

        {/* Quantity + Add button */}
        <div className="flex items-center gap-2">
          {/* Quantity selector */}
          <div className="flex items-center bg-excavation-surface rounded-xl border border-white/[0.06] overflow-hidden">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-9 h-10 flex items-center justify-center text-excavation-muted hover:text-white hover:bg-white/5 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth="2" d="M20 12H4" />
              </svg>
            </button>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 h-10 text-center bg-transparent text-white font-mono text-sm border-x border-white/[0.06] focus:outline-none"
            />
            <button
              onClick={() => setQty(qty + 1)}
              className="w-9 h-10 flex items-center justify-center text-excavation-muted hover:text-white hover:bg-white/5 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAdd}
            className={`
              flex-1 h-10 rounded-xl font-heading text-sm tracking-wider uppercase
              flex items-center justify-center gap-2
              transition-all duration-300
              ${justAdded
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-excavation-red/10 text-excavation-red border border-excavation-red/20 hover:bg-excavation-red hover:text-white'
              }
            `}
          >
            {justAdded ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Añadido
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                Añadir
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PRODUCT GRID with blur-fade reveal
   ═══════════════════════════════════════════ */

function ProductGrid({ category }: { category: string }) {
  const filtered = products.filter((p) => p.category === category);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.product-card-wrapper');
    cards.forEach((card, i) => {
      const el = card as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px) scale(0.97)';
      el.style.filter = 'blur(6px)';
      setTimeout(() => {
        el.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
        el.style.filter = 'blur(0)';
      }, i * 70 + 50);
    });
  }, [category]);

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {filtered.map((product, i) => (
        <div key={product.id} className="product-card-wrapper">
          <ProductCard product={product} index={i} />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   CART DRAWER
   ═══════════════════════════════════════════ */

function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const $items = useStore(cartItems);
  const $count = useStore(cartCount);
  const $total = useStore(cartTotal);
  const items = Object.values($items);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="cart-backdrop absolute inset-0" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-excavation-dark border-l border-white/[0.06] animate-slide-in-right flex flex-col shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-excavation-red/10 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-excavation-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-white tracking-wide">Tu Pedido</h2>
              <p className="text-xs text-excavation-muted">{$count} {$count === 1 ? 'artículo' : 'artículos'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-excavation-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-5xl mb-4 opacity-30">🏗️</div>
              <p className="font-heading text-excavation-muted tracking-wide">El carrito está vacío</p>
              <p className="text-sm text-excavation-muted/50 mt-1">Añade productos para solicitar presupuesto</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-excavation-card rounded-xl border border-white/[0.04] p-3 sm:p-4"
              >
                {/* Top row: name + delete */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <h4 className="font-heading text-sm font-semibold text-white tracking-wide truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-excavation-muted mt-0.5">
                      {item.price.toFixed(2)}€ / {item.unit}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-7 h-7 rounded-lg hover:bg-red-500/10 flex items-center justify-center group/del transition-colors shrink-0"
                  >
                    <svg className="w-3.5 h-3.5 text-excavation-muted group-hover/del:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                {/* Bottom row: quantity + subtotal */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-excavation-surface rounded-lg border border-white/[0.06] overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-8 flex items-center justify-center text-excavation-muted hover:text-white hover:bg-white/5 transition-colors text-xs"
                    >
                      −
                    </button>
                    <span className="w-8 h-8 flex items-center justify-center font-mono text-xs text-white border-x border-white/[0.06]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-8 flex items-center justify-center text-excavation-muted hover:text-white hover:bg-white/5 transition-colors text-xs"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-mono text-sm font-bold text-white">
                    {(item.price * item.quantity).toFixed(2)}€
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/[0.06] p-5 space-y-4">
            {/* IVA notice */}
            <div className="flex items-center gap-2 bg-excavation-gold/5 border border-excavation-gold/10 rounded-xl px-4 py-2.5">
              <svg className="w-4 h-4 text-excavation-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-[11px] text-excavation-muted">
                Precios sin IVA. Pueden variar según distancia y complejidad.
              </span>
            </div>

            {/* Total */}
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs text-excavation-muted font-heading tracking-wider uppercase">Total estimado</span>
                <span className="text-xs text-excavation-muted/50 ml-1">(sin IVA)</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-3xl font-bold text-white">{$total.toFixed(2)}</span>
                <span className="text-excavation-muted ml-1">€</span>
              </div>
            </div>

            {/* IVA estimate */}
            <div className="flex items-center justify-between text-xs text-excavation-muted/50">
              <span>IVA estimado (21%)</span>
              <span className="font-mono">{($total * 0.21).toFixed(2)}€</span>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold border-t border-white/[0.04] pt-2">
              <span className="text-excavation-muted">Total con IVA</span>
              <span className="font-mono text-lg text-white">{($total * 1.21).toFixed(2)}€</span>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-gradient w-full h-12 rounded-xl font-heading text-sm tracking-wider uppercase text-white
                  flex items-center justify-center gap-2.5
                  shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Pedir por WhatsApp
              </a>

              <button
                onClick={() => { clearCart(); onClose(); }}
                className="w-full h-10 rounded-xl font-heading text-xs tracking-wider uppercase
                  text-excavation-muted/60 hover:text-red-400 hover:bg-red-500/5
                  border border-transparent hover:border-red-500/10
                  flex items-center justify-center gap-2 transition-all duration-300"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FLOATING CART BUTTON
   ═══════════════════════════════════════════ */

function FloatingCartButton({ onClick }: { onClick: () => void }) {
  const $count = useStore(cartCount);
  const $total = useStore(cartTotal);
  const [pulse, setPulse] = useState(false);
  const prevCount = useRef($count);

  useEffect(() => {
    if ($count > prevCount.current) {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }
    prevCount.current = $count;
  }, [$count]);

  if ($count === 0) return null;

  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40
        bg-excavation-red text-white
        rounded-xl sm:rounded-2xl shadow-2xl shadow-excavation-red/30
        flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-5 sm:py-3.5
        font-heading tracking-wider text-xs sm:text-sm uppercase
        hover:-translate-y-1 hover:shadow-excavation-red/40
        transition-all duration-300
        ${pulse ? 'animate-bounce-in' : ''}
      `}
    >
      <div className="relative">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <span className="absolute -top-2 -right-2.5 w-5 h-5 bg-white text-excavation-dark text-[10px] font-bold rounded-full flex items-center justify-center">
          {$count}
        </span>
      </div>
      <span className="hidden sm:inline font-mono font-bold">{$total.toFixed(2)}€</span>
    </button>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */

export default function PricingApp() {
  const [activeCategory, setActiveCategory] = useState<string>('aridos');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const counts = categories.reduce(
    (acc, cat) => {
      acc[cat.id] = products.filter((p) => p.category === cat.id).length;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div>
      {/* Section header */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
          LISTADO DE <span className="text-excavation-red">PRECIOS</span>
        </h2>
        <p className="font-heading text-sm sm:text-base text-excavation-muted tracking-wide mt-2 sm:mt-3">
          Selecciona lo que necesitas y solicita presupuesto al instante
        </p>
      </div>

      {/* Category tabs */}
      <CategoryTabs active={activeCategory} onChange={setActiveCategory} counts={counts} />

      {/* Product grid */}
      <ProductGrid category={activeCategory} />

      {/* IVA note */}
      <div className="mt-8 text-center">
        <p className="text-xs text-excavation-muted/40 font-body">
          ⚠️ Todos los precios son sin IVA incluido. Consulte disponibilidad y condiciones.
          Los precios pueden variar según distancia y complejidad del trabajo.
        </p>
      </div>

      {/* Cart drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Floating cart button */}
      <FloatingCartButton onClick={() => setIsCartOpen(true)} />
    </div>
  );
}
