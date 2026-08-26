/* Signal Blue: shared editorial shell with compact navigation, strong blue CTA, and generous whitespace. */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const links = [
  ["Beranda", "/"],
  ["Paket VPS", "/paket"],
  ["Kenapa kami", "/tentang-kami"],
  ["Cara order", "/kontak"],
] as const;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container nav-inner">
          <Link href="/" className="brand" onClick={() => setOpen(false)}>
            <img src="/manus-storage/vps-addon-logo_754bc77b.png" alt="Logo VPS Addon" title="VPS Addon" className="brand-mark" width="32" height="32" />
            <span><strong>VPS</strong><em>/ ADDON</em></span>
          </Link>
          <nav className="desktop-nav" aria-label="Navigasi utama">
            {links.map(([label, href]) => <Link key={href} href={href} className={location === href ? "active" : ""}>{label}</Link>)}
          </nav>
          <Link href="/kontak" className="nav-cta">Tanya tim <ArrowUpRight size={16} /></Link>
          <button className={`menu-trigger ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)} aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open}><span /><span /><span /></button>
        </div>
        <nav className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Navigasi mobile" aria-hidden={!open}>{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={location === href ? "active" : ""}>{label}</Link>)}<Link href="/kontak" className="mobile-cta" onClick={() => setOpen(false)}>Tanya tim <ArrowUpRight size={16} /></Link></nav>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div><Link href="/" className="brand footer-brand"><img src="/manus-storage/vps-addon-logo_754bc77b.png" alt="Logo VPS Addon" title="VPS Addon" className="brand-mark" width="32" height="32" /><span><strong>VPS</strong><em>/ ADDON</em></span></Link><p className="footer-copy">Resource tambahan yang jelas, cepat, dan siap menemani website kamu tumbuh.</p></div>
          <div><p className="footer-label">Jelajahi</p><div className="footer-links"><Link href="/paket">Paket VPS</Link><Link href="/tentang-kami">Kenapa kami</Link><Link href="/kontak">Cara order</Link></div></div>
          <div><p className="footer-label">Hubungi langsung</p><div className="footer-links"><a href="https://wa.me/6281511367150"><MessageCircle size={16}/> WhatsApp tim</a><a href="mailto:halo@vpsaddon.id">halo@vpsaddon.id</a></div></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 VPS Addon. Bagian dari layanan web kami.</span><span>Server berlokasi di Indonesia</span></div>
      </footer>
    </div>
  );
}
