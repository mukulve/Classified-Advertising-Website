<script>
  import { useLocation } from "svelte-navigator";

  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";

  const location = useLocation();
  $: $location, searchDB();

  export let id;

  var localadids = [],
    localadowners = [],
    localadownerids = [],
    localcontacts = [],
    localdescriptions = [],
    localadimages = [],
    locallocations = [],
    localprices = [],
    localadtags = [],
    localtimes = [],
    localadtitles = [],
    localuserids = [];

  var doneSearching = false;

  onMount(() => searchDB());

  async function searchDB() {
    const { collection, query, where, getDocs } = await import(
      "firebase/firestore"
    );
    const { db } = await import("./firebase");

    console.log("searching...");
    localadids = [];
    localadowners = [];
    localadownerids = [];
    localcontacts = [];
    localdescriptions = [];
    localadimages = [];
    locallocations = [];
    localprices = [];
    localadtags = [];
    localtimes = [];
    localadtitles = [];
    localuserids = [];

    const findtitle = query(
      collection(db, "ads"),
      where("category", "==", id.toLowerCase())
    );

    const querySnapshot = await getDocs(findtitle);
    querySnapshot.forEach((doc) => {
      const {
        description,
        userid,
        time,
        images,
        adownerid,
        adowner,
        location,
        tags,
        title,
        adid,
        price,
        contact,
      } = doc.data();

      var titletoString = "";
      for (let i = 0; i < title.length; i++) {
        title[i].charAt(0).toUpperCase() + title[i].slice(1);
        titletoString = titletoString + " " + title[i];
      }

      if (localadids.includes(adid) || localadids.length > 10) {
        console.log("Ad Already In Array!");
      } else {
        localadids.push(adid);
        localadowners.push(adowner);
        localadownerids.push(adownerid);
        localcontacts.push(contact);
        localdescriptions.push(description);
        localadimages.push(images);
        locallocations.push(location);
        localprices.push(price);
        localadtags.push(tags);
        localtimes.push(time);
        localadtitles.push(titletoString);
        localuserids.push(userid);
      }

      localadids = localadids;
      localadowners = localadowners;
      localadownerids = localadownerids;
      localcontacts = localcontacts;
      localdescriptions = localdescriptions;
      localadimages = localadimages;
      locallocations = locallocations;
      localprices = localprices;
      localadtags = localadtags;
      localtimes = localtimes;
      localadtitles = localadtitles;
      localuserids = localuserids;
    });
    doneSearching = true;
  }

  async function lowestprice() {
    if (localprices.length == 1) {
      return;
    }
    await searchDB();
    const arr = localprices;
    const min = Math.min(...arr);
    const index = arr.indexOf(min.toString());
    console.log(min, index);

    for (let i = 0; i < localadids.length; i++) {
      if (i != index) {
        localadids[i] = null;
        localadowners[i] = null;
        localadownerids[i] = null;
        localcontacts[i] = null;
        localdescriptions[i] = null;
        localadimages[i] = null;
        locallocations[i] = null;
        localprices[i] = null;
        localadtags[i] = null;
        localtimes[i] = null;
        localadtitles[i] = null;
        localuserids[i] = null;
      }

      localadids = localadids;
      localadowners = localadowners;
      localadownerids = localadownerids;
      localcontacts = localcontacts;
      localdescriptions = localdescriptions;
      localadimages = localadimages;
      locallocations = locallocations;
      localprices = localprices;
      localadtags = localadtags;
      localtimes = localtimes;
      localadtitles = localadtitles;
      localuserids = localuserids;
    }
  }

  async function highestprice() {
    if (localprices.length == 1) {
      return;
    }
    await searchDB();
    const arr = localprices;
    console.log(arr);
    const max = Math.max(...arr);
    const index = arr.indexOf(max.toString());
    console.log(max, index);

    for (let i = 0; i < localadids.length; i++) {
      if (i != index) {
        localadids[i] = null;
        localadowners[i] = null;
        localadownerids[i] = null;
        localcontacts[i] = null;
        localdescriptions[i] = null;
        localadimages[i] = null;
        locallocations[i] = null;
        localprices[i] = null;
        localadtags[i] = null;
        localtimes[i] = null;
        localadtitles[i] = null;
        localuserids[i] = null;
      }

      localadids = localadids;
      localadowners = localadowners;
      localadownerids = localadownerids;
      localcontacts = localcontacts;
      localdescriptions = localdescriptions;
      localadimages = localadimages;
      locallocations = locallocations;
      localprices = localprices;
      localadtags = localadtags;
      localtimes = localtimes;
      localadtitles = localadtitles;
      localuserids = localuserids;
    }
  }

  let filteropen = false;
  $: console.log(filteropen);

  let width;
