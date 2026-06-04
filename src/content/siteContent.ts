export type Language = "es" | "en";

export type NavItem = {
  label: string;
  href: string;
};

export type FooterSocialLink = {
  type: "linkedin" | "instagram";
  href: string;
  ariaLabel: string;
};

export type FooterCopy = {
  backToTopLabel: string;
  navigationLabel: string;
  productsLabel: string;
  contactLabel: string;
  globalMapLabel: string;
  globalMapEyebrow: string;
  globalMapCaption: string;
  rights: string;
  productLinks: NavItem[];
  socialLinks: FooterSocialLink[];
  legalLinks: NavItem[];
};

type SeoCopy = {
  title: string;
  description: string;
};

export type NavigationCopy = {
  cta: string;
};

export type HeroCopy = {
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  micro: string;
  slogans: string[];
  trustCues: string[];
};

export type AboutCopy = {
  label: string;
  heading: string;
  paragraphs: string[];
  oneLine: string;
  proofPoints: {
    key: string;
    title: string;
    description: string;
  }[];
  primaryCta: string;
  secondaryCta: string;
};

export type ServicesCopy = {
  label: string;
  heading: string;
  lead: string;
  items: string[];
};

export type ProductsGalleryCopy = {
  slideTitles: Record<string, string>;
  slideMetadata: Record<
    string,
    {
      category: string;
      origin: string;
      badge?: string;
    }
  >;
  controls: {
    previousSlide: string;
    nextSlide: string;
    openViewer: string;
    closeViewer: string;
    previousImage: string;
    nextImage: string;
    goToSlide: string;
  };
};

export type ProductsCopy = {
  label: string;
  heading: string;
  exportTitle: string;
  supplyTitle: string;
  exportText: string;
  supplyText: string;
  coalHighlight: string;
  openCatalogHighlight: string;
  cta: string;
  gallery: ProductsGalleryCopy;
};

export type ProcessCopy = {
  label: string;
  heading: string;
  steps: string[];
};

export type WhyCopy = {
  label: string;
  heading: string;
  lead: string;
  pillars: {
    key: string;
    title: string;
    description: string;
    proof: string;
  }[];
};

export type CompanyValue = {
  title: string;
  description: string;
};

export type ValuesCopy = {
  label: string;
  heading: string;
  visionLabel: string;
  visionText: string;
  missionLabel: string;
  missionText: string;
  valuesLabel: string;
  principles: {
    key: string;
    title: string;
    description: string;
    items: string[];
  }[];
  values: CompanyValue[];
};

export type CommitmentCopy = {
  label: string;
  heading: string;
  text: string;
};

export type ContactCopy = {
  label: string;
  heading: string;
  description: string;
  companyInfo: {
    countryLabel: string;
    country: string;
    addressLabel: string;
    address: string;
    emailLabel: string;
    email: string;
    phoneLabel: string;
    phone: string;
  };
  form: {
    fields: string[];
    placeholders: string[];
    intakeLabel: string;
    intro: string;
    submitLabel: string;
    submittingLabel: string;
    status: {
      submitting: string;
      success: string;
      error: string;
    };
    micro: string;
  };
};

type RevealSectionCopy = {
  title1: string;
  subtitle1: string;
  title2: string;
  subtitle2: string;
};

type SiteContent = {
  navItems: NavItem[];
  seo: SeoCopy;
  navigation: NavigationCopy;
  hero: HeroCopy;
  revealSection: RevealSectionCopy;
  about: AboutCopy;
  services: ServicesCopy;
  products: ProductsCopy;
  process: ProcessCopy;
  why: WhyCopy;
  values: ValuesCopy;
  commitment: CommitmentCopy;
  contact: ContactCopy;
  footer: FooterCopy;
};

