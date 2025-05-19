<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

watchEffect(() => {
  if (user.value) {
    navigateTo('/tasks')
  }
})

// Email/password state and handler
const email = ref('')
const password = ref('')

async function handleEmailSignIn() {
  const { error } = await auth.signInWithPassword({ email: email.value, password: password.value })
  if (error) {
    // You can show a toast or error message here
    alert(error.message)
  }
}
</script>

<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <h2 class="my-6 text-center text-3xl font-extrabold">
      Sign in to your account
    </h2>
    <LoginCard>
      <form @submit.prevent="handleEmailSignIn">
        <UInput
          v-model="email"
          class="mb-2"
          type="email"
          placeholder="Email"
          required
        />
        <UInput
          v-model="password"
          class="mb-2"
          type="password"
          placeholder="Password"
          required
        />
        <UButton
          class="mb-4"
          block
          label="Sign in with Email"
          color="primary"
          variant="solid"
          type="submit"
        />
      </form>
      <UButton
        class="mt-3"
        icon="i-mdi-github"
        block
        label="Github"
        color="gray"
        variant="solid"
        @click="auth.signInWithOAuth({ provider: 'github', options: { redirectTo } })"
      />
      <UButton
        class="mt-3"
        icon="i-mdi-google"
        block
        label="Google"
        color="gray"
        variant="solid"
        @click="auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })"
      />
    </LoginCard>
  </div>
</template>
