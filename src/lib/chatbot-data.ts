export type ChatMessage = {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
};

export type BotResponse = {
  message: string;
  quickReplies?: string[];
};

const companyData = {
  name: "Sigiro Construction & General Supplies",
  director: "Ramadhan Ali",
  location: "P.O. Box: 4414 – 00200, Nairobi, Kenya",
  phone: "+254 722 311 108",
  email: "sigiroconstruction2122@gmail.com",
  whatsapp: "+254722311108",
  founded: "2010",
  tagline: "Building Kenya's Future, One Project at a Time",
  services: {
    construction: [
      "Road & Infrastructure Construction",
      "Building Construction (Residential & Commercial)",
      "Water Works & Plumbing Systems",
      "Landscaping & Horticulture",
      "Drainage & Sewerage Systems",
      "Foundation Engineering",
      "Bridge Construction",
      "Dam & Reservoir Construction",
      "General Supplies of Goods",
    ],
    consultancy: [
      "Project Management & Supervision",
      "Structural Engineering",
      "Urban & Regional Planning",
      "Quantity Surveying",
      "Mechanical & Electrical Engineering",
      "Geotechnical Engineering",
      "Architectural Design",
    ],
  },
  projects: [
    "Ngong Road Expansion Phase II",
    "Lavington Water Treatment Plant",
    "Karen Business Park Landscaping",
    "Embakasi Industrial Complex",
    "Nairobi River Rehabilitation",
  ],
  certifications: ["NEMA Certified", "NCA (National Construction Authority)", "EBK (Engineers Board of Kenya)", "AAK (Architectural Association of Kenya)"],
};

