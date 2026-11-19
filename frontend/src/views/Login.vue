<script setup lang="ts">
import Button from '@/components/Button.vue';
import router from '@/router';
import { state } from '@/ts/GlobalState';
import { inject, reactive, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

enum ErrorTextId{
  studentIdContainsNonNumeric,
  studentIdMustBe10Long,
  passwordMustBeEntered
}

const { t } = useI18n({
  useScope: "local",
  messages: {
    en: {
      studentIdFormLabel: "Student ID",
      studentIdFormPlaceholder: "Enter Student ID...",
      passwordFormLabel: "Password",
      passwordFormPlaceholder: "Enter Password...",
      loginButtonText: "Login",
      forgotPasswordText: "Forgot password?",
      errorText:{
        [ErrorTextId.studentIdContainsNonNumeric]: "Student id must only contain digits",
        [ErrorTextId.studentIdMustBe10Long]: "Student id must be exactly 10 characters long",
        [ErrorTextId.passwordMustBeEntered]: "Please enter a password"
      }
    },
    th: {
      studentIdFormLabel: "รหัสนิสิต",
      studentIdFormPlaceholder: "กรอกรหัสนิสิต...",
      passwordFormLabel: "รหัสผ่าน",
      passwordFormPlaceholder: "กรอกรหัสผ่าน...",
      loginButtonText: "เข้าสู่ระบบ",
      forgotPasswordText: "ลืมรหัสผ่าน?",
      errorText:{
        [ErrorTextId.studentIdContainsNonNumeric]: "รหัสนิสิตต้องมีเฉพาะตัวเลข",
        [ErrorTextId.studentIdMustBe10Long]: "รหัสนิสิตต้องมี 10 หลัก",
        [ErrorTextId.passwordMustBeEntered]: "รหัสผ่านต้องกรอก"
      }
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
const studentIdErrorTextId = ref<ErrorTextId | null>(null);
const isPasswordError = ref(false);
const passwordErrorTextId = ref<ErrorTextId | null>(null);



function onForgetPassword(){
  alert("this feature is not implemented");
}

function validateForm(): boolean{
  isCaptchaError.value = false;

  studentIdErrorTextId.value = null;
  passwordErrorTextId.value = null;

  if (!formData.captcha){
    isCaptchaError.value = true;
  }

  if (/[^0-9]/gi.test(formData.studentId)) {
    studentIdErrorTextId.value = ErrorTextId.studentIdContainsNonNumeric;
  }
  else if (formData.studentId.length != 10) {
    studentIdErrorTextId.value = ErrorTextId.studentIdMustBe10Long;
  }

  if(formData.password.length <= 0){
    passwordErrorTextId.value = ErrorTextId.passwordMustBeEntered;
  }

  isStudentIdError.value = studentIdErrorTextId.value != null;
  isPasswordError.value = passwordErrorTextId.value != null;

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
      <p class="text-red-600 text-xs" v-if="isStudentIdError">{{ t("errorText." + studentIdErrorTextId) }}</p>
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
      <p class="text-red-600 text-xs" v-if="isPasswordError">{{ t("errorText." + passwordErrorTextId) }}</p>
    </div>

    <a class="text-blue-500 underline" href="#" @click="onForgetPassword"> {{t('forgotPasswordText')}} </a>
    <!-- fake captcha -->
     <div class="border-2 border-gray-200 rounded-md w-50 h-15 flex items-center p-2 bg-[#f9f9f9]" :class="{'border-red-300': isCaptchaError}">
      <input type="checkbox" v-model="formData.captcha"></input>
      <p class="ml-2 text-[12px]">I'm not a robot</p>
      <img src="/images/reCAPTCHA.svg" class="h-full ml-auto"></img>
     </div>
    <Button type="submit">{{ t('loginButtonText') }}</Button>
  </form>
</template>
