<script lang="ts">
  import { auth } from "./firebase.js";
  import { userStore } from "sveltefire";
  import { navigate } from "svelte-navigator";
  const user = userStore(auth);

  async function SignIn() {
    const { signInWithPopup, GoogleAuthProvider } = await import(
      "firebase/auth"
    );
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  $: if ($user) {
    navigate("/", { replace: true });
  }
</script>

<div class="loginpage">
  <div class="login">
    <h1>Login</h1>
    <button on:click={SignIn}
      ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"
        ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        /></svg
      > Login With Google</button
    >
  </div>
  <div class="why">
    <h1>Why Sign Up?</h1>
    <h4>
      Register now to post, edit, and manage ads. It’s quick, easy, and free!
    </h4>
  </div>
</div>

<style scoped>
  .loginpage {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 60vh;
    padding: 0rem 3rem;
  }

  .login,
  .why {
    display: flex;
    flex-direction: column;
    gap: 3vh;
    width: 50%;
  }

  .loginpage button {
    font-size: 1.5rem;
    text-align: left;
    width: fit-content;
    padding: 0.5rem 0rem;
  }

  .loginpage h4,
  .loginpage button {
    font-weight: 500;
  }

  @media screen and (max-width: 700px) {
    .loginpage {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 0rem 0rem;
    }

    .login,
    .why {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
</style>
