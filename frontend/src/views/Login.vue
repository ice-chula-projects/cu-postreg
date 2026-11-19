<script setup lang="ts">
import Button from '@/components/Button.vue';
import router from '@/router';
import { state } from '@/ts/GlobalState';
import { inject, reactive, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

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

const formData = reactive({
  studentId: "",
  password: "",
  captcha: false
})

const isCaptchaError = ref(false);
const isStudentIdError = ref(false);
const studentIdErrorText = ref("");
const isPasswordError = ref(false);
const passwordErrorText = ref("");



function onForgetPassword(){
  alert("this feature is not implemented");
}

function validateForm(): boolean{
  isCaptchaError.value = false;

  studentIdErrorText.value = "";
  passwordErrorText.value = "";

  if (!formData.captcha){
    isCaptchaError.value = true;
  }

  if (/[^0-9]/gi.test(formData.studentId)) {
    studentIdErrorText.value = "Student id must only contain digits";
  }
  else if (formData.studentId.length != 10) {
    studentIdErrorText.value = "Student id must be exactly 10 characters long";
  }

  if(formData.password.length <= 0){
    passwordErrorText.value = "Please enter a password";
  }
  
  isStudentIdError.value = studentIdErrorText.value != "";
  isPasswordError.value = passwordErrorText.value != "";

  return !(isCaptchaError.value || isStudentIdError.value);
}

function login(){
  if(!validateForm()) return;

  state.value.loggedIn = true;
  state.value.id = formData.studentId;
  router.push("/")
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
      <label for="studentId" class="text-text-muted font-bold">
      {{ t('studentIdFormLabel') }}:
      </label>
      <input
        type="text"
        id="studentId"
        class="border border-separator rounded-md py-1 px-2 ml-1"
        :placeholder="t('studentIdFormPlaceholder')"
        v-model="formData.studentId"
      />
      <p class="text-red-600 text-xs" v-if="isStudentIdError">{{ studentIdErrorText }}</p>
    </div>
    <div>
      <label for="password" class="text-text-muted font-bold">
        {{ t('passwordFormLabel') }}:
      </label>
      <input
        type="password"
        id="password"
        class="border border-separator rounded-md py-1 px-2 ml-1"
        :placeholder="t('passwordFormPlaceholder')"
        v-model="formData.password"
        />
      <p class="text-red-600 text-xs" v-if="isPasswordError">{{ passwordErrorText }}</p>
    </div>
    
    <a class="text-blue-500 underline" href="#" @click="onForgetPassword"> {{t('forgotPasswordText')}} </a>
    <!-- fake captcha -->
     <div class="border-2 border-gray-200 rounded-md w-[200px] h-[60px] flex items-center p-2 bg-[#f9f9f9]" :class="{'border-red-300': isCaptchaError}">
      <input type="checkbox" v-model="formData.captcha"></input>
      <p class="ml-2 text-[12px]">I'm not a robot</p>
      <img src="/images/reCaptcha Logo.png" class="h-full ml-auto"></img>
     </div>
    <Button type="submit" >{{ t('loginButtonText') }}</Button>
  </form>
</template>