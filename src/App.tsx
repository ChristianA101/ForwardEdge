import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";

const skyline =
  "https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=2000&q=88";
const port =
  "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1800&q=86";
const factory =
  "https://images.unsplash.com/photo-1647764000772-d2005ce86888?auto=format&fit=crop&w=1800&q=86";
const adminEmail = "admin@forwardedge.sg";
const companyAddress = "200 Braddell Road, Blk E, #16-62, BCA Academy, Singapore 579700";
const emailLink = (subject: string) =>
  `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}`;

const routes = [
  ["/", "Home"],
  ["/about", "About"],
  ["/products", "Products"],
  ["/solutions", "Solutions"],
  ["/asia", "Doing business in Asia"],
  ["/radar", "Asia Tech Radar"],
  ["/pqc-readiness", "ASEAN PQC Readiness"],
  ["/contact", "Contact"],
] as const;

const legacyRoutes: Record<string, string> = {
  "/services": "/solutions",
  "/technology": "/products",
  "/insights": "/radar",
  "/quantum-safe": "/pqc-readiness",
};

type IconName =
  | "arrow"
  | "brain"
  | "shield"
  | "cloud"
  | "finance"
  | "port"
  | "factory"
  | "check"
  | "lock"
  | "nodes"
  | "menu"
  | "close"
  | "external";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    brain: <><path d="M9 4.5a3 3 0 0 0-5 2.2A3.5 3.5 0 0 0 5 13v1a3 3 0 0 0 4 2.8V4.5ZM15 4.5a3 3 0 0 1 5 2.2 3.5 3.5 0 0 1-1 6.3v1a3 3 0 0 1-4 2.8V4.5ZM9 8H7m2 5H6m9-5h2m-2 5h3" /></>,
    shield: <><path d="M12 3 4.5 6v5.2c0 4.5 3 7.8 7.5 9.8 4.5-2 7.5-5.3 7.5-9.8V6L12 3Z" /><path d="m8.8 12 2 2 4.5-5" /></>,
    cloud: <><path d="M6 18h11a4 4 0 0 0 .4-8A6 6 0 0 0 6 9a4.5 4.5 0 0 0 0 9Z" /><path d="M9 14h6m-3-3v6" /></>,
    finance: <><path d="M4 20h16M6 17V9m4 8V9m4 8V9m4 8V9M3 7l9-4 9 4H3Z" /></>,
    port: <><path d="M3 19h18M5 16V7h11v9M7 7V4h11v12M5 11h11M9 7v9m4-9v9" /></>,
    factory: <><path d="M3 20V9l6 3V8l6 4V4h5v16H3Z" /><path d="M7 16h2m3 0h2m3 0h1" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" /></>,
    nodes: <><circle cx="5" cy="12" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="m7 11 9-4m-9 6 9 4" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    external: <><path d="M14 5h5v5m0-5-8 8" /><path d="M19 13v6H5V5h6" /></>,
  };
  return <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Link({ to, className = "", children, onClick }: { to: string; className?: string; children: ReactNode; onClick?: () => void }) {
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!to.startsWith("/")) return;
    event.preventDefault();
    window.history.pushState({}, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
    onClick?.();
  };
  return <a href={to} className={className} onClick={navigate}>{children}</a>;
}

function ButtonLink({ to, children, secondary = false }: { to: string; children: ReactNode; secondary?: boolean }) {
  return <Link to={to} className={`button ${secondary ? "button-secondary" : ""}`}>{children}<Icon name="arrow" /></Link>;
}

function BrandLogo({ footer = false }: { footer?: boolean }) {
  return <img className={`brand-logo ${footer ? "footer-logo" : ""}`} src="/assets/forwardedge-logo-reverse.png" alt="ForwardEdge" />;
}

function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  return <header className="topbar">
    <div className="nav-wrap">
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        <BrandLogo />
      </Link>
      <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Main navigation">
        {routes.slice(1).map(([href, label]) => <Link key={href} to={href} onClick={() => setOpen(false)} className={path === href ? "active" : ""}>{label}</Link>)}
      </nav>
      <a href="https://cal.com/vincent-choy/30min" className="nav-cta" target="_blank" rel="noreferrer">Talk to Us <Icon name="arrow" size={16} /></a>
      <button className="menu-button" aria-label="Toggle menu" onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} size={24} /></button>
    </div>
  </header>;
}

