export type Language = "es" | "en";

export type NavItem = {
  label: string;
  href: string;
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
};

export type ServicesCopy = {
  label: string;
  heading: string;
  lead: string;
  items: string[];
};

export type ProductsGalleryCopy = {
  slideTitles: Record<string, string>;
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
  items: string[];
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
      heading: "NOSOTROS",
      paragraphs: [
        "Global Lift es una empresa dominicana dedicada a la importación, exportación, logística y comercialización de bienes y servicios, con un enfoque multisectorial y una visión estratégica orientada al comercio nacional e internacional. Actuamos como puente entre vendedores en el extranjero y oportunidades de abastecimiento en República Dominicana, facilitando conexiones comerciales entre mercados, proveedores y clientes.",
        "Operamos bajo altos estándares de cumplimiento legal, eficiencia operativa y transparencia. Nuestro enfoque se centra en optimizar operaciones y habilitar relaciones comerciales sólidas, con una gestión orientada al crecimiento sostenible y a la creación de valor a largo plazo.",
        "Trabajamos para ser un aliado estratégico confiable, conectando mercados y creando oportunidades comerciales con visión global y ejecución local.",
      ],
      oneLine: "Conectando mercados, elevando oportunidades.",
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
      label: "POR QUÉ ELEGIRNOS",
      heading: "POR QUÉ ELEGIRNOS",
      items: [
        "Cumplimiento legal — Operamos con respeto a las leyes y estándares de cumplimiento.",
        "Transparencia — Priorizamos claridad en procesos y acuerdos comerciales.",
        "Eficiencia operativa — Trabajamos con procesos estructurados y enfoque en ejecución.",
        "Ética empresarial — Construimos relaciones desde la integridad y la responsabilidad.",
        "Adaptabilidad — Respondemos de forma ágil a dinámicas del mercado y necesidades del cliente.",
        "Enfoque multisectorial — Facilitamos oportunidades comerciales en múltiples industrias.",
        "Crecimiento responsable — Buscamos crear valor sostenible a largo plazo.",
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
          "Mensaje",
        ],
        submitLabel: "Enviar solicitud",
        submittingLabel: "Enviando...",
        status: {
          submitting: "Estamos enviando tu solicitud...",
          success: "Solicitud enviada. Te responderemos pronto.",
          error: "No pudimos enviar tu solicitud. Intenta de nuevo en unos minutos.",
        },
        micro:
          "Comparte el producto y volumen que necesitas: te respondemos con una propuesta concreta de suministro.",
      },
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
      heading: "ABOUT US",
      paragraphs: [
        "Global Lift is a Dominican company focused on importing, exporting, logistics, and the commercialization of goods and services—with a multi-sector approach and a strategic view of both national and international trade. We serve as a bridge between overseas sellers and sourcing opportunities in the Dominican Republic, facilitating commercial connections among markets, suppliers, and clients.",
        "We operate with strong standards for legal compliance, operational efficiency, and transparency. Our focus is to optimize operations and build lasting commercial relationships through structured processes, ethical business practices, and sustainability-oriented growth.",
        "We work to be a reliable strategic partner, connecting markets and creating commercial opportunities through global vision and local execution.",
      ],
      oneLine: "Connecting markets, lifting opportunities.",
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
      label: "WHY CHOOSE US",
      heading: "WHY CHOOSE US",
      items: [
        "Legal compliance — We operate with respect for laws and compliance standards.",
        "Transparency — We prioritize clarity across processes and commercial agreements.",
        "Operational efficiency — We work through structured processes and execution focus.",
        "Ethical business — We build relationships rooted in integrity and responsibility.",
        "Adaptability — We respond quickly to market dynamics and client needs.",
        "Multi-sector approach — We facilitate commercial opportunities across industries.",
        "Responsible growth — We aim to create sustainable long-term value.",
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
          "Message",
        ],
        submitLabel: "Send request",
        submittingLabel: "Sending...",
        status: {
          submitting: "We are sending your request...",
          success: "Request sent. We will get back to you soon.",
          error: "We could not send your request. Please try again in a few minutes.",
        },
        micro:
          "Share the product and volume you need and we’ll reply with a concrete supply proposal.",
      },
    },
  },
};
