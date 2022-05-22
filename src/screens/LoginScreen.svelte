<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import Card from "@smui/card";
  import Button from "@smui/Button";

  import Loader from "../components/Loader.svelte";

  import authStore from "../stores/authStore";

  import { INVALID_EMAIL, REQUIRED_FIELD } from "../constants/messages";

  const { authenticateStatus } = authStore.state;
  const { authenticate } = authStore.actions;

  const { form, errors, handleSubmit, validateField } = createForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email(INVALID_EMAIL).required(REQUIRED_FIELD),
      password: yup.string().required(REQUIRED_FIELD),
    }),
    onSubmit: authenticate,
  });
</script>

<main class="login-screen">
  <div class="login-screen__content">
    <Card>
      <form
        class="login-form"
        class:error={$authenticateStatus === "error"}
        on:submit={handleSubmit}
      >
        <div class="login-form__header">
          <h3>Svelte TypeScript Boilerplate</h3>
        </div>

        <div class="login-form__content">
          <div class="login-form__field">
            <Textfield
              id="email"
              name="email"
              label="E-mail"
              variant="standard"
              input$autofocus
              invalid={!!$errors.email}
              bind:value={$form.email}
              on:blur={() => !!$form.email?.length && validateField("email")}
            >
              <HelperText slot="helper" persistent>{$errors.email}</HelperText>
            </Textfield>
          </div>

          <div class="login-form__field">
            <Textfield
              id="password"
              name="password"
              label="Senha"
              variant="standard"
              type="password"
              invalid={!!$errors.password}
              bind:value={$form.password}
              on:blur={() =>
                !!$form.password?.length && validateField("password")}
            >
              <HelperText slot="helper" persistent>
                {$errors.password}
              </HelperText>
            </Textfield>
          </div>

          <Button variant="raised" type="submit">
            {#if $authenticateStatus === "fetching"}
              <Loader color="#fff" />
            {:else}
              Login
            {/if}
          </Button>
        </div>
      </form>
    </Card>
  </div>
</main>

<style lang="scss">
  $bp: 1024px;

  .login-screen {
    min-height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;

    &__content {
      padding: 3rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      background-color: rgba(0, 0, 0, 0.5);
    }

    &__top {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-bottom: 4.5rem;
      max-width: 64rem;

      @media screen and(min-width: $bp) {
        justify-content: space-between;
      }

      img {
        max-width: 9.125rem;
        display: none;

        @media screen and(min-width: $bp) {
          display: initial;
        }
      }
    }

    &__logo {
      img {
        max-width: 23.5rem;
        display: initial;
        width: 100%;

        @media screen and(min-width: $bp) {
          max-width: 18.75rem;
        }
      }
    }

    :global(.mdc-card) {
      width: 100%;
      max-width: 26.25rem;
      overflow: hidden;
    }

    .login-form {
      display: flex;
      flex-direction: column;

      &__header {
        padding: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
          font-size: 1.375rem;
          font-weight: 400;
          color: var(--gray-200);
        }

        &__icon {
          display: flex;
        }
      }

      &__content {
        padding: 1.5rem;
        background-color: var(--gray-100);

        :global(.mdc-text-field) {
          width: 100%;
        }

        :global(.mdc-text-field input:-webkit-autofill) {
          box-shadow: 0 0 0 2rem var(--gray-100) inset;
          -webkit-box-shadow: 0 0 0 2rem var(--gray-100) inset;
        }

        :global(.mdc-button) {
          width: 100%;
        }
      }

      &__field {
        margin-bottom: 1rem;
        width: 100%;
      }

      &.error {
        .login-form {
          &__message {
            &.error {
              color: var(--mdc-theme-error);
              padding: 0 1.5rem 0.35rem;
            }
          }
        }
      }
    }
  }
</style>
