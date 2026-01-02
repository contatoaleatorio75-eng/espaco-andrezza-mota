
export interface Product {
    id: string;
    name: string;
    brand: 'natura' | 'boticario' | 'eudora' | 'avon' | 'tupperware' | 'oui';
    link?: string;
    isProntaEntrega?: boolean;
}

export const PRODUCTS: Product[] = [
    // Boticário
    { id: 'b1', name: 'Malbec Gold Desodorante Colônia 100ml', brand: 'boticario' },
    { id: 'b2', name: 'Lily Eau de Parfum 75ml', brand: 'boticario' },
    { id: 'b3', name: 'Floratta Red Desodorante Colônia 75ml', brand: 'boticario' },
    { id: 'b4', name: 'Arbo Desodorante Colônia 100ml', brand: 'boticario' },

    // Eudora
    { id: 'e1', name: 'Siàge Nutri Rosé Shampoo + Condicionador', brand: 'eudora' },
    { id: 'e2', name: 'Instance Baunilha Hidratante Corporal 400ml', brand: 'eudora' },
    { id: 'e3', name: 'Batom Matte Tint Eudora Glam', brand: 'eudora' },
    { id: 'e4', name: 'Eudora Royal Eau de Parfum 75ml', brand: 'eudora' },

    // O.U.i
    { id: 'o1', name: 'O.U.I Scapin 245 Eau de Parfum 75ml', brand: 'oui' },
    { id: 'o2', name: 'O.U.I L’Amour-Esse 142 Eau de Parfum 75ml', brand: 'oui' },

    // Avon
    { id: 'a1', name: 'Renew Reversalist Creme Diurno FPS 25', brand: 'avon' },
    { id: 'a2', name: 'Batom Ultramatte Avon - Diversas Cores', brand: 'avon' },
    { id: 'a3', name: 'Far Away Glamour Deo Parfum 50ml', brand: 'avon' },
    { id: 'a4', name: 'Lápis para Olhos Glimmerstick Avon', brand: 'avon' },

    // Natura
    { id: 'n1', name: 'Hidratante Tododia Noz Pecã e Cacau - 400ml', brand: 'natura', isProntaEntrega: true },
    { id: 'n2', name: 'Essencial Exclusivo Feminino Deo Parfum 100ml', brand: 'natura' },
    { id: 'n3', name: 'Kaiak Masculino Desodorante Colônia 100ml', brand: 'natura', isProntaEntrega: true },
    { id: 'n4', name: 'Ekos Castanha Polpa Hidratante para Mãos 75g', brand: 'natura', isProntaEntrega: true },

    // Tupperware
    { id: 't1', name: 'Eco Tupper Garrafa 500ml - Diversas Cores', brand: 'tupperware', isProntaEntrega: true },
    { id: 't2', name: 'Jeitosinho 400ml - Organizador de Freezer', brand: 'tupperware', isProntaEntrega: true },
    { id: 't3', name: 'Quick Shake 500ml - Misturador Prático', brand: 'tupperware' },
    { id: 't4', name: 'Modular Retangular 2L - Conservação Máxima', brand: 'tupperware' },
];
