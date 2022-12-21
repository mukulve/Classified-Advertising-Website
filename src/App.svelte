<script lang="ts">
  import { Router, Link, Route, navigate } from "svelte-navigator";
  import { auth } from "../src/lib/firebase.js";
  import { userStore } from "sveltefire";
  const user = userStore(auth);
  import Loadable from "svelte-loadable";

  import SearchResults from "./lib/SearchResults.svelte";
  import view from "./lib/view.svelte";
  import Categorysearch from "./lib/categorysearch.svelte";

  function search() {
    navigate("/search/" + searchvalue, { replace: true });
  }

  async function SignOut() {
    const { signOut } = await import("firebase/auth");
    signOut(auth);
  }

  let width, searchvalue;

  let sidenavopen = false;
  $: console.log(sidenavopen);
  $: console.log(width);
</script>

<Router>
  {#if sidenavopen}
    <div class="sidenav">
      <button
        class="closebtn"
        on:keypress
        on:click={() => (sidenavopen = !sidenavopen)}
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
          ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
            d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
          /></svg
        ></button
      >
      {#if $user}
        <button on:click={SignOut}>Logout</button>
        <Link to="/account">
          <button>Account</button></Link
        >
        <Link to="/post">
          <button>Post Ad</button></Link
        >
      {:else}
        <Link to="/login">
          <button>Login</button></Link
        >
        <Link to="/post">
          <button>Post Ad</button></Link
        >
      {/if}
    </div>
  {/if}
  {#if width > 800}
    <header>
      <div class="logo">
        <Link to="/"><h1>B&S</h1></Link>
      </div>
      <div class="search">
        <form on:submit|preventDefault={search}>
          <input
            placeholder="Search..."
            bind:value={searchvalue}
            on:change={search}
          />
          <button
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
              ><path
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
              /></svg
            ></button
          >
        </form>
      </div>
      <div class="account">
        {#if $user}
          <button on:click={SignOut}>Logout</button>

          <Link to="/account">
            <button>Account</button></Link
          >
        {:else}
          <Link to="/login">
            <button>Login</button></Link
          >
        {/if}
        <Link to="/post">
          <button style="background-color: var(--tertiary-color); color: white;"
            >Post Ad</button
          ></Link
        >
      </div>
    </header>
  {:else}
    <header>
      <div class="logo">
        <Link to="/"><h1>B&S</h1></Link>
      </div>
      {#if width > 400}
        <div class="account">
          {#if $user}
            <button on:click={SignOut}>Logout</button>

            <Link to="/account">
              <button>Account</button></Link
            >
          {:else}
            <Link to="/login">
              <button>Login</button></Link
            >
          {/if}
          <Link to="/post">
            <button
              style="background-color: var(--tertiary-color); color: white;"
              >Post Ad</button
            ></Link
          >
        </div>
      {:else}
        <div
          class="account"
          on:keypress
          on:click={() => (sidenavopen = !sidenavopen)}
        >
          <button style="background-color: var(--tertiary-color); fill: white;"
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
              ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
              /></svg
            ></button
          >
        </div>
      {/if}
    </header>
    <header>
      <div class="search">
        <form on:submit|preventDefault={search}>
          <input
            placeholder="Search..."
            bind:value={searchvalue}
            on:change={search}
          />
          <button
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
              ><path
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
              /></svg
            ></button
          >
        </form>
      </div>
    </header>
  {/if}
  <nav>
    <Link to="/category/vehicles">Vehicles</Link>
    <Link to="/category/electronics">Electronics</Link>
    <Link to="/category/home">Home Goods</Link>
    <Link to="/category/toys">Toys And Games</Link>
    <Link to="/category/realestate">Realestate</Link>
    <Link to="/category/services">Services</Link>
    <Link to="/category/other">Other</Link>
  </nav>
  <main>
    <Route path="/">
      <Loadable loader={() => import("./lib/Home.svelte")} />
    </Route>
    <Route path="/login">
      <Loadable loader={() => import("./lib/Login.svelte")} />
    </Route>
    <Route path="/account">
      <Loadable loader={() => import("./lib/Account.svelte")} />
    </Route>
    <Route path="/post">
      <Loadable loader={() => import("./lib/Postlisting.svelte")} />
    </Route>
    <Route path="search/*" let:params primary={false}>
      <Route path=":id" component={SearchResults} />
    </Route>
    <Route path="category/*" let:params primary={false}>
      <Route path=":id" component={Categorysearch} />
    </Route>
    <Route path="viewad/*" let:params primary={false}>
      <Route path=":id" component={view} />
    </Route>
  </main>
  <footer>
    <a href="https://github.com/mukulve">
      Made By Mukul Using
      <svg viewBox="0 0 128 128">
        <path
          d="M119.838 16.936C105.553-.076 77.336-5.118 56.942 5.696l-35.829 19c-4.847 2.529-9.006 5.871-12.212 9.814-3.206 3.943-5.387 8.399-6.404 13.083a30.64 30.64 0 00-.688 6.396c.022 5.831 1.74 11.571 5.007 16.73-3.063 3.872-5.154 8.22-6.146 12.782a30.483 30.483 0 00.415 14.412c1.29 4.733 3.702 9.204 7.096 13.152 14.284 17.011 42.564 22.053 62.895 11.24l35.792-19.001c4.844-2.532 8.998-5.878 12.196-9.825 3.197-3.947 5.367-8.407 6.37-13.093.46-2.107.691-4.244.688-6.386-.009-5.82-1.705-11.551-4.945-16.709 3.062-3.869 5.153-8.213 6.147-12.771.444-2.109.67-4.245.676-6.386.002-7.595-2.852-15-8.162-21.178v-.02z"
          fill="#FF3E00"
        /><path
          d="M53.44 112.667a34.23 34.23 0 01-7.16.76c-4.595.001-9.122-.925-13.193-2.7-4.07-1.774-7.563-4.343-10.179-7.487-3.194-3.716-4.91-8.171-4.907-12.74a18.83 18.83 0 01.4-3.833 18.55 18.55 0 01.865-2.782l.676-1.708 1.827 1.156c4.243 2.591 8.984 4.564 14.02 5.834l1.328.333-.125 1.104v.573c-.003 1.381.514 2.73 1.477 3.854.778.958 1.826 1.744 3.052 2.288a9.936 9.936 0 003.983.837 9.923 9.923 0 002.153-.229 8.745 8.745 0 002.204-.802l35.79-19.094c1.073-.566 1.957-1.349 2.568-2.276.61-.927.928-1.968.924-3.026-.01-1.381-.54-2.725-1.515-3.844-.79-.946-1.844-1.718-3.071-2.252a9.997 9.997 0 00-3.977-.81 9.917 9.917 0 00-2.153.23 8.344 8.344 0 00-2.19.801l-13.645 7.25a29.314 29.314 0 01-7.273 2.656c-2.34.502-4.745.758-7.161.76-4.594 0-9.119-.926-13.189-2.698-4.07-1.772-7.564-4.338-10.183-7.478-3.19-3.718-4.906-8.172-4.907-12.74.002-1.285.136-2.567.4-3.833.613-2.816 1.921-5.495 3.844-7.867 1.922-2.373 4.416-4.387 7.323-5.914L67.274 18c2.248-1.19 4.7-2.09 7.273-2.667 2.34-.499 4.745-.75 7.16-.75 4.605-.01 9.144.91 13.228 2.681 4.084 1.77 7.59 4.34 10.219 7.486 3.171 3.727 4.865 8.184 4.845 12.75a18.939 18.939 0 01-.401 3.844 18.529 18.529 0 01-.864 2.781l-.676 1.708-1.827-1.114c-4.24-2.595-8.982-4.568-14.02-5.834l-1.328-.343.125-1.105v-.572c0-1.385-.516-2.735-1.477-3.865-.789-.945-1.84-1.716-3.066-2.25a9.992 9.992 0 00-3.97-.813 9.887 9.887 0 00-2.127.271 8.2 8.2 0 00-2.203.802L42.337 50a7.071 7.071 0 00-2.209 1.79 5.713 5.713 0 00-1.158 2.377 6.057 6.057 0 00-.163 1.104c-.001 1.378.515 2.722 1.477 3.844.788.945 1.84 1.717 3.065 2.25a9.98 9.98 0 003.97.812 9.918 9.918 0 002.153-.23 8.35 8.35 0 002.204-.801l13.67-7.292a29.125 29.125 0 017.273-2.656 34.305 34.305 0 017.16-.76c4.596 0 9.123.925 13.195 2.697 4.072 1.772 7.569 4.339 10.19 7.48 3.19 3.717 4.906 8.171 4.907 12.74.003 1.299-.135 2.596-.413 3.874-.609 2.817-1.917 5.497-3.839 7.87-1.923 2.372-4.418 4.385-7.328 5.911L60.726 110a29.233 29.233 0 01-7.285 2.667z"
          fill="#fff"
        />
      </svg>
      &
      <svg viewBox="0 0 128 128">
        <path
          fill="#f58220"
          d="M27.35 80.52l10.68-68.44c.37-2.33 3.5-2.89 4.6-.8l11.48 21.48-26.76 47.76zm75.94 16.63L93.1 34.11c-.31-1.96-2.76-2.76-4.17-1.35L24.71 97.15l35.54 19.95a7.447 7.447 0 007.18 0l35.86-19.95zm-28.85-55L66.21 26.5c-.92-1.78-3.44-1.78-4.36 0L25.7 90.95l48.74-48.8z"
        />
      </svg>
    </a>

    <a href="https://github.com/mukulve/Classified-Advertising-Website"
      ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"
        ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
          d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
        /></svg
      ></a
    >
  </footer>
</Router>
<svelte:window bind:innerWidth={width} />

<style scoped>
  .sidenav {
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: var(--primary-color);
    overflow-x: hidden;
    transition: 0.5s;
    padding: 3rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: left;
    text-align: left;
    gap: 1.5rem;
  }

  .sidenav button {
    background-color: var(--primary-color);
    font-size: 1.75rem;
    text-align: left;
  }

  .sidenav svg {
    height: 1.75rem;
  }

  .sidenav .closebtn {
    position: absolute;
    top: 15px;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  header {
    height: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header form {
    display: flex;
    align-items: center;
  }

  header .search form button {
    height: 35px;
    padding: 0rem 1rem;
    font-size: 1.2rem;
    border-radius: 0 5px 5px 0;
  }

  header .search form input {
    width: 550px;
    max-width: 40vw;
    height: 35px;
    padding: 0.1rem 0.5rem;
    font-size: 1.2rem;
    border-radius: 5px 0 0 5px;
    outline: none;
  }

  .account button {
    padding: 0rem 1rem;
    height: 35px;
    border-radius: 5px;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    flex-wrap: nowrap;
    flex: 1 0 auto;
    white-space: nowrap;
    overflow-x: scroll;
    gap: 2rem;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 55px;
  }

  @media screen and (max-width: 800px) {
    header .search form input {
      width: 100%;
      max-width: none;
      height: 35px;
      padding: 0.1rem 0.5rem;
      font-size: 1.2rem;
      border-radius: 5px 0 0 5px;
      outline: none;
    }

    form,
    .search {
      position: relative;
      width: 100%;
    }
  }
</style>
