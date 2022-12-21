<script>
  import { userStore } from "sveltefire";
  import { auth } from "./firebase";

  import { onMount } from "svelte";
  import Login from "./Login.svelte";
  const user = userStore(auth);

  console.log($user);

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
      where("userid", "==", $user.uid)
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

      if (localadids.includes(adid)) {
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

  $: console.log(doneSearching);

  let width;

  async function deletead(adtodelete) {
    const { deleteDoc, collection, query, where, getDocs } = await import(
      "firebase/firestore"
    );
    const { db } = await import("./firebase");

    const q = query(collection(db, "ads"), where("adid", "==", adtodelete));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    searchDB();
  }
</script>

{#if $user}
  <div class="accountinfo">
    <img src={$user.photoURL} alt="user img" />
    <h1>{$user.displayName}</h1>
  </div>
  {#if doneSearching}
    <div class="results">
      <h1>Your Active Ads</h1>
      {#each localadids as adid, index}
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
          {#if width > 700}
            <button on:click={() => deletead(localadids[index])}
              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                /></svg
              ></button
            >
          {:else}
            <button on:click={() => deletead(localadids[index])}
              >Delete Ad</button
            >
          {/if}
        </div>
      {/each}
    </div>
  {:else}
    <h1>Loading ...</h1>
  {/if}
{:else}
  <Login />
{/if}

<svelte:window bind:innerWidth={width} />

<style scoped>
  .accountinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2.5rem;
    gap: 1rem;
  }
  .accountinfo img {
    height: 150px;
    border-radius: 50%;
  }

  .results {
    display: flex;
    flex-direction: column;
  }

  .resultrow {
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

  .results {
    width: 100%;
  }

  .resultright {
    width: 70%;
    background-color: var(--primary-color);
  }

  button {
    width: 5%;
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
    width: 100%;
    height: 200px;
    max-height: 20vh;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
  }

  @media screen and (max-width: 700px) {
    .resultleft,
    .resultright,
    button {
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

  @media screen and (max-width: 200px) {
    .accountinfo img {
      height: 80vw;
      border-radius: 50%;
    }
  }
</style>
