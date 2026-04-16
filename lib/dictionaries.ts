export const locales = ["en", "cs", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localeCookieName = "mindofheart-locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export type SiteDictionary = {
  localeLabel: string;
  languages: Record<Locale, string>;
  languagesShort: Record<Locale, string>;
  nav: {
    home: string;
    about: string;
    sessions: string;
    blog: string;
    contact: string;
    book: string;
  };
  hero: {
    overline: string;
    firstName: string;
    lastName: string;
    tagline: string;
    primaryCta: string;
    secondaryCta: string;
    quote: string;
    quoteAuthor: string;
    location: string;
    founded: string;
    scrollAria: string;
    seoH1: string;
  };
  homeAbout: {
    overline: string;
    title: string;
    accent: string;
    paragraphs: string[];
    stats: Array<{ value: string; label: string }>;
    locationTitle: string;
    locationText: string;
    primaryCta: string;
    secondaryCta: string;
  };
  homeServices: {
    overline: string;
    title: string;
    cta: string;
    items: Array<{
      num: string;
      title: string;
      subtitle: string;
      description: string;
      tags: string[];
      cta: string;
    }>;
  };
  philosophy: {
    overline: string;
    quote: string;
    author: string;
    pillars: Array<{ symbol: string; label: string; text: string }>;
  };
  process: {
    overline: string;
    title: string;
    accent: string;
    description: string;
    cta: string;
    steps: Array<{ num: string; title: string; body: string }>;
  };
  homeFaq: {
    overline: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  footer: {
    ctaOverline: string;
    ctaTitle: string;
    ctaButton: string;
    brandDescription: string;
    pagesTitle: string;
    sessionsTitle: string;
    sessionLinks: string[];
    rights: string;
    location: string;
  };
  aboutPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    approachOverline: string;
    approachTitle: string;
    intro1: string;
    intro2: string;
    principles: Array<{ icon: string; title: string; desc: string }>;
    backgroundOverline: string;
    backgroundTitle: string;
    education: Array<{ year: string; item: string }>;
    ctaOverline: string;
    ctaTitle: string;
    ctaText: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  sessionsPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      num: string;
      title: string;
      subtitle: string;
      intro: string;
      description: string;
      bullets: string[];
      cta: string;
    }>;
    ctaOverline: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };
  contactPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    formOverline: string;
    formTitle: string;
    formText: string;
    infoOverline: string;
    infoTitle: string;
    locationLabel: string;
    locationValue: string;
    locationSub: string;
    emailLabel: string;
    emailValue: string;
    phoneLabel: string;
    phoneValue: string;
    note: string;
    noteAuthor: string;
  };
  contactForm: {
    name: string;
    contact: string;
    subject: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    validationError: string;
    error: string;
    rateLimitError: string;
  };
  notFoundPage: {
    overline: string;
    title: string;
    subtitle: string;
    description: string;
    cta: string;
  };
  metadata: {
    homeTitle: string;
    homeDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    sessionsTitle: string;
    sessionsDescription: string;
    contactTitle: string;
    contactDescription: string;
  };
};

