import type { Locale } from "@/lib/dictionaries";

export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
  faq: Array<{ question: string; answer: string }>;
};

export type BlogDictionary = {
  indexTitle: string;
  indexDescription: string;
  indexHeading: string;
  indexSubtitle: string;
  readMore: string;
  backToBlog: string;
  publishedOn: string;
  readTimeLabel: string;
  faqHeading: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  articles: BlogArticle[];
};

const en: BlogDictionary = {
  indexTitle:
    "Blog — Psychologist in Prague | Mind of Heart",
  indexDescription:
    "Articles by psychologist Anna Kolmykova in Prague about systemic constellations, therapy, coaching, and personal growth. Practical insights for your journey.",
  indexHeading: "Blog",
  indexSubtitle:
    "Insights on psychology, systemic constellations, and inner transformation",
  readMore: "Read Article",
  backToBlog: "Back to Blog",
  publishedOn: "Published",
  readTimeLabel: "min read",
  faqHeading: "Frequently Asked Questions",
  ctaTitle: "Ready to take the first step?",
  ctaText:
    "Book a free 20-minute discovery call with psychologist Anna Kolmykova in Prague.",
  ctaButton: "Book a Session",
  articles: [
    {
      slug: "how-to-choose-psychologist-in-prague",
      title: "How to Choose a Psychologist in Prague: A Practical Guide",
      description:
        "Looking for a psychologist in Prague? Learn what to consider when choosing a therapist — qualifications, approach, language, and how to know if it is a good fit.",
      date: "2026-03-10",
      readTime: "7",
      image: "/about-anna.webp",
      imageAlt:
        "Psychologist in Prague — Anna Kolmykova consultation session",
      sections: [
        {
          heading:
            "Why Finding the Right Psychologist in Prague Matters",
          paragraphs: [
            "Prague is home to a growing community of psychologists, therapists, and coaches. Whether you are an expat looking for an English-speaking psychologist in Prague or a local seeking support in Czech or Russian, the choice can feel overwhelming.",
            "The therapeutic relationship is one of the strongest predictors of positive outcomes. Finding a psychologist in Prague who resonates with your needs is not a luxury — it is a foundation for meaningful change.",
          ],
        },
        {
          heading: "Qualifications and Credentials to Look For",
          paragraphs: [
            "In the Czech Republic, the title 'psychologist' requires a Master's degree in psychology. Look for practitioners who hold recognized certifications in their specific modality — whether that is clinical psychology, systemic constellations, cognitive behavioural therapy, or process-oriented psychology.",
            "A good psychologist in Prague will be transparent about their training and happy to discuss their approach before your first session. At Mind of Heart, Anna Kolmykova combines clinical psychology training with international certifications in systemic constellations and body-oriented methods.",
          ],
        },
        {
          heading: "Choosing the Right Therapeutic Approach",
          paragraphs: [
            "Different approaches suit different challenges. Cognitive-behavioural therapy works well for specific thought patterns. Systemic constellations can reveal hidden family and ancestral dynamics. Process-oriented psychology follows what naturally wants to emerge.",
            "If you are unsure which approach is right for you, many psychologists in Prague — including Anna Kolmykova — offer a free discovery call. This short conversation helps determine whether the fit is right before you commit to a full session.",
          ],
        },
        {
          heading: "Language and Cultural Sensitivity",
          paragraphs: [
            "Prague's international community means you can find a psychologist who works in English, Czech, Russian, and other languages. Working in your native language — or the language where you feel most emotionally fluent — can make a significant difference in therapy.",
            "Anna Kolmykova offers sessions in English, Czech, and Russian, both in person in Prague and online. This multilingual practice helps clients feel fully understood regardless of their background.",
          ],
        },
        {
          heading: "Online vs In-Person Sessions",
          paragraphs: [
            "Many psychologists in Prague now offer both formats. In-person sessions provide a dedicated physical space for the work. Online sessions offer flexibility and accessibility, especially for expats who travel frequently or clients outside Prague.",
            "Both formats can be equally effective. The most important factor is your comfort and the quality of the therapeutic relationship.",
          ],
        },
        {
          heading: "Your First Step",
          paragraphs: [
            "Choosing a psychologist in Prague does not have to be stressful. Start with a short discovery call, ask about their approach, and trust your intuition about whether the connection feels right. The best therapist for you is one where you feel safe, heard, and gently challenged to grow.",
          ],
        },
      ],
      faq: [
        {
          question: "How much does a psychologist in Prague cost?",
          answer:
            "Session prices in Prague typically range from 1,500 to 3,500 CZK per session, depending on the practitioner's experience and specialization. Many psychologists, including Anna Kolmykova, offer a free initial discovery call.",
        },
        {
          question:
            "Can I find an English-speaking psychologist in Prague?",
          answer:
            "Yes, Prague has a growing number of multilingual psychologists. Anna Kolmykova offers sessions in English, Czech, and Russian — both in person in Prague and online.",
        },
        {
          question:
            "What is the difference between a psychologist and a psychiatrist in Prague?",
          answer:
            "A psychologist provides talk therapy and psychological support. A psychiatrist is a medical doctor who can prescribe medication. Many clients work with both, depending on their needs.",
        },
      ],
    },
    {
      slug: "what-are-systemic-constellations",
      title:
        "What Are Systemic Constellations? A Psychologist in Prague Explains",
      description:
        "Systemic constellations reveal hidden family and organisational patterns. Psychologist Anna Kolmykova in Prague explains how they work and who they can help.",
      date: "2026-03-03",
      readTime: "8",
      image: "/session-private.webp",
      imageAlt:
        "Systemic constellations session with psychologist in Prague",
      sections: [
        {
          heading: "Understanding Systemic Constellations",
          paragraphs: [
            "Systemic constellations are a therapeutic method developed by Bert Hellinger that reveals hidden dynamics within family systems, organisations, and relationships. As a psychologist in Prague specializing in this approach, I see how these invisible patterns shape people's lives — often without their awareness.",
            "The method works with the idea that we are all connected to larger systems: our families, our ancestors, our workplaces. When something in these systems is unresolved — a loss, an exclusion, a broken bond — it can show up as recurring patterns in our lives.",
          ],
        },
        {
          heading: "How a Constellation Session Works",
          paragraphs: [
            "In a private constellation session with a psychologist in Prague, you begin by sharing your question or challenge. Using physical markers or representatives, the hidden dynamics of your system become visible in the room.",
            "The process is not about analyzing the past intellectually. Instead, it creates a space where deep, often unconscious loyalties and entanglements can surface. New perspectives emerge, emotional blocks soften, and a sense of resolution often follows.",
          ],
        },
        {
          heading: "Who Can Benefit from Systemic Constellations",
          paragraphs: [
            "Systemic constellations can help with a wide range of challenges: relationship difficulties, repeating life patterns, career blocks, family conflicts, grief, and major life transitions.",
            "Both individuals and business leaders benefit from this work. Organizational constellations apply the same principles to leadership dynamics, team conflicts, succession planning, and strategic decisions.",
          ],
        },
        {
          heading: "Systemic Constellations in Prague",
          paragraphs: [
            "Prague has a growing community of practitioners trained in systemic constellations. When choosing a facilitator, look for someone with formal training in the method and a solid psychological background.",
            "At Mind of Heart, Anna Kolmykova combines her training in family and organisational constellations with clinical psychology and body-oriented methods. Sessions are available in English, Czech, and Russian — in person in Prague or online.",
          ],
        },
      ],
      faq: [
        {
          question: "How long does a systemic constellation session last?",
          answer:
            "A typical individual session lasts 60 to 90 minutes. The duration depends on the complexity of the issue and the process that unfolds during the session.",
        },
        {
          question: "Do I need to prepare for a constellation session?",
          answer:
            "No special preparation is needed. It helps to have a clear question or theme in mind, but the session can also start with an open exploration. Your psychologist in Prague will guide you through the process.",
        },
        {
          question: "Can systemic constellations be done online?",
          answer:
            "Yes. Online systemic constellations are fully effective using digital tools and spatial representations. Many clients of psychologist Anna Kolmykova in Prague work in this format successfully.",
        },
      ],
    },
    {
      slug: "when-to-see-a-psychologist",
      title:
        "7 Signs It Is Time to See a Psychologist — Advice from a Therapist in Prague",
      description:
        "Not sure if you need a psychologist? A psychologist in Prague shares 7 signs it may be time to seek professional support for your mental health and well-being.",
      date: "2026-02-24",
      readTime: "6",
      image: "/sunset-lake.webp",
      imageAlt: "When to see a psychologist in Prague — reflection and self-care",
      sections: [
        {
          heading: "How Do You Know It Is Time?",
          paragraphs: [
            "Many people wonder whether their struggles are 'serious enough' to see a psychologist. As a psychologist in Prague, I hear this question often. The truth is: you do not need to be in crisis to benefit from professional support.",
            "Here are seven signs that it may be the right time to reach out.",
          ],
        },
        {
          heading: "1. You Feel Stuck in Repeating Patterns",
          paragraphs: [
            "The same conflicts, the same type of relationship, the same career blocks — over and over. When patterns repeat despite your best efforts, it often points to something deeper. A psychologist can help you see what is invisible from the inside.",
          ],
        },
        {
          heading: "2. Your Emotions Feel Overwhelming or Numb",
          paragraphs: [
            "Persistent anxiety, sadness, irritability — or the opposite: emotional flatness and disconnection. Both extremes are signals that your system needs attention. A psychologist in Prague can help you reconnect with yourself in a safe space.",
          ],
        },
        {
          heading: "3. A Major Life Transition Is Happening",
          paragraphs: [
            "Relocation, divorce, career change, loss, becoming a parent — transitions shake our foundations. They are natural, but navigating them with professional support can prevent small cracks from becoming deep fractures.",
          ],
        },
        {
          heading: "4. Relationships Keep Bringing the Same Pain",
          paragraphs: [
            "If intimacy, trust, or communication are persistent challenges across different relationships, the pattern often has roots in your family system. Systemic constellations with a psychologist in Prague can reveal and resolve these hidden dynamics.",
          ],
        },
        {
          heading: "5. Physical Symptoms Without Medical Cause",
          paragraphs: [
            "Chronic tension, headaches, sleep problems, digestive issues — when doctors find no clear cause, the body may be expressing what the mind has not yet processed. Body-oriented and process-oriented psychology addresses exactly this connection.",
          ],
        },
        {
          heading: "6. You Have Lost Your Sense of Direction",
          paragraphs: [
            "A feeling of emptiness, lack of meaning, or confusion about what you truly want. These are not signs of weakness — they are invitations to go deeper. Coaching and therapy with a psychologist in Prague can help you find clarity.",
          ],
        },
        {
          heading: "7. You Simply Want to Grow",
          paragraphs: [
            "You do not need a problem to benefit from working with a psychologist. Many clients come to deepen self-awareness, improve leadership skills, or explore personal growth. This proactive approach is increasingly common and highly valuable.",
          ],
        },
        {
          heading: "What to Do Next",
          paragraphs: [
            "If any of these signs resonate, consider reaching out for a free discovery call. A 20-minute conversation with a psychologist in Prague can help you understand whether therapy, coaching, or constellations would be the right next step for you.",
          ],
        },
      ],
      faq: [
        {
          question: "Is it normal to feel nervous before seeing a psychologist?",
          answer:
            "Absolutely. It is one of the most common experiences. A good psychologist in Prague will create a safe, non-judgmental space from the very first conversation. There is no pressure — just a genuine connection.",
        },
        {
          question: "How many sessions will I need?",
          answer:
            "It depends on your goals. Some clients experience a shift after a single constellation session. Others benefit from ongoing coaching or therapy over several months. Your psychologist will discuss this openly with you.",
        },
      ],
    },
    {
      slug: "family-constellations-how-they-work",
      title:
        "Family Constellations: How They Work and What to Expect — Psychologist in Prague",
      description:
        "Family constellations reveal hidden ancestral patterns behind relationship issues, blocks, and repeating life scenarios. A psychologist in Prague explains the process.",
      date: "2026-02-15",
      readTime: "7",
      image: "/session-default.webp",
      imageAlt: "Family constellations with psychologist in Prague",
      sections: [
        {
          heading: "What Are Family Constellations?",
          paragraphs: [
            "Family constellations are a powerful therapeutic method that brings hidden family dynamics to light. As a psychologist in Prague working with this approach daily, I have witnessed how unresolved events in a family — even generations back — continue to influence the present.",
            "Exclusions, early deaths, broken bonds, secrets, and unspoken grief create invisible loyalties. Without awareness, descendants may unconsciously repeat patterns of suffering, failure, or relationship difficulties that do not belong to them.",
          ],
        },
        {
          heading: "The Science Behind the Method",
          paragraphs: [
            "While family constellations originated outside mainstream academia, growing research in epigenetics and intergenerational trauma now supports the core idea: that trauma can be passed through generations. Studies show that stress responses, attachment patterns, and even specific fears can be inherited.",
            "Family constellations work at this systemic level — not by analyzing the past intellectually, but by creating a direct, felt experience of the family system and its hidden order.",
          ],
        },
        {
          heading: "What Happens During a Session",
          paragraphs: [
            "In an individual session with a psychologist in Prague, you share your question — perhaps about a relationship, a recurring block, or an unresolved family theme. Using markers, figures, or spatial positions, the family system is set up in the room.",
            "What follows often surprises clients: patterns become visible, emotions surface, and resolution movements emerge naturally. The facilitator guides the process with care, helping you find a new place within your system — one that brings relief and clarity.",
          ],
        },
        {
          heading: "Common Themes in Family Constellations",
          paragraphs: [
            "The most frequent topics that clients bring to a psychologist in Prague for family constellations include: difficulty in romantic relationships, estrangement from parents or siblings, repeating patterns of self-sabotage, grief and loss, adoption and identity questions, and feeling burdened by an unnamed weight.",
            "Business leaders also use this method to explore succession dynamics, founder loyalty conflicts, and organizational blocks rooted in the company's history.",
          ],
        },
        {
          heading: "What to Expect After a Constellation",
          paragraphs: [
            "The effects of a constellation session often continue to unfold for days or weeks after the session. Clients report feeling lighter, clearer, and more grounded. Relationships may shift, decisions become easier, and old patterns begin to dissolve.",
            "It is important to give yourself space after a session. Your psychologist in Prague will support you through this integration period as needed.",
          ],
        },
      ],
      faq: [
        {
          question: "Are family constellations suitable for everyone?",
          answer:
            "Most people can benefit, but the method requires a certain emotional readiness. During the free discovery call, the psychologist in Prague will assess whether this approach is right for your current situation.",
        },
        {
          question: "Do I need to know my family history for a constellation?",
          answer:
            "No. While some background helps, the constellation process itself reveals what is relevant. Many clients are surprised by what emerges — even without detailed knowledge of their ancestry.",
        },
        {
          question: "Can family constellations help with anxiety and depression?",
          answer:
            "Yes, especially when anxiety or depression has systemic roots — for example, unresolved grief or loyalty to a suffering family member. A psychologist in Prague can help determine whether constellations are the right approach for your specific situation.",
        },
      ],
    },
    {
      slug: "online-vs-in-person-therapy",
      title:
        "Online vs In-Person Therapy: How to Choose — Psychologist in Prague",
      description:
        "Should you see a psychologist in Prague in person or online? Compare both formats — effectiveness, convenience, and what works best for constellations and coaching.",
      date: "2026-02-06",
      readTime: "5",
      image: "/session-alt.webp",
      imageAlt:
        "Online and in-person therapy with psychologist in Prague",
      sections: [
        {
          heading: "The Rise of Online Therapy",
          paragraphs: [
            "Online therapy has grown exponentially, and for good reason. It removes geographical barriers, saves commute time, and allows you to work with a psychologist in Prague from anywhere in the world.",
            "For the international community in Prague — expats, digital nomads, frequent travellers — online sessions provide continuity even during relocations or business trips.",
          ],
        },
        {
          heading: "When In-Person Sessions Shine",
          paragraphs: [
            "Being physically present in the same room with your psychologist in Prague creates a unique quality of connection. Body language, energy, and subtle cues are more accessible. For body-oriented work and certain constellation formats, in-person sessions can feel more immersive.",
            "The ritual of going to a dedicated therapeutic space also helps create a clear boundary between daily life and inner work.",
          ],
        },
        {
          heading: "Effectiveness: What Research Says",
          paragraphs: [
            "Multiple studies show that online therapy is as effective as in-person therapy for most conditions, including anxiety, depression, and relationship issues. The quality of the therapeutic alliance — not the medium — is the primary predictor of outcomes.",
            "This means that whether you visit a psychologist in Prague in their office or connect via video call, the results depend far more on the quality of the relationship and the approach used.",
          ],
        },
        {
          heading: "Online Constellations and Coaching",
          paragraphs: [
            "Systemic constellations, once considered an exclusively in-person method, have adapted beautifully to the online format. Using digital tools, floor markers at home, or even visualisation techniques, online constellations can be just as powerful.",
            "Coaching and process-oriented sessions translate naturally to video format. Many clients of psychologist Anna Kolmykova in Prague find that online sessions feel intimate and effective — sometimes even more focused than in-person meetings.",
          ],
        },
        {
          heading: "How to Decide",
          paragraphs: [
            "Ask yourself: Do I value the physical ritual of going to a therapist's office? Do I need the flexibility of online sessions? Am I comfortable being open on video? There is no wrong answer.",
            "Many clients combine both formats — in-person sessions when in Prague and online sessions when travelling. A good psychologist in Prague will support you in finding the rhythm that works best for your life.",
          ],
        },
      ],
      faq: [
        {
          question:
            "Is online therapy with a psychologist in Prague covered by insurance?",
          answer:
            "Coverage varies by insurance provider. Some Czech and international insurance plans cover online therapy. Check with your provider or ask your psychologist in Prague about invoicing options.",
        },
        {
          question: "What technology do I need for online sessions?",
          answer:
            "A stable internet connection, a private space, and a device with a camera and microphone. Sessions typically use secure video platforms. Your psychologist in Prague will send you a link before each session.",
        },
      ],
    },
  ],
};

