<script setup lang="ts">
import Button from '@/components/Button.vue';
import type GlobalState from '@/ts/GlobalState';
import { inject, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

const state: Ref<GlobalState> = inject("state") as Ref<GlobalState>;

const { t } = useI18n({
  useScope: "local",
  messages: {
    en: {
      officeOfTheRegistrar: "OFFICE OF THE REGISTRAR",
      chulalongkornUniversity: "Chulalongkorn University",
      studentIdFormLabel: "Student ID",
      studentIdFormPlaceholder: "Enter Student ID...",
      passwordFormLabel: "Password",
      passwordFormPlaceholder: "Enter Password...",
      loginButtonText: "Login",
      forgotPasswordText: "Forgot password?"
    },
    th: {
      officeOfTheRegistrar: "สำนักงานการทะเบียน",
      chulalongkornUniversity: "จุฬาลงกรณ์มหาวิทยาลัย",
      studentIdFormLabel: "REPLACE ME",
      studentIdFormPlaceholder: "REPLACE ME",
      passwordFormLabel: "REPLACE ME",
      passwordFormPlaceholder: "REPLACE ME",
      loginButtonText: "REPLACE ME",
      forgotPasswordText: "REPLACE ME"
    },
  }
})

function login(){
  state.value.loggedIn = !state.value.loggedIn;
  console.log(state);
}
</script>

<template>
  <section class="flex flex-col items-center">
    <img
      src="/images/chula-logo-colored.svg"
      class="w-15 my-5"
    />
    <h1 class="font-chulalongkorn text-primary font-bold text-2xl">{{ t('officeOfTheRegistrar') }}</h1>
    <p class="font-chulalongkorn text-xl text-text ">{{ t('chulalongkornUniversity') }}</p>
  </section>
  <form @submit.prevent="login" class="flex items-center justify-center-safe gap-2 mt-3 flex-col">
    <!-- inputs -->
    <div>
      <label for="email" class="text-text-muted font-bold">
      {{ t('studentIdFormLabel') }}:
      </label>
      <input
        type="text"
        id="email"
        class="border border-separator rounded-md py-1 px-2 ml-1"
        :placeholder="t('studentIdFormPlaceholder')"
      />
    </div>
    <div>
      <label for="password" class="text-text-muted font-bold">
        {{ t('passwordFormLabel') }}:
      </label>
      <input
        type="text"
        id="password"
        class="border border-separator rounded-md py-1 px-2 ml-1"
        :placeholder="t('passwordFormPlaceholder')"
      />
    </div>
    
    <a class="text-blue-500 underline", href="#"> {{t('forgotPasswordText')}} </a>
    
    <!-- fake captcha -->
     <div class="border-2 border-gray-200 rounded-md w-[200px] h-[60px] flex items-center p-2 bg-[#f9f9f9]">
      <input type="checkbox"></input>
      <p class="ml-2 text-[12px]">I'm not a robot</p>
     </div>
    <Button type="submit" >{{ t('loginButtonText') }}</Button>
  </form>
</template>