export const dictionaries: Record<Locale, SiteDictionary> = {
  en: {
    localeLabel: "Language",
    languages: { en: "English", cs: "Čeština", ru: "Русский" },
    languagesShort: { en: "EN", cs: "CZ", ru: "RU" },
    nav: {
      home: "Home",
      about: "About Me",
      sessions: "Sessions",
      blog: "Blog",
      contact: "Contact",
      book: "Book",
    },
    hero: {
      overline: "",
      firstName: "Anna",
      lastName: "Kolmykova",
      tagline:
        "Systemic family facilitator for individuals and businesses, and somatic specialist supporting inner transitions with clarity, depth, and care.",
      primaryCta: "Explore Sessions",
      secondaryCta: "About Me",
      quote: "",
      quoteAuthor: "",
      location: "",
      founded: "",
      scrollAria: "Scroll down",
      seoH1:
        "Psychologist in Prague — Systemic Constellations & Process-Oriented Therapy",
    },
    homeAbout: {
      overline: "About Me",
      title: "About Me",
      accent:
        "Systemic Facilitator and somatic specialist, here to support your process.",
      paragraphs: [
        "Anna works at the intersection of psychology, embodiment, and consciousness, supporting individuals and organisations through life transitions, relationships, and inner conflict with clarity, depth, and care.",
        "With more than 10 years of international corporate experience, she brings together strategic thinking, systemic insight, and embodied awareness.",
        "Her background in mathematics, clinical psychology and family constellations allows her to work with both visible challenges and the deeper dynamics beneath them.",
        "Consultations are available online or in person in Prague.",
      ],
      stats: [],
      locationTitle: "Prague",
      locationText: "Czech Republic · Online",
      primaryCta: "Full Story",
      secondaryCta: "Book a Session",
    },
    homeServices: {
      overline: "Sessions",
      title: "Sessions",
      cta: "All Sessions",
      items: [
        {
          num: "01",
          title: "Individual Consultation",
          subtitle: "90 min",
          description:
            "A longer-term process for exploring inner transitions, relationship challenges, emotional patterns, and personal growth. This work supports deeper self-understanding, integration, and sustainable change over time.",
          tags: ["Inner Transitions", "Relationships", "Personal Growth"],
          cta: "Learn More",
        },
        {
          num: "02",
          title: "Family Constellations",
          subtitle: "120–150 min",
          description:
            "A systemic approach to understanding family patterns, relational dynamics, and deeper emotional themes. This work reveals what may be operating beneath the surface and supports insight, clarity, and change.",
          tags: ["Family Systems", "Relational Dynamics", "Insight"],
          cta: "Learn More",
        },
        {
          num: "03",
          title: "Business & Organisational Constellations",
          subtitle: "Duration based on complexity",
          description:
            "A systemic approach to exploring leadership, team dynamics, decision-making, and challenges within organisations. This work helps reveal hidden patterns, relational dynamics, and underlying tensions that may be influencing the system, supporting greater clarity, alignment, and effective action.",
          tags: ["Leadership", "Team Dynamics", "Organisational Alignment"],
          cta: "Learn More",
        },
      ],
    },
    philosophy: {
      overline: "My Philosophy",
      quote:
        "My intention is to create a safe and grounded space where you can slow down, reconnect with yourself, and move forward with greater clarity and integrity.",
      author: "Anna Kolmykova",
      pillars: [
        {
          symbol: "○",
          label: "Systemic",
          text: "Patterns in our lives are often woven into family, ancestry, and the wider systems we belong to.",
        },
        {
          symbol: "◇",
          label: "Embodied",
          text: "The body carries information the mind cannot always explain. Somatic awareness brings those layers into consciousness.",
        },
        {
          symbol: "△",
          label: "Process-Oriented",
          text: "Real change unfolds when we work with what wants to emerge rather than forcing a fixed outcome.",
        },
      ],
    },
    process: {
      overline: "How It Works",
      title: "The journey begins",
      accent: "with one step",
      description:
        "Sessions with your psychologist in Prague are available online or in person. Each one is unique — a dialogue between presence and process.",
      cta: "Start Your Journey",
      steps: [
        {
          num: "01",
          title: "Reach Out",
          body: "Send a short message describing what brings you here. No pressure — just a first step.",
        },
        {
          num: "02",
          title: "Discovery Call",
          body: "A free 20-minute conversation to understand your needs and see whether we are a good fit.",
        },
        {
          num: "03",
          title: "Your Session",
          body: "Each session is tailored to you and held in a safe, confidential environment — online or in person.",
        },
        {
          num: "04",
          title: "Integration",
          body: "Between sessions, the shift continues. Practices and reflection help new awareness settle into daily life.",
        },
      ],
    },
    homeFaq: {
      overline: "FAQ",
      title: "Frequently Asked Questions",
      items: [
        {
          question: "What can I expect from a session?",
          answer:
            "Each session is shaped around your needs. Whether you come for family constellations, consultancy, or business-related work, the process unfolds in a safe and confidential space — in person in Prague or online. A free 20-minute discovery call allows us to understand your request before we begin.",
        },
        {
          question: "Do you offer online sessions?",
          answer:
            "Yes. Sessions are available both in person in Prague and online via secure video.",
        },
        {
          question:
            "What is the difference between constellations and consultancy?",
          answer:
            "Systemic constellations help reveal hidden patterns and underlying dynamics within family or organisational systems. Consultancy is a longer-term, therapeutically informed process that supports deeper reflection, integration, and lasting change over time. Both approaches can complement each other, depending on the nature of the issue and the kind of support needed.",
        },
        {
          question: "In which languages do you offer sessions?",
          answer:
            "Sessions are available in English, Czech, and Russian — both in person in Prague and online worldwide.",
        },
      ],
    },
    footer: {
      ctaOverline: "Ready to begin?",
      ctaTitle: "Take the first step today.",
      ctaButton: "Book a Session",
      brandDescription:
        "Hear the voice of your heart.",
      pagesTitle: "Pages",
      sessionsTitle: "Sessions",
      sessionLinks: [
        "Private Constellations",
        "Business & Organisations",
        "Coaching & Mentoring",
      ],
      rights: "© 2026 MindofHeart.com — All Rights Reserved",
      location: "Prague · Czech Republic",
    },
    aboutPage: {
      eyebrow: "Meet Anna",
      title: "About Me",
      subtitle: "Facilitator · Psychologist · Guide",
      approachOverline: "My Approach",
      approachTitle: "How I Work",
      intro1:
        "My primary intention is to create a safe and grounded space where people can slow down, reconnect with themselves, gently release inner blocks, and move forward with greater clarity and integrity.",
      intro2:
        "I work in a therapeutic way that bridges body, mind, and soul — supporting awareness, integration, and lasting change in both personal and professional life.",
      principles: [
        {
          icon: "○",
          title: "Systemic",
          desc: "Working with family and organisational systems",
        },
        {
          icon: "◇",
          title: "Embodied",
          desc: "Somatic and body-based awareness practices",
        },
        {
          icon: "△",
          title: "Process-Oriented",
          desc: "Following what naturally wants to emerge",
        },
      ],
      backgroundOverline: "Background",
      backgroundTitle: "Education & Certifications",
      education: [
        {
          year: "2025",
          item: "Three-year training in sacred and spiritual process-oriented therapy (completed)",
        },
        {
          year: "2024",
          item: "International training in Organisational Constellations",
        },
        {
          year: "2023",
          item: "International training in Family Constellations",
        },
        { year: "Ongoing", item: "Master's degree in Family Counselling" },
        {
          year: "Prior",
          item: "Professional requalification in Clinical Psychology",
        },
        { year: "Prior", item: "Master's degree in Analytics and Mathematics" },
        {
          year: "Ongoing",
          item: "Personal development through spiritual study journeys in India, Indonesia, and the USA",
        },
      ],
      ctaOverline: "Next Step",
      ctaTitle: "Ready to begin your journey?",
      ctaText:
        "Let's explore together how we can work. The first step is simply reaching out.",
      ctaPrimary: "Contact Me",
      ctaSecondary: "View Sessions",
    },
    sessionsPage: {
      eyebrow: "Sessions",
      title: "Sessions",
      subtitle: "Choose the path that resonates with you",
      items: [
        {
          id: "private",
          num: "01",
          title: "Individual Consultation",
          subtitle: "90 min",
          intro:
            "A longer-term process for exploring inner transitions, relationship challenges, emotional patterns, and personal growth.",
          description:
            "This work supports deeper self-understanding, integration, and sustainable change over time.",
          bullets: [
            "Inner transitions and life changes",
            "Relationship challenges",
            "Emotional patterns and blocks",
            "Personal growth and self-understanding",
            "Integration and sustainable change",
          ],
          cta: "Book This Session",
        },
        {
          id: "business",
          num: "02",
          title: "Family Constellations",
          subtitle: "120–150 min",
          intro:
            "A systemic approach to understanding family patterns, relational dynamics, and deeper emotional themes.",
          description:
            "This work reveals what may be operating beneath the surface and supports insight, clarity, and change.",
          bullets: [
            "Family patterns and ancestral dynamics",
            "Relational dynamics and bonds",
            "Deeper emotional themes",
            "Hidden loyalties and entanglements",
            "Insight, clarity, and resolution",
          ],
          cta: "Book This Session",
        },
        {
          id: "coaching",
          num: "03",
          title: "Business & Organisational Constellations",
          subtitle: "Duration based on complexity",
          intro:
            "A systemic approach to exploring leadership, team dynamics, decision-making, and challenges within organisations.",
          description:
            "This work helps reveal hidden patterns, relational dynamics, and underlying tensions that may be influencing the system, supporting greater clarity, alignment, and effective action.",
          bullets: [
            "Leadership and team dynamics",
            "Decision-making and strategy",
            "Organisational challenges and tensions",
            "Hidden patterns within the system",
            "Clarity, alignment, and effective action",
          ],
          cta: "Book This Session",
        },
      ],
      ctaOverline: "Begin",
      ctaTitle: "Not sure where to start?",
      ctaText:
        "Reach out for a free 20-minute discovery call and we will explore together which approach suits you best.",
      ctaButton: "Schedule a Call",
    },
    contactPage: {
      eyebrow: "Get in Touch",
      title: "Contact",
      subtitle: "Love. Create. Live.",
      formOverline: "Send a Message",
      formTitle: "Love. Create. Live.",
      formText:
        "For questions or consultation booking, reach out via the form or email. I aim to respond within 1–2 business days.",
      infoOverline: "Details",
      infoTitle: "Contact Information",
      locationLabel: "Location",
      locationValue: "Prague, Czech Republic",
      locationSub: "In-person & Online",
      emailLabel: "Email",
      emailValue: "info@mindofheart.com",
      phoneLabel: "Phone & WhatsApp",
      phoneValue: "+420 608 514 450",
      note: "A free 20-minute discovery call is always the best first step — no pressure, just conversation.",
      noteAuthor: "Anna",
    },
    contactForm: {
      name: "Full Name",
      contact: "Email or Phone",
      subject: "Subject (optional)",
      message: "Your Message",
      send: "Send Message",
      sending: "Sending...",
      success:
        "Thank you — your message has been sent. I will be in touch shortly.",
      validationError: "Please enter a valid email or phone number.",
      error: "Something went wrong. Please try again in a moment.",
      rateLimitError: "Too many attempts. Please try again tomorrow.",
    },
    notFoundPage: {
      overline: "Error 404",
      title: "404",
      subtitle: "Page not found",
      description:
        "The page you are looking for may have been moved, renamed, or simply does not exist. Let\u2019s guide you back.",
      cta: "Go to Home",
    },
    metadata: {
      homeTitle:
        "Psychologist in Prague — Anna Kolmykova | Systemic Constellations & Coaching",
      homeDescription:
        "Anna Kolmykova — psychologist in Prague offering systemic constellations, process-oriented therapy, and personal coaching. In-person and online sessions. Book a free discovery call.",
      aboutTitle:
        "About Anna Kolmykova — Psychologist in Prague | Mind of Heart",
      aboutDescription:
        "Meet Anna Kolmykova — systemic constellation facilitator and process-oriented psychologist based in Prague. Education, approach, and certifications. Online and in-person sessions.",
      sessionsTitle:
        "Sessions — Psychologist in Prague | Constellations, Coaching & Therapy",
      sessionsDescription:
        "Book a session with psychologist Anna Kolmykova in Prague or online. Private constellations, business constellations, personal coaching and mentoring.",
      contactTitle:
        "Contact — Psychologist Anna Kolmykova in Prague | Mind of Heart",
      contactDescription:
        "Reach out to psychologist Anna Kolmykova in Prague to book a session or ask a question. In-person and online consultations available.",
    },
  },
  cs: {
    localeLabel: "Jazyk",
    languages: { en: "English", cs: "Čeština", ru: "Русский" },
    languagesShort: { en: "EN", cs: "CZ", ru: "RU" },
    nav: {
      home: "Domů",
      about: "O mně",
      sessions: "Sezení",
      blog: "Blog",
      contact: "Kontakt",
      book: "Rezervace",
    },
    hero: {
      overline: "",
      firstName: "Anna",
      lastName: "Kolmykova",
      tagline:
        "Systemická rodinná facilitátorka pro jednotlivce i firmy a somatická specialistka podporující vnitřní proměny s jasností, hloubkou a péčí.",
      primaryCta: "Prozkoumat sezení",
      secondaryCta: "O mně",
      quote: "",
      quoteAuthor: "",
      location: "",
      founded: "",
      scrollAria: "Posunout dolů",
      seoH1:
        "Psycholožka v Praze — Systemické konstelace a procesně orientovaná terapie",
    },
    homeAbout: {
      overline: "O mně",
      title: "O mně",
      accent: "Systemická facilitátorka a somatická specialistka, připravená podpořit váš proces.",
      paragraphs: [
        "Anna pracuje na pomezí psychologie, ztělesnění a vědomí, podporuje jednotlivce i organizace v životních přechodech, vztazích a vnitřních konfliktech s jasností, hloubkou a péčí.",
        "Díky více než 10 letům mezinárodních korporátních zkušeností propojuje strategické myšlení, systémový vhled a tělesné uvědomění.",
        "Její zázemí v matematice, klinické psychologii a rodinných konstelacích umožňuje pracovat s viditelnými problémy i hlubší dynamikou pod nimi.",
        "Konzultace jsou dostupné online nebo osobně v Praze.",
      ],
      stats: [],
      locationTitle: "Praha",
      locationText: "Česká republika · Online",
      primaryCta: "Celý příběh",
      secondaryCta: "Rezervovat sezení",
    },
    homeServices: {
      overline: "Sezení",
      title: "Sezení",
      cta: "Všechna sezení",
      items: [
        {
          num: "01",
          title: "Individuální konzultace",
          subtitle: "90 min",
          description:
            "Dlouhodobější proces pro zkoumání vnitřních proměn, vztahových obtíží, emočních vzorců a osobního růstu. Tato práce podporuje hlubší sebepoznání, integraci a udržitelnou změnu v čase.",
          tags: ["Vnitřní proměny", "Vztahy", "Osobní růst"],
          cta: "Zjistit více",
        },
        {
          num: "02",
          title: "Rodinné konstelace",
          subtitle: "120–150 min",
          description:
            "Systemický přístup k porozumění rodinným vzorcům, vztahovým dynamikám a hlubším emočním tématům. Tato práce odhaluje, co může působit pod povrchem, a podporuje vhled, jasnost a změnu.",
          tags: ["Rodinné systémy", "Vztahové dynamiky", "Vhled"],
          cta: "Zjistit více",
        },
        {
          num: "03",
          title: "Firemní a organizační konstelace",
          subtitle: "Délka dle složitosti",
          description:
            "Systemický přístup ke zkoumání leadershipu, týmových dynamik, rozhodování a výzev v organizacích. Tato práce pomáhá odhalit skryté vzorce, vztahové dynamiky a napětí ovlivňující systém a podporuje větší jasnost, soulad a efektivní akci.",
          tags: ["Leadership", "Týmové dynamiky", "Organizační soulad"],
          cta: "Zjistit více",
        },
      ],
    },
    philosophy: {
      overline: "Moje filozofie",
      quote:
        "Mým záměrem je vytvářet bezpečný a ukotvený prostor, kde můžete zpomalit, znovu se spojit se sebou a jít dál s větší jasností a integritou.",
      author: "Anna Kolmykova",
      pillars: [
        {
          symbol: "○",
          label: "Systemické",
          text: "Vzorce v našem životě jsou často provázané s rodinou, předky a systémy, do nichž patříme.",
        },
        {
          symbol: "◇",
          label: "Ztělesněné",
          text: "Tělo nese informace, které mysl nedokáže vždy vysvětlit. Somatické vnímání je přivádí do vědomí.",
        },
        {
          symbol: "△",
          label: "Procesní",
          text: "Skutečná změna přichází, když pracujeme s tím, co se chce přirozeně objevit, místo tlačení na výsledek.",
        },
      ],
    },
    process: {
      overline: "Jak to probíhá",
      title: "Cesta začíná",
      accent: "jedním krokem",
      description:
        "Sezení s psycholožkou v Praze jsou dostupná online nebo osobně. Každé je jedinečné — dialog mezi přítomností a procesem.",
      cta: "Začít cestu",
      steps: [
        {
          num: "01",
          title: "Ozvěte se",
          body: "Napište krátkou zprávu, co vás přivádí. Bez tlaku — jen první krok.",
        },
        {
          num: "02",
          title: "Úvodní hovor",
          body: "Bezplatný 20minutový rozhovor pro pochopení vašich potřeb a ověření, zda jsme pro sebe vhodní.",
        },
        {
          num: "03",
          title: "Vaše sezení",
          body: "Každé sezení je šité na míru a probíhá v bezpečném a důvěrném prostoru — online i osobně.",
        },
        {
          num: "04",
          title: "Integrace",
          body: "Změna pokračuje i mezi sezeními. Praxe a reflexe pomáhají ukotvit nové uvědomění v každodenním životě.",
        },
      ],
    },
    homeFaq: {
      overline: "FAQ",
      title: "Často kladené otázky",
      items: [
        {
          question: "Co mohu očekávat od sezení?",
          answer:
            "Každé sezení je utvářeno kolem vašich potřeb. Ať přicházíte na rodinné konstelace, konzultaci nebo firemní práci, proces probíhá v bezpečném a důvěrném prostoru — osobně v Praze nebo online. Bezplatný 20minutový úvodní hovor nám umožní porozumět vašemu dotazu.",
        },
        {
          question: "Nabízíte online sezení?",
          answer:
            "Ano. Sezení jsou dostupná osobně v Praze i online přes zabezpečené video.",
        },
        {
          question: "Jaký je rozdíl mezi konstelacemi a konzultací?",
          answer:
            "Systemické konstelace pomáhají odhalit skryté vzorce a dynamiky v rodinných či organizačních systémech. Konzultace je dlouhodobější, terapeuticky informovaný proces podporující hlubší reflexi, integraci a trvalou změnu. Oba přístupy se mohou doplňovat podle povahy tématu a potřebné podpory.",
        },
        {
          question: "V jakých jazycích nabízíte sezení?",
          answer:
            "Sezení jsou dostupná v češtině, angličtině a ruštině — osobně v Praze i online po celém světě.",
        },
      ],
    },
    footer: {
      ctaOverline: "Připraveni začít?",
      ctaTitle: "Udělejte první krok ještě dnes.",
      ctaButton: "Rezervovat sezení",
      brandDescription:
        "Hear the voice of your heart.",
      pagesTitle: "Stránky",
      sessionsTitle: "Sezení",
      sessionLinks: [
        "Individuální konstelace",
        "Firmy a organizace",
        "Koučink a mentoring",
      ],
      rights: "© 2026 MindofHeart.com — Všechna práva vyhrazena",
      location: "Praha · Česká republika",
    },
    aboutPage: {
      eyebrow: "Seznamte se s Annou",
      title: "O mně",
      subtitle: "Facilitátorka · Psycholožka · Průvodkyně",
      approachOverline: "Můj přístup",
      approachTitle: "Jak pracuji",
      intro1:
        "Mým hlavním záměrem je vytvářet bezpečný a ukotvený prostor, kde lidé mohou zpomalit, znovu se spojit se sebou, jemně uvolnit vnitřní bloky a jít dál s větší jasností a integritou.",
      intro2:
        "Pracuji terapeutickým způsobem, který propojuje tělo, mysl a duši — a podporuje uvědomění, integraci a trvalou změnu v osobním i profesním životě.",
      principles: [
        {
          icon: "○",
          title: "Systemické",
          desc: "Práce s rodinnými a organizačními systémy",
        },
        {
          icon: "◇",
          title: "Ztělesněné",
          desc: "Somatické a tělově orientované praxe",
        },
        {
          icon: "△",
          title: "Procesní",
          desc: "Následování toho, co chce přirozeně vzniknout",
        },
      ],
      backgroundOverline: "Zázemí",
      backgroundTitle: "Vzdělání a certifikace",
      education: [
        {
          year: "2025",
          item: "Tříletý výcvik v posvátné a spirituální procesně orientované terapii (ukončen)",
        },
        {
          year: "2024",
          item: "Mezinárodní výcvik v organizačních konstelacích",
        },
        { year: "2023", item: "Mezinárodní výcvik v rodinných konstelacích" },
        { year: "Ongoing", item: "Magisterské studium rodinného poradenství" },
        {
          year: "Prior",
          item: "Profesní rekvalifikace v klinické psychologii",
        },
        { year: "Prior", item: "Magisterský titul v analytice a matematice" },
        {
          year: "Ongoing",
          item: "Osobní rozvoj skrze studijní cesty do Indie, Indonésie a USA",
        },
      ],
      ctaOverline: "Další krok",
      ctaTitle: "Jste připraveni začít svou cestu?",
      ctaText:
        "Společně prozkoumáme, jak můžeme pracovat. Prvním krokem je jednoduše se ozvat.",
      ctaPrimary: "Kontaktujte mě",
      ctaSecondary: "Zobrazit sezení",
    },
    sessionsPage: {
      eyebrow: "Sezení",
      title: "Sezení",
      subtitle: "Vyberte si cestu, která s vámi rezonuje",
      items: [
        {
          id: "private",
          num: "01",
          title: "Individuální konzultace",
          subtitle: "90 min",
          intro:
            "Dlouhodobější proces pro zkoumání vnitřních proměn, vztahových obtíží, emočních vzorců a osobního růstu.",
          description:
            "Tato práce podporuje hlubší sebepoznání, integraci a udržitelnou změnu v čase.",
          bullets: [
            "Vnitřní proměny a životní změny",
            "Vztahové obtíže",
            "Emoční vzorce a bloky",
            "Osobní růst a sebepoznání",
            "Integrace a udržitelná změna",
          ],
          cta: "Rezervovat toto sezení",
        },
        {
          id: "business",
          num: "02",
          title: "Rodinné konstelace",
          subtitle: "120–150 min",
          intro:
            "Systemický přístup k porozumění rodinným vzorcům, vztahovým dynamikám a hlubším emočním tématům.",
          description:
            "Tato práce odhaluje, co může působit pod povrchem, a podporuje vhled, jasnost a změnu.",
          bullets: [
            "Rodinné vzorce a transgenerační dynamiky",
            "Vztahové dynamiky a vazby",
            "Hlubší emoční témata",
            "Skryté loajality a zapletení",
            "Vhled, jasnost a řešení",
          ],
          cta: "Rezervovat toto sezení",
        },
        {
          id: "coaching",
          num: "03",
          title: "Firemní a organizační konstelace",
          subtitle: "Délka dle složitosti",
          intro:
            "Systemický přístup ke zkoumání leadershipu, týmových dynamik, rozhodování a výzev v organizacích.",
          description:
            "Tato práce pomáhá odhalit skryté vzorce, vztahové dynamiky a napětí ovlivňující systém a podporuje větší jasnost, soulad a efektivní akci.",
          bullets: [
            "Leadership a týmové dynamiky",
            "Rozhodování a strategie",
            "Organizační výzvy a napětí",
            "Skryté vzorce v systému",
            "Jasnost, soulad a efektivní akce",
          ],
          cta: "Rezervovat toto sezení",
        },
      ],
      ctaOverline: "Začátek",
      ctaTitle: "Nevíte, kde začít?",
      ctaText:
        "Ozvěte se na bezplatný 20minutový úvodní hovor a společně najdeme přístup, který vám bude nejlépe vyhovovat.",
      ctaButton: "Naplánovat hovor",
    },
    contactPage: {
      eyebrow: "Spojme se",
      title: "Kontakt",
      subtitle: "Miluj. Tvoř. Žij.",
      formOverline: "Napište zprávu",
      formTitle: "Miluj. Tvoř. Žij.",
      formText:
        "Pro dotazy nebo rezervaci konzultace napište přes formulář nebo e-mail. Odpovídám zpravidla do 1–2 pracovních dnů.",
      infoOverline: "Detaily",
      infoTitle: "Kontaktní informace",
      locationLabel: "Místo",
      locationValue: "Praha, Česká republika",
      locationSub: "Osobně i online",
      emailLabel: "E-mail",
      emailValue: "info@mindofheart.com",
      phoneLabel: "Telefon a WhatsApp",
      phoneValue: "+420 608 514 450",
      note: "Bezplatný 20minutový úvodní hovor je vždy nejlepší první krok — bez tlaku, jen rozhovor.",
      noteAuthor: "Anna",
    },
    contactForm: {
      name: "Celé jméno",
      contact: "E-mail nebo telefon",
      subject: "Předmět (volitelné)",
      message: "Vaše zpráva",
      send: "Odeslat zprávu",
      sending: "Odesílání...",
      success: "Děkuji — vaše zpráva byla odeslána. Brzy se vám ozvu.",
      validationError: "Zadejte prosím platný e-mail nebo telefonní číslo.",
      error: "Něco se pokazilo. Zkuste to prosím za chvíli znovu.",
      rateLimitError: "Příliš mnoho pokusů. Zkuste to prosím zítra.",
    },
    notFoundPage: {
      overline: "Chyba 404",
      title: "404",
      subtitle: "Stránka nenalezena",
      description:
        "Stránka, kterou hledáte, mohla být přesunuta, přejmenována nebo jednoduše neexistuje. Vraťme vás zpět.",
      cta: "Zpět na úvod",
    },
    metadata: {
      homeTitle:
        "Psycholožka Praha — Anna Kolmykova | Systemické konstelace a koučink",
      homeDescription:
        "Anna Kolmykova — psycholožka v Praze. Systemické konstelace, procesně orientovaná terapie a osobní koučink. Sezení osobně i online. Rezervujte si bezplatný úvodní hovor.",
      aboutTitle: "O Anně Kolmykové — psycholožka v Praze | Mind of Heart",
      aboutDescription:
        "Seznamte se s Annou Kolmykovou — facilitátorkou systemických konstelací a procesně orientovanou psycholožkou v Praze. Vzdělání, přístup a certifikace.",
      sessionsTitle:
        "Sezení — Psycholožka v Praze | Konstelace, koučink a terapie",
      sessionsDescription:
        "Rezervujte si sezení s psycholožkou Annou Kolmykovou v Praze nebo online. Individuální konstelace, organizační konstelace, osobní koučink a mentoring.",
      contactTitle:
        "Kontakt — Psycholožka Anna Kolmykova v Praze | Mind of Heart",
      contactDescription:
        "Kontaktujte psycholožku Annu Kolmykovou v Praze. Osobní i online konzultace. Rezervujte si sezení nebo položte dotaz.",
    },
  },
  ru: {
    localeLabel: "Язык",
    languages: { en: "English", cs: "Čeština", ru: "Русский" },
    languagesShort: { en: "EN", cs: "CZ", ru: "RU" },
    nav: {
      home: "Главная",
      about: "Обо мне",
      sessions: "Сессии",
      blog: "Блог",
      contact: "Контакты",
      book: "Запись",
    },
    hero: {
      overline: "",
      firstName: "Anna",
      lastName: "Kolmykova",
      tagline:
        "Системный семейный фасилитатор для частных лиц и бизнеса, соматический специалист, поддерживающий внутренние переходы с ясностью, глубиной и вниманием.",
      primaryCta: "Смотреть сессии",
      secondaryCta: "Обо мне",
      quote: "",
      quoteAuthor: "",
      location: "",
      founded: "",
      scrollAria: "Прокрутить вниз",
      seoH1:
        "Психолог в Праге — Системные расстановки и процесс-ориентированная терапия",
    },
    homeAbout: {
      overline: "Обо мне",
      title: "Обо мне",
      accent: "Системный фасилитатор и соматический специалист, готовый поддержать ваш процесс.",
      paragraphs: [
        "Анна работает на пересечении психологии, телесности и сознания, поддерживая людей и организации в жизненных переходах, отношениях и внутренних конфликтах с ясностью, глубиной и вниманием.",
        "Более 10 лет международного корпоративного опыта позволяют ей соединять стратегическое мышление, системный взгляд и телесное осознавание.",
        "Образование в математике, клинической психологии и семейных расстановках позволяет работать и с видимыми трудностями, и с глубинной динамикой под ними.",
        "Консультации доступны онлайн или лично в Праге.",
      ],
      stats: [],
      locationTitle: "Прага",
      locationText: "Чехия · Онлайн",
      primaryCta: "Полная история",
      secondaryCta: "Записаться",
    },
    homeServices: {
      overline: "Сессии",
      title: "Сессии",
      cta: "Все сессии",
      items: [
        {
          num: "01",
          title: "Индивидуальная консультация",
          subtitle: "90 мин",
          description:
            "Долгосрочный процесс для исследования внутренних переходов, сложностей в отношениях, эмоциональных паттернов и личностного роста. Эта работа поддерживает более глубокое самопонимание, интеграцию и устойчивые изменения.",
          tags: ["Внутренние переходы", "Отношения", "Личностный рост"],
          cta: "Подробнее",
        },
        {
          num: "02",
          title: "Семейные расстановки",
          subtitle: "120–150 мин",
          description:
            "Системный подход к пониманию семейных паттернов, динамики отношений и глубинных эмоциональных тем. Эта работа раскрывает то, что может действовать под поверхностью, и поддерживает осознание, ясность и изменение.",
          tags: ["Семейные системы", "Динамика отношений", "Осознание"],
          cta: "Подробнее",
        },
        {
          num: "03",
          title: "Бизнес и организационные расстановки",
          subtitle: "Продолжительность зависит от сложности",
          description:
            "Системный подход к исследованию лидерства, командной динамики, принятия решений и вызовов внутри организаций. Эта работа помогает выявить скрытые паттерны, динамику отношений и напряжения, влияющие на систему, поддерживая ясность, согласованность и эффективное действие.",
          tags: ["Лидерство", "Командная динамика", "Организационная согласованность"],
          cta: "Подробнее",
        },
      ],
    },
    philosophy: {
      overline: "Моя философия",
      quote:
        "Моё намерение — создавать безопасное и устойчивое пространство, где вы можете замедлиться, вновь встретиться с собой и двигаться дальше с большей ясностью и целостностью.",
      author: "Анна Колмыкова",
      pillars: [
        {
          symbol: "○",
          label: "Системность",
          text: "Паттерны нашей жизни часто вплетены в семью, род и системы, частью которых мы являемся.",
        },
        {
          symbol: "◇",
          label: "Телесность",
          text: "Тело хранит то, что ум не всегда способен объяснить. Соматическое внимание делает это осознаваемым.",
        },
        {
          symbol: "△",
          label: "Процесс",
          text: "Настоящая перемена происходит, когда мы следуем тому, что хочет проявиться, а не давим на фиксированный результат.",
        },
      ],
    },
    process: {
      overline: "Как это проходит",
      title: "Путь начинается",
      accent: "с одного шага",
      description:
        "Сессии с психологом в Праге доступны онлайн или лично. Каждая из них уникальна — это диалог между присутствием и процессом.",
      cta: "Начать путь",
      steps: [
        {
          num: "01",
          title: "Напишите",
          body: "Коротко расскажите, что вас привело. Без давления — просто первый шаг.",
        },
        {
          num: "02",
          title: "Созвон-знакомство",
          body: "Бесплатный 20-минутный разговор, чтобы понять ваш запрос и почувствовать, подходим ли мы друг другу.",
        },
        {
          num: "03",
          title: "Ваша сессия",
          body: "Каждая сессия адаптируется под вас и проходит в безопасном, конфиденциальном пространстве — онлайн или лично.",
        },
        {
          num: "04",
          title: "Интеграция",
          body: "Изменение продолжается между встречами. Практики и рефлексия помогают новому опыту войти в повседневную жизнь.",
        },
      ],
    },
    homeFaq: {
      overline: "FAQ",
      title: "Часто задаваемые вопросы",
      items: [
        {
          question: "Чего ожидать от сессии?",
          answer:
            "Каждая сессия выстраивается вокруг вашего запроса. Будь то семейные расстановки, консультация или работа с бизнес-запросом — процесс проходит в безопасном и конфиденциальном пространстве, лично в Праге или онлайн. Бесплатный 20-минутный звонок-знакомство поможет понять ваш запрос до начала работы.",
        },
        {
          question: "Вы проводите онлайн-сессии?",
          answer:
            "Да. Сессии доступны лично в Праге и онлайн через защищённое видео.",
        },
        {
          question: "В чём разница между расстановками и консультацией?",
          answer:
            "Системные расстановки помогают раскрыть скрытые паттерны и динамику в семейных или организационных системах. Консультация — это более длительный, терапевтически обоснованный процесс, поддерживающий глубокую рефлексию, интеграцию и устойчивые изменения. Оба подхода могут дополнять друг друга в зависимости от характера запроса и необходимой поддержки.",
        },
        {
          question: "На каких языках проводятся сессии?",
          answer:
            "Сессии доступны на английском, чешском и русском — лично в Праге и онлайн по всему миру.",
        },
      ],
    },
    footer: {
      ctaOverline: "Готовы начать?",
      ctaTitle: "Сделайте первый шаг сегодня.",
      ctaButton: "Записаться на сессию",
      brandDescription:
        "Hear the voice of your heart.",
      pagesTitle: "Страницы",
      sessionsTitle: "Сессии",
      sessionLinks: [
        "Личные расстановки",
        "Бизнес и организации",
        "Коучинг и менторинг",
      ],
      rights: "© 2026 MindofHeart.com — Все права защищены",
      location: "Прага · Чехия",
    },
    aboutPage: {
      eyebrow: "Познакомьтесь с Анной",
      title: "Обо мне",
      subtitle: "Фасилитатор · Психолог · Проводник",
      approachOverline: "Мой подход",
      approachTitle: "Как я работаю",
      intro1:
        "Моё основное намерение — создавать безопасное и устойчивое пространство, где человек может замедлиться, снова встретиться с собой, мягко отпустить внутренние блоки и двигаться дальше с большей ясностью и целостностью.",
      intro2:
        "Я работаю терапевтически, соединяя тело, ум и душу — поддерживая осознавание, интеграцию и устойчивые изменения в личной и профессиональной жизни.",
      principles: [
        {
          icon: "○",
          title: "Системно",
          desc: "Работа с семейными и организационными системами",
        },
        {
          icon: "◇",
          title: "Телесно",
          desc: "Соматические и телесно-ориентированные практики",
        },
        {
          icon: "△",
          title: "Процессно",
          desc: "Следование тому, что хочет естественно проявиться",
        },
      ],
      backgroundOverline: "Основа",
      backgroundTitle: "Образование и сертификация",
      education: [
        {
          year: "2025",
          item: "Трёхлетнее обучение в сакральной и духовной процесс-ориентированной терапии (завершено)",
        },
        {
          year: "2024",
          item: "Международное обучение организационным расстановкам",
        },
        { year: "2023", item: "Международное обучение семейным расстановкам" },
        {
          year: "Сейчас",
          item: "Магистерская программа по семейному консультированию",
        },
        {
          year: "Ранее",
          item: "Профессиональная переподготовка по клинической психологии",
        },
        { year: "Ранее", item: "Магистратура по аналитике и математике" },
        {
          year: "Сейчас",
          item: "Личное развитие через духовные учебные поездки в Индию, Индонезию и США",
        },
      ],
      ctaOverline: "Следующий шаг",
      ctaTitle: "Готовы начать свой путь?",
      ctaText:
        "Давайте вместе посмотрим, как мы можем работать. Первый шаг — просто написать.",
      ctaPrimary: "Связаться со мной",
      ctaSecondary: "Смотреть сессии",
    },
    sessionsPage: {
      eyebrow: "Сессии",
      title: "Сессии",
      subtitle: "Выберите путь, который откликается именно вам",
      items: [
        {
          id: "private",
          num: "01",
          title: "Индивидуальная консультация",
          subtitle: "90 мин",
          intro:
            "Долгосрочный процесс для исследования внутренних переходов, сложностей в отношениях, эмоциональных паттернов и личностного роста.",
          description:
            "Эта работа поддерживает более глубокое самопонимание, интеграцию и устойчивые изменения.",
          bullets: [
            "Внутренние переходы и жизненные перемены",
            "Сложности в отношениях",
            "Эмоциональные паттерны и блоки",
            "Личностный рост и самопонимание",
            "Интеграция и устойчивые изменения",
          ],
          cta: "Записаться на эту сессию",
        },
        {
          id: "business",
          num: "02",
          title: "Семейные расстановки",
          subtitle: "120–150 мин",
          intro:
            "Системный подход к пониманию семейных паттернов, динамики отношений и глубинных эмоциональных тем.",
          description:
            "Эта работа раскрывает то, что может действовать под поверхностью, и поддерживает осознание, ясность и изменение.",
          bullets: [
            "Семейные паттерны и родовая динамика",
            "Динамика отношений и связи",
            "Глубинные эмоциональные темы",
            "Скрытые лояльности и переплетения",
            "Осознание, ясность и разрешение",
          ],
          cta: "Записаться на эту сессию",
        },
        {
          id: "coaching",
          num: "03",
          title: "Бизнес и организационные расстановки",
          subtitle: "Продолжительность зависит от сложности",
          intro:
            "Системный подход к исследованию лидерства, командной динамики, принятия решений и вызовов внутри организаций.",
          description:
            "Эта работа помогает выявить скрытые паттерны, динамику отношений и напряжения, влияющие на систему, поддерживая ясность, согласованность и эффективное действие.",
          bullets: [
            "Лидерство и командная динамика",
            "Принятие решений и стратегия",
            "Организационные вызовы и напряжения",
            "Скрытые паттерны в системе",
            "Ясность, согласованность и эффективное действие",
          ],
          cta: "Записаться на эту сессию",
        },
      ],
      ctaOverline: "Начало",
      ctaTitle: "Не знаете, с чего начать?",
      ctaText:
        "Напишите, и мы проведём бесплатный 20-минутный звонок-знакомство, чтобы понять, какой формат будет вам полезнее всего.",
      ctaButton: "Запланировать звонок",
    },
    contactPage: {
      eyebrow: "Связаться",
      title: "Контакты",
      subtitle: "Люби. Твори. Живи.",
      formOverline: "Напишите сообщение",
      formTitle: "Люби. Твори. Живи.",
      formText:
        "Если у вас есть вопрос или вы хотите записаться на консультацию, напишите через форму или по e-mail. Обычно я отвечаю в течение 1–2 рабочих дней.",
      infoOverline: "Детали",
      infoTitle: "Контактная информация",
      locationLabel: "Локация",
      locationValue: "Прага, Чехия",
      locationSub: "Лично и онлайн",
      emailLabel: "E-mail",
      emailValue: "info@mindofheart.com",
      phoneLabel: "Телефон и WhatsApp",
      phoneValue: "+420 608 514 450",
      note: "Бесплатный 20-минутный звонок-знакомство — всегда лучший первый шаг. Без давления, просто разговор.",
      noteAuthor: "Анна",
    },
    contactForm: {
      name: "Полное имя",
      contact: "E-mail или телефон",
      subject: "Тема (необязательно)",
      message: "Ваше сообщение",
      send: "Отправить сообщение",
      sending: "Отправка...",
      success: "Спасибо — ваше сообщение отправлено. Я скоро свяжусь с вами.",
      validationError: "Введите корректный e-mail или номер телефона.",
      error:
        "Что-то пошло не так. Пожалуйста, попробуйте ещё раз через минуту.",
      rateLimitError: "Слишком много попыток. Попробуйте завтра.",
    },
    notFoundPage: {
      overline: "Ошибка 404",
      title: "404",
      subtitle: "Страница не найдена",
      description:
        "Страница, которую вы ищете, могла быть перемещена, переименована или просто не существует. Давайте вернём вас обратно.",
      cta: "На главную",
    },
    metadata: {
      homeTitle:
        "Психолог в Праге — Анна Колмыкова | Системные расстановки и коучинг",
      homeDescription:
        "Анна Колмыкова — психолог в Праге. Системные расстановки, процесс-ориентированная терапия и личный коучинг. Сессии очно и онлайн. Запишитесь на бесплатную консультацию.",
      aboutTitle: "Об Анне Колмыковой — психолог в Праге | Mind of Heart",
      aboutDescription:
        "Познакомьтесь с Анной Колмыковой — фасилитатор системных расстановок и процесс-ориентированный психолог в Праге. Образование, подход и сертификации.",
      sessionsTitle:
        "Сессии — Психолог в Праге | Расстановки, коучинг и терапия",
      sessionsDescription:
        "Запишитесь на сессию к психологу Анне Колмыковой в Праге или онлайн. Индивидуальные расстановки, организационные расстановки, личный коучинг и менторинг.",
      contactTitle:
        "Контакты — Психолог Анна Колмыкова в Праге | Mind of Heart",
      contactDescription:
        "Свяжитесь с психологом Анной Колмыковой в Праге. Очные и онлайн консультации. Запишитесь на сессию или задайте вопрос.",
    },
  },
};

export function getDictionary(locale: Locale): SiteDictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
