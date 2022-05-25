<style lang="scss">
.loader {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script lang="ts">
import { Router, Route } from 'svelte-navigator';
import { authStore } from '../stores';
import LoginScreen from '../screens/LoginScreen.svelte';
import HomeScreen from '../screens/HomeScreen.svelte';
import Loader from './Loader.svelte';

const { isAuthenticated, getMeStatus } = authStore;
</script>

<Router>
  {#if $isAuthenticated}
    <Route path="/">
      <HomeScreen />
    </Route>
  {:else if $getMeStatus === 'fetching'}
    <Route path="/" primary="{false}">
      <div class="loader">
        <Loader size="4rem" />
      </div>
    </Route>
  {:else}
    <Route path="/" primary="{false}">
      <LoginScreen />
    </Route>
  {/if}
  <Route>404</Route>
</Router>
