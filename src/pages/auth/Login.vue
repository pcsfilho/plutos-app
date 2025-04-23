<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">Log in</h1>
    <p class="text-base mb-4 leading-5">
      Novo por aqui?
      <RouterLink :to="{ name: 'signup' }" class="font-semibold text-primary"
        >Registrar-se</RouterLink
      >
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[validators.required, validators.email]"
      class="mb-4"
      label="E-mail"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="Senha"
        @clickAppendInner.stop="
          isPasswordVisible.value = !isPasswordVisible.value
        "
      >
        <template #appendInner>
          <VaIcon
            :name="
              isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'
            "
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div
      class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between"
    >
      <VaCheckbox
        v-model="formData.keepLoggedIn"
        class="mb-2 sm:mb-0"
        label="Mantenha-me Logado neste dispositivo"
      />
    </div>

    <div
      class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between"
    >
      <RouterLink
        :to="{ name: 'recover-password' }"
        class="mt-3 sm:mt-3 sm:ml-0 font-semibold text-primary"
      >
        Esqueceu a Senha?
      </RouterLink>
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit"> Login</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useForm, useToast } from "vuestic-ui";
import { validators } from "../../services/utils";
import { login } from "../../services/auth"; // ← importar o serviço criado anteriormente

const { validate } = useForm("form");
const router = useRouter();
const toast = useToast();

const formData = reactive({
  email: "",
  password: "",
  keepLoggedIn: false,
});

const submit = async () => {
  const isValid = validate();
  if (!isValid) return;

  try {
    const res = await login(formData.email, formData.password);
    localStorage.setItem("token", res.data.access_token);

    toast.init({ message: "Login realizado com sucesso!", color: "success" });

    router.push({ name: "dashboard" }); // redireciona após login
  } catch (err: any) {
    toast.init({
      message: err.response?.data?.message || "Erro ao fazer login.",
      color: "danger",
    });
  }
};
</script>