export const siteContent: Record<Language, SiteContent> = {
  es: {
    navItems: [
      { label: "Nosotros", href: "#nosotros" },
      { label: "Servicios", href: "#services" },
      { label: "Productos", href: "#products" },
      { label: "Proceso", href: "#process" },
      { label: "Contacto", href: "#contact" },
    ],
    seo: {
      title: "Global Lift | Importación, Exportación y Logística",
      description:
        "Soluciones B2B de importación, exportación, logística y comercialización. Conectamos mercados con República Dominicana con cumplimiento y transparencia.",
    },
    navigation: {
      cta: "Contacto",
    },
    hero: {
      title: "Impulsamos tu cadena de suministro, sin fronteras.",
      subtitle:
        "Soluciones B2B de importación, exportación, logística y comercialización para frutas, vegetales, carbón y otras categorías según demanda, con cumplimiento legal, transparencia y procesos estructurados.",
      primaryCta: "Contacto",
      secondaryCta: "Servicios",
      micro:
        "Si no ves tu producto en la web, escríbenos: activamos suministro a medida sin límite de catálogo.",
      slogans: [
        "Conectamos mercados, ejecutamos en RD",
        "Comercio global, ejecución local",
        "Logística y comercio con confianza",
      ],
      trustCues: [
        "Cumplimiento legal",
        "Transparencia",
        "Procesos estructurados",
        "Catálogo abierto sin límite",
      ],
    },
    revealSection: {
      title1: "Excelencia en Exportación",
      subtitle1:
        "Llevamos lo mejor de nuestra tierra a mercados internacionales con frescura y calidad garantizada.",
      title2: "Abastecimiento Estratégico",
      subtitle2:
        "Conectamos su negocio con proveedores globales de confianza para asegurar su cadena de suministro.",
    },
    about: {
      label: "QUIÉNES SOMOS",
      heading: "Comercio global con ejecución local",
      paragraphs: [
        "Global Lift es una empresa dominicana de importación, exportación, logística y comercialización. Conectamos vendedores, proveedores y clientes entre mercados internacionales y República Dominicana, con una operación enfocada en cumplimiento, coordinación y valor comercial sostenible.",
      ],
      oneLine: "Conectando mercados, elevando oportunidades.",
      proofPoints: [
        {
          key: "compliance",
          title: "Cumplimiento documental",
          description:
            "Operaciones con respeto legal, acuerdos claros y comunicación transparente.",
        },
        {
          key: "coordination",
          title: "Coordinación operativa",
          description:
            "Alineamos abastecimiento, logística y seguimiento para mover cada solicitud con estructura.",
        },
        {
          key: "sourcing",
          title: "Abastecimiento flexible",
          description:
            "Activamos oportunidades según producto, volumen, destino y mercado, sin depender de un catálogo cerrado.",
        },
      ],
      primaryCta: "Ver proceso",
      secondaryCta: "Hablar de una operación",
    },
    services: {
      label: "QUÉ HACEMOS",
      heading: "SERVICIOS",
      lead: "Diseñamos soluciones a la medida para importar, exportar, coordinar logística y sostener operaciones comerciales de forma continua.",
      items: [
        "Importación — Gestionamos soluciones integrales para apoyar operaciones de importación.",
        "Exportación — Facilitamos exportaciones con coordinación estructurada y enfoque B2B.",
        "Logística y coordinación — Organizamos el flujo eficiente de bienes y servicios.",
        "Comercialización — Apoyamos procesos comerciales para conectar oferta y demanda.",
        "Conexión proveedor–cliente — Servimos de puente entre mercados, proveedores y compradores.",
        "Trade facilitation / servicios comerciales — Acompañamos la operación con procesos estructurados y ética empresarial.",
        "Abastecimiento / provisión — Podemos apoyar el suministro de diversos productos según la necesidad del cliente.",
      ],
    },
    products: {
      label: "QUÉ OFRECEMOS",
      heading: "PRODUCTOS",
      exportTitle: "Exportación",
      supplyTitle: "Abastecimiento",
      exportText:
        "Exportamos una variedad amplia de frutas, vegetales y carbón, conectando oferta en República Dominicana con oportunidades comerciales en mercados internacionales.",
      supplyText:
        "No estamos limitados a los productos mostrados en la web: podemos gestionar suministro de múltiples categorías según tu requerimiento, volumen y destino.",
      coalHighlight:
        "Carbón vegetal: línea de suministro activa para operaciones comerciales y contratos recurrentes.",
      openCatalogHighlight:
        "Catálogo abierto: si no ves el producto en la web, escríbenos. No tenemos límite en lo que podemos ayudarte a suministrar.",
      cta: "¿Buscas un producto específico? Escríbenos y activamos una propuesta de suministro a tu medida.",
      gallery: {
        slideTitles: {
          "products-charcoal-premium": "Carbón vegetal premium",
          "products-charcoal-bulk": "Carbón para volumen comercial",
          "products-fruits-variety": "Variedad de frutas tropicales",
          "products-vegetables-variety": "Variedad de vegetales frescas",
          "products-avocado-export": "Aguacate para exportación",
          "products-mango-export": "Mango para exportación",
          "products-peppers-tomatoes": "Pimientos y tomates de calidad",
          "products-mixed-catalog": "Catálogo abierto bajo solicitud",
          "products-pineapple-export": "Piña premium para exportación",
          "products-cocoa-export": "Cacao orgánico dominicano",
          "products-coffee-export": "Café especial de altura",
          "products-bananas-export": "Bananos orgánicos de exportación",
          "products-coconuts-export": "Cocos de exportación",
          "products-limes-export": "Limones persas de calidad",
          "products-coconut-oil-export": "Aceite de coco orgánico",
          "products-oregano-export": "Orégano dominicano",
          "products-cassava-export": "Yuca de exportación",
          "products-honey-export": "Miel orgánica para exportación",
        },
        slideMetadata: {
          "products-charcoal-premium": {
            category: "Carbón vegetal",
            origin: "República Dominicana",
            badge: "Premium",
          },
          "products-fruits-variety": {
            category: "Frutas tropicales",
            origin: "Rep. Dominicana",
          },
          "products-mango-export": {
            category: "Mango",
            origin: "Rep. Dominicana",
            badge: "Exportación",
          },
          "products-peppers-tomatoes": {
            category: "Hortalizas",
            origin: "Rep. Dominicana",
          },
          "products-mixed-catalog": {
            category: "Catálogo abierto",
            origin: "Bajo solicitud",
          },
          "products-charcoal-bulk": {
            category: "Carbón vegetal",
            origin: "Rep. Dominicana",
            badge: "Volumen",
          },
          "products-vegetables-variety": {
            category: "Vegetales frescos",
            origin: "Rep. Dominicana",
          },
          "products-avocado-export": {
            category: "Aguacate",
            origin: "Rep. Dominicana",
            badge: "Exportación",
          },
          "products-pineapple-export": {
            category: "Piña MD2",
            origin: "Rep. Dominicana",
            badge: "Premium",
          },
          "products-cocoa-export": {
            category: "Cacao orgánico",
            origin: "Rep. Dominicana",
            badge: "Fino aroma",
          },
          "products-coffee-export": {
            category: "Café especial",
            origin: "Zonas de altura RD",
            badge: "Especialidad",
          },
          "products-bananas-export": {
            category: "Bananos orgánicos",
            origin: "Rep. Dominicana",
            badge: "Orgánico",
          },
          "products-coconuts-export": {
            category: "Cocos",
            origin: "Rep. Dominicana",
          },
          "products-limes-export": {
            category: "Cítricos",
            origin: "Rep. Dominicana",
          },
          "products-coconut-oil-export": {
            category: "Aceite de coco",
            origin: "Rep. Dominicana",
            badge: "Orgánico",
          },
          "products-oregano-export": {
            category: "Especias orgánicas",
            origin: "Rep. Dominicana",
          },
          "products-cassava-export": {
            category: "Yuca fresca",
            origin: "Rep. Dominicana",
          },
          "products-honey-export": {
            category: "Miel orgánica",
            origin: "Rep. Dominicana",
          },
        },
        controls: {
          previousSlide: "Imagen anterior",
          nextSlide: "Imagen siguiente",
          openViewer: "Abrir visor de imagen",
          closeViewer: "Cerrar visor",
          previousImage: "Imagen anterior",
          nextImage: "Imagen siguiente",
          goToSlide: "Ir a la imagen",
        },
      },
    },
    process: {
      label: "CÓMO TRABAJAMOS",
      heading: "PROCESO",
      steps: [
        "Descubrimiento — Entendemos tu necesidad comercial y el flujo de la operación.",
        "Abastecimiento o conexión — Identificamos la conexión proveedor–cliente según el caso.",
        "Coordinación logística — Organizamos la coordinación logística para un flujo eficiente.",
        "Entrega y seguimiento — Damos seguimiento para sostener una relación comercial confiable.",
      ],
    },
    why: {
      label: "CONFIANZA QUE MUEVE TU NEGOCIO",
      heading: "POR QUÉ ELEGIRNOS",
      lead:
        "Combinamos experiencia, procesos y compromiso para ofrecer soluciones confiables que optimizan tu cadena de suministro.",
      pillars: [
        {
          key: "compliance-clarity",
          title: "Cumplimiento y claridad documental",
          description:
            "Operamos con respeto legal, acuerdos transparentes y comunicación precisa para reducir incertidumbre comercial.",
          proof: "Cumplimiento legal · Transparencia · Ética empresarial",
        },
        {
          key: "operational-coordination",
          title: "Coordinación operativa de punta a punta",
          description:
            "Alineamos necesidad, abastecimiento, logística y seguimiento para que cada solicitud avance con estructura.",
          proof: "Eficiencia operativa · Seguimiento · Ejecución local",
        },
        {
          key: "adaptive-sourcing",
          title: "Abastecimiento flexible y multisectorial",
          description:
            "No dependemos de un catálogo cerrado. Activamos oportunidades según producto, volumen, destino y mercado.",
          proof: "Adaptabilidad · Enfoque multisectorial · Crecimiento responsable",
        },
      ],
    },
    values: {
      label: "EN QUÉ CREEMOS",
      heading: "VALORES",
      visionLabel: "VISIÓN",
      visionText:
        "Ser una empresa líder en comercio internacional y soluciones logísticas en el Caribe y mercados globales, reconocida por confiabilidad, diversificación, cumplimiento y capacidad de generar valor sostenible.",
      missionLabel: "MISIÓN",
      missionText:
        "Brindar soluciones integrales de importación, exportación, logística y servicios comerciales, facilitando el flujo eficiente de bienes y servicios en múltiples industrias mediante procesos estructurados, ética empresarial y una gestión orientada al crecimiento sostenible.",
      valuesLabel: "VALORES",
      principles: [
        {
          key: "compliance-transparency",
          title: "Cumplimiento y transparencia",
          description:
            "Cada operación se sostiene sobre integridad, respeto legal y relaciones comerciales confiables.",
          items: ["Integridad", "Confianza"],
        },
        {
          key: "execution-coordination",
          title: "Ejecución y coordinación",
          description:
            "Convertimos acuerdos en movimiento real mediante compromiso, eficiencia y mejora continua.",
          items: ["Compromiso", "Excelencia Operativa"],
        },
        {
          key: "adaptive-growth",
          title: "Adaptabilidad y crecimiento responsable",
          description:
            "Respondemos a mercados cambiantes con enfoque multisectorial y visión sostenible a largo plazo.",
          items: ["Adaptabilidad", "Enfoque Multisectorial", "Crecimiento Responsable"],
        },
      ],
      values: [
        {
          title: "Integridad",
          description:
            "Transparencia, ética y respeto a las leyes en cada operación.",
        },
        {
          title: "Compromiso",
          description: "Responsabilidad real en cada acuerdo asumido.",
        },
        {
          title: "Excelencia Operativa",
          description: "Eficiencia, calidad y mejora continua en la ejecución.",
        },
        {
          title: "Confianza",
          description:
            "Relaciones sólidas y duraderas con proveedores y clientes.",
        },
        {
          title: "Adaptabilidad",
          description: "Agilidad para responder a cambios del mercado.",
        },
        {
          title: "Enfoque Multisectorial",
          description:
            "Oportunidades comerciales estratégicas en múltiples industrias.",
        },
        {
          title: "Crecimiento Responsable",
          description:
            "Desarrollo con visión sostenible y valor a largo plazo.",
        },
      ],
    },
    commitment: {
      label: "NUESTRO COMPROMISO",
      heading: "COMPROMISO",
      text: "Nuestro compromiso es responder con agilidad, cumplimiento y ejecución clara para cada operación comercial, cuidando resultados sostenibles para clientes y aliados.",
    },
    contact: {
      label: "INFORMACIÓN DE LA EMPRESA",
      heading: "CONTÁCTANOS",
      description:
        "Conversemos sobre tu operación. Exportamos variedad de frutas, vegetales y carbón, y también gestionamos productos que no aparecen en la web. Cuéntanos tu necesidad y trabajemos una ruta clara, responsable y orientada a resultados.",
      companyInfo: {
        countryLabel: "País",
        country: "República Dominicana",
        addressLabel: "Dirección de la oficina",
        address: "Av. Winston Churchill 95, Torre Empresarial Atlántico, Santo Domingo",
        emailLabel: "Correo electrónico",
        email: "contacto@globalliftrd.com",
        phoneLabel: "Teléfono",
        phone: "+1 (809) 555-0147",
      },
      form: {
        fields: [
          "Nombre",
          "Empresa",
          "Email",
          "Teléfono",
          "Tipo de servicio",
          "Producto (opcional)",
          "Destino u origen",
          "Volumen estimado",
          "Tiempo esperado",
          "Mensaje",
        ],
        placeholders: [
          "Nombre y apellido",
          "Empresa o razón social",
          "correo@empresa.com",
          "+1 809 000 0000",
          "Exportación, importación, logística…",
          "Carbón, cacao, frutas, categoría…",
          "República Dominicana → destino…",
          "Contenedor, kg, cajas, recurrencia…",
          "Inmediato, mensual, fecha objetivo…",
          "Cuéntanos restricciones, documentación, destino y prioridad…",
        ],
        intakeLabel: "Intake operativo",
        intro: "Respondemos con una ruta clara de abastecimiento, logística o conexión comercial según tu operación.",
        submitLabel: "Enviar solicitud",
        submittingLabel: "Enviando…",
        status: {
          submitting: "Estamos enviando tu solicitud…",
          success: "Solicitud enviada. Te responderemos pronto.",
          error: "No pudimos enviar tu solicitud. Intenta de nuevo en unos minutos.",
        },
        micro:
          "Comparte el producto y volumen que necesitas: te respondemos con una propuesta concreta de suministro.",
      },
    },
    footer: {
      backToTopLabel: "Volver al inicio",
      navigationLabel: "Navegación",
      productsLabel: "Productos",
      contactLabel: "Contacto",
      globalMapLabel:
        "Mapa global con rutas comerciales interconectadas hacia República Dominicana",
      globalMapEyebrow: "Mapa global",
      globalMapCaption: "Conexiones",
      rights: "Todos los derechos reservados.",
      productLinks: [
        { label: "Carbón vegetal", href: "#products" },
        { label: "Frutas tropicales", href: "#products" },
        { label: "Vegetales frescos", href: "#products" },
        { label: "Aguacate", href: "#products" },
        { label: "Mango", href: "#products" },
        { label: "Abastecimiento a medida", href: "#contact" },
      ],
      socialLinks: [
        {
          type: "linkedin",
          href: "https://linkedin.com/company/globalliftrd",
          ariaLabel: "LinkedIn de Global Lift",
        },
        {
          type: "instagram",
          href: "https://instagram.com/globalliftrd",
          ariaLabel: "Instagram de Global Lift",
        },
      ],
      legalLinks: [],
    },
  },
  en: {
    navItems: [
      { label: "About Us", href: "#nosotros" },
      { label: "Services", href: "#services" },
      { label: "Products", href: "#products" },
      { label: "Process", href: "#process" },
      { label: "Values", href: "#nosotros-valores" },
      { label: "Contact", href: "#contact" },
    ],
    seo: {
      title: "Global Lift | Import, Export & Logistics",
      description:
        "B2B import, export, logistics, and trade facilitation. Connecting markets with the Dominican Republic through compliance and transparency.",
    },
    navigation: {
      cta: "Contact",
    },
    hero: {
      title: "We power your supply chain, without borders.",
      subtitle:
        "B2B solutions for import, export, logistics, and trade facilitation across fruits, vegetables, coal, and additional categories on demand—built on legal compliance, transparency, and structured processes.",
      primaryCta: "Contact",
      secondaryCta: "Services",
      micro:
        "If your product is not listed on the website, contact us—we activate tailored supply with no fixed catalog limit.",
      slogans: [
        "Connecting markets. Local execution.",
        "Global trade, local delivery",
        "Logistics and trade, built trust",
      ],
      trustCues: [
        "Legal compliance",
        "Transparency",
        "Structured processes",
        "Open catalog supply",
      ],
    },
    revealSection: {
      title1: "Export Excellence",
      subtitle1:
        "We bring the best of our land to international markets with guaranteed freshness and quality.",
      title2: "Strategic Sourcing",
      subtitle2:
        "Connecting your business with trusted global suppliers to secure your supply chain.",
    },
    about: {
      label: "WHO WE ARE",
      heading: "Global trade with local execution",
      paragraphs: [
        "Global Lift is a Dominican import, export, logistics, and trade facilitation company. We connect sellers, suppliers, and clients across international markets and the Dominican Republic through an operation focused on compliance, coordination, and sustainable commercial value.",
      ],
      oneLine: "Connecting markets, lifting opportunities.",
      proofPoints: [
        {
          key: "compliance",
          title: "Documentation compliance",
          description:
            "Operations built on legal respect, clear agreements, and transparent communication.",
        },
        {
          key: "coordination",
          title: "Operational coordination",
          description:
            "We align sourcing, logistics, and follow-up so each request moves with structure.",
        },
        {
          key: "sourcing",
          title: "Flexible sourcing",
          description:
            "We activate opportunities by product, volume, destination, and market without relying on a closed catalog.",
        },
      ],
      primaryCta: "See process",
      secondaryCta: "Discuss an operation",
    },
    services: {
      label: "WHAT WE DO",
      heading: "SERVICES",
      lead: "We build tailored solutions to import, export, coordinate logistics, and sustain commercial operations end-to-end.",
      items: [
        "Import — End-to-end support solutions for import operations.",
        "Export — B2B export facilitation through structured coordination.",
        "Logistics & coordination — We coordinate an efficient flow of goods and services.",
        "Commercialization — We support trade processes that connect supply and demand.",
        "Supplier–client connection — We bridge markets, suppliers, and buyers.",
        "Trade facilitation / commercial services — We support operations through structured processes and ethical standards.",
        "Sourcing & supply — We can support the provision of various products based on client needs.",
      ],
    },
    products: {
      label: "WHAT WE OFFER",
      heading: "PRODUCTS",
      exportTitle: "Export",
      supplyTitle: "Sourcing",
      exportText:
        "We export a broad variety of fruits, vegetables, and coal, connecting Dominican supply with international commercial opportunities.",
      supplyText:
        "We are not limited to the products shown on this website: we can source and supply multiple product categories based on your needs, volumes, and destination markets.",
      coalHighlight:
        "Coal supply: active line for commercial operations and recurring contracts.",
      openCatalogHighlight:
        "Open catalog: if you don’t see your product on this website, contact us. We have no fixed limit on what we can help you supply.",
      cta: "Looking for a specific product? Contact us and we’ll build a tailored supply proposal.",
      gallery: {
        slideTitles: {
          "products-charcoal-premium": "Premium charcoal supply",
          "products-charcoal-bulk": "Bulk charcoal for commercial volumes",
          "products-fruits-variety": "Tropical fruit variety",
          "products-vegetables-variety": "Fresh vegetable variety",
          "products-avocado-export": "Avocado for export",
          "products-mango-export": "Mango for export",
          "products-peppers-tomatoes": "Quality peppers and tomatoes",
          "products-mixed-catalog": "Open catalog on request",
          "products-pineapple-export": "Premium pineapple for export",
          "products-cocoa-export": "Organic Dominican cocoa",
          "products-coffee-export": "High-altitude specialty coffee",
          "products-bananas-export": "Organic bananas for export",
          "products-coconuts-export": "Export-grade coconuts",
          "products-limes-export": "Quality Persian limes",
          "products-coconut-oil-export": "Organic coconut oil",
          "products-oregano-export": "Dominican oregano",
          "products-cassava-export": "Cassava for export",
          "products-honey-export": "Organic honey for export",
        },
        slideMetadata: {
          "products-charcoal-premium": {
            category: "Charcoal",
            origin: "Dominican Republic",
            badge: "Premium",
          },
          "products-fruits-variety": {
            category: "Tropical fruits",
            origin: "Dominican Republic",
          },
          "products-mango-export": {
            category: "Mango",
            origin: "Dominican Republic",
            badge: "Export",
          },
          "products-peppers-tomatoes": {
            category: "Fresh produce",
            origin: "Dominican Republic",
          },
          "products-mixed-catalog": {
            category: "Open catalog",
            origin: "On request",
          },
          "products-charcoal-bulk": {
            category: "Charcoal",
            origin: "Dominican Republic",
            badge: "Volume",
          },
          "products-vegetables-variety": {
            category: "Fresh vegetables",
            origin: "Dominican Republic",
          },
          "products-avocado-export": {
            category: "Avocado",
            origin: "Dominican Republic",
            badge: "Export",
          },
          "products-pineapple-export": {
            category: "Pineapple MD2",
            origin: "Dominican Republic",
            badge: "Premium",
          },
          "products-cocoa-export": {
            category: "Organic cocoa",
            origin: "Dominican Republic",
            badge: "Fine aroma",
          },
          "products-coffee-export": {
            category: "Specialty coffee",
            origin: "Dominican highlands",
            badge: "Specialty",
          },
          "products-bananas-export": {
            category: "Organic bananas",
            origin: "Dominican Republic",
            badge: "Organic",
          },
          "products-coconuts-export": {
            category: "Coconuts",
            origin: "Dominican Republic",
          },
          "products-limes-export": {
            category: "Citrus",
            origin: "Dominican Republic",
          },
          "products-coconut-oil-export": {
            category: "Coconut oil",
            origin: "Dominican Republic",
            badge: "Organic",
          },
          "products-oregano-export": {
            category: "Organic spices",
            origin: "Dominican Republic",
          },
          "products-cassava-export": {
            category: "Fresh cassava",
            origin: "Dominican Republic",
          },
          "products-honey-export": {
            category: "Organic honey",
            origin: "Dominican Republic",
          },
        },
        controls: {
          previousSlide: "Previous slide",
          nextSlide: "Next slide",
          openViewer: "Open image viewer",
          closeViewer: "Close viewer",
          previousImage: "Previous image",
          nextImage: "Next image",
          goToSlide: "Go to slide",
        },
      },
    },
    process: {
      label: "HOW WE WORK",
      heading: "PROCESS",
      steps: [
        "Discovery — We understand your commercial need and operational flow.",
        "Sourcing or connection — We align the right supplier–client connection for the case.",
        "Logistics coordination — We coordinate logistics for an efficient flow.",
        "Delivery & follow-up — We follow through to support a reliable commercial relationship.",
      ],
    },
    why: {
      label: "TRUST THAT MOVES YOUR BUSINESS",
      heading: "WHY CHOOSE US",
      lead:
        "We combine experience, process, and commitment to deliver reliable solutions that optimize your supply chain.",
      pillars: [
        {
          key: "compliance-clarity",
          title: "Compliance and documentation clarity",
          description:
            "We operate with legal respect, transparent agreements, and precise communication to reduce commercial uncertainty.",
          proof: "Legal compliance · Transparency · Ethical business",
        },
        {
          key: "operational-coordination",
          title: "End-to-end operational coordination",
          description:
            "We align need, sourcing, logistics, and follow-up so every request advances with structure.",
          proof: "Operational efficiency · Follow-up · Local execution",
        },
        {
          key: "adaptive-sourcing",
          title: "Flexible multi-sector sourcing",
          description:
            "We are not limited to a closed catalog. We activate opportunities based on product, volume, destination, and market.",
          proof: "Adaptability · Multi-sector approach · Responsible growth",
        },
      ],
    },
    values: {
      label: "WHAT WE STAND FOR",
      heading: "VALUES",
      visionLabel: "VISION",
      visionText:
        "To be a leading company in international trade and logistics solutions across the Caribbean and global markets—recognized for reliability, diversification, compliance, and the ability to create sustainable value.",
      missionLabel: "MISSION",
      missionText:
        "To deliver integrated import, export, logistics, and commercial services—enabling the efficient flow of goods and services across industries through structured processes, ethical business practices, and sustainability-oriented management.",
      valuesLabel: "VALUES",
      principles: [
        {
          key: "compliance-transparency",
          title: "Compliance and transparency",
          description:
            "Every operation is grounded in integrity, legal respect, and reliable commercial relationships.",
          items: ["Integrity", "Trust"],
        },
        {
          key: "execution-coordination",
          title: "Execution and coordination",
          description:
            "We turn agreements into real movement through commitment, efficiency, and continuous improvement.",
          items: ["Commitment", "Operational Excellence"],
        },
        {
          key: "adaptive-growth",
          title: "Adaptability and responsible growth",
          description:
            "We respond to changing markets with a multi-sector approach and long-term sustainable vision.",
          items: ["Adaptability", "Multi-sector Approach", "Responsible Growth"],
        },
      ],
      values: [
        {
          title: "Integrity",
          description:
            "Transparency, ethics, and respect for laws in every operation.",
        },
        {
          title: "Commitment",
          description: "Real accountability in every agreement we take on.",
        },
        {
          title: "Operational Excellence",
          description:
            "Efficiency, quality, and continuous improvement in execution.",
        },
        {
          title: "Trust",
          description:
            "Strong, long-term relationships with suppliers and clients.",
        },
        {
          title: "Adaptability",
          description: "Agility to respond to market changes.",
        },
        {
          title: "Multi-sector Approach",
          description: "Strategic commercial opportunities across industries.",
        },
        {
          title: "Responsible Growth",
          description:
            "Growth with sustainability and long-term value in mind.",
        },
      ],
    },
    commitment: {
      label: "OUR COMMITMENT",
      heading: "COMMITMENT",
      text: "Our commitment is to deliver agile response, compliance, and clear execution in every commercial operation while supporting sustainable outcomes for clients and partners.",
    },
    contact: {
      label: "COMPANY INFORMATION",
      heading: "CONTACT US",
      description:
        "Let’s talk about your operation. We export a broad mix of fruits, vegetables, and coal, and we also source products beyond what is shown on the website. Tell us your need and we’ll define a clear, responsible, results-driven path.",
      companyInfo: {
        countryLabel: "Country",
        country: "Dominican Republic",
        addressLabel: "Office address",
        address: "95 Winston Churchill Ave, Atlantico Business Tower, Santo Domingo",
        emailLabel: "Email",
        email: "contact@globalliftrd.com",
        phoneLabel: "Phone",
        phone: "+1 (809) 555-0147",
      },
      form: {
        fields: [
          "Name",
          "Company",
          "Email",
          "Phone",
          "Service Type",
          "Product (optional)",
          "Destination or origin",
          "Estimated volume",
          "Expected timing",
          "Message",
        ],
        placeholders: [
          "Full name",
          "Company or legal name",
          "name@company.com",
          "+1 809 000 0000",
          "Export, import, logistics…",
          "Charcoal, cocoa, fruit, category…",
          "Dominican Republic → destination…",
          "Container, kg, boxes, recurrence…",
          "Immediate, monthly, target date…",
          "Share constraints, documents, destination, and priority…",
        ],
        intakeLabel: "Trade intake",
        intro: "We respond with a clear sourcing, logistics, or commercial connection path for your operation.",
        submitLabel: "Send request",
        submittingLabel: "Sending…",
        status: {
          submitting: "We are sending your request…",
          success: "Request sent. We will get back to you soon.",
          error: "We could not send your request. Please try again in a few minutes.",
        },
        micro:
          "Share the product and volume you need and we’ll reply with a concrete supply proposal.",
      },
    },
    footer: {
      backToTopLabel: "Back to top",
      navigationLabel: "Navigation",
      productsLabel: "Products",
      contactLabel: "Contact",
      globalMapLabel:
        "Global map with interconnected trade routes into the Dominican Republic",
      globalMapEyebrow: "Global map",
      globalMapCaption: "Connections",
      rights: "All rights reserved.",
      productLinks: [
        { label: "Charcoal", href: "#products" },
        { label: "Tropical fruits", href: "#products" },
        { label: "Fresh vegetables", href: "#products" },
        { label: "Avocado", href: "#products" },
        { label: "Mango", href: "#products" },
        { label: "Custom sourcing", href: "#contact" },
      ],
      socialLinks: [
        {
          type: "linkedin",
          href: "https://linkedin.com/company/globalliftrd",
          ariaLabel: "Global Lift on LinkedIn",
        },
        {
          type: "instagram",
          href: "https://instagram.com/globalliftrd",
          ariaLabel: "Global Lift on Instagram",
        },
      ],
      legalLinks: [],
    },
  },
};
