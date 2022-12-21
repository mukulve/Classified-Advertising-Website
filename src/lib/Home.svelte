<script>
  import { useLocation } from "svelte-navigator";

  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";

  const location = useLocation();
  $: $location, searchDB();

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
    const { collection, query, getDocs } = await import("firebase/firestore");
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

    const findtitle = query(collection(db, "ads"));

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
</script>

<h1>Recently Posted Ads</h1>
{#if doneSearching}
  <div class="results">
    {#each localadids as adid, index}
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
    {/each}
  </div>
{:else}
  <h1>Loading ...</h1>
{/if}

<style scoped>
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
    width: 100%;
    height: 200px;
    max-height: 20vh;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
  }

  @media screen and (max-width: 600px) {
    .resultleft {
      width: 35%;
    }

    .resultright {
      width: 65%;
    }
  }

  @media screen and (max-width: 450px) {
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
