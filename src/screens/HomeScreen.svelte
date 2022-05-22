<script>
  import { useFocus } from "svelte-navigator";
  import Button from "@smui/button";
  import authStore from "../stores/authStore";

  const registerFocus = useFocus();

  const { unauthenticate } = authStore.actions;
</script>

<main class="login-screen" use:registerFocus>
  <Button on:click={unauthenticate}>Logout</Button>
</main>
