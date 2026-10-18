<script lang="ts">
  import { page } from '$app/state';
  import HeaderActions from './HeaderActions.svelte';
  import Navigation from './Navigation.svelte';
  let menu = $state(false);
</script>

<header class:home-header={page.url.pathname === '/'}>
  <button
    class="menu-toggle"
    aria-expanded={menu}
    aria-controls="mobile-nav"
    onclick={() => (menu = !menu)}
    ><span aria-hidden="true">{menu ? '−' : '+'}</span>
    {menu ? 'Close' : 'Menu'}</button
  >
  <a class="wordmark" href="/" aria-label="Penitent home">PENITENT</a>
  <nav class="desktop-nav" aria-label="Main navigation">
    <a href="/shop" class:active={page.url.pathname === '/shop'}>Shop</a><a
      href="/collections/becoming">Chapter 01</a
    ><a href="/story">Our story</a>
  </nav>
  <div class="utility"><HeaderActions /></div>
</header>

{#if menu}<Navigation
    onselect={() => {
      menu = false;
    }}
  />{/if}

<style>
  header.home-header {
    position: absolute;
    inset: 0 0 auto;
    grid-template-columns: 1fr auto 1fr;
    background: transparent;
    color: #fff;
  }
  .home-header .wordmark {
    display: block;
    grid-column: 2;
    grid-row: 1;
    letter-spacing: .18em;
    font-family: 'Anton', Impact, sans-serif;
    font-weight: 400;
  }
  .home-header .menu-toggle { grid-column: 1; grid-row: 1; color: inherit; }
  .home-header .utility { grid-column: 3; grid-row: 1; }
  .home-header .desktop-nav { display: none; }
  @media (max-width: 650px) {
    header.home-header { grid-template-columns: auto 1fr auto; gap: 4px; padding-inline: 12px; }
    .home-header .wordmark { font-size: 17px; letter-spacing: .06em; justify-self: center; }
  }
  .home-header a:focus-visible,
  .home-header button:focus-visible { outline-color: #fff; }
</style>