const knowledgeBase: Array<{
  patterns: RegExp[];
  response: () => BotResponse;
}> = [
  {
    patterns: [/^(hi|hello|hey|good morning|good afternoon|good evening|jambo|habari|karibu)/i],
    response: () => ({
      message: `👋 **Karibu to Sigiro Construction & General Supplies!** I'm SIGIRO, your virtual assistant.\n\nHow can I help you today? I can assist you with information about our services, projects, contact details, or anything else related to our construction, supplies and consultancy expertise.`,
      quickReplies: ["Our Services", "Contact Us", "Our Projects", "Get a Quote"],
    }),
  },
  {
    patterns: [/service|what do you do|offer|provide|speciali[sz]/i],
    response: () => ({
      message: `🏗️ **Sigiro Construction & General Supplies** offers two core pillars of excellence:\n\n**Construction Services:**\n• Road & Infrastructure Construction\n• Building Construction (Residential & Commercial)\n• Water Works & Plumbing Systems\n• Landscaping & Horticulture\n• Drainage & Sewerage Systems\n• Bridge & Dam Construction\n\n**Supplies & Consultancy Services:**\n• General Supplies of Goods\n• Project Management & Supervision\n• Structural Engineering\n• Quantity Surveying\n• Urban & Regional Planning\n• Mechanical & Electrical Engineering\n\nWould you like details on any specific service?`,
      quickReplies: ["Road Construction", "Building Projects", "Water Works", "Get a Quote"],
    }),
  },
  {
    patterns: [/road|infrastructure|highway|tarmac|paving/i],
    response: () => ({
      message: `🛣️ **Road & Infrastructure Construction**\n\nSigiro is a leader in road construction across Kenya, including:\n\n• **Urban roads** – tarmac, paving, curbs, drainage\n• **Rural access roads** – murram, gravel, culverts\n• **Highways & bypasses** – large-scale infrastructure\n• **Parking lots & driveways** – commercial & residential\n• **Road rehabilitation & maintenance**\n\nWe are fully certified by the **Kenya National Highways Authority (KeNHA)** and **National Construction Authority (NCA)**.\n\nShall I help you get a quote or connect you with our team?`,
      quickReplies: ["Get a Quote", "Contact Engineer", "Our Projects", "Other Services"],
    }),
  },
  {
    patterns: [/building|construct|residential|commercial|office|house|apartment/i],
    response: () => ({
      message: `🏢 **Building Construction Services**\n\nWe design and build structures that stand the test of time:\n\n• **Residential** – bungalows, maisonettes, apartments\n• **Commercial** – offices, malls, warehouses, hotels\n• **Industrial** – factories, processing plants\n• **Institutional** – schools, hospitals, government buildings\n• **Renovation & Refurbishment**\n\nAll our buildings meet **Kenya Building Code** standards and are supervised by our certified structural engineers.\n\nWould you like to discuss your project?`,
      quickReplies: ["Get a Quote", "See Projects", "Contact Us", "Other Services"],
    }),
  },
  {
    patterns: [/water|plumbing|pipeline|borehole|irrigation|sewage|sewerage|drainage/i],
    response: () => ({
      message: `💧 **Water Works & Plumbing**\n\nClean water is life — and we take it seriously:\n\n• **Water supply systems** – reticulation & distribution\n• **Borehole drilling & equipping**\n• **Water treatment plants**\n• **Irrigation systems** – drip, sprinkler, furrow\n• **Sewerage & wastewater treatment**\n• **Drainage systems** – storm water management\n• **Pipeline laying** – HDPE, PVC, steel\n\nWe have completed **50+ water projects** across Kenya for both government and private clients.\n\nNeed a water works solution? Let's talk!`,
      quickReplies: ["Get a Quote", "Our Water Projects", "Contact Us", "Other Services"],
    }),
  },
  {
    patterns: [/landscap|garden|horticultur|lawn|tree|plant|green|park|outdoor/i],
    response: () => ({
      message: `🌿 **Landscaping & Horticulture**\n\nWe create beautiful, sustainable green spaces:\n\n• **Garden design & installation**\n• **Lawn establishment & maintenance**\n• **Tree planting & arboriculture**\n• **Irrigation system installation**\n• **Sports turf & golf courses**\n• **Green roofing systems**\n• **Environmental restoration**\n• **Public park development**\n\nOur horticulture team combines aesthetics with ecological sustainability, perfect for Kenya's diverse climate zones.\n\nLet us transform your outdoor space!`,
      quickReplies: ["Get a Quote", "See Landscape Projects", "Contact Us", "Other Services"],
    }),
  },
  {
    patterns: [/suppl|goods|material|procure|stationery|equipment|inventory/i],
    response: () => ({
      message: `📦 **General Supplies of Goods**\n\nOur supply arm keeps projects and institutions running:\n\n• **Building materials & hardware**\n• **Office supplies & stationery**\n• **Protective gear & safety equipment**\n• **Plumbing & electrical fittings**\n• **Furniture & office equipment**\n• **Industrial & cleaning consumables**\n• **Tender & supply-chain fulfillment**\n• **Countrywide delivery & logistics**\n\nWe supply businesses, institutions and project sites across Kenya with quality goods at competitive prices.\n\nNeed a supply quotation?`,
      quickReplies: ["Get a Quote", "Contact Us", "Other Services"],
    }),
  },
  {
    patterns: [/project manag|supervis|site manag|PMC/i],
    response: () => ({
      message: `📊 **Project Management & Supervision**\n\nWe ensure your project is delivered **on time, on budget, to specification**:\n\n• **Project planning & scheduling** (MS Project, Primavera P6)\n• **Cost management & budgeting**\n• **Quality assurance & control**\n• **Site supervision** – full-time resident engineers\n• **Progress reporting** – weekly & monthly\n• **Contractor management**\n• **Risk management**\n• **Final commissioning & handover**\n\nDirector **Ramadhan Ali** personally oversees major projects to guarantee excellence.\n\nReady to get started?`,
      quickReplies: ["Get a Quote", "Contact Director", "Our Projects", "Other Services"],
    }),
  },
  {
    patterns: [/quantity survey|QS|BOQ|bill of quantities|cost estim/i],
    response: () => ({
      message: `📐 **Quantity Surveying Services**\n\nAccurate cost management is critical — our QS team provides:\n\n• **Bills of Quantities (BOQ)** preparation\n• **Cost planning & feasibility studies**\n• **Tender evaluation**\n• **Contract administration**\n• **Valuation of works** – interim & final\n• **Claims assessment**\n• **Value engineering**\n• **Life cycle costing**\n\nAll our Quantity Surveyors are registered with the **Board of Registration of Architects & Quantity Surveyors (BORAQS)**.\n\nNeed a BOQ or cost estimate?`,
      quickReplies: ["Get a Quote", "Contact QS Team", "Contact Us", "Other Services"],
    }),
  },
  {
    patterns: [/quote|pricing|cost|budget|how much|rate|fee|estimate/i],
    response: () => ({
      message: `💰 **Get a Project Quote**\n\nWe provide **free initial consultations** and competitive pricing tailored to your project scope.\n\nTo give you an accurate quote, we'll need:\n• Project type & location\n• Approximate size/scope\n• Timeline requirements\n• Any specific standards or requirements\n\nYou can reach us via:\n📱 **WhatsApp:** +254 722 311 108\n📧 **Email:** sigiroconstruction2122@gmail.com\n📞 **Phone:** +254 722 311 108 | 0722 999 041\n📍 **Address:** P.O. Box: 4414 – 00200, Nairobi, Kenya\n\nOr fill out our **Contact Form** on the contact page and we'll respond within **24 hours**!`,
      quickReplies: ["WhatsApp Us", "Contact Form", "Call Us", "Our Services"],
    }),
  },
  {
    patterns: [/contact|reach|location|address|office|where|find you/i],
    response: () => ({
      message: `📍 **Find Us**\n\n**Sigiro Construction & General Supplies**\nP.O. Box: 4414 – 00200\nNairobi, Kenya\n\n📞 **Phone:** +254 722 311 108 | 0722 999 041\n📱 **WhatsApp:** +254 722 311 108\n📧 **Email:** sigiroconstruction2122@gmail.com\n🕐 **Office Hours:** Mon–Fri: 8:00 AM – 5:00 PM\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sat: 9:00 AM – 1:00 PM\n\nYou can also visit our **Contact Page** for a location map and contact form.`,
      quickReplies: ["WhatsApp Us", "Email Us", "Get Directions", "Our Services"],
    }),
  },
  {
    patterns: [/director|ramadhan|ali|CEO|founder|owner|management|team/i],
    response: () => ({
      message: `👨‍💼 **About Our Director**\n\n**Eng. Ramadhan Ali** is the Founder and Managing Director of Sigiro Construction & General Supplies.\n\nWith over **15 years** of experience in the construction and consultancy industry across East Africa, he has:\n\n• Led **100+ major projects** in Kenya and the region\n• Delivered roads, buildings, water works & supplies\n• Built a team of **50+ professionals**\n• Maintained a **98% client satisfaction rate**\n\nHis vision: *\"Building sustainable infrastructure that transforms communities and drives Kenya's development.\"*\n\nSigiro was founded in ${companyData.founded} with a commitment to quality, integrity, and innovation.`,
      quickReplies: ["Our Services", "Our Projects", "Contact Director", "About Company"],
    }),
  },
  {
    patterns: [/project|portfolio|work|completed|done|achiev/i],
    response: () => ({
      message: `🏆 **Our Notable Projects**\n\nSigiro has successfully delivered:\n\n• 🛣️ **Ngong Road Expansion Phase II** – 12km dual carriageway\n• 💧 **Lavington Water Treatment Plant** – 5,000 m³/day capacity\n• 🌿 **Karen Business Park Landscaping** – 50-acre development\n• 🏭 **Embakasi Industrial Complex** – 8-unit warehouse development\n• 🌊 **Nairobi River Rehabilitation** – environmental restoration\n• 🏘️ **Syokimau Residential Estate** – 120 housing units\n• 🌉 **Thika Road Drainage Upgrade** – 8km drainage system\n\nView our full portfolio on the **Projects page** for photos and case studies.`,
      quickReplies: ["View All Projects", "Get a Quote", "Our Services", "Contact Us"],
    }),
  },
  {
    patterns: [/certif|accredit|license|registr|qualified|award/i],
    response: () => ({
      message: `🎖️ **Our Certifications & Accreditations**\n\nSigiro Construction & General Supplies is fully accredited and registered with:\n\n• ✅ **NCA** – National Construction Authority (Grade A)\n• ✅ **EBK** – Engineers Board of Kenya\n• ✅ **BORAQS** – Board of Registration of Architects & Quantity Surveyors\n• ✅ **NEMA** – National Environment Management Authority\n• ✅ **AAK** – Architectural Association of Kenya\n• ✅ **KISM** – Kenya Institute of Surveyors & Mapping\n• ✅ **ISO 9001:2015** – Quality Management System\n\nThese certifications ensure the highest standards of professionalism and compliance in all our engagements.`,
      quickReplies: ["Our Services", "Get a Quote", "Contact Us", "About Company"],
    }),
  },
  {
    patterns: [/about|company|history|background|who are you|tell me about/i],
    response: () => ({
      message: `🌿 **About Sigiro Construction & General Supplies**\n\nFounded in **${companyData.founded}** by **Eng. Ramadhan Ali**, Sigiro is a premier construction, supplies and consultancy firm based in **Nairobi, Kenya**.\n\nWe are driven by the belief that quality infrastructure is the foundation of a prosperous society. Over the past decade, we have:\n\n✅ Completed **100+ projects** worth over KES 2 Billion\n✅ Built a team of **50+ professionals**\n✅ Served **200+ satisfied clients**\n✅ Operated across **all 47 counties** in Kenya\n\n**Our Mission:** To deliver innovative, sustainable infrastructure solutions that transform communities.\n\n**Our Vision:** To be East Africa's most trusted construction and supplies partner.`,
      quickReplies: ["Our Services", "Our Projects", "Contact Us", "Meet the Team"],
    }),
  },
  {
    patterns: [/thank|thanks|asante|appreciate|great|perfect|excellent|good job/i],
    response: () => ({
      message: `😊 **Thank you!** We truly appreciate your kind words.\n\nAt Sigiro Construction & General Supplies, client satisfaction is our highest priority. We look forward to serving you and building something great together!\n\nIs there anything else I can help you with?`,
      quickReplies: ["Our Services", "Get a Quote", "Contact Us"],
    }),
  },
  {
    patterns: [/bye|goodbye|see you|later|kwaheri/i],
    response: () => ({
      message: `👋 **Goodbye!** Thank you for visiting Sigiro Construction & General Supplies.\n\nRemember, we're always here to help with your construction, supplies and consultancy needs. Don't hesitate to reach out:\n\n📱 WhatsApp: +254 722 311 108\n📧 sigiroconstruction2122@gmail.com\n\n*Building Kenya's Future, One Project at a Time* 🌿`,
      quickReplies: ["Contact Us", "Our Services"],
    }),
  },
  {
    patterns: [/help|menu|options|what can you do/i],
    response: () => ({
      message: `🤖 **How Can I Help You?**\n\nI can assist you with:\n\n1. 🏗️ **Services** – construction, supplies & consultancy details\n2. 💰 **Quotes** – pricing & cost estimates\n3. 📁 **Projects** – our portfolio & case studies\n4. 📞 **Contact** – reach our team\n5. 👨‍💼 **About Us** – company & director info\n6. 🎖️ **Certifications** – our accreditations\n7. 📍 **Location** – find our office\n\nJust type your question naturally, or click a quick reply below!`,
      quickReplies: ["Services", "Get a Quote", "Contact Us", "About Company"],
    }),
  },
];

const defaultResponse: BotResponse = {
  message: `I'm not quite sure I understood that. Let me connect you with the right information.\n\nYou can ask me about:\n• Our **services** (construction, supplies & consultancy)\n• **Pricing** or getting a quote\n• **Projects** we've completed\n• **Contact** details & location\n• **About** Sigiro Construction & General Supplies\n\nOr reach us directly:\n📱 **WhatsApp:** +254 722 311 108\n📧 **Email:** sigiroconstruction2122@gmail.com`,
  quickReplies: ["Our Services", "Get a Quote", "Contact Us", "Help"],
};

export function getBotResponse(userMessage: string): BotResponse {
  const msg = userMessage.trim().toLowerCase();

  for (const item of knowledgeBase) {
    if (item.patterns.some((pattern) => pattern.test(msg))) {
      return item.response();
    }
  }

  return defaultResponse;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "bot",
  content: `👋 **Karibu! Welcome to Sigiro Construction & General Supplies!**\n\nI'm **SIGIRO**, your virtual assistant. I'm here to help you with information about our construction, supplies and consultancy services.\n\nHow can I assist you today?`,
  timestamp: new Date(),
};
