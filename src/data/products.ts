export interface Product {
  id: string;
  name: string;
  emoji: string;
  description: string;
  unit: string;
  unitLabel: string;
  price: number;
  category: 'aridos' | 'maquinaria' | 'transportes';
  popular?: boolean;
}

export const products: Product[] = [
  // ÁRIDOS
  { id: 'arena-fina', emoji: '⏳', name: 'Arena Fina', description: 'Arena lavada para morteros y acabados', unit: 'Tn', unitLabel: 'Tonelada', price: 19.50, category: 'aridos' },
  { id: 'arena-basta', emoji: '🏖️', name: 'Arena Basta', description: 'Arena gruesa para hormigones y rellenos', unit: 'Tn', unitLabel: 'Tonelada', price: 19.00, category: 'aridos' },
  { id: 'bolos-30-60', emoji: '🪨', name: 'Bolos 30/60', description: 'Cantos rodados para drenajes y decoración', unit: 'Tn', unitLabel: 'Tonelada', price: 14.50, category: 'aridos' },
  { id: 'gravin-20', emoji: '🔶', name: 'Gravín del 20', description: 'Gravilla calibrada 20mm para hormigones', unit: 'Tn', unitLabel: 'Tonelada', price: 16.50, category: 'aridos' },
  { id: 'jabre', emoji: '🏔️', name: 'Jabre', description: 'Arena de cantera para compactación y bases', unit: 'Tn', unitLabel: 'Tonelada', price: 16.50, category: 'aridos' },
  { id: 'zahorra-artificial', emoji: '🛣️', name: 'Zahorra Artificial', description: 'Base granular para firmes y explanadas', unit: 'Tn', unitLabel: 'Tonelada', price: 20.00, category: 'aridos' },
  { id: 'zahorra-reciclada', emoji: '♻️', name: 'Zahorra Reciclada', description: 'Material reciclado para rellenos económicos', unit: 'Tn', unitLabel: 'Tonelada', price: 12.00, category: 'aridos' },
  { id: 'tierra-vegetal', emoji: '🌱', name: 'Tierra Vegetal', description: 'Tierra fértil para jardinería y revegetación', unit: 'Tn', unitLabel: 'Tonelada', price: 12.00, category: 'aridos' },
  { id: 'revuelto-20', emoji: '🔀', name: 'Revuelto del 20', description: 'Mezcla de áridos calibre 20mm para rellenos', unit: 'Tn', unitLabel: 'Tonelada', price: 19.50, category: 'aridos' },

  // MAQUINARIA
  { id: 'mixta-cat-428', emoji: '🚜', name: 'Máquina Mixta Cat 428', description: 'Retroexcavadora mixta para obras versátiles', unit: 'h', unitLabel: 'Hora', price: 40.00, category: 'maquinaria' },
  { id: 'retro-cat-318', emoji: '⛏️', name: 'Retro Cat 318', description: 'Excavadora de cadenas para grandes movimientos', unit: 'h', unitLabel: 'Hora', price: 75.00, category: 'maquinaria' },
  { id: 'rulo-compactador', emoji: '🛞', name: 'Rulo Compactador', description: 'Rodillo vibrante para compactación de terrenos', unit: 'h', unitLabel: 'Hora', price: 60.00, category: 'maquinaria' },
  { id: 'camion-banera', emoji: '🚚', name: 'Camión Bañera', description: 'Bañera de 18m³ para transporte de materiales', unit: 'h', unitLabel: 'Hora', price: 65.00, category: 'maquinaria' },
  { id: 'camion-doble-carro', emoji: '🚛', name: 'Camión Doble Carro', description: 'Camión con remolque de 12m³ aprox.', unit: 'h', unitLabel: 'Hora', price: 50.00, category: 'maquinaria' },
  { id: 'camion-multilinea', emoji: '🛻', name: 'Camión MultiLínea', description: 'Camión ligero de 3,5m³ para accesos difíciles', unit: 'h', unitLabel: 'Hora', price: 45.00, category: 'maquinaria' },
  { id: 'mini-excavadora', emoji: '🏗️', name: 'Mini Excavadora', description: 'Excavadora compacta para espacios reducidos', unit: 'h', unitLabel: 'Hora', price: 40.00, category: 'maquinaria' },
  { id: 'mini-cargadora', emoji: '🔧', name: 'Mini Cargadora', description: 'Cargadora compacta tipo Bobcat multiusos', unit: 'h', unitLabel: 'Hora', price: 35.00, category: 'maquinaria' },
  { id: 'martillo-miniexc', emoji: '🔨', name: 'Martillo Miniexcavadora', description: 'Martillo hidráulico para miniexcavadora', unit: 'h', unitLabel: 'Hora', price: 45.00, category: 'maquinaria' },
  { id: 'martillo-mixta', emoji: '⚒️', name: 'Martillo Mixta', description: 'Martillo hidráulico para retroexcavadora mixta', unit: 'h', unitLabel: 'Hora', price: 50.00, category: 'maquinaria' },
  { id: 'martillo-retro', emoji: '💥', name: 'Martillo Retro', description: 'Martillo hidráulico de alto rendimiento', unit: 'h', unitLabel: 'Hora', price: 85.00, category: 'maquinaria' },

  // TRANSPORTES
  { id: 'batea-tierra', emoji: '🚧', name: 'Batea de Tierra', description: 'Transporte de tierras a vertedero exterior', unit: 'ud', unitLabel: 'Servicio', price: 75.00, category: 'transportes' },
  { id: 'batea-vegetales', emoji: '🌿', name: 'Batea Residuos Vegetales', description: 'Retirada y transporte de residuos vegetales', unit: 'ud', unitLabel: 'Servicio', price: 100.00, category: 'transportes' },
  { id: 'gondola', emoji: '🚢', name: 'Servicio de Góndola', description: 'Transporte especial de maquinaria pesada', unit: 'ud', unitLabel: 'Servicio', price: 250.00, category: 'transportes' },
];

const base = import.meta.env.BASE_URL;

export const categories = [
  { id: 'aridos' as const, name: 'Áridos', icon: `${base}/cat-aridos.png`, description: 'Puesto en obra', color: '#F0A830' },
  { id: 'maquinaria' as const, name: 'Maquinaria', icon: `${base}/cat-maquinaria.png`, description: 'Alquiler con operario', color: '#D94432' },
  { id: 'transportes' as const, name: 'Transportes', icon: `${base}/cat-transportes.png`, description: 'Retirada de materiales', color: '#22C55E' },
];
