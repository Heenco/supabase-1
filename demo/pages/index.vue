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
  <div class="min-h-full flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-extrabold mb-4 text-center">
      Welcome to the Nuxt + Supabase Demo
    </h1>
    <p class="text-lg text-center mb-8 max-w-xl">
      This is a demo application showcasing authentication with Supabase and Nuxt. You can sign in using your email, GitHub, or Google account to access your tasks.
    </p>
    <NuxtLink to="/signin">
      <UButton
        label="Sign In"
        color="primary"
        size="lg"
        variant="solid"
      />
    </NuxtLink>
  </div>
</template>
