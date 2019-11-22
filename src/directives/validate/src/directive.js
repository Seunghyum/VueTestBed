import validator from './validator';

export default {
  validate: {
    bind(el, binding) {
      validator.setup(el.name, binding.expression);
    },

    update(el, binding, vnode) {
      const key = el.name;
      if (!vnode.context[key]) return;

      const errorMessage = validator.validate(key, el.value);
      if (errorMessage === undefined) return;
      vnode.context.$set(vnode.context.errorBag, key, errorMessage);
    },
  },
};