function Footer() {
  return <footer>
    <div className="footer-main">
      <div><Link to="/" className="brand footer-brand"><BrandLogo footer /></Link><p>Secure intelligence. Regional resilience.</p><p className="muted">Built in Singapore for critical systems across Asia.</p></div>
      <div><span className="eyebrow">Explore</span>{routes.slice(1, 5).map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</div>
      <div><span className="eyebrow">Resources</span>{routes.slice(5).map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</div>
      <div><span className="eyebrow">Singapore</span><p>ForwardEdge AI Singapore Pte Ltd</p><p>{companyAddress}</p><a href={`mailto:${adminEmail}`}>{adminEmail}</a><p className="muted">9:00am - 6:00pm</p></div>
    </div>
    <div className="footer-bottom"><span>© 2026 ForwardEdge AI Singapore Pte Ltd · UEN 202551703H</span><span className="footer-legal"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></span></div>
  </footer>;
}

function SectionTitle({ label, title, body, center = false }: { label: string; title: ReactNode; body?: string; center?: boolean }) {
  return <div className={`section-title ${center ? "center" : ""}`}><span className="eyebrow">{label}</span><h2>{title}</h2>{body && <p>{body}</p>}</div>;
}

function PageHero({ label, title, body, image, children }: { label: string; title: ReactNode; body: string; image?: string; children?: ReactNode }) {
  return <section className={`page-hero ${image ? "with-image" : ""}`} style={image ? { backgroundImage: `linear-gradient(90deg, rgba(5,16,42,.98) 15%, rgba(5,16,42,.78) 62%, rgba(5,16,42,.38)), url(${image})` } : undefined}>
    <div className="container"><span className="eyebrow">{label}</span><h1>{title}</h1><p>{body}</p>{children}</div>
  </section>;
}

function TechCard({ icon, number, title, children, tags }: { icon: IconName; number?: string; title: string; children: ReactNode; tags?: string[] }) {
  return <article className="tech-card">{number && <span className="card-number">{number}</span>}<div className="icon-box"><Icon name={icon} size={24} /></div><h3>{title}</h3><p>{children}</p>{tags && <div className="chips">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>}<span className="card-link">Explore capability <Icon name="arrow" size={16} /></span></article>;
}

function NetworkGraphic({ compact = false }: { compact?: boolean }) {
  const nodes = [[19, 30, "SG"], [47, 18, "BKK"], [66, 38, "HCM"], [34, 58, "KUL"], [77, 69, "MNL"], [53, 82, "JKT"]];
  return <div className={`network ${compact ? "compact" : ""}`}>
    <div className="network-meta"><span>ASEAN SECURE FABRIC</span><span className="live-dot">LIVE · 08 NODES</span></div>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
      <path className="map-line" d="M19 30 47 18 66 38 77 69 53 82 34 58 19 30M34 58l32-20M47 18l6 64" />
      {nodes.map(([x, y, label]) => <g key={label as string}><circle className="node-ring" cx={x} cy={y} r="3.5" /><circle className="node-core" cx={x} cy={y} r="1.2" /><text x={Number(x) + 3} y={Number(y) - 3}>{label}</text></g>)}
      <path className="pulse-line" d="M19 30 47 18 66 38 77 69" />
    </svg>
    <div className="network-stats"><span><b>9.2ms</b> regional latency</span><span><b>100%</b> encrypted transit</span><span><b>6</b> sovereign zones</span></div>
  </div>;
}

function Architecture({ labels = ["SOURCES", "SECURE FABRIC", "CONTROL PLANE", "OUTCOMES"] }: { labels?: string[] }) {
  return <div className="architecture">{labels.map((label, i) => <div className="arch-row" key={label}><span className="arch-index">0{i + 1}</span><div><Icon name={i === 0 ? "nodes" : i === labels.length - 1 ? "check" : "lock"} size={17} />{label}</div>{i < labels.length - 1 && <span className="arch-line" />}</div>)}</div>;
}

function Home() {
  return <>
    <section className="home-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,16,42,.98) 12%, rgba(5,16,42,.8) 58%, rgba(5,16,42,.28)), url(${skyline})` }}>
      <div className="hero-grid-overlay" />
      <div className="container hero-content">
        <span className="eyebrow"><span className="signal-dot" /> Singapore · Asia Pacific</span>
        <h1>Secure intelligence.<br /><span className="text-glow">At Asia’s edge.</span></h1>
        <p>We engineer private AI, quantum-safe security and sovereign infrastructure for the systems that keep Asia moving.</p>
        <div className="button-row"><ButtonLink to="/products">Explore our platform</ButtonLink><ButtonLink to="/contact" secondary>Talk to Us</ButtonLink></div>
        <div className="hero-proof"><span><b>SG</b> Engineered in Singapore</span><span><b>ASEAN</b> Regional delivery</span><span><b>24/7</b> Critical operations</span></div>
      </div>
    </section>
    <section className="section container">
      <SectionTitle label="Core capabilities" title={<>Built for the systems<br />that cannot fail.</>} body="Deep technology made operational for regulated, distributed and high-consequence environments." />
      <div className="grid-3"><TechCard icon="brain" number="01" title="AI & Edge">Private inference and governed AI where data is created â€” from trading infrastructure to the factory floor.</TechCard><TechCard icon="shield" number="02" title="Quantum-Safe Security">Discover cryptographic exposure and migrate critical systems before quantum risk becomes operational risk.</TechCard><TechCard icon="cloud" number="03" title="Sovereign Infrastructure">Confidential computing, policy-bound data exchange and regional cloud architectures you can verify.</TechCard></div>
    </section>
    <section className="industry-strip">
      <div className="container"><div className="industry-label"><span className="eyebrow">Critical industries</span><p>One secure fabric. Three high-impact sectors.</p></div>{[["finance", "Finance", "MAS-aligned resilience"], ["port", "Ports", "Connected operations"], ["factory", "Manufacturing", "Intelligent production"]].map(([icon, title, sub]) => <Link to="/solutions" className="industry-item" key={title}><Icon name={icon as IconName} size={26} /><span><b>{title}</b><small>{sub}</small></span><Icon name="arrow" size={18} /></Link>)}</div>
    </section>
    <section className="section container split">
      <div><SectionTitle label="Regional telemetry" title={<>One control plane.<br />Across ASEAN.</>} body="Deploy, govern and attest workloads across a fragmented regional landscape without compromising speed or sovereignty." /><ul className="check-list"><li><Icon name="check" /> Policy-bound regional orchestration</li><li><Icon name="check" /> Data residency by design</li><li><Icon name="check" /> Continuous cryptographic assurance</li></ul><ButtonLink to="/asia" secondary>Operating across Asia</ButtonLink></div>
      <NetworkGraphic />
    </section>
    <section className="section radar-preview">
      <div className="container"><SectionTitle label="Asia Tech Radar · 02/2025" title="Signals shaping the region." body="Curated developments in AI, cyber security and digital infrastructure â€” with the implications made clear." />
        <div className="radar-row">{radarItems.slice(0, 3).map((item, i) => <article key={item.title} className="radar-mini"><span className="radar-num">0{i + 1}</span><div className="chips"><span>{item.market}</span><span>{item.category}</span></div><h3>{item.title}</h3><p>{item.summary}</p><a href={item.url} target="_blank" rel="noreferrer">View source <Icon name="external" size={15} /></a></article>)}</div>
        <div className="section-action"><ButtonLink to="/radar">Open Asia Tech Radar</ButtonLink></div>
      </div>
    </section>
    <CTA />
  </>;
}

function CTA() {
  return <section className="cta-band"><div className="container"><span className="eyebrow">Start with readiness</span><h2>Is your cryptography ready for what comes next?</h2><p>Benchmark your exposure and build a practical 90-day path to quantum readiness.</p><div className="button-row"><ButtonLink to="/pqc-readiness">Explore PQC readiness</ButtonLink><ButtonLink to="/contact" secondary>Contact us</ButtonLink></div></div></section>;
}

function About() {
  return <><PageHero label="About forwardedge.sg" title={<>Deep-tech delivery.<br /><span className="text-glow">Grounded in Asia.</span></>} body="From our Singapore base, we help critical organisations turn frontier technology into trusted operational capability." image={skyline}><div className="hero-stats"><span><b>06</b> ASEAN markets</span><span><b>03</b> Critical sectors</span><span><b>01</b> Regional mission</span></div></PageHero>
    <section className="section container split"><div><SectionTitle label="Our mission" title="Make advanced technology trustworthy where it matters most." body="Asia’s growth is increasingly powered by distributed intelligence, connected infrastructure and data that crosses borders. We exist to secure that transition." /><p className="body-copy">Our teams combine security engineering, cloud architecture, applied AI and regional programme delivery. We design for real constraints: legacy estates, sovereign boundaries, operational technology and evolving standards.</p></div><blockquote>â€œThe region does not need more technology theatre. It needs systems that can be governed, proven and operated.â€<cite>â€” forwardedge.sg principle 01</cite></blockquote></section>
    <section className="section surface"><div className="container"><SectionTitle label="How we work" title="Precision from strategy to operations." /><div className="grid-3">{[["01", "Discover", "Map critical assets, data paths and operational constraints before selecting technology."], ["02", "Engineer", "Build with open standards, verifiable controls and clear ownership boundaries."], ["03", "Operate", "Transfer capability to local teams with telemetry, assurance and measurable outcomes."]].map(([n, t, d]) => <article className="step-card" key={t}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
    <section className="section container split"><div><SectionTitle label="Regional delivery footprint" title="Singapore anchored. ASEAN connected." body="A partner network and deployment model designed for cross-border programmes, in-market execution and local accountability." /><div className="trust-row"><span>MAS-aware</span><span>ISO-aligned</span><span>NIST-informed</span><span>CSA-ready</span></div></div><NetworkGraphic compact /></section>
    <section className="section container"><SectionTitle label="Values" title="What earns trust." center /><div className="grid-3"><TechCard icon="check" title="Evidence over assertion">Controls are observable, claims are testable and progress is measurable.</TechCard><TechCard icon="nodes" title="Regional by design">We respect market differences while engineering for ASEAN-scale interoperability.</TechCard><TechCard icon="lock" title="Security without friction">Protection should accelerate trusted adoption, not stand in its way.</TechCard></div></section><CTA /></>;
}

type Product = {
  title: string;
  sub: string;
  body: string;
  status?: string;
  image?: string;
  tags: string[];
};

const products: Product[] = [
  { title: "Isidore 1 Core", sub: "Inline post-quantum encryption", body: "Compact inline encryption delivering 60â€“80 Mbps for protected connections across distributed Asian operations.", status: "Proof of concept", image: "/assets/products/isidore-1-core.png", tags: ["60â€“80 MBPS", "INLINE", "PQC"] },
  { title: "One-Way Diode", sub: "Hardware-enforced data transfer", body: "Enforces one-way data movement across trust boundaries for operational technology, critical infrastructure and protected networks.", status: "Proof of concept", image: "/assets/products/one-way-diode.png", tags: ["ONE-WAY", "IT / OT", "HARDWARE"] },
  { title: "Isidore Mini Core", sub: "Compact 500 Mbps encryption", body: "A compact encryption platform for regional edge sites where throughput, footprint and deployment flexibility matter.", status: "In development", image: "/assets/products/isidore-mini-core.png", tags: ["500 MBPS", "COMPACT", "EDGE"] },
  { title: "Isidore Mini Guardian", sub: "Dual-layer mission encryption", body: "Dual-layer encryption designed for high-assurance missions and sensitive communications across complex operating environments.", status: "Proposed", image: "/assets/products/isidore-mini-guardian.png", tags: ["DUAL LAYER", "HIGH ASSURANCE", "MISSION"] },
  { title: "Isidore Server Core 10G", sub: "Rack-scale encryption", body: "Server-class encryption supporting 10â€“20 GbE for secure regional hubs, data centres and high-throughput infrastructure.", status: "On track", image: "/assets/products/isidore-server-core.png", tags: ["10â€“20 GBE", "RACK SCALE", "DATA CENTRE"] },
  { title: "Isidore Server 60G", sub: "60 Gbps rack-scale encryption", body: "High-throughput rack-scale encryption for demanding backbone, cloud and critical infrastructure connections.", status: "On track", image: "/assets/products/isidore-server-core.png", tags: ["60 GBPS", "BACKBONE", "HIGH THROUGHPUT"] },
  { title: "Isidore Maritime Core", sub: "Shipboard and coastal security", body: "Purpose-shaped for shipboard, port and coastal environments across Asia’s connected maritime corridors.", status: "Planned", image: "/assets/products/isidore-maritime-core.png", tags: ["MARITIME", "SHIPBOARD", "COASTAL"] },
  { title: "Isidore Wearable Core", sub: "Body-worn secure communications", body: "A wearable form factor for protected communications carried by personnel in mobile and field operations.", status: "Planned", image: "/assets/products/isidore-wearable-core.png", tags: ["WEARABLE", "FIELD", "SECURE COMMS"] },
  { title: "Isidore Micro Core", sub: "PoE-powered ultra-small encryption", body: "An ultra-small, Power-over-Ethernet platform for constrained sites, compact systems and distributed edge deployments.", status: "Proposed", image: "/assets/products/isidore-micro-core.png", tags: ["POE", "ULTRA-SMALL", "EDGE"] },
  { title: "Isidore Space Modular Core", sub: "Protected satellite communications", body: "A modular encryption platform intended for resilient satellite and space communications.", status: "Planned", image: "/assets/products/isidore-space-core.png", tags: ["SPACE", "SATELLITE", "MODULAR"] },
  { title: "Cassian", sub: "Fleet management platform", body: "Configure, monitor and update many Isidore devices from one place, with a unified operational view across distributed deployments.", tags: ["MANAGEMENT", "MONITORING", "FLEET CONTROL"] },
];

const caseStudies = [
  { label: "Phase III SBIR", title: "Department of the Treasury / IRS", body: "Technology Business Management implementation supporting portfolio, demand, acquisition, workforce and budget planning." },
  { label: "Phase III SBIR", title: "U.S. Navy", body: "A forecasting platform for PMA-271 integrating operational, sustainment and programme data to support mission and aircraft availability decisions." },
  { label: "Phase III SBIR", title: "U.S. Air Force", body: "Business transformation and data modernisation capabilities supporting enterprise planning, architecture and funding decisions." },
];

function Products() {
  return <><PageHero label="Isidore Quantum products" title={<>Quantum-safe protection.<br /><span className="text-glow">Engineered for Asia’s edge.</span></>} body="A portfolio of post-quantum encryption platforms for regional infrastructure, edge sites, maritime operations and high-assurance communications."><img className="isidore-logo" src="/assets/isidore-logo-white.png" alt="Isidore Quantum" /></PageHero>
    <section className="product-index"><div className="container">{products.map((p, i) => <a key={p.title} href={`#product-${i}`}><span>{String(i + 1).padStart(2, "0")}</span>{p.title}</a>)}</div></section>
    <section className="container">{products.map((p, i) => <article className="product-block" id={`product-${i}`} key={p.title}><div className="product-copy"><span className="eyebrow">Product · {String(i + 1).padStart(2, "0")}</span>{p.status && <span className="status-label">{p.status}</span>}<h2>{p.title}</h2><h3>{p.sub}</h3><p>{p.body}</p><div className="chips">{p.tags.map(t => <span key={t}>{t}</span>)}</div><ButtonLink to={emailLink(`Isidore demo request: ${p.title}`)}>Request a demo</ButtonLink></div><div className={`product-visual product-image ${p.image ? "" : "cassian-visual"}`}>{p.image ? <img src={p.image} alt={p.title} /> : <><div className="mock-top"><span>CASSIAN CONTROL PLANE</span><span className="live-dot">REGIONAL FLEET</span></div><Architecture labels={["DEVICE FLEET", "SECURE ORCHESTRATION", "MONITOR + UPDATE", "ASSURED OPERATIONS"]} /></>}</div></article>)}<p className="source-note">Product information provided by Isidore Quantum.</p></section>
    <section className="section surface"><div className="container"><SectionTitle label="Case studies" title="Transformation across U.S. government." body="Selected Forward Edge-AI programmes supporting data-driven planning, modernisation and operational decisions." /><div className="case-study-grid">{caseStudies.map((item, i) => <article className="case-study-card" key={item.title}><span className="card-number">{String(i + 1).padStart(2, "0")}</span><span className="eyebrow">{item.label}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div><p className="source-note">Source: Forward Edge-AI, Inc. U.S. case studies. Mentions do not imply endorsement.</p></div></section><CTA /></>;
}

const sectors = [
  { id: "finance", icon: "finance" as IconName, title: "Finance", intro: "Secure the transition to quantum-safe, AI-enabled financial infrastructure without disrupting trust or transaction velocity.", image: skyline, stat: "ZERO", statLabel: "critical service interruption", uses: ["MAS-aligned PQC transition", "Quantum-safe payments", "Identity & key infrastructure", "Long-lived data protection"], labels: ["PAYMENTS + IAM", "CRYPTO INVENTORY", "PQC CONTROL", "ASSURED SERVICES"] },
  { id: "ports", icon: "port" as IconName, title: "Ports", intro: "Connect autonomous, visual and remote operations across the terminal while maintaining strict IT/OT boundaries.", image: port, stat: "24/7", statLabel: "secure operational visibility", uses: ["Edge computer vision", "Autonomous vehicle control", "Predictive maintenance", "Secure IT/OT exchange"], labels: ["CRANES + AGV", "EDGE VISION", "OT DATA BRIDGE", "CONTROL CENTRE"] },
  { id: "manufacturing", icon: "factory" as IconName, title: "Manufacturing", intro: "Put private intelligence into production environments while protecting uptime, safety and valuable process IP.", image: factory, stat: "<20ms", statLabel: "edge inference target", uses: ["AI quality inspection", "Robotics coordination", "Private 5G edge", "IP and model protection"], labels: ["MACHINES + VISION", "PRIVATE 5G", "EDGE INFERENCE", "MES / OUTCOMES"] },
];

function Solutions() {
  return <><PageHero label="Industry solutions" title={<>Deep technology.<br /><span className="text-glow">Operational outcomes.</span></>} body="Purpose-built patterns for Asia’s financial systems, port infrastructure and advanced manufacturing environments." image={port} />
    <div className="anchor-nav">{sectors.map(s => <a href={`#${s.id}`} key={s.id}><Icon name={s.icon} />{s.title}</a>)}</div>
    {sectors.map((s, i) => <section className={`sector-section ${i % 2 ? "surface" : ""}`} id={s.id} key={s.id}><div className="container"><div className="sector-head"><span className="sector-num">0{i + 1}</span><div><div className="icon-box"><Icon name={s.icon} /></div><h2>{s.title}</h2><p>{s.intro}</p></div><div className="sector-stat"><b>{s.stat}</b><span>{s.statLabel}</span></div></div><div className="sector-content"><div className="use-grid">{s.uses.map((u, n) => <article key={u}><span>0{n + 1}</span><h3>{u}</h3><p>Secure-by-design implementation adapted to local policy, legacy estates and operational constraints.</p></article>)}</div><div className="diagram-panel" style={{ backgroundImage: `linear-gradient(rgba(5,16,42,.82), rgba(5,16,42,.94)), url(${s.image})` }}><Architecture labels={s.labels} /></div></div></div></section>)}<CTA /></>;
}

function Asia() {
  const timeline = [["01", "Orient", "Select a Singapore hub model and map priority ASEAN markets."], ["02", "Classify", "Determine data, workload and sector-specific obligations."], ["03", "Architect", "Choose sovereign cloud, edge and cross-border control patterns."], ["04", "Partner", "Mobilise in-market delivery, assurance and operational support."], ["05", "Scale", "Expand through a repeatable regional control plane."]];
  return <><PageHero label="Doing business in Asia" title={<>A practical path to<br /><span className="text-glow">regional deployment.</span></>} body="Navigate sovereignty, regulation and delivery complexity with Singapore as the trusted launch point for ASEAN." image={skyline} />
    <section className="section container split"><div><SectionTitle label="Regional hub" title="Why Singapore." body="Singapore combines trusted institutions, deep technical capability and world-class connectivity with direct access to ASEAN’s growth markets." /><p className="body-copy">Use the hub to establish regional governance, architecture and assurance â€” then localise deployment by market, data class and sector.</p></div><div className="fact-grid"><span><b>10</b>ASEAN member states</span><span><b>700M+</b>regional population</span><span><b>4</b>major cloud regions</span><span><b>1</b>control framework</span></div></section>
    <section className="section surface"><div className="container"><SectionTitle label="Deployment considerations" title="Design for difference." body="There is no single ASEAN operating environment. A strong regional model anticipates variance and standardises what should remain consistent." /><div className="grid-3">{[["Data residency & sovereignty", "Classify data flows, key ownership and permitted processing locations before workload placement.", "lock"], ["Regulatory landscape", "Map sector regulators, privacy regimes and cyber obligations market by market.", "shield"], ["Sovereign cloud options", "Balance hyperscale regions, local clouds, edge estates and confidential compute.", "cloud"], ["Cross-border operations", "Apply policy-bound exchange and auditable transfer controls across jurisdictions.", "nodes"], ["Local partnerships", "Combine regional architecture with licensed, accountable in-market capability.", "check"], ["Operational assurance", "Unify evidence and telemetry without centralising sensitive operational data.", "brain"]].map(([t, d, icon]) => <TechCard key={t} icon={icon as IconName} title={t as string}>{d}</TechCard>)}</div></div></section>
    <section className="section container"><SectionTitle label="Market entry playbook" title="From intent to regional operations." /><div className="timeline">{timeline.map(([n, t, d]) => <div key={n}><span>{n}</span><section><h3>{t}</h3><p>{d}</p></section></div>)}</div></section>
    <section className="section container split"><NetworkGraphic /><div><SectionTitle label="Delivery model" title="Regional consistency. Local accountability." body="Our Singapore control team works with in-market engineering and assurance partners, giving clients one architecture with the delivery depth to execute locally." /><ButtonLink to="/contact">Plan your Asia entry</ButtonLink></div></section><CTA /></>;
}

const radarItems = [
  { market: "Singapore", category: "Quantum-safe", source: "MAS", date: "FEB 2024", title: "MAS issues advisory on quantum risk", summary: "Financial institutions are encouraged to begin cryptographic inventory, risk assessment and transition planning.", url: "https://www.mas.gov.sg/" },
  { market: "ASEAN", category: "Digital policy", source: "ASEAN", date: "2025", title: "ASEAN Digital Masterplan 2025", summary: "A region-wide framework for trusted digital services, cross-border interoperability and institutional capability.", url: "https://asean.org/" },
  { market: "Singapore", category: "AI governance", source: "IMDA", date: "ONGOING", title: "Model AI Governance Framework", summary: "Practical guidance for explainable, transparent and human-centric AI deployment across organisations.", url: "https://www.imda.gov.sg/" },
  { market: "Global", category: "Quantum-safe", source: "NIST", date: "AUG 2024", title: "First PQC standards finalised", summary: "NIST publishes initial post-quantum cryptography standards, creating a clear technical migration baseline.", url: "https://www.nist.gov/pqcrypto" },
  { market: "Singapore", category: "Edge & OT", source: "PSA", date: "ACTIVE", title: "Tuas Port automation scales", summary: "Autonomous vehicles and intelligent systems reshape secure edge requirements for next-generation port operations.", url: "https://www.singaporepsa.com/" },
  { market: "ASEAN", category: "Cyber security", source: "ASEAN", date: "PROGRAMME", title: "Regional cyber cooperation deepens", summary: "Member states strengthen incident coordination and shared cyber capacity for increasingly connected economies.", url: "https://asean.org/" },
  { market: "Singapore", category: "Data assurance", source: "IMDA", date: "ONGOING", title: "Trusted data sharing frameworks", summary: "Policy and technical mechanisms support accountable data exchange across business and jurisdictional boundaries.", url: "https://www.imda.gov.sg/" },
  { market: "Global", category: "Confidential compute", source: "NIST", date: "TRACKING", title: "Privacy-enhancing computation matures", summary: "Confidential and privacy-preserving patterns become increasingly practical for regulated data collaboration.", url: "https://www.nist.gov/" },
];

function Radar() {
  const [market, setMarket] = useState("All markets");
  const [category, setCategory] = useState("All technologies");
  const [source, setSource] = useState("All sources");
  const filtered = radarItems.filter(i => (market === "All markets" || i.market === market) && (category === "All technologies" || i.category === category) && (source === "All sources" || i.source === source));
  return <><PageHero label="Asia Tech Radar · Live brief" title={<>Signals for the<br /><span className="text-glow">next operating cycle.</span></>} body="A curated view of the standards, programmes and infrastructure shifts shaping trusted technology across Asia." />
    <section className="container filter-bar"><label>Market<select value={market} onChange={e => setMarket(e.target.value)}><option>All markets</option><option>Singapore</option><option>ASEAN</option><option>Global</option></select></label><label>Technology<select value={category} onChange={e => setCategory(e.target.value)}><option>All technologies</option>{[...new Set(radarItems.map(i => i.category))].map(x => <option key={x}>{x}</option>)}</select></label><label>Source<select value={source} onChange={e => setSource(e.target.value)}><option>All sources</option>{[...new Set(radarItems.map(i => i.source))].map(x => <option key={x}>{x}</option>)}</select></label><span className="result-count">{String(filtered.length).padStart(2, "0")} SIGNALS</span></section>
    <section className="section container"><div className="radar-grid">{filtered.map((item, i) => <article className="radar-card" key={item.title}><div className="radar-top"><span className="radar-num">{String(i + 1).padStart(2, "0")}</span><span>{item.date}</span></div><div className="chips"><span>{item.market}</span><span>{item.category}</span></div><h2>{item.title}</h2><p>{item.summary}</p><div className="radar-source"><span>SOURCE · {item.source}</span><a href={item.url} target="_blank" rel="noreferrer">Source <Icon name="external" size={16} /></a></div></article>)}</div></section><CTA /></>;
}

function PQC() {
  const maturity = [["05", "Adaptive", "Crypto-agile by default"], ["04", "Migrating", "Priority systems transitioning"], ["03", "Planned", "Roadmap and target state approved"], ["02", "Aware", "Inventory and exposure understood"], ["01", "Unprepared", "Unknown dependencies and ownership"]];
  return <><PageHero label="ASEAN PQC Readiness" title={<>Prepare now for the<br /><span className="text-glow">post-quantum transition.</span></>} body="A pragmatic readiness programme for organisations protecting long-lived data and critical infrastructure across ASEAN." />
    <section className="section container split"><div><SectionTitle label="The context" title="Quantum risk is a migration problem â€” not a future event." body="Cryptographic transitions across complex estates take years. Harvest-now-decrypt-later exposure means sensitive data can be at risk before a cryptographically relevant quantum computer arrives." /><div className="source-badges"><a href="https://www.mas.gov.sg/" target="_blank">MAS guidance <Icon name="external" size={14} /></a><a href="https://www.nist.gov/pqcrypto" target="_blank">NIST standards <Icon name="external" size={14} /></a><a href="https://asean.org/" target="_blank">ASEAN context <Icon name="external" size={14} /></a></div></div><div className="risk-panel"><span className="eyebrow">Risk equation</span><div><span>MIGRATION TIME</span><b>+</b><span>DATA LIFE</span><b>&gt;</b><span>QUANTUM HORIZON</span></div><p>If the equation is true, action is already required.</p></div></section>
    <section className="section surface"><div className="container maturity-wrap"><SectionTitle label="PQC maturity model" title="Know your starting point." body="A five-level model to benchmark preparedness across governance, discovery, architecture and execution." /><div className="maturity">{maturity.map(([n, t, d], i) => <div key={n} className={`level level-${5 - i}`}><span>{n}</span><b>{t}</b><small>{d}</small></div>)}</div></div></section>
    <section className="section container"><SectionTitle label="90-day readiness programme" title="From uncertainty to an executable plan." /><div className="phase-grid">{[["DAYS 01â€”30", "Discover & align", ["Executive risk alignment", "Critical system scoping", "Crypto-discovery pilots"]], ["DAYS 31â€”60", "Assess & prioritise", ["Cryptographic inventory", "Exposure classification", "Dependency mapping"]], ["DAYS 61â€”90", "Plan & mobilise", ["Target architecture", "Migration roadmap", "Pilot selection"]]].map(([days, title, items], i) => <article key={days as string}><span>PHASE 0{i + 1}</span><b>{days as string}</b><h3>{title as string}</h3><ul>{(items as string[]).map(x => <li key={x}><Icon name="check" size={16} />{x}</li>)}</ul></article>)}</div></section>
    <section className="section container guide-sections">{[["01", "Cryptographic discovery", "Build a defensible inventory across applications, networks, devices, certificates, libraries and operational systems. Combine automated discovery with owner validation."], ["02", "Risk-based prioritisation", "Prioritise by data lifetime, system criticality, external exposure, replacement cycle and migration complexity â€” not algorithm alone."], ["03", "Migration & crypto agility", "Sequence standards-based pilots, hybrid patterns and vendor dependencies while building the ability to change cryptography again."]].map(([n, t, d]) => <article key={n}><span>{n}</span><div><h2>{t}</h2><p>{d}</p></div><Architecture labels={n === "01" ? ["SCAN", "IDENTIFY", "VALIDATE"] : n === "02" ? ["CLASSIFY", "SCORE", "SEQUENCE"] : ["PILOT", "MIGRATE", "AGILITY"]} /></article>)}</section>
    <section className="cta-band pqc-cta"><div className="container"><span className="eyebrow">Your first 90 days</span><h2>Turn quantum concern into a controlled programme.</h2><p>Book a readiness assessment with our Singapore team.</p><ButtonLink to={emailLink("ASEAN PQC readiness assessment")}>Book readiness assessment</ButtonLink></div></section></>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Website enquiry from ${data.get("name")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Organisation: ${data.get("organisation")}`,
      `Sector: ${data.get("sector") || "Not specified"}`,
      `Country: ${data.get("country")}`,
      "",
      "Enquiry:",
      data.get("enquiry"),
    ].join("\n");

    window.location.href = `mailto:admin@forwardedge.sg?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return <><PageHero label="Contact" title={<>Build what’s next.<br /><span className="text-glow">Securely.</span></>} body="Tell us about the system, challenge or regional programme you are planning. Our Singapore team will respond within one business day." />
    <section className="section container contact-grid"><form onSubmit={submit}><div className="form-head"><span className="eyebrow">Start a conversation</span><span>01 / 01</span></div><div className="field-row"><label>Full name<input name="name" required placeholder="Your name" /></label><label>Organisation<input name="organisation" required placeholder="Company or agency" /></label></div><div className="field-row"><label>Sector<select name="sector" defaultValue=""><option value="" disabled>Select sector</option><option>Financial services</option><option>Ports & logistics</option><option>Manufacturing</option><option>Government</option><option>Technology</option></select></label><label>Country<input name="country" required placeholder="Singapore" /></label></div><label>How can we help?<textarea name="enquiry" required rows={5} placeholder="Tell us about your priorities, timelines or operating environment." /></label><button className="button" type="submit">{sent ? "Email opened" : "Send enquiry"}<Icon name={sent ? "check" : "arrow"} /></button>{sent && <p className="success">Your email app has been opened with your enquiry ready to send.</p>}</form><aside className="contact-side"><div className="office-card"><span className="eyebrow">Singapore office</span><h2>Braddell Road</h2><p><b>ForwardEdge AI Singapore Pte Ltd</b><br />UEN 202551703H</p><p>{companyAddress}</p><p><a href={`mailto:${adminEmail}`}>{adminEmail}</a><br />9:00am - 6:00pm</p><div className="map-grid"><span className="map-pin">SG</span></div></div><div className="contact-note"><Icon name="shield" /><p><b>Security matters?</b><br />For responsible disclosure, contact security@forwardedge.sg</p></div></aside></section></>;
}

function LegalPage({ type }: { type: "privacy" | "terms" }) {
  const privacy = type === "privacy";
  return <><PageHero label={privacy ? "Privacy" : "Terms"} title={privacy ? "Privacy notice" : "Terms of use"} body="Draft - pending client review" /><section className="section container legal-page"><span className="status-label">Draft - pending client review</span>{privacy ? <><h2>Personal data and the PDPA</h2><p>ForwardEdge AI Singapore Pte Ltd manages personal data in accordance with Singapore’s Personal Data Protection Act 2012 (PDPA). We may collect information you provide through enquiries, correspondence and use of this website to respond to requests, administer our operations and meet legal obligations.</p><h3>Use, disclosure and retention</h3><p>We limit collection, use and disclosure to appropriate business purposes, apply reasonable security arrangements and retain personal data only for as long as needed for those purposes or applicable requirements.</p><h3>Cookies</h3><p>Our cookie notice explains how this website may use necessary and analytical cookies, the information they collect and the choices available to visitors.</p><h3>Access, correction and enquiries</h3><p>To request access to or correction of personal data, withdraw consent where applicable, or raise a privacy concern, contact our Data Protection Officer: Vincent Choy at <a href="mailto:vincent@forwardedge.sg">vincent@forwardedge.sg</a>.</p></> : <><h2>Website terms</h2><p>These draft terms govern access to and use of this website operated by ForwardEdge AI Singapore Pte Ltd, UEN 202551703H.</p><h3>Information and availability</h3><p>Website information is provided for general information and may be changed without notice. Product plans, specifications and status descriptions are subject to development and verification.</p><h3>Intellectual property and external sources</h3><p>Content, branding and materials remain the property of their respective owners. Links and third-party mentions are provided for context and do not imply endorsement.</p><h3>Contact</h3><p>Questions about these terms may be sent to <a href={`mailto:${adminEmail}`}>{adminEmail}</a>.</p></>}</section></>;
}

function NotFound() {
  return <section className="not-found"><div className="glitch-grid" /><div><span className="error-code" data-text="404">404</span><span className="eyebrow">Signal not found</span><h1>This route is outside the network.</h1><p>The page may have moved, or the connection was never established.</p><div className="button-row"><ButtonLink to="/">Return home</ButtonLink><ButtonLink to="/radar" secondary>Open Tech Radar</ButtonLink></div></div></section>;
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onChange = () => {
      const next = legacyRoutes[window.location.pathname];
      if (next) {
        window.history.replaceState({}, "", next);
        setPath(next);
      } else setPath(window.location.pathname);
    };
    onChange();
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }, []);
  const page = useMemo(() => {
    if (path === "/") return <Home />;
    if (path === "/about") return <About />;
    if (path === "/products") return <Products />;
    if (path === "/solutions") return <Solutions />;
    if (path === "/asia") return <Asia />;
    if (path === "/radar") return <Radar />;
    if (path === "/pqc-readiness") return <PQC />;
    if (path === "/contact") return <Contact />;
    if (path === "/privacy") return <LegalPage type="privacy" />;
    if (path === "/terms") return <LegalPage type="terms" />;
    return <NotFound />;
  }, [path]);
  return <div className="app"><Header path={path} /><main>{page}</main><Footer /></div>;
}

export default App;


