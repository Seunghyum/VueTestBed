import validator from './validator';

export default {
  validate: {
    bind(el, binding) {
      let select = el.querySelector('input');
      if (!select) select = el; // 라이브러리로 래핑한 경우 안잡히는 에러 대비
      validator.setup(select.name, binding.expression);
    },

    update(el, binding, vnode) {
      let select = el.querySelector('input');
      if (!select) select = el; // 라이브러리로 래핑한 경우 안잡히는 에러 대비
      const key = select.name;
      if (!vnode.context[key]) return;
      const errorMessage = validator.validate(key, select.value);
      if (errorMessage === undefined) return;
      vnode.context.$set(vnode.context.errorBag, key, errorMessage);
    },
  },
};
