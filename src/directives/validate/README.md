# 회원관리 v-validate

: 유효성 검사(Validate) 코드를 한 곳에서 관리하기 위한 모듈

## Use Case

```javascript
import Vue from 'vue'
import Validator from 'v-validate'

Vue.use(Validator)
```

```html
<template>
  <div id="app">
    <form @submit.prevent="onSubmit">
      <input type="text" name="name" v-model="name" v-validate="'name|2,20'">
      <!-- 
        v-validate="안에 들어갈 규칙"

        link : 'link'
        email : 'email|최소값,최대값'
        password : 'email|최소값,최대값'
        name : 'email|최소값,최대값'
        id : 'email|최소값,최대값'
       -->
      <p v-if="$errors.has('name')">{{ $errors.message('name') }}</p>
      <br>
      <br>
      <input type="text" name="email" v-model="email" v-validate="'email|4,20'">
      <p v-if="$errors.has('email')">{{ $errors.message('email') }}</p>
      <br>
      <br>
      <button type="submit">Submit</button>
    </form>
    <pre>{{errorBag}}</pre>
    <!-- errorBag은
      { keyword: boolean, ....}
          
      ex)

      {
        "name": true,
        "email": false
      }
      위의 형태로 산출됨.
     -->
  </div>
</template>

<script>

export default {
  data() {
    return {
      name: null,
      email: null,
    };
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll();
    },
  },
};
</script>

```

## Description

vee-validate처럼 "{required:true, min: 4, max: 20}" 의 형태로 만들수도 있지만
password, Id 등은 모든 규칙을 공유하기 때문에 만들지는 않음.
v-validate="문자" 의 문자열을 "|" 로 split하여 문자와 동일한 validateFns들을 수행하는 로직. 
validateFns의 매서드 개수만큼 반

### File Structure

- common/validate/origin.js : 원래 코드
- common/validate/edited : origin.js 코드 개선
- common/validate/index.js, directive.js, validator.js : 회원관리 모듈화(v-validate)
  - common/validate/index.js : Vue.use()를 활용하기 위한 플러그인
  - common/validate/directive.js : v-디렉티브 라이프 사이클에 맞게 객체로 만든 코드
  - common/validate/validator.js : 실제 Validate를 위한 로직


## 참고 자료

- [주요 참고](http://jeonghwan-kim.github.io/2018/05/31/vue-form-validation.html)
- [vee-validate](https://logaretm.github.io/vee-validate/)