</script>

<div class="searchpage">
  {#if width > 1000}
    <div class="filters">
      <h1>Filters</h1>
      <button on:click={lowestprice}>Lowest Price</button>
      <button on:click={highestprice}>Highest Price </button>
      <button on:click={searchDB}>Clear Filters</button>
    </div>
  {:else}
    <div
      class="filtersmobile"
      on:keypress
      on:click={() => (filteropen = !filteropen)}
    >
      <h2>
        Filters
        {#if filteropen != true}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
            ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
              d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
            /></svg
          >
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
            ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
              d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
            /></svg
          >
        {/if}
      </h2>
      {#if filteropen == true}
        <button on:click={lowestprice}>Lowest Price</button>
        <button on:click={highestprice}>Highest Price </button>
        <button on:click={searchDB}>Clear Filters</button>
      {/if}
    </div>
  {/if}
  {#if doneSearching}
    <div class="results">
      <h1>Results For {id.charAt(0).toUpperCase() + id.slice(1)}</h1>
      {#each localadids as adid, index}
        {#if localadids[index] != null}
          <Link to={"/viewad/" + localadids[index]}>
            <div class="result">
              <div class="resultleft">
                <img src={localadimages[index]} alt="ad img" />
              </div>
              <div class="resultright">
                <div class="resultrow">
                  <h2>{localadtitles[index]}</h2>
                  <h2>$ {localprices[index]}</h2>
                </div>
                <div class="resultrow">
                  <h4>
                    {locallocations[index]} | {new Date(localtimes[index])
                      .toString()
                      .split("GMT")[0]}
                  </h4>
                </div>
                <div class="resultrow">
                  <h3>Descripton : {localdescriptions[index]}</h3>
                </div>
              </div>
            </div>
          </Link>
        {/if}
      {/each}
    </div>
  {:else}
    <h1>Loading ...</h1>
  {/if}
</div>
<svelte:window bind:innerWidth={width} />

<style scoped>
  .results {
    display: flex;
    flex-direction: column;
  }

  .resultrow,
  .searchpage {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-shrink: 0;
    margin-top: 0.5rem;
  }

  .resultleft {
    width: 25%;
    background-color: var(--primary-color);
  }

  .filtersmobile {
    background-color: var(--primary-color);
    border-radius: 5px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .filtersmobile h2 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--color);
  }

  .filtersmobile button {
    width: 100%;
    text-align: left;
    font-size: 1.25rem;
    background-color: var(--primary-color);
  }

  .filters {
    width: 25%;
    background-color: var(--primary-color);
    border-radius: 5px;
    padding: 0.5rem;
    min-height: calc(100vh - 165px - 0.5rem);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .filters button {
    text-align: left;
    font-size: 1.25rem;
    background-color: var(--primary-color);
  }

  .filtersmobile {
    background-color: var(--primary-color);
    padding: 0.5rem;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .results {
    width: 75%;
  }

  .resultright {
    width: 75%;
    background-color: var(--primary-color);
  }

  .result {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--primary-color);
    border-radius: 5px;
    margin-top: 1rem;
  }

  .result img {
    width: 200px;
    height: 200px;
    max-height: 20vh;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
  }

  @media screen and (max-width: 1400px) {
    .resultleft {
      width: 35%;
    }

    .resultright {
      width: 65%;
    }
  }

  @media screen and (max-width: 1000px) {
    .searchpage {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      gap: 1rem;
      flex-shrink: 0;
      margin-top: 0.5rem;
    }

    .results {
      width: 100%;
    }

    .resultleft {
      width: 30%;
    }

    .resultright {
      width: 70%;
    }
  }

  @media screen and (max-width: 700px) {
    .resultleft {
      width: 40%;
    }

    .resultright {
      width: 60%;
    }
  }

  @media screen and (max-width: 600px) {
    .resultleft {
      width: 100%;
      background-color: var(--primary-color);
    }

    .resultright {
      width: 100%;
      background-color: var(--primary-color);
    }

    .result {
      display: flex;
      flex-direction: column;
    }

    .result img {
      width: 100%;
      height: 200px;
      max-height: 20vh;
      object-fit: cover;
      object-position: center;
      border-radius: 5px;
    }
  }
</style>
