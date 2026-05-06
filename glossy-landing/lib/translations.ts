export type Locale = "en" | "am";

type NavCopy = {
  home: string;
  about: string;
  gallery: string;
  contact: string;
  cta: string;
  menu: string;
  themeLight: string;
  themeDark: string;
  languageEn: string;
  languageAm: string;
};

type Translations = {
  nav: NavCopy;
  footer: {
    brand: string;
    headline: string;
    body: string;
    navigation: string;
    services: string;
    contact: string;
    socials: string;
    rights: string;
    serviceItems: string[];
    socialItems: string[];
  };
  home: {
    eyebrow: string;
    headline: string;
    subtext: string;
    primaryCta: string;
    secondaryCta: string;
    heroBadge: string;
    heroCardTitle: string;
    heroCardText: string;
    trustBadges: string[];
    stripTitles: [string, string, string];
    stripIntros: [string, string, string];
    aboutEyebrow: string;
    aboutTitle: string;
    aboutCta: string;
    galleryEyebrow: string;
    galleryTitle: string;
    galleryText: string;
    galleryCta: string;
    testimonialsEyebrow: string;
    testimonialsTitle: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    storyEyebrow: string;
    storyTitle: string;
    storyText: string;
    pricingEyebrow: string;
    pricingTitle: string;
    pricingText: string;
    processEyebrow: string;
    nextEyebrow: string;
    nextTitle: string;
    nextText: string;
    nextButton: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    intro: string;
    filters: {
      all: string;
      religious: string;
      wedding: string;
      portrait: string;
      art: string;
    };
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    formEyebrow: string;
    formTitle: string;
    formText: string;
    name: string;
    email: string;
    details: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    detailsPlaceholder: string;
    submit: string;
    sent: string;
    consultationsEyebrow: string;
    consultationsTitle: string;
    consultationsText: string;
    emailEyebrow: string;
    emailText: string;
    emailButton: string;
  };
};

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      gallery: "Gallery",
      contact: "Contact",
      cta: "Order Now",
      menu: "Menu",
      themeLight: "Light",
      themeDark: "Dark",
      languageEn: "EN",
      languageAm: "አማ",
    },
    footer: {
      brand: "glossy",
      headline: "Handcrafted photographic artworks with a luminous, enduring finish.",
      body: "Made to preserve personal memories with clarity, depth, and care.",
      navigation: "Navigate",
      services: "Services",
      contact: "Contact",
      socials: "Social",
      rights: "All rights reserved.",
      serviceItems: ["Portrait Pieces", "Memory Panels", "Signature Commissions"],
      socialItems: ["Instagram", "Pinterest", "WhatsApp", "TikTok", "Facebook"],
    },
    home: {
      eyebrow: "glossy",
      headline: "Your Memories, Finished as Art",
      subtext:
        "glossy transforms cherished photographs into handcrafted statement pieces, sealed beneath a luminous, glass-like surface designed to endure.",
      primaryCta: "Order Now",
      secondaryCta: "View the Gallery",
      heroBadge: "Handcrafted finish",
      heroCardTitle: "Depth, clarity, and quiet presence",
      heroCardText:
        "Each piece is made to give a personal photograph the presence of a polished, lasting work of art.",
      trustBadges: ["Family portraits", "Weddings and anniversaries", "Bespoke commissions"],
      stripTitles: ["Portrait Pieces", "Memory Panels", "Signature Commissions"],
      stripIntros: [
        "A closer look at works created to give beloved faces and family photographs a more sculptural, enduring presence.",
        "Personal images from milestone occasions, reimagined with depth, polish, and a finish that catches the light beautifully.",
        "Larger-format pieces designed for interiors that call for something personal, refined, and unmistakably one of a kind.",
      ],
      aboutEyebrow: "About",
      aboutTitle: "Crafted for those who believe a photograph deserves more than a frame",
      aboutCta: "Read the Studio Story",
      galleryEyebrow: "Gallery",
      galleryTitle: "Personal photographs, reimagined as polished, light-filled works",
      galleryText:
        "A selection of images transformed with care to preserve the feeling of the original while giving it a more lasting visual presence.",
      galleryCta: "Explore the Collection",
      testimonialsEyebrow: "Testimonials",
      testimonialsTitle: "Words from clients who entrusted us with meaningful images",
      ctaEyebrow: "Commission",
      ctaTitle: "Preserve what matters beautifully",
      ctaText: "Commission a piece that gives your most meaningful photograph the presence of lasting art.",
      ctaButton: "Order Now",
    },
    about: {
      eyebrow: "About glossy",
      title: "A studio devoted to preserving personal photographs as lasting art.",
      intro:
        "glossy was created for those who believe a meaningful image deserves more than a frame. Each piece is prepared with care, then finished with a luminous surface that brings depth, clarity, and permanence to the original photograph.",
      storyEyebrow: "Studio Story",
      storyTitle: "Personal memories, elevated with restraint and care.",
      storyText:
        "The result is personal artwork with the presence of a gallery object: refined, enduring, and quietly striking. Our approach is simple. We respect the image, we refine it with care, and we give it a finish worthy of the memory it holds.",
      pricingEyebrow: "Pricing",
      pricingTitle: "Clear starting points, tailored to the scale of the piece.",
      pricingText:
        "Each commission is individually reviewed, with these tiers offering a considered guide to size, presence, and level of finish.",
      processEyebrow: "Process",
      nextEyebrow: "Next Step",
      nextTitle: "Begin with a photograph that matters, and we will guide the rest.",
      nextText:
        "Share your image and a little context, and the studio will respond with the most suitable direction for the piece you have in mind.",
      nextButton: "Order Now",
    },
    gallery: {
      eyebrow: "Gallery",
      title: "A selection of photographs reimagined as finished works.",
      intro:
        "Each piece is made to preserve the feeling of the original image while giving it greater depth, polish, and permanence.",
      filters: {
        all: "All",
        religious: "Religious",
        wedding: "Wedding",
        portrait: "Portrait",
        art: "Art",
      },
    },
    contact: {
      eyebrow: "Contact",
      title: "Begin with the image you would like to keep beautifully close.",
      intro:
        "Whether it is a portrait, a family photograph, or a defining occasion, we will help shape it into a piece made to last.",
      formEyebrow: "Order Now",
      formTitle: "Tell us about the photograph you would like to preserve",
      formText: "Share the image, occasion, or setting in mind, and we will respond with a considered recommendation.",
      name: "Name",
      email: "Email",
      details: "Artwork details",
      namePlaceholder: "Full name",
      emailPlaceholder: "you@email.com",
      detailsPlaceholder: "Portrait, family photograph, wedding image, or special moment",
      submit: "Send Enquiry",
      sent: "Enquiry received. The studio will be in touch shortly.",
      consultationsEyebrow: "Consultations",
      consultationsTitle: "By appointment",
      consultationsText: "Monday to Friday, with private guidance offered remotely for clients near and far.",
      emailEyebrow: "Email",
      emailText: "For commissions, private questions, or bespoke requests, write to the studio directly.",
      emailButton: "Send Email",
    },
  },
  am: {
    nav: {
      home: "መነሻ",
      about: "ስለ እኛ",
      gallery: "ማዕከለ-ስዕላት",
      contact: "ያነጋግሩን",
      cta: "Order Now",
      menu: "ምናሌ",
      themeLight: "ብርሃን",
      themeDark: "ጨለማ",
      languageEn: "EN",
      languageAm: "አማ",
    },
    footer: {
      brand: "glossy",
      headline: "በእጅ የተሰሩ ፎቶ ስራዎች፣ የብርሃን ጥራትና ዘላቂ ግርማ ያላቸው።",
      body: "የግል ትዝታዎችን በግልጽነት፣ በጥልቀት እና በትኩረት እንዲቆዩ የተሰሩ።",
      navigation: "አሰሳ",
      services: "አገልግሎቶች",
      contact: "መገኛ",
      socials: "ማህበራዊ",
      rights: "መብቶች ሁሉ የተጠበቁ ናቸው።",
      serviceItems: ["የፖርትሬት ስራዎች", "የትዝታ ፓነሎች", "ልዩ ኮሚሽኖች"],
      socialItems: ["Instagram", "Pinterest", "WhatsApp", "TikTok", "Facebook"],
    },
    home: {
      eyebrow: "glossy",
      headline: "ትዝታዎችዎ፣ እንደ ስነ ጥበብ የተጠናቀቁ",
      subtext:
        "glossy የምትወዷቸውን ፎቶዎች ወደ በእጅ የተሠሩ የክብር ስራዎች ይለውጣል፤ በብሩህ እና እንደ መስታወት የሚያንጸባርቅ ገጽ ስር ተጠብቀው ለረጅም ጊዜ እንዲቆዩ ይደረጋሉ።",
      primaryCta: "Order Now",
      secondaryCta: "ማዕከለ-ስዕላቱን ይመልከቱ",
      heroBadge: "በእጅ የተጠናቀቀ",
      heroCardTitle: "ጥልቀት፣ ግልጽነት እና የተረጋጋ ክብር",
      heroCardText:
        "እያንዳንዱ ስራ የግል ፎቶን ወደ ዘላቂ እና የተጠራጠረ የስነ ጥበብ እቃ ለመቀየር በትኩረት ይሠራል።",
      trustBadges: ["የቤተሰብ ፖርትሬቶች", "ሰርግና የአመታዊ በዓላት", "ልዩ ኮሚሽኖች"],
      stripTitles: ["የፖርትሬት ስራዎች", "የትዝታ ፓነሎች", "ልዩ ኮሚሽኖች"],
      stripIntros: [
        "የምትወዷቸውን ፊቶች እና የቤተሰብ ፎቶዎች ከመደበኛ ክፈፍ በላይ የሚያደርሱ ስራዎችን በቅርብ ይመልከቱ።",
        "ከልዩ ዝግጅቶች የተወሰዱ ምስሎች በጥልቀት፣ በፀጋ እና ብርሃንን በሚያጠራጥር ገጽ እንደገና ይቀርባሉ።",
        "ለቤት ውስጥ ቦታዎች የተሰሩ ትልቅ ስራዎች፣ የግል እና ልዩ ቅርጸ ክብር ያላቸው።",
      ],
      aboutEyebrow: "ስለ እኛ",
      aboutTitle: "ፎቶ ከክፈፍ በላይ የሚገባው ነው ብለው ለሚያምኑ የተሰራ",
      aboutCta: "የስቱዲዮውን ታሪክ ያንብቡ",
      galleryEyebrow: "ማዕከለ-ስዕላት",
      galleryTitle: "የግል ፎቶዎች፣ ወደ የተጠራጠሩ እና ብርሃን የሞላባቸው ስራዎች የተቀየሩ",
      galleryText:
        "የመጀመሪያውን ስሜት እንዲጠብቅ ሆኖ ከዚያ በላይ የሚቆይ ቅርጽ ለመስጠት በጥንቃቄ የተለወጡ ምስሎች።",
      galleryCta: "ስብስቡን ያስሱ",
      testimonialsEyebrow: "ምስክርነቶች",
      testimonialsTitle: "የትርጉም ያላቸውን ምስሎች የሰጡን ደንበኞች ቃላት",
      ctaEyebrow: "ኮሚሽን",
      ctaTitle: "ዋጋ ያለውን ነገር በውበት ያስቀምጡ",
      ctaText: "ከሁሉ በላይ የሚያስታውሱትን ፎቶ ወደ ዘላቂ የስነ ጥበብ ክብር የሚያደርስ ስራ ያዝዙ።",
      ctaButton: "Order Now",
    },
    about: {
      eyebrow: "ስለ glossy",
      title: "የግል ፎቶዎችን ወደ ዘላቂ ስነ ጥበብ ለማድረግ የተሰጠ ስቱዲዮ።",
      intro:
        "glossy ትርጉም ያለው ምስል ከመደበኛ ክፈፍ በላይ ይገባዋል ብለው ለሚያምኑ ሰዎች ተፈጥሯል። እያንዳንዱ ስራ በጥንቃቄ ይዘጋጃል፣ ከዚያም ለመጀመሪያው ፎቶ ጥልቀት፣ ግልጽነት እና ዘላቂነት የሚሰጥ ብሩህ ገጽ ይሰጠዋል።",
      storyEyebrow: "የስቱዲዮ ታሪክ",
      storyTitle: "የግል ትዝታዎች፣ በረጋ እና በእንክብካቤ የተወጣጡ",
      storyText:
        "ውጤቱ እንደ ማዕከለ-ስዕል እቃ ያለ ክብር ያለው የግል ስነ ጥበብ ነው፤ የተጠራጠረ፣ ዘላቂ እና በዝምታ የሚያምር። አቀራረባችን ቀላል ነው። ምስሉን እንከብራለን፣ በትኩረት እናጠራዋለን፣ እና ትዝታውን የሚመጥን ጨረስ እንሰጠዋለን።",
      pricingEyebrow: "ዋጋ",
      pricingTitle: "ለስራው መጠን የተዘጋጁ ግልጽ የመነሻ አማራጮች።",
      pricingText:
        "እያንዳንዱ ኮሚሽን በተናጠል ይገመገማል፣ እነዚህም ደረጃዎች መጠንን፣ ክብርን እና የጨረስ ደረጃን የሚያመለክቱ መመሪያዎችን ያቀርባሉ።",
      processEyebrow: "ሂደት",
      nextEyebrow: "ቀጣይ እርምጃ",
      nextTitle: "ትርጉም ያለውን ፎቶ ይጀምሩ፣ የቀረውን እኛ እንመራዎታለን።",
      nextText:
        "ምስልዎን እና ትንሽ አውድ ያጋሩ፣ ከዚያ ለታሰበው ስራ ተስማሚውን አቅጣጫ እንመልስልዎታለን።",
      nextButton: "Order Now",
    },
    gallery: {
      eyebrow: "ማዕከለ-ስዕላት",
      title: "ወደ የተጠናቀቁ ስራዎች የተቀየሩ ፎቶዎች ስብስብ።",
      intro:
        "እያንዳንዱ ስራ የመጀመሪያውን ምስል ስሜት ለማስጠበቅ ሲሠራ በተጨማሪም ጥልቀት፣ ውበት እና ዘላቂነት ይጨምርበታል።",
      filters: {
        all: "ሁሉም",
        religious: "Religious",
        wedding: "Wedding",
        portrait: "Portrait",
        art: "Art",
      },
    },
    contact: {
      eyebrow: "ያነጋግሩን",
      title: "በውበት በቅርብ ሊቆይ የሚገባውን ምስል ይጀምሩ።",
      intro:
        "ፖርትሬት ይሁን፣ የቤተሰብ ፎቶ ወይም ታላቅ አጋጣሚ፣ ወደ ዘላቂ ስራ እንዲቀየር እንረዳዎታለን።",
      formEyebrow: "Order Now",
      formTitle: "ማስቀመጥ ስለሚፈልጉት ፎቶ ያስታውቁን",
      formText: "ያስቡትን ምስል፣ አጋጣሚ ወይም አቀራረብ ያጋሩ፣ እኛም በተመጣጣኝ ምክር እንመልስልዎታለን።",
      name: "ስም",
      email: "ኢሜይል",
      details: "የስራ ዝርዝሮች",
      namePlaceholder: "ሙሉ ስም",
      emailPlaceholder: "you@email.com",
      detailsPlaceholder: "ፖርትሬት፣ የቤተሰብ ፎቶ፣ የሰርግ ምስል ወይም ልዩ ጊዜ",
      submit: "ጥያቄውን ይላኩ",
      sent: "ጥያቄዎ ደርሶናል። ስቱዲዮው በቅርቡ ይመልሳል።",
      consultationsEyebrow: "ምክክር",
      consultationsTitle: "በቀጠሮ",
      consultationsText: "ከሰኞ እስከ አርብ፣ ለቅርብና ለሩቅ ደንበኞች የግል መመሪያ በርቀት ይሰጣል።",
      emailEyebrow: "ኢሜይል",
      emailText: "ለኮሚሽኖች፣ ለግል ጥያቄዎች ወይም ለልዩ ጥያቄዎች በቀጥታ ለስቱዲዮው ይጻፉ።",
      emailButton: "ኢሜይል ይላኩ",
    },
  },
};
