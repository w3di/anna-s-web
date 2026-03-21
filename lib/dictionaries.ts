export const locales = ["en", "cz", "ru"] as const;

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
    languages: { en: "English", cz: "Čeština", ru: "Русский" },
    languagesShort: { en: "EN", cz: "CZ", ru: "RU" },
    nav: {
      home: "Home",
      about: "About Me",
      sessions: "Sessions",
      blog: "Blog",
      contact: "Contact",
      book: "Book",
    },
    hero: {
      overline: "Mind of Heart",
      firstName: "Anna",
      lastName: "Kolmykova",
      tagline:
        "Psychologist in Prague — systemic constellation facilitator and process-oriented therapist helping you move through inner transitions with clarity, depth, and care.",
      primaryCta: "Explore Sessions",
      secondaryCta: "About Me",
      quote:
        "Try not to resist the changes that come your way. Instead let life live through you. And do not worry that your life is turning upside down. How do you know that the side you are used to is better than the one to come?",
      quoteAuthor: "Rumi",
      location: "Prague · Online",
      founded: "Est. 2020",
      scrollAria: "Scroll down",
      seoH1: "Psychologist in Prague — Systemic Constellations & Process-Oriented Therapy",
    },
    homeAbout: {
      overline: "About Me",
      title: "Facilitator & psychologist",
      accent: "at your service",
      paragraphs: [
        "Anna Kolmykova is a psychologist in Prague working at the intersection of psychology, embodiment, and consciousness — supporting individuals and leaders through life transitions, relationships, and inner conflicts with depth and clarity.",
        "With more than 10 years of experience in international business across Europe, the USA, and Asia, Anna combines strategic thinking with deep systemic and embodied insight.",
        "Her background in mathematics, clinical psychology, family and organisational constellations, and body-based methods allows her to work with both visible challenges and the deeper dynamics beneath them.",
      ],
      stats: [
        { value: "10+", label: "Years of experience" },
        { value: "3", label: "Core disciplines" },
        { value: "∞", label: "Potential for change" },
      ],
      locationTitle: "Prague",
      locationText: "Czech Republic · Online",
      primaryCta: "Full Story",
      secondaryCta: "Book a Session",
    },
    homeServices: {
      overline: "How I Can Help",
      title: "Sessions & Services",
      cta: "All Sessions",
      items: [
        {
          num: "01",
          title: "Private Session",
          subtitle: "Constellations",
          description:
            "Explore hidden patterns behind recurring blocks, conflicts, and emotional loops through a carefully held one-to-one constellation process.",
          tags: ["Family Systems", "Inner Blocks", "Transitions"],
          cta: "Learn More",
        },
        {
          num: "02",
          title: "For Business",
          subtitle: "& Organisations",
          description:
            "Reveal invisible dynamics shaping leadership, succession, decision-making, and organisational alignment when strategy alone is not enough.",
          tags: ["Leadership", "Strategy", "Succession"],
          cta: "Learn More",
        },
        {
          num: "03",
          title: "Personal Coaching",
          subtitle: "& Mentoring",
          description:
            "A process-oriented journey that combines presence, reflection, and embodied awareness to support clarity, balance, and meaningful movement.",
          tags: ["Somatic Work", "Coaching", "Mentoring"],
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
          question: "What can I expect from a session with a psychologist in Prague?",
          answer: "Each session is tailored to your needs. Whether you choose systemic constellations, coaching, or process-oriented therapy, it takes place in a safe and confidential environment — in person in Prague or online. A free 20-minute discovery call helps us understand your request before we begin.",
        },
        {
          question: "Do you offer online sessions?",
          answer: "Yes. Psychologist Anna Kolmykova offers sessions both in person in Prague and online via secure video. Online sessions are equally effective and available in English, Czech, and Russian.",
        },
        {
          question: "How much does a psychologist in Prague cost?",
          answer: "Session prices vary depending on the type and duration. Contact us for current rates. A free 20-minute discovery call is always included to make sure the fit is right.",
        },
        {
          question: "What is the difference between constellations and coaching?",
          answer: "Systemic constellations reveal hidden patterns in family and organisational systems. Coaching focuses on personal growth, clarity, and moving forward. Both approaches can complement each other, and your psychologist in Prague will help you choose the right format.",
        },
        {
          question: "In which languages do you offer sessions?",
          answer: "Sessions are available in English, Czech, and Russian — both in person in Prague and online worldwide.",
        },
      ],
    },
    footer: {
      ctaOverline: "Ready to begin?",
      ctaTitle: "Take the first step today.",
      ctaButton: "Book a Session",
      brandDescription:
        "Psychologist in Prague — systemic constellation facilitator and process-oriented therapist supporting individuals and leaders through lasting inner change.",
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
      eyebrow: "How I Work",
      title: "Sessions",
      subtitle: "Choose the path that resonates with you",
      items: [
        {
          id: "private",
          num: "01",
          title: "Private Session",
          subtitle: "Constellations",
          intro:
            "Private constellation sessions offer a confidential and supportive space to explore personal, family, or ancestral dynamics influencing your life.",
          description:
            "Hidden patterns become visible, emotional blocks soften, and a new sense of grounding, movement, and inner alignment can emerge.",
          bullets: [
            "Family and ancestral patterns",
            "Relationship challenges and intimacy",
            "Repeating life patterns and inner blocks",
            "Life transitions and major decisions",
            "Trauma, grief, and unresolved experiences",
            "Identity, belonging, and direction",
          ],
          cta: "Book This Session",
        },
        {
          id: "business",
          num: "02",
          title: "For Business",
          subtitle: "& Organisations",
          intro:
            "When progress stalls or decisions feel unclear, the causes often lie beyond strategy alone.",
          description:
            "Organisational constellations reveal hidden loyalties, unresolved conflicts, and system-level dynamics that shape leadership, succession, and business flow.",
          bullets: [
            "Leadership dynamics and succession",
            "Organisational growth blocks",
            "Team conflicts and culture",
            "Strategic decisions and positioning",
            "Mergers, acquisitions, restructuring",
            "Founder dynamics and legacy",
          ],
          cta: "Book This Session",
        },
        {
          id: "coaching",
          num: "03",
          title: "Personal Coaching",
          subtitle: "& Mentoring",
          intro:
            "Some questions live in the body, not the mind. This is a process-oriented journey of reflection, presence, and embodied awareness.",
          description:
            "Especially supportive during life transitions, leadership challenges, and periods of uncertainty — helping restore balance and move forward with clarity.",
          bullets: [
            "Art-based and creative practices",
            "Reflective questions and coaching",
            "Body awareness and somatic practices",
            "Mind–body–soul integration",
            "Constellation-informed exploration",
            "Support during transitions",
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
  cz: {
    localeLabel: "Jazyk",
    languages: { en: "English", cz: "Čeština", ru: "Русский" },
    languagesShort: { en: "EN", cz: "CZ", ru: "RU" },
    nav: {
      home: "Domů",
      about: "O mně",
      sessions: "Sezení",
      blog: "Blog",
      contact: "Kontakt",
      book: "Rezervace",
    },
    hero: {
      overline: "Mind of Heart",
      firstName: "Anna",
      lastName: "Kolmykova",
      tagline:
        "Psycholožka v Praze — facilitátorka systemických konstelací a procesně orientovaná terapeutka, která pomáhá procházet vnitřními změnami s jasností, hloubkou a péčí.",
      primaryCta: "Prozkoumat sezení",
      secondaryCta: "O mně",
      quote:
        "Snaž se neodolávat změnám, které k tobě přicházejí. Místo toho nech život, ať žije skrze tebe. A nedělej si starosti, že se ti život obrací vzhůru nohama. Jak víš, že strana, na kterou jsi zvyklý, je lepší než ta, která přichází?",
      quoteAuthor: "Rúmí",
      location: "Praha · Online",
      founded: "Od r. 2020",
      scrollAria: "Posunout dolů",
      seoH1: "Psycholožka v Praze — Systemické konstelace a procesně orientovaná terapie",
    },
    homeAbout: {
      overline: "O mně",
      title: "Facilitátorka a psycholožka",
      accent: "ve vaší službě",
      paragraphs: [
        "Anna Kolmykova je psycholožka v Praze, která pracuje na pomezí psychologie, ztělesnění a vědomí — podporuje jednotlivce i lídry při životních změnách, ve vztazích a vnitřních konfliktech s hloubkou a jasností.",
        "Díky více než 10 letům zkušeností v mezinárodním byznysu v Evropě, USA i Asii propojuje strategické myšlení s hlubokým systémovým a tělesným vhledem.",
        "Její zázemí v matematice, klinické psychologii, rodinných a organizačních konstelacích i tělově orientovaných metodách umožňuje pracovat s viditelnými problémy i skrytými dynamikami pod nimi.",
      ],
      stats: [
        { value: "10+", label: "let zkušeností" },
        { value: "3", label: "hlavní disciplíny" },
        { value: "∞", label: "možnost změny" },
      ],
      locationTitle: "Praha",
      locationText: "Česká republika · Online",
      primaryCta: "Celý příběh",
      secondaryCta: "Rezervovat sezení",
    },
    homeServices: {
      overline: "Jak mohu pomoci",
      title: "Sezení a služby",
      cta: "Všechna sezení",
      items: [
        {
          num: "01",
          title: "Individuální sezení",
          subtitle: "Konstelace",
          description:
            "Objevte skryté vzorce za opakujícími se bloky, konflikty a emočními smyčkami v bezpečně vedeném individuálním procesu.",
          tags: ["Rodinný systém", "Bloky", "Přechody"],
          cta: "Zjistit více",
        },
        {
          num: "02",
          title: "Pro firmy",
          subtitle: "a organizace",
          description:
            "Odhalte neviditelné dynamiky ovlivňující leadership, nástupnictví, rozhodování a soulad organizace, když strategie sama nestačí.",
          tags: ["Leadership", "Strategie", "Nástupnictví"],
          cta: "Zjistit více",
        },
        {
          num: "03",
          title: "Osobní koučink",
          subtitle: "a mentoring",
          description:
            "Procesně orientovaná cesta, která kombinuje přítomnost, reflexi a tělesné uvědomění pro větší jasnost, rovnováhu a směr.",
          tags: ["Somatika", "Koučink", "Mentoring"],
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
          question: "Co mohu očekávat od sezení s psycholožkou v Praze?",
          answer: "Každé sezení je přizpůsobeno vašim potřebám. Ať zvolíte systemické konstelace, koučink nebo procesně orientovanou terapii, probíhá v bezpečném a důvěrném prostředí — osobně v Praze nebo online. Bezplatný 20minutový úvodní hovor nám pomůže porozumět vašemu dotazu.",
        },
        {
          question: "Nabízíte online sezení?",
          answer: "Ano. Psycholožka Anna Kolmykova nabízí sezení osobně v Praze i online přes zabezpečené video. Online sezení jsou stejně účinná a dostupná v angličtině, češtině a ruštině.",
        },
        {
          question: "Kolik stojí psycholog v Praze?",
          answer: "Ceny sezení se liší podle typu a délky. Kontaktujte nás pro aktuální ceník. Bezplatný 20minutový úvodní hovor je vždy součástí, abychom ověřili vzájemnou shodu.",
        },
        {
          question: "Jaký je rozdíl mezi konstelacemi a koučinkem?",
          answer: "Systemické konstelace odhalují skryté vzorce v rodinných a organizačních systémech. Koučink se zaměřuje na osobní růst, jasnost a pohyb vpřed. Oba přístupy se mohou doplňovat a psycholožka v Praze vám pomůže vybrat správný formát.",
        },
        {
          question: "V jakých jazycích nabízíte sezení?",
          answer: "Sezení jsou dostupná v angličtině, češtině a ruštině — osobně v Praze i online po celém světě.",
        },
      ],
    },
    footer: {
      ctaOverline: "Připraveni začít?",
      ctaTitle: "Udělejte první krok ještě dnes.",
      ctaButton: "Rezervovat sezení",
      brandDescription:
        "Psycholožka v Praze — facilitátorka systemických konstelací a procesně orientovaná terapeutka podporující jednotlivce i lídry v trvalé vnitřní změně.",
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
      eyebrow: "Jak pracuji",
      title: "Sezení",
      subtitle: "Vyberte si cestu, která s vámi rezonuje",
      items: [
        {
          id: "private",
          num: "01",
          title: "Individuální sezení",
          subtitle: "Konstelace",
          intro:
            "Individuální konstelace nabízejí důvěrný a podpůrný prostor pro zkoumání osobních, rodinných či transgeneračních dynamik.",
          description:
            "Skryté vzorce se stávají viditelnými, emoční bloky se uvolňují a může se objevit nový pocit ukotvení, pohybu a vnitřního souladu.",
          bullets: [
            "Rodinné a transgenerační vzorce",
            "Vztahové obtíže a intimita",
            "Opakující se životní vzorce",
            "Životní přechody a rozhodnutí",
            "Trauma, ztráta a neuzavřené emoce",
            "Identita, sounáležitost a směr",
          ],
          cta: "Rezervovat toto sezení",
        },
        {
          id: "business",
          num: "02",
          title: "Pro firmy",
          subtitle: "a organizace",
          intro:
            "Když se růst zastaví nebo rozhodnutí nejsou jasná, příčiny často neleží jen ve strategii.",
          description:
            "Organizační konstelace odhalují skryté loajality, neuzavřené konflikty a systémové dynamiky, které formují leadership, nástupnictví i tok v organizaci.",
          bullets: [
            "Leadership a nástupnictví",
            "Bloky růstu organizace",
            "Týmové konflikty a kultura",
            "Strategická rozhodnutí a pozicování",
            "Fúze, akvizice, restrukturalizace",
            "Dynamika zakladatelů a odkaz",
          ],
          cta: "Rezervovat toto sezení",
        },
        {
          id: "coaching",
          num: "03",
          title: "Osobní koučink",
          subtitle: "a mentoring",
          intro:
            "Některé otázky žijí v těle, ne v mysli. Tato cesta propojuje reflexi, přítomnost a ztělesněné uvědomění.",
          description:
            "Je obzvlášť užitečná během životních změn, výzev v leadershipu a období nejistoty — pomáhá obnovit rovnováhu a směr.",
          bullets: [
            "Tvořivé a art-based techniky",
            "Reflexivní otázky a koučink",
            "Somatické praktiky",
            "Propojení těla, mysli a duše",
            "Systémová a konstelacemi inspirovaná explorace",
            "Podpora v přechodových obdobích",
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
      aboutTitle:
        "O Anně Kolmykové — psycholožka v Praze | Mind of Heart",
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
    languages: { en: "English", cz: "Čeština", ru: "Русский" },
    languagesShort: { en: "EN", cz: "CZ", ru: "RU" },
    nav: {
      home: "Главная",
      about: "Обо мне",
      sessions: "Сессии",
      blog: "Блог",
      contact: "Контакты",
      book: "Запись",
    },
    hero: {
      overline: "Mind of Heart",
      firstName: "Anna",
      lastName: "Kolmykova",
      tagline:
        "Психолог в Праге — фасилитатор системных расстановок и процесс-ориентированный терапевт, помогающий проходить внутренние переходы с ясностью, глубиной и вниманием.",
      primaryCta: "Смотреть сессии",
      secondaryCta: "Обо мне",
      quote:
        "Не сопротивляйся переменам, которые приходят. Позволь жизни течь через тебя. И не тревожься, что твоя жизнь переворачивается. Откуда ты знаешь, что сторона, к которой ты привык, лучше той, что приходит?",
      quoteAuthor: "Руми",
      location: "Прага · Онлайн",
      founded: "С 2020 года",
      scrollAria: "Прокрутить вниз",
      seoH1: "Психолог в Праге — Системные расстановки и процесс-ориентированная терапия",
    },
    homeAbout: {
      overline: "Обо мне",
      title: "Фасилитатор и психолог",
      accent: "рядом с вами",
      paragraphs: [
        "Анна Колмыкова — психолог в Праге, работающий на пересечении психологии, телесности и сознания, поддерживая людей и лидеров в жизненных переходах, отношениях и внутренних конфликтах с глубиной и ясностью.",
        "Более 10 лет международного бизнес-опыта в Европе, США и Азии позволяют ей сочетать стратегическое мышление с глубоким системным и телесным пониманием.",
        "Образование в математике, клинической психологии, семейных и организационных расстановках, а также телесных методах помогает работать и с видимыми трудностями, и с глубинной динамикой под ними.",
      ],
      stats: [
        { value: "10+", label: "лет опыта" },
        { value: "3", label: "ключевые дисциплины" },
        { value: "∞", label: "возможность перемен" },
      ],
      locationTitle: "Прага",
      locationText: "Чехия · Онлайн",
      primaryCta: "Полная история",
      secondaryCta: "Записаться",
    },
    homeServices: {
      overline: "Чем я могу помочь",
      title: "Сессии и услуги",
      cta: "Все сессии",
      items: [
        {
          num: "01",
          title: "Индивидуальная сессия",
          subtitle: "Расстановки",
          description:
            "Исследуйте скрытые паттерны за повторяющимися блоками, конфликтами и эмоциональными циклами в бережно выстроенном индивидуальном процессе.",
          tags: ["Семейная система", "Блоки", "Переходы"],
          cta: "Подробнее",
        },
        {
          num: "02",
          title: "Для бизнеса",
          subtitle: "и организаций",
          description:
            "Выявите невидимую динамику, влияющую на лидерство, преемственность, принятие решений и согласованность команды, когда одной стратегии недостаточно.",
          tags: ["Лидерство", "Стратегия", "Преемственность"],
          cta: "Подробнее",
        },
        {
          num: "03",
          title: "Личный коучинг",
          subtitle: "и менторинг",
          description:
            "Процесс-ориентированный путь, который соединяет присутствие, рефлексию и телесное осознавание для большей ясности, баланса и движения.",
          tags: ["Соматика", "Коучинг", "Менторинг"],
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
          question: "Чего ожидать от сессии с психологом в Праге?",
          answer: "Каждая сессия адаптируется под ваш запрос. Будь то системные расстановки, коучинг или процесс-ориентированная терапия — всё проходит в безопасной и конфиденциальной обстановке, лично в Праге или онлайн. Бесплатный 20-минутный звонок-знакомство поможет понять ваш запрос до начала работы.",
        },
        {
          question: "Вы проводите онлайн-сессии?",
          answer: "Да. Психолог Анна Колмыкова проводит сессии лично в Праге и онлайн через защищённое видео. Онлайн-сессии одинаково эффективны и доступны на русском, английском и чешском языках.",
        },
        {
          question: "Сколько стоит психолог в Праге?",
          answer: "Стоимость сессий зависит от типа и продолжительности. Свяжитесь с нами для актуальных цен. Бесплатный 20-минутный ознакомительный звонок всегда включён, чтобы убедиться, что мы подходим друг другу.",
        },
        {
          question: "В чём разница между расстановками и коучингом?",
          answer: "Системные расстановки раскрывают скрытые паттерны в семейных и организационных системах. Коучинг фокусируется на личностном росте, ясности и движении вперёд. Оба подхода дополняют друг друга, и психолог в Праге поможет выбрать подходящий формат.",
        },
        {
          question: "На каких языках проводятся сессии?",
          answer: "Сессии доступны на русском, английском и чешском — лично в Праге и онлайн по всему миру.",
        },
      ],
    },
    footer: {
      ctaOverline: "Готовы начать?",
      ctaTitle: "Сделайте первый шаг сегодня.",
      ctaButton: "Записаться на сессию",
      brandDescription:
        "Психолог в Праге — фасилитатор системных расстановок и процесс-ориентированный терапевт, поддерживающий людей и лидеров в глубокой внутренней трансформации.",
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
      eyebrow: "Как я работаю",
      title: "Сессии",
      subtitle: "Выберите путь, который откликается именно вам",
      items: [
        {
          id: "private",
          num: "01",
          title: "Индивидуальная сессия",
          subtitle: "Расстановки",
          intro:
            "Индивидуальные расстановки создают конфиденциальное и поддерживающее пространство для исследования личной, семейной и родовой динамики.",
          description:
            "Скрытые паттерны становятся видимыми, эмоциональные блоки смягчаются, а вместе с этим появляется больше опоры, движения и внутреннего согласия.",
          bullets: [
            "Семейные и родовые паттерны",
            "Сложности в отношениях и близости",
            "Повторяющиеся жизненные сценарии",
            "Переходные периоды и решения",
            "Травма, утрата и незавершённые переживания",
            "Идентичность, принадлежность и направление",
          ],
          cta: "Записаться на эту сессию",
        },
        {
          id: "business",
          num: "02",
          title: "Для бизнеса",
          subtitle: "и организаций",
          intro:
            "Когда развитие останавливается, а решения теряют ясность, причины часто лежат глубже, чем просто стратегия.",
          description:
            "Организационные расстановки показывают скрытые лояльности, незавершённые конфликты и системную динамику, влияющую на лидерство, преемственность и поток в компании.",
          bullets: [
            "Лидерство и преемственность",
            "Блоки роста организации",
            "Конфликты и культура команды",
            "Стратегические решения и позиционирование",
            "Слияния, поглощения, реструктуризация",
            "Динамика основателей и наследие",
          ],
          cta: "Записаться на эту сессию",
        },
        {
          id: "coaching",
          num: "03",
          title: "Личный коучинг",
          subtitle: "и менторинг",
          intro:
            "Некоторые вопросы живут в теле, а не в уме. Этот путь соединяет рефлексию, присутствие и телесное осознавание.",
          description:
            "Особенно полезно во время жизненных переходов, лидерских вызовов и периодов неопределённости — помогает восстановить баланс и ясность.",
          bullets: [
            "Творческие практики",
            "Рефлексивные вопросы и коучинг",
            "Соматические практики",
            "Интеграция тела, ума и души",
            "Системное исследование",
            "Поддержка в переходных периодах",
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
      aboutTitle:
        "Об Анне Колмыковой — психолог в Праге | Mind of Heart",
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
