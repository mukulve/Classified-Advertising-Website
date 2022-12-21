<script>
  import { userStore } from "sveltefire";
  import { auth, db } from "./firebase";
  import Loadable from "svelte-loadable";
  import { navigate } from "svelte-navigator";
  const user = userStore(auth);

  var image, title, description, category, location, price, contact;

  function imgupload(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      image = reader.result;
    };
    reader.readAsDataURL(file);
  }

  async function postad() {
    const { addDoc, collection } = await import("firebase/firestore");
    if (
      image &&
      title &&
      description &&
      category &&
      location &&
      price &&
      contact != undefined
    ) {
      await addDoc(collection(db, "ads"), {
        title: title.toLowerCase().split(" "),
        description: description,
        tags: [],
        location: location.toLowerCase(),
        price: price.replace("$", ""),
        contact: contact,
        images: image,
        adownerid: $user.uid,
        userid: $user.uid,
        time: new Date().getTime(),
        adid: $user.uid + new Date().getTime(),
        adowner: $user.displayName,
        category: category.toLowerCase(),
      });
      navigate("/", { replace: true });
    } else {
      console.log("some feild empty!");
    }
  }

  $: console.log(image);
</script>

{#if $user}
  <div class="addetails">
    <div class="postrow">
      <h2>Title:</h2>
      <input bind:value={title} />
    </div>
    <div class="postrow">
      <h2>Descripton:</h2>
      <input bind:value={description} />
    </div>
    <div class="postrow">
      <h2>Category:</h2>
      <input bind:value={category} />
    </div>
  </div>
  <div class="media">
    <div class="postrow">
      <h2>Media:</h2>
      {#if image != undefined}
        <img src={image} alt="img uploaded" />
      {/if}
      <label for="file-upload" class="custom-file-upload">Choose Images</label>
      <input id="file-upload" type="file" on:change={imgupload} />
    </div>
  </div>
  <div class="location">
    <div class="postrow">
      <h2>Location:</h2>
      <input bind:value={location} />
    </div>
  </div>
  <div class="price">
    <div class="postrow">
      <h2>Price: (Do Not Include $)</h2>
      <input bind:value={price} />
    </div>
  </div>
  <div class="contact">
    <div class="postrow">
      <h2>Contact Info:</h2>
      <input bind:value={contact} />
    </div>
  </div>
  <button
    on:click={postad}
    style="background-color: var(--tertiary-color); color: white;"
    >Post Ad</button
  >
{:else}
  <Loadable loader={() => import("./Login.svelte")} />
{/if}

<style scoped>
  input[type="file"] {
    display: none;
  }

  button {
    height: 35px;
    padding: 0rem 1rem;
    font-size: 1.2rem;
    border-radius: 5px;
    margin-top: 0.5rem;
  }

  .media img {
    width: fit-content;
    max-height: 35vh;
    object-fit: contain;
    object-position: center;
    border-radius: 5px;
  }

  .postrow {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-shrink: 0;
    margin-top: 0.5rem;
    flex-direction: column;
  }

  input,
  label {
    width: auto;
    height: 35px;
    padding: 0.1rem 0.5rem;
    font-size: 1.2rem;
    border-radius: 5px 0 0 5px;
    outline: none;
    background-color: var(--primary-color);
  }
</style>