const cz: BlogDictionary = {
  indexTitle:
    "Blog — Psycholožka v Praze | Mind of Heart",
  indexDescription:
    "Články psycholožky Anny Kolmykové v Praze o systemických konstelacích, terapii, koučinku a osobním růstu. Praktické postřehy pro vaši cestu.",
  indexHeading: "Blog",
  indexSubtitle:
    "Postřehy o psychologii, systemických konstelacích a vnitřní proměně",
  readMore: "Číst článek",
  backToBlog: "Zpět na blog",
  publishedOn: "Publikováno",
  readTimeLabel: "min čtení",
  faqHeading: "Často kladené otázky",
  ctaTitle: "Připraveni udělat první krok?",
  ctaText:
    "Rezervujte si bezplatný 20minutový úvodní hovor s psycholožkou Annou Kolmykovou v Praze.",
  ctaButton: "Rezervovat sezení",
  articles: [
    {
      slug: "jak-vybrat-psychologa-v-praze",
      title: "Jak vybrat psychologa v Praze: praktický průvodce",
      description:
        "Hledáte psychologa v Praze? Zjistěte, na co se zaměřit při výběru terapeuta — kvalifikace, přístup, jazyk a jak poznat, zda vám sedí.",
      date: "2026-03-10",
      readTime: "7",
      image: "/about-anna.webp",
      imageAlt: "Psycholožka v Praze — konzultace s Annou Kolmykovou",
      sections: [
        {
          heading: "Proč je důležité najít správného psychologa v Praze",
          paragraphs: [
            "Praha nabízí rostoucí komunitu psychologů, terapeutů a koučů. Ať už hledáte psychologa v Praze, který mluví česky, anglicky nebo rusky, výběr může být náročný.",
            "Terapeutický vztah je jedním z nejsilnějších faktorů úspěšné terapie. Najít psychologa v Praze, který rezonuje s vašimi potřebami, není luxus — je to základ smysluplné změny.",
          ],
        },
        {
          heading: "Kvalifikace a certifikace",
          paragraphs: [
            "V České republice vyžaduje titul psychologa magisterský titul v psychologii. Hledejte odborníky s uznávanými certifikacemi v jejich specifické modalitě — ať už se jedná o klinickou psychologii, systemické konstelace, KBT nebo procesně orientovanou psychologii.",
            "Dobrý psycholog v Praze bude transparentní ohledně svého vzdělání a rád diskutuje o svém přístupu před prvním sezením. V Mind of Heart Anna Kolmykova kombinuje klinickou psychologii s mezinárodními certifikacemi v systemických konstelacích a tělově orientovaných metodách.",
          ],
        },
        {
          heading: "Výběr správného terapeutického přístupu",
          paragraphs: [
            "Různé přístupy vyhovují různým výzvám. KBT funguje dobře pro specifické myšlenkové vzorce. Systemické konstelace mohou odhalit skryté rodinné a rodové dynamiky. Procesně orientovaná psychologie sleduje to, co chce přirozeně vzniknout.",
            "Pokud si nejste jisti, který přístup je pro vás správný, mnoho psychologů v Praze — včetně Anny Kolmykové — nabízí bezplatný úvodní hovor.",
          ],
        },
        {
          heading: "Jazyk a kulturní citlivost",
          paragraphs: [
            "Mezinárodní komunita v Praze znamená, že můžete najít psychologa, který pracuje v češtině, angličtině, ruštině i dalších jazycích. Pracovat v jazyce, ve kterém se cítíte emocionálně nejsvobodněji, může terapii výrazně ovlivnit.",
            "Anna Kolmykova nabízí sezení v angličtině, češtině a ruštině — osobně v Praze i online.",
          ],
        },
        {
          heading: "Online vs osobní sezení",
          paragraphs: [
            "Mnoho psychologů v Praze nyní nabízí oba formáty. Osobní sezení poskytuje fyzický prostor pro práci. Online sezení nabízí flexibilitu — především pro expaty nebo klienty mimo Prahu.",
            "Oba formáty mohou být stejně účinné. Nejdůležitějším faktorem je váš komfort a kvalita terapeutického vztahu.",
          ],
        },
        {
          heading: "Váš první krok",
          paragraphs: [
            "Výběr psychologa v Praze nemusí být stresující. Začněte krátkým úvodním hovorem, zeptejte se na přístup a důvěřujte své intuici. Nejlepší terapeut pro vás je ten, u kterého se cítíte bezpečně a slyšeni.",
          ],
        },
      ],
      faq: [
        {
          question: "Kolik stojí psycholog v Praze?",
          answer:
            "Ceny sezení v Praze se typicky pohybují od 1 500 do 3 500 Kč za sezení, v závislosti na zkušenostech a specializaci. Anna Kolmykova nabízí bezplatný úvodní hovor.",
        },
        {
          question: "Mohu v Praze najít anglicky mluvícího psychologa?",
          answer:
            "Ano. Anna Kolmykova nabízí sezení v angličtině, češtině a ruštině — osobně v Praze i online.",
        },
        {
          question: "Jaký je rozdíl mezi psychologem a psychiatrem?",
          answer:
            "Psycholog poskytuje terapii rozhovorem a psychologickou podporu. Psychiatr je lékař, který může předepsat léky. Mnoho klientů spolupracuje s oběma.",
        },
      ],
    },
    {
      slug: "co-jsou-systemicke-konstelace",
      title:
        "Co jsou systemické konstelace? Psycholožka v Praze vysvětluje",
      description:
        "Systemické konstelace odhalují skryté rodinné a organizační vzorce. Psycholožka Anna Kolmykova v Praze vysvětluje, jak fungují a komu mohou pomoci.",
      date: "2026-03-03",
      readTime: "8",
      image: "/session-private.webp",
      imageAlt: "Systemické konstelace s psycholožkou v Praze",
      sections: [
        {
          heading: "Porozumění systemickým konstelacím",
          paragraphs: [
            "Systemické konstelace jsou terapeutická metoda vyvinutá Bertem Hellingerem, která odhaluje skryté dynamiky v rodinných systémech, organizacích a vztazích. Jako psycholožka v Praze specializující se na tento přístup vidím, jak tyto neviditelné vzorce formují životy lidí — často bez jejich vědomí.",
            "Metoda pracuje s myšlenkou, že jsme všichni propojeni s většími systémy: rodinou, předky, pracovištěm. Když je v těchto systémech něco nevyřešeno, může se to projevovat jako opakující se vzorce.",
          ],
        },
        {
          heading: "Jak probíhá konstelační sezení",
          paragraphs: [
            "V individuálním konstelačním sezení s psycholožkou v Praze začínáte sdílením otázky nebo výzvy. Pomocí fyzických značek se skryté dynamiky systému zviditelní v prostoru.",
            "Proces není o analýze minulosti. Místo toho vytváří prostor, kde hluboké, často nevědomé loajality a zapletení mohou vyjít na povrch. Objevují se nové perspektivy a emocionální bloky se uvolňují.",
          ],
        },
        {
          heading: "Komu systemické konstelace pomohou",
          paragraphs: [
            "Konstelace pomáhají se širokou škálou výzev: vztahové potíže, opakující se životní vzorce, kariérní bloky, rodinné konflikty, smutek a velké životní změny.",
            "Z této práce mají prospěch jak jednotlivci, tak lídři. Organizační konstelace aplikují stejné principy na leadereshipové dynamiky, týmové konflikty a strategická rozhodnutí.",
          ],
        },
        {
          heading: "Systemické konstelace v Praze",
          paragraphs: [
            "V Praze roste komunita odborníků vyškolených v systemických konstelacích. Při výběru facilitátora hledejte někoho s formálním vzděláním a solidním psychologickým zázemím.",
            "V Mind of Heart Anna Kolmykova kombinuje výcvik v rodinných a organizačních konstelacích s klinickou psychologií. Sezení jsou dostupná v angličtině, češtině a ruštině — osobně v Praze nebo online.",
          ],
        },
      ],
      faq: [
        {
          question: "Jak dlouho trvá konstelační sezení?",
          answer:
            "Typické individuální sezení trvá 60 až 90 minut. Délka závisí na složitosti tématu a procesu, který se během sezení rozvíjí.",
        },
        {
          question: "Musím se na konstelaci nějak připravit?",
          answer:
            "Není potřeba žádná speciální příprava. Pomáhá mít jasnou otázku nebo téma, ale sezení může začít i otevřeným průzkumem.",
        },
        {
          question: "Mohou systemické konstelace probíhat online?",
          answer:
            "Ano. Online konstelace jsou plně účinné s využitím digitálních nástrojů. Mnoho klientů psycholožky Anny Kolmykové v Praze úspěšně pracuje tímto způsobem.",
        },
      ],
    },
    {
      slug: "kdy-navstivit-psychologa",
      title:
        "7 znamení, že je čas navštívit psychologa — rady terapeutky v Praze",
      description:
        "Nejste si jisti, zda potřebujete psychologa? Psycholožka v Praze sdílí 7 znamení, že je čas vyhledat odbornou podporu.",
      date: "2026-02-24",
      readTime: "6",
      image: "/sunset-lake.webp",
      imageAlt: "Kdy navštívit psychologa v Praze",
      sections: [
        {
          heading: "Jak poznáte, že je ten správný čas?",
          paragraphs: [
            "Mnoho lidí přemýšlí, zda jsou jejich potíže dost vážné na to, aby navštívili psychologa. Jako psycholožka v Praze tuto otázku slýchám často. Pravda je: nemusíte být v krizi, abyste měli prospěch z profesionální podpory.",
            "Zde je sedm znamení, že může být správný čas se ozvat.",
          ],
        },
        {
          heading: "1. Opakující se vzorce",
          paragraphs: [
            "Stále stejné konflikty, stejný typ vztahu, stejné kariérní bloky. Když se vzorce opakují i přes vaši snahu, často ukazují na něco hlubšího. Psycholog v Praze vám pomůže vidět to, co zevnitř vidět nelze.",
          ],
        },
        {
          heading: "2. Přehlcující nebo otupělé emoce",
          paragraphs: [
            "Přetrvávající úzkost, smutek, podrážděnost — nebo naopak emocionální otupělost. Oba extrémy jsou signály, že váš systém potřebuje pozornost.",
          ],
        },
        {
          heading: "3. Velká životní změna",
          paragraphs: [
            "Stěhování, rozvod, změna kariéry, ztráta — přechody otřásají základy. Navigovat je s podporou psychologa v Praze může zabránit malým trhlinám v tom, aby se prohloubily.",
          ],
        },
        {
          heading: "4. Vztahy přinášejí stále stejnou bolest",
          paragraphs: [
            "Pokud jsou důvěra, intimita nebo komunikace opakovanou výzvou napříč různými vztahy, vzorec má často kořeny v rodinném systému. Systemické konstelace s psycholožkou v Praze mohou tyto skryté dynamiky odhalit.",
          ],
        },
        {
          heading: "5. Fyzické symptomy bez lékařské příčiny",
          paragraphs: [
            "Chronické napětí, bolesti hlavy, problémy se spánkem — když lékaři nenajdou příčinu, tělo může vyjadřovat to, co mysl dosud nezpracovala.",
          ],
        },
        {
          heading: "6. Ztráta směru",
          paragraphs: [
            "Pocit prázdnoty, ztráty smyslu nebo zmatku ohledně toho, co skutečně chcete. To nejsou známky slabosti — jsou to pozvánky jít hlouběji.",
          ],
        },
        {
          heading: "7. Prostě chcete růst",
          paragraphs: [
            "Nepotřebujete problém, abyste měli prospěch z práce s psychologem. Mnoho klientů přichází prohloubit sebepознání, zlepšit leadershipové dovednosti nebo prozkoumat osobní růst.",
          ],
        },
        {
          heading: "Co dál",
          paragraphs: [
            "Pokud vám cokoli z toho rezonuje, zvažte bezplatný úvodní hovor. 20minutový rozhovor s psycholožkou v Praze vám pomůže pochopit, zda je terapie, koučink nebo konstelace správným dalším krokem.",
          ],
        },
      ],
      faq: [
        {
          question: "Je normální být před návštěvou psychologa nervózní?",
          answer:
            "Absolutně. Je to jedna z nejčastějších zkušeností. Dobrý psycholog v Praze vytvoří bezpečný prostor od prvního rozhovoru.",
        },
        {
          question: "Kolik sezení budu potřebovat?",
          answer:
            "Záleží na vašich cílech. Někteří klienti zažijí posun po jediném konstelačním sezení. Jiní mají prospěch z průběžného koučinku nebo terapie.",
        },
      ],
    },
    {
      slug: "rodinne-konstelace-jak-funguji",
      title:
        "Rodinné konstelace: jak fungují a co očekávat — psycholožka v Praze",
      description:
        "Rodinné konstelace odhalují skryté rodové vzorce za vztahovými problémy a bloky. Psycholožka v Praze vysvětluje proces a jeho přínosy.",
      date: "2026-02-15",
      readTime: "7",
      image: "/session-default.webp",
      imageAlt: "Rodinné konstelace s psycholožkou v Praze",
      sections: [
        {
          heading: "Co jsou rodinné konstelace?",
          paragraphs: [
            "Rodinné konstelace jsou silná terapeutická metoda, která přináší na světlo skryté rodinné dynamiky. Jako psycholožka v Praze pracující s tímto přístupem denně vidím, jak nevyřešené události v rodině — i generace zpět — stále ovlivňují přítomnost.",
            "Vyloučení, předčasná úmrtí, zlomená pouta, tajemství a nevyřčený smutek vytvářejí neviditelné loajality. Potomci mohou nevědomě opakovat vzorce utrpení, které jim nepatří.",
          ],
        },
        {
          heading: "Vědecké zázemí metody",
          paragraphs: [
            "Rostoucí výzkum v epigenetice a mezigenerační traumatu nyní podporuje klíčovou myšlenku: trauma může být předáváno přes generace. Studie ukazují, že stresové reakce a vazebné vzorce mohou být zděděny.",
            "Rodinné konstelace pracují na této systémové úrovni — ne analýzou minulosti, ale vytvořením přímé prožitkové zkušenosti rodinného systému.",
          ],
        },
        {
          heading: "Co se děje během sezení",
          paragraphs: [
            "V individuálním sezení s psycholožkou v Praze sdílíte svou otázku. Pomocí značek nebo figurek se rodinný systém rozestaví v prostoru.",
            "Vzorce se stávají viditelnými, emoce se vynořují a rozřešení přichází přirozeně. Facilitátorka provází procesem s péčí a pomáhá vám najít nové místo ve vašem systému.",
          ],
        },
        {
          heading: "Nejčastější témata",
          paragraphs: [
            "Klienti nejčastěji přicházejí k psycholožce v Praze s: potížemi ve vztazích, odcizením od rodičů, opakujícími se vzorci, smutkem a ztrátou, otázkami identity a pocitem nepojmenované tíhy.",
            "Lídři také využívají tuto metodu k průzkumu dynamik nástupnictví a organizačních bloků.",
          ],
        },
        {
          heading: "Co očekávat po konstelaci",
          paragraphs: [
            "Účinky konstelace se často rozvíjejí dny i týdny po sezení. Klienti hlásí pocit lehkosti, jasnosti a uzemnění. Vztahy se mění, rozhodnutí přicházejí snáze a staré vzorce se rozpouštějí.",
            "Je důležité dát si po sezení prostor. Vaše psycholožka v Praze vás v integraci podpoří.",
          ],
        },
      ],
      faq: [
        {
          question: "Jsou rodinné konstelace vhodné pro každého?",
          answer:
            "Většina lidí může mít prospěch, ale metoda vyžaduje určitou emocionální připravenost. Během bezplatného úvodního hovoru psycholožka v Praze posoudí vhodnost.",
        },
        {
          question: "Musím znát svou rodinou historii?",
          answer:
            "Ne. Ačkoli nějaké zázemí pomáhá, konstelační proces sám odhalí to, co je relevantní.",
        },
        {
          question: "Mohou konstelace pomoct s úzkostí a depresí?",
          answer:
            "Ano, zejména když úzkost nebo deprese mají systémové kořeny. Psycholožka v Praze pomůže určit, zda jsou konstelace správný přístup pro vaši situaci.",
        },
      ],
    },
    {
      slug: "online-vs-osobni-terapie",
      title:
        "Online vs osobní terapie: jak vybrat — psycholožka v Praze",
      description:
        "Máte navštívit psychologa v Praze osobně nebo online? Porovnání obou formátů — účinnost, pohodlí a co funguje nejlépe pro konstelace a koučink.",
      date: "2026-02-06",
      readTime: "5",
      image: "/session-alt.webp",
      imageAlt: "Online a osobní terapie s psycholožkou v Praze",
      sections: [
        {
          heading: "Vzestup online terapie",
          paragraphs: [
            "Online terapie exponenciálně roste. Odstraňuje geografické bariéry, šetří čas dojíždění a umožňuje pracovat s psycholožkou v Praze odkudkoli na světě.",
            "Pro mezinárodní komunitu v Praze — expaty, digitální nomády — online sezení zajišťují kontinuitu i během cestování.",
          ],
        },
        {
          heading: "Kdy vynikají osobní sezení",
          paragraphs: [
            "Fyzická přítomnost ve stejné místnosti s psycholožkou v Praze vytváří jedinečnou kvalitu spojení. Řeč těla a jemné signály jsou lépe čitelné. Pro tělově orientovanou práci mohou být osobní sezení intenzivnější.",
            "Rituál cesty do terapeutického prostoru také pomáhá vytvořit jasnou hranici mezi každodenním životem a vnitřní prací.",
          ],
        },
        {
          heading: "Účinnost: co říká výzkum",
          paragraphs: [
            "Studie ukazují, že online terapie je stejně účinná jako osobní pro většinu stavů. Kvalita terapeutického vztahu — nikoli médium — je hlavním prediktorem výsledků.",
            "To znamená, že ať navštívíte psychologa v Praze v ordinaci nebo se spojíte přes video, výsledky závisí hlavně na kvalitě vztahu a použitém přístupu.",
          ],
        },
        {
          heading: "Online konstelace a koučink",
          paragraphs: [
            "Systemické konstelace se krásně adaptovaly na online formát. S digitálními nástroji mohou být online konstelace stejně silné jako osobní.",
            "Koučinková a procesně orientovaná sezení se přirozeně překládají do video formátu. Mnoho klientů psycholožky Anny Kolmykové v Praze oceňuje, že online sezení jsou intimní a účinná.",
          ],
        },
        {
          heading: "Jak se rozhodnout",
          paragraphs: [
            "Zeptejte se sami sebe: ceníte si rituálu cesty k terapeutovi? Potřebujete flexibilitu online sezení? Cítíte se pohodlně otevřít se přes video? Neexistuje špatná odpověď.",
            "Mnoho klientů kombinuje oba formáty. Dobrý psycholog v Praze vás podpoří v nalezení rytmu, který vyhovuje vašemu životu.",
          ],
        },
      ],
      faq: [
        {
          question: "Hradí online terapii pojišťovna?",
          answer:
            "Krytí se liší podle poskytovatele. Některé české i mezinárodní pojistné plány online terapii pokrývají. Zeptejte se své psycholožky v Praze na možnosti fakturace.",
        },
        {
          question: "Jakou technologii potřebuji?",
          answer:
            "Stabilní internet, soukromý prostor a zařízení s kamerou a mikrofonem. Sezení probíhají přes zabezpečenou video platformu.",
        },
      ],
    },
  ],
};

