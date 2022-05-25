<script>
import { useFocus } from 'svelte-navigator';
import Button from '@smui/button';
import { authStore } from '../stores';

const registerFocus = useFocus();

const { unauthenticate } = authStore;
</script>

<main class="login-screen" use:registerFocus>
  <Button on:click="{unauthenticate}">Logout</Button>
</main>
