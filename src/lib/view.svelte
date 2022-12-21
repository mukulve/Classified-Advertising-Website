<script>
  import { useLocation } from "svelte-navigator";
  import { collection, query, where, getDocs } from "firebase/firestore";
  import { db } from "./firebase";
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";
  import "mapbox-gl/dist/mapbox-gl.css";

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

  onMount(() => searchDB());

  async function searchDB() {
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

    const findtitle = query(collection(db, "ads"), where("adid", "==", id));

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
        return;
      }

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
  }

  $: if (locallocations[0] != undefined) {
    mapbox();
  }

  async function mapbox() {
    const options = {
      method: "GET",
    };
    var url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      locallocations[0] +
      ".json?access_token=pk.eyJ1IjoiZG9pbmd0aGVnb29kIiwiYSI6ImNsNno4YTIwZjAxdW8zdm1xemFlYWg2bnkifQ.URsY8wmTg76N32qj58PajA";
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        const { center } = data.features[0];
        console.log(center);

        mapboxgl.accessToken =
          "pk.eyJ1IjoiZG9pbmd0aGVnb29kIiwiYSI6ImNsNno4YTIwZjAxdW8zdm1xemFlYWg2bnkifQ.URsY8wmTg76N32qj58PajA";
        const map = new mapboxgl.Map({
          container: "map", // container ID
          style: "mapbox://styles/mapbox/streets-v12", // style URL
          center: center, // starting position [lng, lat]
          zoom: 12, // starting zoom
        });
        const marker = new mapboxgl.Marker().setLngLat(center).addTo(map);
      });
  }
</script>

<div class="listing">
  <div class="listingleft">
    <h1>{localadtitles[0]}</h1>
    <img src={localadimages[0]} alt="img" />
    <h2>Price : ${localprices[0]}</h2>
    <h2>Description : {localdescriptions[0]}</h2>
  </div>

  <div class="listingright">
    <div id="map" />
    <div class="details">
      <h2>Location : {locallocations[0]}</h2>
      <h2>Contact : {localcontacts[0]}</h2>
      <h2>Listed By : {localadowners[0]}</h2>
      <h2>
        Date Posted : {new Date(localtimes[0]).toString().split("GMT")[0]}
      </h2>
    </div>
  </div>
</div>

<style scoped>
  #map {
    position: relative;
    height: 200px;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 1rem;
  }

  .listing {
    display: flex;
    align-items: center;
  }

  .listingleft {
    width: 70%;
  }

  .listingleft img {
    width: 75%;
    height: 45vh;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .listingright {
    width: 30%;
  }

  @media screen and (max-width: 1000px) {
    .listing {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .listingleft {
      width: 100%;
    }

    .listingright {
      margin-top: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column-reverse;
      gap: 1rem;
    }

    #map {
      position: relative;
      height: 200px;
      width: 100%;
      border-radius: 5px;
      margin-bottom: 1rem;
    }

    .listingleft img {
      width: 100%;
      height: 45vh;
      object-fit: cover;
      object-position: center;
      border-radius: 5px;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }
  }
</style>
