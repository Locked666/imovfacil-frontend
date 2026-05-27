import type { PropertyListing } from "@/types/property"

export const mockProperties: PropertyListing[] = [
  {
    id: "prop-001",
    slug: "casa-premium-bairro-jardim-aurora",
    title: "Casa premium com área gourmet e piscina",
    description:
      "Residência contemporânea em condomínio aberto com acabamento premium, integração social e localização estratégica.",
    purpose: "sale",
    category: "house",
    price: 1680000,
    premium: true,
    imageUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    ],
    location: {
      city: "Cuiabá",
      state: "MT",
      neighborhood: "Jardim Aurora",
      address: "Rua das Palmeiras, 248",
    },
    coordinates: { latitude: -15.6014, longitude: -56.0974 },
    features: {
      bedrooms: 4,
      bathrooms: 5,
      suites: 3,
      parkingSpaces: 4,
      areaM2: 342,
    },
    contactWhatsApp: "5565999990001",
    updatedAt: "2026-05-25T12:00:00Z",
  },
  {
    id: "prop-002",
    slug: "apartamento-vista-parque-centro",
    title: "Apartamento com vista para o parque",
    description:
      "Planta inteligente, varanda integrada e fachada elegante em um dos endereços mais desejados da cidade.",
    purpose: "rent",
    category: "apartment",
    price: 5400,
    premium: true,
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    ],
    location: {
      city: "Rondonópolis",
      state: "MT",
      neighborhood: "Centro",
      address: "Avenida Amazonas, 1204",
    },
    coordinates: { latitude: -16.4673, longitude: -54.6372 },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      suites: 1,
      parkingSpaces: 2,
      areaM2: 118,
    },
    contactWhatsApp: "5565999990002",
    updatedAt: "2026-05-21T12:00:00Z",
  },
  {
    id: "prop-003",
    slug: "fazenda-produtiva-georreferenciada",
    title: "Fazenda produtiva georreferenciada",
    description:
      "Área de alta produtividade com aptidão agrícola, recursos hídricos e infraestrutura pronta para operação.",
    purpose: "sale",
    category: "farm",
    price: 14900000,
    premium: true,
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=1200&q=80",
    ],
    location: {
      city: "Sorriso",
      state: "MT",
      neighborhood: "Zona Rural",
      address: "Rodovia BR-163, Km 745",
    },
    coordinates: { latitude: -12.5423, longitude: -55.7217 },
    features: {
      bedrooms: 5,
      bathrooms: 4,
      suites: 2,
      parkingSpaces: 8,
      areaM2: 18400,
      ruralAreaHectares: 320,
      waterResources: ["Represa", "Nascente"],
      agriculturalPotential: true,
    },
    contactWhatsApp: "5565999990003",
    updatedAt: "2026-05-24T12:00:00Z",
  },
  {
    id: "prop-004",
    slug: "terreno-esquina-bairro-nobre",
    title: "Terreno de esquina com frente ampla",
    description:
      "Excelente lote para empreendimento com vocação residencial e comercial, em região de expansão consolidada.",
    purpose: "sale",
    category: "land",
    price: 420000,
    premium: false,
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    ],
    location: {
      city: "Várzea Grande",
      state: "MT",
      neighborhood: "Jardim Imperial",
      address: "Quadra 12, Lote 08",
    },
    coordinates: { latitude: -15.6465, longitude: -56.1321 },
    features: {
      bedrooms: 0,
      bathrooms: 0,
      areaM2: 560,
    },
    contactWhatsApp: "5565999990004",
    updatedAt: "2026-05-18T12:00:00Z",
  },
  {
    id: "prop-005",
    slug: "sala-comercial-front-office",
    title: "Sala comercial front office",
    description:
      "Espaço corporativo com recepção, iluminação natural e plantas flexíveis para times em expansão.",
    purpose: "rent",
    category: "commercial",
    price: 8600,
    premium: false,
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    ],
    location: {
      city: "Cuiabá",
      state: "MT",
      neighborhood: "Bosque da Saúde",
      address: "Av. Historiador Rubens de Mendonça, 2230",
    },
    coordinates: { latitude: -15.5901, longitude: -56.0982 },
    features: {
      bedrooms: 0,
      bathrooms: 2,
      parkingSpaces: 3,
      areaM2: 142,
    },
    contactWhatsApp: "5565999990005",
    updatedAt: "2026-05-23T12:00:00Z",
  },
  {
    id: "prop-006",
    slug: "chacara-lazer-rios-e-represa",
    title: "Chácara de lazer com rios e represa",
    description:
      "Refúgio premium para descanso e entretenimento, com estrutura para eventos e integração total com a natureza.",
    purpose: "sale",
    category: "rural",
    price: 2380000,
    premium: true,
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    ],
    location: {
      city: "Chapada dos Guimarães",
      state: "MT",
      neighborhood: "Zona Rural",
      address: "Estrada da Serra, Km 18",
    },
    coordinates: { latitude: -15.4601, longitude: -55.7498 },
    features: {
      bedrooms: 4,
      bathrooms: 4,
      suites: 2,
      parkingSpaces: 6,
      areaM2: 950,
      ruralAreaHectares: 12.5,
      waterResources: ["Represa", "Córrego"],
      agriculturalPotential: false,
    },
    contactWhatsApp: "5565999990006",
    updatedAt: "2026-05-22T12:00:00Z",
  },
]

