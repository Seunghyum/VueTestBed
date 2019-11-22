/* eslint-disable no-restricted-syntax */
import validate from './src/directive';
import validator from './src/validator';

export default {
  install(Vue) {
    Vue.directive('validate', validate.validate);

    Vue.mixin({
      data() {
        return {
          errorBag: {},
        };
      },

      computed: {
        $errors() {
          const errorBag = this.errorBag || {};

          return {
            has(key) {
              return !!errorBag[key];
            },
            message(key) {
              return errorBag[key];
            },
          };
        },

        $validator() {
          const context = this;

          return {
            validateAll() {
              for (const key of validator.validates.keys()) {
                const errors = validator.validate(key, context[key]);
                if (errors.length) {
                  context.$set(context.errorBag, key, errors);
                } else {
                  context.$delete(context.errorBag, key);
                }
              }
            },
          };
        },
      },
    });
  },
};
