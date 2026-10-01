import type { BlogEntry } from "@/lib/content/types";

const entry: BlogEntry = {
  section: "blog",
  slug: "from-fax-machine-to-phone-introducing-fax",
  title:
    "The Fax Machine Became Software: Introducing Fax for iPhone, Android and the Web",
  seoTitle: "The Fax Machine Became Software",
  category: "Product & Technology",
  topics: ["Fax Technology", "Mobile Fax", "Interface Design"],
  featured: true,
  description:
    "Fax outlived the fax machine: how it moved from telephone-line hardware to modems, servers and software, and to Fax on phone and web.",
  summary:
    "The office fax machine has been fading for a long time, but fax as a way of sending a signed page never went away. This is the story of how the workflow came loose from its hardware — through the desktop computer, the fax modem, the fax server and internet fax — and of Fax, the HELPERG ecosystem's fax services for the web, iPhone and Android, as one current example of where that separation has led.",
  essayLead: {
    kicker: "Product & Technology",
    standfirst:
      "The fax machine was never the point. It was a scanner, a modem and a printer bolted to a telephone line, and as each of those parts found a home somewhere else, the workflow went with it. Its newest home is a phone and a browser, where it no longer has to look like office equipment.",
  },
  hero: {
    src: "/images/fax/history-of-business-faxing--panasonic-kx-f90.jpg",
    alt: "Panasonic KX-F90 office fax machine in charcoal plastic, with a corded handset, numeric keypad, small display and paper feeder",
    width: 1282,
    height: 841,
    caption:
      "Panasonic KX-F90, an early-1990s compact fax with a built-in telephone and answering machine: handset, keypad and a small display, all in one box on one telephone line.",
    credit: {
      source: "Pittigrilli, cropped by Georgfotoart, Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Panasonic_KX-F90_(cropped).jpg",
      license: "CC BY-SA 4.0",
    },
  },
  body: [
    {
      kind: "keyTakeaways",
      items: [
        "Fax began as an idea about sending images over wires that is older than the telephone. The office fax machine was one packaging of it, made interoperable worldwide by the Group 3 standard of 1980.",
        "From the mid-1980s the machine came apart: fax boards and modems moved the endpoint onto a desk computer, and fax servers put shared lines on the office network.",
        "Internet fax standards published in 1998 set out two ways for fax to cross data networks. They describe protocols, not any particular app; in the archive's account, a phone fax app hands the document to a service, which places the call.",
        "Fax, from the HELPERG ecosystem, comes as two separate services: faxB2B in the browser and the FAX: send from phone app for iPhone and Android. Their interfaces live on personal screens, and faxB2B's can be light or dark.",
      ],
    },
    {
      kind: "heading",
      level: 2,
      text: "Fax outlived the machine",
    },
    {
      kind: "paragraph",
      text: "Ask when the fax machine died and there is no clean answer, because it never quite did. The archive's account of the decline of office fax machines describes a long fade rather than a switch-off: a network that thinned out over years, because a fax machine is useful only while the people you deal with still have one. Email made fax optional long before it made it rare.",
      links: [
        {
          anchor: "decline of office fax machines",
          href: "/fax/decline-of-office-fax-machines",
        },
      ],
    },
    {
      kind: "paragraph",
      text: "The workflow the machine served has outlasted it. Orders, forms and signed agreements still travel by fax, for reasons the archive's essay on why fax is still used traces to procedure rather than nostalgia: where a rule names fax as an accepted method, a technically better channel does not automatically inherit its standing. What changed is where a fax can begin and end. It no longer has to be the box in the corner of the office.",
      links: [{ anchor: "why fax is still used", href: "/fax/why-fax-is-still-used" }],
    },
    {
      kind: "paragraph",
      text: "That is the paradox this story follows: the machine declined, and the fax survived it. Following the fax rather than the machine leads, one step at a time, from a telephone line to software, and to the services this article introduces.",
    },
    {
      kind: "heading",
      level: 2,
      text: "An idea older than the telephone",
    },
    {
      kind: "paragraph",
      text: "The idea is more than a century older than the office machine. The IEEE's record of facsimile standardisation ascribes its founding principle to Alexander Bain in 1843, more than thirty years before Alexander Graham Bell's telephone of 1876. Nineteenth-century apparatus already did what every later fax would do: scan an image line by line, send a description of it over a wire, and rebuild it at the far end. The archive's history of fax machines follows that line from early experiments to the office.",
      links: [
        { anchor: "history of fax machines", href: "/history/history-of-fax-machines" },
      ],
    },
    {
      kind: "figure",
      image: {
        src: "/images/history/history-of-fax-machines--caselli-pantelegraph.png",
        alt: "Engraving of Giovanni Caselli's pantelegraph, a tall 19th-century image-transmission apparatus with a pendulum frame",
        width: 1000,
        height: 1473,
        caption:
          "Caselli's pantelegraph (depicted 1873), which sent a scanned page over telegraph lines decades before the office fax machine. Scan, describe, reconstruct: every fax since has followed the same three steps.",
        credit: {
          source:
            "Giovanni Caselli, from Die gesammten Naturwissenschaften (1873), via Wikimedia Commons",
          url: "https://commons.wikimedia.org/wiki/File:Pantelegraph.png",
          license: "Public domain",
        },
      },
    },
    {
      kind: "paragraph",
      text: "What turned the principle into office equipment was the telephone network and, above all, agreement. The IEEE record notes that early adopters bought facsimile machines in matched pairs, to talk to themselves. International standards changed that. Group 1 arrived in 1968 and Group 2, the so-called three-minute facsimile, in 1976. In 1980 the CCITT recommended Group 3, the digital one-minute facsimile which, in the words of the IEEE record, enabled the intercommunication of all facsimiles throughout the world. Group 3 machines negotiate their capabilities at the start of every call under ITU-T T.30 and encode the page under T.4, which is why a machine from one maker could talk to any other.",
      links: [{ anchor: "Group 3 machines", href: "/models/group-3-fax-machines" }],
    },
    {
      kind: "paragraph",
      text: "The machine that resulted bundled three devices around one phone line: a scanner, a modem and a printer. It was shared infrastructure, one machine for a floor, and the archive's history of business faxing describes how a fax number became as expected on a letterhead as a telephone number. Its routine was the routine of a shared object. A cover sheet named the sender, the recipient and the page count; someone waited for the confirmation slip; incoming pages sat in a tray that anyone could read. The archive's portrait of offices before email is built around that routine.",
      links: [
        { anchor: "history of business faxing", href: "/fax/history-of-business-faxing" },
        { anchor: "offices before email", href: "/fax/fax-machines-before-email" },
      ],
    },
    {
      kind: "timelineBreak",
      era: "The machine comes apart",
    },
    {
      kind: "heading",
      level: 2,
      text: "The computer learns to fax",
    },
    {
      kind: "paragraph",
      text: "The first parts to leave the box were the scanner and the printer. By the mid-1980s, plug-in fax boards let a desktop computer act as a fax terminal; the Smithsonian's record of an early GammaFax card describes it as letting a personal computer print directly to a facsimile machine. On the sending side, the document no longer had to become paper at all.",
      links: [
        { anchor: "plug-in fax boards", href: "/guides/pc-fax-modems-and-fax-boards" },
      ],
    },
    {
      kind: "figure",
      image: {
        src: "/images/guides/pc-fax-modems-and-fax-boards--pci-v92-fax-modem-card.jpg",
        alt: "Internal PCI fax/data modem expansion card photographed on a plain background, showing its edge connector, RJ-11 sockets and surface-mounted components",
        width: 1920,
        height: 1445,
        caption:
          "A PCI V.92 fax/data modem card. Once the modem lived inside the computer, the question was no longer which machine to walk to, but which side of the card ran the fax procedure.",
        credit: {
          source: "Jonathan Zander (Digon3), via Wikimedia Commons",
          url: "https://commons.wikimedia.org/wiki/File:PCI_V.92_Fax_Modem_Card_Digon3.jpg",
          license: "CC BY-SA 3.0",
        },
      },
    },
    {
      kind: "paragraph",
      text: "Fax modems made the same capability ordinary, and they carried a quiet architectural decision with them: whether the modem or the host computer ran the T.30 procedure that governs a fax call. One modem maker's developer guide is explicit that under Service Class 1 the host implements all of the T.30 and T.4 procedures, while under Classes 2 and 2.0 the modem does. When the host ran it, a fax was no longer a property of a machine. It was largely a matter of software.",
    },
    {
      kind: "heading",
      level: 2,
      text: "Fax moves onto the office network",
    },
    {
      kind: "paragraph",
      text: "Offices then pooled the capability. A fax server put shared lines and modems on one machine on the network, so people could send from their desks while the server queued, dialled and kept records. It also exposed a limit built into the standard. A Group 3 fax carries an image and station identifiers but, in practice, nothing that says who it is for: the optional subaddress that could name a recipient, defined in ITU-T T.33 in 1996, was rarely sent. So a server had to work out the recipient, most often from the number that had been dialled. The archive's account of fax servers and inbound routing describes how direct inward dialling came to do that job.",
      links: [
        {
          anchor: "fax servers and inbound routing",
          href: "/guides/fax-servers-and-inbound-routing",
        },
      ],
    },
    {
      kind: "figure",
      image: {
        src: "/images/guides/fax-servers-and-inbound-routing--us6396597-fig1-server-mailboxes.png",
        alt: "Patent drawing FIG. 1: a central server computer with CPU, modem and a stack of numbered per-user mailboxes, connected to several desktop workstations and a printer, alongside a separate store-and-forward service computer holding its own bank of ten mailboxes",
        width: 974,
        height: 1400,
        caption:
          "FIG. 1 of US 6,396,597 B1 (filed 10 February 1993), a proposal for delivering received faxes into per-user mailboxes; the ten-mailbox machine is a telephone company's store-and-forward service. The patent's own background explains the need: LAN fax systems of the day could not tell who a fax was for, and left received faxes in a common folder anyone on the network could open, the shared tray in digital form.",
        credit: {
          source: "US Patent and Trademark Office, via Google Patents",
          url: "https://patents.google.com/patent/US6396597B1/en",
          license: "Public domain (US patent drawing)",
        },
      },
    },
    {
      kind: "paragraph",
      text: "The printer did not disappear either. As late as Windows Server 2008, Microsoft's documentation for the fax role lists the routing methods for a received fax as forwarding it to an email address, storing it in a folder, or printing it. The fax had become a service on the network, and very often it still ended on paper.",
    },
    {
      kind: "heading",
      level: 2,
      text: "When the data network carried the fax",
    },
    {
      kind: "paragraph",
      text: "The last structural step came with two ITU-T Recommendations that share a June 1998 base text. T.37 moves fax by store-and-forward, carried as internet mail; T.38 relays a live fax call across an IP network, usually between gateways. The archive's guide to internet fax standards insists they are complements rather than generations, and both remain in force. Its comparison of analog and digital fax describes what the shift did to offices: fax no longer needed its own line and machine, and could become a service sent from a computer and received as a file.",
      links: [
        { anchor: "internet fax standards", href: "/fax/internet-fax-t37-and-t38" },
        { anchor: "analog and digital fax", href: "/fax/analog-fax-vs-digital-fax" },
      ],
    },
    {
      kind: "paragraph",
      text: "It matters what these standards are not. T.38 does not send a fax as audio, and it does not turn the page into a document file: a gateway demodulates the fax call on one side and re-creates it on the other, so the two fax machines never speak to each other directly. The archive's reference entry on T.38 fax relay explains the mechanism in detail. Neither Recommendation describes how any particular app is built. An app-based fax service does not need the phone to speak T.30: the document travels over a data network to a service, and the service places the telephone call.",
      links: [{ anchor: "T.38 fax relay", href: "/tools/fax-over-ip-t38" }],
    },
    {
      kind: "editorialAside",
      title: "Protocol history is not product architecture",
      text: "The standards above explain how fax can cross data networks. They do not say how a given app or service is engineered, and this article does not infer it. faxB2B, one of the two services introduced below, says something narrower about itself: that its fax pipeline converts documents, dials, retries and confirms through an established telecom carrier, and that each fax is a live call between two machines.",
    },
    {
      kind: "timelineBreak",
      era: "The present form",
    },
    {
      kind: "heading",
      level: 2,
      text: "Introducing Fax",
    },
    {
      kind: "paragraph",
      text: "Fax is far from the only online fax service or phone fax app. It is the HELPERG ecosystem's version, made by HELPERG LLC, the company that publishes PrinterArchive, and it comes as two separate services. On the web it is faxB2B, an online fax service for business teams at faxb2b.com that runs in the browser with nothing to install. On phones it is an app published as FAX: send from phone, on the App Store for iPhone and iPad and on Google Play for Android; faxB2B's website links to both listings as its mobile fax app. The two are run separately. faxB2B's Terms and Privacy Policy state that they do not cover mobile apps, and this article makes no claim that an account, a fax number or a fax history carries over between them.",
    },
    {
      kind: "paragraph",
      text: "faxB2B's own pages describe its workflow. A fax starts from PDF, PNG or JPEG files, up to five files of 5 MB each and 20 pages per fax, merged in the order they are added. It can also start from a page photographed with a phone's camera inside the browser, then cropped and rotated into a fax page. A cover sheet can be added, and pages can be typed on, drawn on and given a visual signature before they go. Faxes are sent to numbers in the United States, Canada and the countries of the European Union. For receiving, a team picks a dedicated number in the United States or Canada, and incoming faxes arrive in a shared inbox as PDFs.",
    },
    {
      kind: "paragraph",
      text: "Its terms set conditions that matter to anyone reading this. faxB2B is for business use only, and it is not currently offered to customers in the European Economic Area, the United Kingdom and several other countries, a limit on who can sign up rather than on where faxes can go. Its pricing page also says the service has not launched in final form: prices and billing rules are placeholders until launch, and new teams start on a free trial.",
    },
    {
      kind: "paragraph",
      text: "The store listings describe the same core jobs from a phone: sending and receiving faxes without a landline, uploading PDFs or scanning paper with the camera, a built-in scanner that crops and enhances pages before they are sent, and a history that shows delivery status and lets a fax be resent. Two of the official screenshots show the working screens: a new-fax form with a country code and the recipient's number, a switch to send with retries, an optional cover page and attachments from a scan, a photo or a file; and a fax list that marks each fax as a draft, sent or delivered.",
    },
    {
      kind: "figurePair",
      left: {
        src: "/images/blog/from-fax-machine-to-phone-introducing-fax--app-new-fax.jpg",
        alt: "Fax app on iPhone in a dark interface: the Create New Fax screen with a US country code and recipient number, a Send with retries switch, Add Cover Page and Add Attachment rows, and a menu offering Scan, Photo or File",
        width: 900,
        height: 1607,
        caption: "Composing a fax: number, retries, cover page, attachment.",
        credit: {
          source: "FAX: send from phone, official App Store screenshots (headlines cropped)",
          license: "Product screenshots © HELPERG LLC",
        },
      },
      right: {
        src: "/images/blog/from-fax-machine-to-phone-introducing-fax--app-fax-list.jpg",
        alt: "Fax app on iPhone in a dark interface: the Faxes list with a search field, filters for all, drafts and outgoing faxes, and entries marked Drafts, Sent and Delivered",
        width: 900,
        height: 1607,
        caption: "The fax list, with each item's delivery status.",
        credit: {
          source: "FAX: send from phone, official App Store screenshots (headlines cropped)",
          license: "Product screenshots © HELPERG LLC",
        },
      },
      caption:
        "The FAX: send from phone app on iPhone. Its working screens are those of a document tool: a form, a page, a status. The telephone line is still there, but it is now the service's job.",
    },
    {
      kind: "productAvailability",
      product: "fax-app",
      summary:
        "Two separate HELPERG LLC fax services: faxB2B, an online fax service for business teams in the browser, and the FAX: send from phone app for iPhone and Android. Each sends and receives faxes without a fax machine.",
      disclosure:
        "Fax is made by HELPERG LLC, the company that publishes PrinterArchive; faxB2B's Terms and the app's store listings both name it.",
      platforms: {
        website: { label: "Web", detail: "faxB2B · faxb2b.com" },
        ios: { detail: "App Store · FAX: send from phone" },
        android: { detail: "Google Play · FAX: send from phone" },
      },
    },
    {
      kind: "heading",
      level: 2,
      text: "Fax does not have to look like a fax machine",
    },
    {
      kind: "paragraph",
      text: "For most of its working life, fax was furniture. The machines this archive catalogues, from thermal-paper fax machines to plain-paper office units, were shared equipment built around a paper path, a keypad and a telephone line, finished in the neutral plastics of office hardware. Nobody chose how a fax machine looked, any more than they chose how the photocopier looked. Its interface was a small display and a row of labelled buttons, and it belonged to the room rather than to a person.",
      links: [
        {
          anchor: "thermal-paper fax machines",
          href: "/models/thermal-paper-fax-machines",
        },
      ],
    },
    {
      kind: "paragraph",
      text: "Software removes that constraint. A fax workflow that lives in a browser tab or on a phone is drawn on a personal screen, in whatever light its owner happens to work in, and the interface no longer has to imitate the machine. faxB2B's homepage makes the point visually: its illustration is a fax machine, drawn rather than owned, with a cover sheet rising out of it and a small display that reads SENDING. The machine has become an icon of the workflow instead of a requirement for it.",
    },
    {
      kind: "figurePair",
      left: {
        src: "/images/blog/from-fax-machine-to-phone-introducing-fax--web-light-illustration.jpg",
        alt: "faxB2B homepage illustration in the light theme: a drawn blue fax machine with a white cover sheet rising from it and a small display reading SENDING, on a pale background",
        width: 1100,
        height: 960,
        caption: "Light theme, the default.",
        credit: {
          source: "faxb2b.com homepage, captured by PrinterArchive on 1 October 2026 (cropped)",
          license: "Product screenshot © HELPERG LLC",
        },
      },
      right: {
        src: "/images/blog/from-fax-machine-to-phone-introducing-fax--web-dark-illustration.jpg",
        alt: "The same faxB2B illustration in the dark theme: the drawn fax machine and white cover sheet on a deep navy background",
        width: 1100,
        height: 960,
        caption: "Dark theme, switched on from the header.",
        credit: {
          source: "faxb2b.com homepage, captured by PrinterArchive on 1 October 2026 (cropped)",
          license: "Product screenshot © HELPERG LLC",
        },
      },
      caption:
        "The illustration on faxb2b.com's homepage in both themes. The switch is a sun-and-moon button in the site's header, and the browser remembers the choice for the next visit.",
    },
    {
      kind: "heading",
      level: 3,
      text: "Why both a light and a dark theme",
    },
    {
      kind: "paragraph",
      text: "On the web, faxB2B offers both: it opens in a light theme, and a sun-and-moon button in its header switches the site to a dark one. The two answer different working conditions, not only different tastes.",
    },
    {
      kind: "paragraph",
      text: "A light theme keeps the register of the document itself. A fax is a page, dark marks on white paper, and most of the work on screen is the work of reading one: checking a cover sheet, reviewing a scanned contract before it goes. Dark text on a light ground keeps the screen visually continuous with the paper it stands for, and it suits a bright office.",
    },
    {
      kind: "paragraph",
      text: "A dark theme serves the other conditions: a lower-luminance interface for dim rooms and late work, and for people who simply prefer it. That preference is now built into the platforms themselves. Apple describes Dark Mode as a systemwide appearance setting tailored for low-light environments, and Android has offered a system dark theme since Android 10. This article makes no claim about how either Fax service follows those system settings. The app's official screenshots show it only in a dark interface, with each document preview standing out as a white page: even on a dark screen, the page is still the brightest thing in view.",
    },
    {
      kind: "heading",
      level: 3,
      text: "From shared equipment to a personal choice",
    },
    {
      kind: "paragraph",
      text: "The deeper change is who decides. A fax machine's appearance was settled once, by its manufacturer, for everyone who would ever stand in front of it. On faxB2B a theme switch hands that decision to the person at the screen, and the browser remembers it. The fax inbox may still be shared, as the machine by the door once was; the way it looks no longer has to be. It is a small control, but it marks the distance the workflow has travelled, from institutional hardware that belonged to an office to personal software arranged by the individual using it.",
    },
    {
      kind: "pullquote",
      text: "The workflow is old. The interface does not have to be.",
    },
    {
      kind: "heading",
      level: 2,
      text: "What has not changed",
    },
    {
      kind: "paragraph",
      text: "Moving the interface did not move the network. faxB2B describes each fax as a live call between two machines and states what follows from that: documents are encrypted at rest and in transit to its carrier, but faxes cross the telephone network unencrypted. Its Terms set out what a receipt shows. A delivery receipt records what the receiving machine confirmed to the carrier; it does not prove that a person received or read the fax, or that it counts as legal notice. That is the modern form of the confirmation slip waiting by the office machine: a record of transmission, not of attention.",
    },
    {
      kind: "heading",
      level: 2,
      text: "The through-line",
    },
    {
      kind: "paragraph",
      text: "Set the stages side by side and the shape of the change is clear. A principle older than the telephone became a machine, then a standard that let every machine talk to every other, then a card in a computer, a server on a network, a pair of protocols for data networks, and finally software on a phone and in a browser. At each step one part of the original box moved somewhere else, and the fax went with it. The same relocation happened to printing, which the companion story follows from the printer driver to the phone.",
      links: [
        {
          anchor: "companion story",
          href: "/blog/from-printer-drivers-to-phone-smart-printer",
        },
      ],
    },
    {
      kind: "paragraph",
      text: "What survived all of it is the workflow: a page, sent to a number, with a record that it arrived. PrinterArchive exists to document exactly this kind of transition, the point at which a technology stops being a device and becomes a habit carried by something else. The fax machine became software. The page it sends has barely changed; the screen it starts from can now be light, dark, and personal.",
    },
    {
      kind: "researchInset",
      title: "Checked against the product's own pages and listings, 1 October 2026",
      items: [
        "faxb2b.com describes faxB2B as an online fax service for business teams that runs in the browser with nothing to install. Its Terms name it a business service of HELPERG LLC, a Wyoming company, for business use only.",
        "faxB2B's Terms and Privacy Policy state that they do not cover mobile apps: the web service and the FAX: send from phone app are run as separate services.",
        "Files: PDF, PNG and JPEG, up to 5 files of 5 MB each and 20 pages per fax. Statuses: Queued, Sending, Delivered and Failed; a failed fax can be retried from its record, and the retry is linked to the original.",
        "Coverage: faxes to the US, Canada and countries of the European Union; receiving on US and Canadian numbers. Under its Terms the service is not currently offered to customers in the European Economic Area, the United Kingdom and several other countries.",
        "Status: faxB2B's pricing page describes its prices and billing rules as placeholders until launch; new teams start on a free trial.",
        "Receipts: each delivered fax gets a PDF recording the destination, time, page count and a SHA-256 fingerprint of the exact document version sent.",
        "App Store and Google Play: FAX: send from phone, published by HELPERG LLC. The listings describe sending and receiving, PDF upload, camera scanning, and fax history with delivery status.",
        "Interface: faxb2b.com opens in a light theme and switches to a dark theme from a button in its header. Every official screenshot on both store listings shows the app in a dark interface.",
      ],
    },
    {
      kind: "footnoteRef",
      n: 1,
    },
  ],
  footnotes: [
    {
      n: 1,
      text: "Product details attributed to Fax, faxB2B and the FAX: send from phone app in this article, including platforms, file limits, coverage, availability, statuses, receipts and themes, were checked against faxb2b.com, its Terms, Privacy Policy and pricing page, and the official App Store and Google Play listings on 1 October 2026. Products change, and these details describe their state on that date; they are not maintained continuously.",
    },
  ],
  faqs: [
    {
      q: "Are faxB2B and the FAX: send from phone app the same service?",
      a: "No. Both are made by HELPERG LLC, and faxB2B's website links to the app as its mobile fax app, but faxB2B's Terms and Privacy Policy state that they do not cover mobile apps. This article makes no claim that an account, a fax number or a fax history carries over between them.",
    },
    {
      q: "Does a fax app on a phone use T.38?",
      a: "Not on the phone itself. T.38 is an ITU-T Recommendation for relaying a live fax call across an IP network, usually between gateways. An app-based fax service does not need the phone to speak fax protocol: the phone sends the document over a data network to a service, and the service places the call. How a particular service reaches the telephone network is its own engineering choice; faxB2B describes its fax pipeline as working through an established telecom carrier, with each fax a live call between two machines.",
    },
    {
      q: "Does online fax still use the telephone network?",
      a: "For faxB2B, yes, by its own description: each fax is a live call between two machines. The service states that documents are encrypted at rest and in transit to its carrier, and that faxes cross the telephone network unencrypted.",
    },
    {
      q: "What does a fax delivery receipt prove?",
      a: "That the receiving machine confirmed the transmission, not that a person read the fax. faxB2B's receipt is a PDF recording the destination, time, page count and a SHA-256 fingerprint of the exact document version sent, and its Terms state that a receipt does not prove that a person received or read the fax, what the recipient's copy looks like, or that it counts as legal notice, service or filing.",
    },
  ],
  related: [
    { section: "history", slug: "history-of-fax-machines" },
    { section: "fax", slug: "internet-fax-t37-and-t38" },
    { section: "guides", slug: "fax-servers-and-inbound-routing" },
    { section: "fax", slug: "why-fax-is-still-used" },
  ],
  deepReading: [
    {
      ref: { section: "guides", slug: "pc-fax-modems-and-fax-boards" },
      note: "Class 1, Class 2 and Class 2.0 as a contract about which side of the serial port ran the fax call; under Class 1, fax became mostly software.",
    },
    {
      ref: { section: "fax", slug: "how-fax-machines-work" },
      note: "Scan, negotiate, transmit, reconstruct: the four steps any fax service still has to perform somewhere.",
    },
    {
      ref: { section: "models", slug: "multifunction-fax-machines" },
      note: "The office all-in-one that folded Group 3 fax in beside printing, scanning and copying.",
    },
    {
      ref: { section: "models", slug: "group-4-fax-machines" },
      note: "The all-digital ISDN class of fax, defined by T.6 and T.563, that ran alongside the analog Group 3 call.",
    },
  ],
  published: "2026-10-01",
  updated: "2026-10-01",
  factsVerified: "2026-10-01",
  author: "PrinterArchive Editorial",
  editor: "PrinterArchive Editorial",
  keywords: [
    "fax machine to app",
    "fax app",
    "online fax",
    "fax software",
    "fax from phone",
    "mobile fax",
    "fax interface design",
  ],
  sources: [
    {
      title: "Milestones: International Standardization of G3 Facsimile, 1980",
      url: "https://ethw.org/Milestones:International_Standardization_of_G3_Facsimile,_1980",
      publisher: "IEEE Engineering and Technology History Wiki",
    },
    {
      title:
        "ITU-T Recommendation T.4: Standardization of Group 3 facsimile terminals for document transmission",
      url: "https://www.itu.int/rec/T-REC-T.4/en",
      publisher: "ITU-T",
    },
    {
      title:
        "ITU-T Recommendation T.30: Procedures for document facsimile transmission in the general switched telephone network",
      url: "https://www.itu.int/rec/T-REC-T.30/en",
      publisher: "ITU-T",
    },
    {
      title: "Gammafax PC fax card (object record, serial #1004)",
      url: "https://americanhistory.si.edu/collections/object/nmah_1346900",
      publisher: "Smithsonian National Museum of American History",
    },
    {
      title: "Fax Service Class 1 and Fax Service Class 1.0 Developer's Guide (S000262C)",
      url: "https://multitech.com/wp-content/uploads/s000262c.pdf",
      publisher: "Multi-Tech Systems, Inc.",
    },
    {
      title: "ITU-T Recommendation T.33: Facsimile routing utilizing the subaddress",
      url: "https://www.itu.int/rec/T-REC-T.33/en",
      publisher: "ITU-T",
    },
    {
      title:
        "US 6,396,597 B1: Computer network-based facsimile reception system (filed 10 February 1993)",
      url: "https://patents.google.com/patent/US6396597B1/en",
      publisher: "USPTO / Google Patents",
    },
    {
      title: "Incoming Routing Configuration (Windows Server 2008 Fax Service Manager)",
      url: "https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/cc736163(v=ws.10)",
      publisher: "Microsoft Learn (archived Windows Server documentation)",
    },
    {
      title:
        "ITU-T Recommendation T.37: Procedures for the transfer of facsimile data via store-and-forward on the Internet",
      url: "https://www.itu.int/rec/T-REC-T.37/en",
      publisher: "ITU-T",
    },
    {
      title:
        "ITU-T Recommendation T.38: Procedures for real-time Group 3 facsimile communication over IP networks",
      url: "https://www.itu.int/rec/T-REC-T.38/en",
      publisher: "ITU-T",
    },
    {
      title: "Dark Mode (Human Interface Guidelines)",
      url: "https://developer.apple.com/design/human-interface-guidelines/dark-mode",
      publisher: "Apple Developer",
    },
    {
      title: "Implement dark theme",
      url: "https://developer.android.com/develop/ui/views/theming/darktheme",
      publisher: "Android Developers",
    },
    {
      title: "faxB2B: Online Fax for Business and Teams",
      publisher: "HELPERG LLC",
      kind: "product",
      registry: { product: "fax-app", platform: "website" },
    },
    {
      title: "Fax Help: Sending, Fax Numbers and Billing",
      url: "https://faxb2b.com/help",
      publisher: "HELPERG LLC (faxB2B help centre)",
      kind: "product",
    },
    {
      title: "About faxB2B",
      url: "https://faxb2b.com/company",
      publisher: "HELPERG LLC",
      kind: "product",
    },
    {
      title: "faxB2B Terms of Use (effective 1 October 2026)",
      url: "https://faxb2b.com/legal/terms",
      publisher: "HELPERG LLC",
      kind: "product",
    },
    {
      title: "faxB2B Privacy Policy",
      url: "https://faxb2b.com/legal/privacy",
      publisher: "HELPERG LLC",
      kind: "product",
    },
    {
      title: "faxB2B pricing (placeholder prices until launch)",
      url: "https://faxb2b.com/pricing",
      publisher: "HELPERG LLC",
      kind: "product",
    },
    {
      title: "FAX: send from phone, App Store listing",
      publisher: "HELPERG LLC",
      kind: "product",
      registry: { product: "fax-app", platform: "ios" },
    },
    {
      title: "FAX: send from phone, Google Play listing",
      publisher: "HELPERG LLC",
      kind: "product",
      registry: { product: "fax-app", platform: "android" },
    },
  ],
};

export default entry;