const ru: BlogDictionary = {
  indexTitle:
    "Блог — Психолог в Праге | Mind of Heart",
  indexDescription:
    "Статьи психолога Анны Колмыковой в Праге о системных расстановках, терапии, коучинге и личностном росте. Практические советы для вашего пути.",
  indexHeading: "Блог",
  indexSubtitle:
    "Психология, системные расстановки и внутренняя трансформация",
  readMore: "Читать статью",
  backToBlog: "Назад в блог",
  publishedOn: "Опубликовано",
  readTimeLabel: "мин чтения",
  faqHeading: "Часто задаваемые вопросы",
  ctaTitle: "Готовы сделать первый шаг?",
  ctaText:
    "Запишитесь на бесплатный 20-минутный звонок-знакомство с психологом Анной Колмыковой в Праге.",
  ctaButton: "Записаться на сессию",
  articles: [
    {
      slug: "kak-vybrat-psihologa-v-prage",
      title: "Как выбрать психолога в Праге: практическое руководство",
      description:
        "Ищете психолога в Праге? Узнайте, на что обратить внимание — квалификация, подход, язык и как понять, что специалист вам подходит.",
      date: "2026-03-10",
      readTime: "7",
      image: "/about-anna.webp",
      imageAlt: "Психолог в Праге — консультация с Анной Колмыковой",
      sections: [
        {
          heading: "Почему важно найти подходящего психолога в Праге",
          paragraphs: [
            "Прага — город с растущим сообществом психологов, терапевтов и коучей. Независимо от того, ищете ли вы русскоязычного психолога в Праге или специалиста, работающего на чешском и английском, выбор может быть непростым.",
            "Терапевтические отношения — один из сильнейших факторов успешной терапии. Найти психолога в Праге, который резонирует с вашими потребностями, — это не роскошь, а основа осмысленных изменений.",
          ],
        },
        {
          heading: "Квалификация и сертификации",
          paragraphs: [
            "В Чехии звание психолога требует магистерскую степень по психологии. Обращайте внимание на специалистов с признанными сертификациями в их конкретной модальности — будь то клиническая психология, системные расстановки, КПТ или процесс-ориентированная психология.",
            "Хороший психолог в Праге будет открыт относительно своего образования и с готовностью обсудит подход до первой сессии. В Mind of Heart Анна Колмыкова сочетает обучение клинической психологии с международными сертификациями в системных расстановках и телесно-ориентированных методах.",
          ],
        },
        {
          heading: "Выбор терапевтического подхода",
          paragraphs: [
            "Разные подходы подходят для разных задач. КПТ хорошо работает с конкретными мыслительными паттернами. Системные расстановки раскрывают скрытую семейную и родовую динамику. Процесс-ориентированная психология следует за тем, что хочет естественно проявиться.",
            "Если вы не уверены, какой подход вам подходит, многие психологи в Праге — включая Анну Колмыкову — предлагают бесплатный ознакомительный звонок.",
          ],
        },
        {
          heading: "Язык и культурная чувствительность",
          paragraphs: [
            "Международное сообщество Праги означает, что вы можете найти психолога, работающего на русском, чешском, английском и других языках. Работа на родном языке — или языке, на котором вы чувствуете себя эмоционально свободнее — значительно влияет на терапию.",
            "Анна Колмыкова проводит сессии на русском, английском и чешском языках — как лично в Праге, так и онлайн. Это помогает клиентам чувствовать себя полностью понятыми.",
          ],
        },
        {
          heading: "Онлайн или очные сессии",
          paragraphs: [
            "Многие психологи в Праге сейчас предлагают оба формата. Очные сессии создают выделенное физическое пространство для работы. Онлайн-сессии обеспечивают гибкость — особенно для экспатов и клиентов за пределами Праги.",
            "Оба формата одинаково эффективны. Главное — ваш комфорт и качество терапевтических отношений.",
          ],
        },
        {
          heading: "Ваш первый шаг",
          paragraphs: [
            "Выбор психолога в Праге не должен быть стрессовым. Начните с короткого ознакомительного звонка, спросите о подходе и доверьтесь интуиции. Лучший терапевт для вас — тот, рядом с которым вы чувствуете безопасность и возможность быть собой.",
          ],
        },
      ],
      faq: [
        {
          question: "Сколько стоит психолог в Праге?",
          answer:
            "Стоимость сессий в Праге обычно варьируется от 1 500 до 3 500 крон за сессию. Анна Колмыкова предлагает бесплатный ознакомительный звонок.",
        },
        {
          question: "Можно ли найти русскоязычного психолога в Праге?",
          answer:
            "Да. Анна Колмыкова проводит сессии на русском, английском и чешском — как лично в Праге, так и онлайн.",
        },
        {
          question: "Чем отличается психолог от психиатра?",
          answer:
            "Психолог проводит терапию и психологическую поддержку. Психиатр — врач, который может назначать медикаменты. Многие клиенты работают с обоими специалистами.",
        },
      ],
    },
    {
      slug: "chto-takoe-sistemnye-rasstanovki",
      title:
        "Что такое системные расстановки? Психолог в Праге объясняет",
      description:
        "Системные расстановки раскрывают скрытые семейные и организационные паттерны. Психолог Анна Колмыкова в Праге объясняет, как они работают.",
      date: "2026-03-03",
      readTime: "8",
      image: "/session-private.webp",
      imageAlt: "Системные расстановки с психологом в Праге",
      sections: [
        {
          heading: "Понимание системных расстановок",
          paragraphs: [
            "Системные расстановки — это терапевтический метод, разработанный Бертом Хеллингером, раскрывающий скрытую динамику внутри семейных систем, организаций и отношений. Как психолог в Праге, специализирующийся на этом подходе, я вижу, как невидимые паттерны формируют жизни людей — часто без их осознания.",
            "Метод работает с идеей, что мы все связаны с большими системами: семьёй, родом, рабочими коллективами. Когда что-то в этих системах не завершено — потеря, исключение, разрыв связи — это проявляется как повторяющиеся паттерны.",
          ],
        },
        {
          heading: "Как проходит сессия расстановки",
          paragraphs: [
            "На индивидуальной расстановочной сессии с психологом в Праге вы начинаете с описания вашего запроса. С помощью физических маркеров или фигур скрытая динамика системы становится видимой в пространстве.",
            "Процесс не направлен на интеллектуальный анализ прошлого. Вместо этого создаётся пространство, где глубокие, часто неосознанные лояльности и переплетения выходят на поверхность. Появляются новые перспективы, эмоциональные блоки смягчаются.",
          ],
        },
        {
          heading: "Кому помогают системные расстановки",
          paragraphs: [
            "Расстановки помогают с широким спектром задач: сложности в отношениях, повторяющиеся жизненные паттерны, карьерные блоки, семейные конфликты, горе и крупные жизненные переходы.",
            "Как индивидуальные клиенты, так и бизнес-лидеры извлекают пользу. Организационные расстановки применяют те же принципы к лидерской динамике, командным конфликтам и стратегическим решениям.",
          ],
        },
        {
          heading: "Системные расстановки в Праге",
          paragraphs: [
            "В Праге растёт сообщество специалистов по системным расстановкам. При выборе фасилитатора ищите человека с формальным обучением методу и солидным психологическим образованием.",
            "В Mind of Heart Анна Колмыкова сочетает обучение семейным и организационным расстановкам с клинической психологией и телесно-ориентированными методами. Сессии доступны на русском, английском и чешском — лично в Праге или онлайн.",
          ],
        },
      ],
      faq: [
        {
          question: "Сколько длится сессия расстановки?",
          answer:
            "Типичная индивидуальная сессия длится от 60 до 90 минут. Продолжительность зависит от сложности запроса и процесса, разворачивающегося во время сессии.",
        },
        {
          question: "Нужно ли готовиться к расстановке?",
          answer:
            "Специальная подготовка не требуется. Полезно иметь ясный запрос или тему, но сессия может начаться и с открытого исследования. Психолог в Праге проведёт вас через процесс.",
        },
        {
          question: "Можно ли делать расстановки онлайн?",
          answer:
            "Да. Онлайн-расстановки полностью эффективны с использованием цифровых инструментов. Многие клиенты психолога Анны Колмыковой в Праге успешно работают в этом формате.",
        },
      ],
    },
    {
      slug: "kogda-stoit-obratitsya-k-psihologu",
      title:
        "7 признаков, что пора к психологу — советы терапевта в Праге",
      description:
        "Не уверены, нужен ли вам психолог? Психолог в Праге делится 7 признаками, что пора обратиться за профессиональной поддержкой.",
      date: "2026-02-24",
      readTime: "6",
      image: "/sunset-lake.webp",
      imageAlt: "Когда обратиться к психологу в Праге",
      sections: [
        {
          heading: "Как понять, что пришло время?",
          paragraphs: [
            "Многие задаются вопросом, достаточно ли серьёзны их трудности для обращения к психологу. Как психолог в Праге, я слышу этот вопрос постоянно. Правда в том, что вам не нужно быть в кризисе, чтобы получить пользу от профессиональной поддержки.",
            "Вот семь признаков, что может быть подходящее время обратиться.",
          ],
        },
        {
          heading: "1. Повторяющиеся паттерны",
          paragraphs: [
            "Одни и те же конфликты, тот же тип отношений, те же карьерные тупики — раз за разом. Когда паттерны повторяются, несмотря на все усилия, это часто указывает на что-то более глубокое. Психолог в Праге поможет увидеть то, что невидимо изнутри.",
          ],
        },
        {
          heading: "2. Эмоции захлёстывают или исчезают",
          paragraphs: [
            "Постоянная тревога, грусть, раздражительность — или, наоборот, эмоциональная отстранённость и оцепенение. Оба крайних состояния — сигналы, что вашей системе нужно внимание. Психолог в Праге поможет вернуть связь с собой.",
          ],
        },
        {
          heading: "3. Крупный жизненный переход",
          paragraphs: [
            "Переезд, развод, смена карьеры, потеря, рождение ребёнка — переходы сотрясают основы. Они естественны, но поддержка психолога в Праге помогает не дать маленьким трещинам стать глубокими разломами.",
          ],
        },
        {
          heading: "4. Отношения приносят одну и ту же боль",
          paragraphs: [
            "Если близость, доверие или общение — постоянные сложности в разных отношениях, паттерн часто коренится в семейной системе. Системные расстановки с психологом в Праге помогут раскрыть и разрешить эти скрытые динамики.",
          ],
        },
        {
          heading: "5. Физические симптомы без медицинской причины",
          paragraphs: [
            "Хроническое напряжение, головные боли, проблемы со сном, пищеварение — когда врачи не находят причину, тело может выражать то, что ум ещё не обработал. Телесно-ориентированная психология работает именно с этой связью.",
          ],
        },
        {
          heading: "6. Потеря ориентиров",
          paragraphs: [
            "Ощущение пустоты, бессмысленности или растерянности — что вы на самом деле хотите? Это не признаки слабости, а приглашение заглянуть глубже. Коучинг и терапия с психологом в Праге помогут обрести ясность.",
          ],
        },
        {
          heading: "7. Вы просто хотите расти",
          paragraphs: [
            "Вам не нужна проблема, чтобы работать с психологом. Многие клиенты приходят углубить самопознание, развить лидерские качества или исследовать личностный рост. Такой проактивный подход всё более распространён и ценен.",
          ],
        },
        {
          heading: "Что делать дальше",
          paragraphs: [
            "Если что-то из перечисленного откликается — запишитесь на бесплатный ознакомительный звонок. 20-минутный разговор с психологом в Праге поможет понять, подойдёт ли вам терапия, коучинг или расстановки.",
          ],
        },
      ],
      faq: [
        {
          question: "Нормально ли нервничать перед визитом к психологу?",
          answer:
            "Абсолютно. Это одно из самых распространённых переживаний. Хороший психолог в Праге создаст безопасное, безоценочное пространство с первого разговора.",
        },
        {
          question: "Сколько сессий мне понадобится?",
          answer:
            "Зависит от ваших целей. Некоторые клиенты чувствуют сдвиг после одной расстановки. Другим полезен регулярный коучинг или терапия в течение нескольких месяцев.",
        },
      ],
    },
    {
      slug: "semejnye-rasstanovki-kak-oni-rabotayut",
      title:
        "Семейные расстановки: как они работают и чего ожидать — психолог в Праге",
      description:
        "Семейные расстановки раскрывают скрытые родовые паттерны. Психолог в Праге объясняет процесс, научную основу и результаты метода.",
      date: "2026-02-15",
      readTime: "7",
      image: "/session-default.webp",
      imageAlt: "Семейные расстановки с психологом в Праге",
      sections: [
        {
          heading: "Что такое семейные расстановки?",
          paragraphs: [
            "Семейные расстановки — мощный терапевтический метод, выводящий скрытую семейную динамику на свет. Как психолог в Праге, работающий с этим подходом ежедневно, я вижу, как нерешённые события в семье — даже поколения назад — продолжают влиять на настоящее.",
            "Исключения, ранние смерти, разорванные связи, тайны и невысказанное горе создают невидимые лояльности. Потомки могут неосознанно повторять паттерны страдания, которые им не принадлежат.",
          ],
        },
        {
          heading: "Научная основа метода",
          paragraphs: [
            "Растущие исследования в эпигенетике и межпоколенческой травме подтверждают ключевую идею: травма может передаваться через поколения. Исследования показывают, что стрессовые реакции, паттерны привязанности и даже специфические страхи могут наследоваться.",
            "Семейные расстановки работают на этом системном уровне — не через интеллектуальный анализ прошлого, а создавая прямое, ощущаемое переживание семейной системы и её скрытого порядка.",
          ],
        },
        {
          heading: "Что происходит на сессии",
          paragraphs: [
            "На индивидуальной сессии с психологом в Праге вы описываете запрос — возможно, об отношениях, повторяющемся блоке или нерешённой семейной теме. С помощью маркеров или фигур семейная система выстраивается в пространстве.",
            "Далее часто происходит то, что удивляет клиентов: паттерны становятся видимыми, эмоции проявляются, движения к разрешению возникают естественным образом. Фасилитатор ведёт процесс с заботой, помогая найти новое место в системе.",
          ],
        },
        {
          heading: "Частые темы семейных расстановок",
          paragraphs: [
            "Самые распространённые запросы, с которыми клиенты приходят к психологу в Праге: сложности в романтических отношениях, отчуждение от родителей, повторяющиеся паттерны самосаботажа, горе и утрата, вопросы идентичности и принадлежности, ощущение безымянной тяжести.",
            "Бизнес-лидеры также используют метод для исследования динамики преемственности, лояльности к основателю и организационных блоков.",
          ],
        },
        {
          heading: "Чего ожидать после расстановки",
          paragraphs: [
            "Эффекты расстановки часто продолжают разворачиваться дни и недели после сессии. Клиенты отмечают ощущение лёгкости, ясности и заземлённости. Отношения могут измениться, решения приходят проще, старые паттерны начинают растворяться.",
            "Важно дать себе пространство после сессии. Психолог в Праге поддержит вас в период интеграции.",
          ],
        },
      ],
      faq: [
        {
          question: "Подходят ли семейные расстановки всем?",
          answer:
            "Большинству людей метод полезен, но он требует определённой эмоциональной готовности. Во время бесплатного ознакомительного звонка психолог в Праге оценит, подходит ли этот подход вашей ситуации.",
        },
        {
          question: "Нужно ли знать свою семейную историю?",
          answer:
            "Нет. Хотя общий контекст помогает, сам расстановочный процесс раскрывает то, что релевантно. Многих клиентов удивляет то, что проявляется — даже без детальных знаний о своём роде.",
        },
        {
          question: "Могут ли расстановки помочь при тревожности и депрессии?",
          answer:
            "Да, особенно когда тревожность или депрессия имеют системные корни — например, нерешённое горе или лояльность страдающему члену семьи. Психолог в Праге поможет определить, подходят ли расстановки для вашей ситуации.",
        },
      ],
    },
    {
      slug: "onlajn-ili-ochno-kak-vybrat-format",
      title:
        "Онлайн или очно: как выбрать формат терапии — психолог в Праге",
      description:
        "Обратиться к психологу в Праге очно или онлайн? Сравнение форматов — эффективность, удобство и что лучше для расстановок и коучинга.",
      date: "2026-02-06",
      readTime: "5",
      image: "/session-alt.webp",
      imageAlt: "Онлайн и очная терапия с психологом в Праге",
      sections: [
        {
          heading: "Рост онлайн-терапии",
          paragraphs: [
            "Онлайн-терапия растёт экспоненциально, и не без причин. Она снимает географические барьеры, экономит время и позволяет работать с психологом в Праге из любой точки мира.",
            "Для международного сообщества в Праге — экспатов, цифровых кочевников, часто путешествующих — онлайн-сессии обеспечивают непрерывность даже при переездах.",
          ],
        },
        {
          heading: "Когда лучше очные сессии",
          paragraphs: [
            "Физическое присутствие в одном пространстве с психологом в Праге создаёт уникальное качество контакта. Язык тела и тонкие сигналы более доступны. Для телесно-ориентированной работы очные сессии могут быть более погружающими.",
            "Ритуал поездки в терапевтическое пространство также помогает создать чёткую границу между повседневной жизнью и внутренней работой.",
          ],
        },
        {
          heading: "Эффективность: что говорят исследования",
          paragraphs: [
            "Многочисленные исследования показывают, что онлайн-терапия так же эффективна, как очная, для большинства состояний — тревожность, депрессия, проблемы в отношениях. Качество терапевтического альянса — а не формат — является главным предиктором результатов.",
            "Это означает, что посещаете ли вы психолога в Праге лично или связываетесь по видеозвонку, результаты зависят от качества отношений и используемого подхода.",
          ],
        },
        {
          heading: "Онлайн-расстановки и коучинг",
          paragraphs: [
            "Системные расстановки, когда-то считавшиеся исключительно очным методом, прекрасно адаптировались к онлайн-формату. С цифровыми инструментами и техниками визуализации онлайн-расстановки могут быть такими же мощными.",
            "Коучинговые и процесс-ориентированные сессии естественно переносятся в видеоформат. Многие клиенты психолога Анны Колмыковой в Праге отмечают, что онлайн-сессии ощущаются интимными и сфокусированными.",
          ],
        },
        {
          heading: "Как принять решение",
          paragraphs: [
            "Спросите себя: вам важен ритуал похода к терапевту? Нужна ли гибкость онлайн-сессий? Комфортно ли раскрываться по видео? Нет неправильного ответа.",
            "Многие клиенты сочетают оба формата — очные сессии, когда в Праге, и онлайн — в поездках. Хороший психолог в Праге поддержит вас в выборе ритма, подходящего вашей жизни.",
          ],
        },
      ],
      faq: [
        {
          question: "Покрывает ли страховка онлайн-терапию с психологом в Праге?",
          answer:
            "Покрытие зависит от страховой компании. Некоторые чешские и международные планы покрывают онлайн-терапию. Уточните у психолога в Праге варианты выставления счетов.",
        },
        {
          question: "Какая техника нужна для онлайн-сессий?",
          answer:
            "Стабильный интернет, приватное пространство и устройство с камерой и микрофоном. Сессии проходят через защищённую видеоплатформу.",
        },
      ],
    },
  ],
};

const blogDictionaries: Record<Locale, BlogDictionary> = { en, cz, ru };

export function getBlogDictionary(locale: Locale): BlogDictionary {
  return blogDictionaries[locale] ?? blogDictionaries.en;
}

export function getBlogArticle(
  locale: Locale,
  slug: string
): BlogArticle | undefined {
  return getBlogDictionary(locale).articles.find((a) => a.slug === slug);
}

export function getAllBlogSlugs(locale: Locale): string[] {
  return getBlogDictionary(locale).articles.map((a) => a.slug);
}

export function getAllBlogRoutes(): Array<{ locale: Locale; slug: string }> {
  return (["en", "cz", "ru"] as Locale[]).flatMap((locale) =>
    getAllBlogSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

/**
 * Given a locale and slug, find the article index and return
 * the matching slug for each locale (by position).
 */
export function getBlogAlternateSlugs(
  locale: Locale,
  slug: string
): Record<Locale, string> | null {
  const articles = getBlogDictionary(locale).articles;
  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) return null;

  return Object.fromEntries(
    (["en", "cz", "ru"] as Locale[]).map((l) => [
      l,
      getBlogDictionary(l).articles[index]?.slug ?? slug,
    ])
  ) as Record<Locale, string>;
}
