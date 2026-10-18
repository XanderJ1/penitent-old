<script lang="ts">
  const image = '/images/photo-1660486044177-45cd45bb5e99.jpg';
</script>

<section class="street-hero" aria-labelledby="street-title">
  <img
    class="campaign-photo"
    src={image}
    alt="PENITENT Chapter 01 — everyday streetwear campaign"
    fetchpriority="high"
    width="1200"
    height="1800"
  />
  <div class="hero-copy">
    <div>
      <p>FW26 — Collection 01</p>
      <h1 id="street-title">Built for the <em>street</em></h1>
    </div>
    <a href="#campaign-title">Discover </a>
  </div>
</section>

<style>
  .street-hero {
    position: relative;
    height: 100svh;
    min-height: 560px;
    overflow: hidden;
    background: #161616;
    color: #f2efe9;
  }
  .street-hero::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(180deg, #0008, transparent 30%, #000c);
  }
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 20%;
  }
  .campaign-photo {
    animation: reveal-photo 2.4s cubic-bezier(.2,.7,.1,1) both;
  }
  .hero-copy {
    position: absolute;
    z-index: 1;
    inset: auto 0 0;
    padding: 36px 32px max(36px, env(safe-area-inset-bottom));
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    animation: reveal-copy 1.2s .2s both;
  }
  .hero-copy p {
    margin-bottom: 12px;
    font-size: 11px;
    letter-spacing: .3em;
    text-transform: uppercase;
  }
  h1 {
    font-family: 'Anton', Impact, 'Arial Narrow', sans-serif;
    font-size: clamp(34px, 6vw, 84px);
    font-weight: 400;
    line-height: 1;
    letter-spacing: -.025em;
    text-transform: uppercase;
  }
  em {
    font: inherit;
    color: #ff3b1f;
  }
  a {
    display: inline-flex;
    align-items: center;
    gap: 20px;
    min-height: 44px;
    border-bottom: 1px solid currentColor;
    font-size: 11px;
    letter-spacing: .26em;
    text-transform: uppercase;
    white-space: nowrap;
    transition: color .2s;
  }
  a:hover { color: #ff795f; text-decoration: none; }
  a:focus-visible { outline: 2px solid #fff; outline-offset: 6px; }
  @media (max-width: 760px) {
    .hero-copy { padding-inline: 20px; flex-direction: column; align-items: flex-start; gap: 14px; }
  }
  @keyframes reveal-photo {
    from { opacity: 0; transform: scale(1.06); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes reveal-copy {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .campaign-photo, .hero-copy { animation: none; }
    a { transition: none; }
  }
</style>
