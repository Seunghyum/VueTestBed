/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
const validateFns = {
  link(key, val) {
    const regExp = new RegExp('^(http(s)?|ftp|tel|mailto|\/)(:\/\/)?');
    return regExp.test(val);
  },
  email(key, val) {
    const regExp = new RegExp('[-\\d\\S.+_]+@[-\\d\\S.+_]+\\.[\\S]{2,4}');
    return regExp.test(val);
  },
  password(key, val, option) {
    if (!option) return 'option(길이)이 설정되지 않았습니다.';
    if (option.length < 2) return 'option(길이) 값은 2개 여야 합니다.';
    const regExp = new RegExp(`^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&\\(\\)])[A-Za-z\\d$@$!%*#?&\\(\\)]{${Number(option[0])},${Number(option[1])}}$/i`); // IE RegExp 객체 이슈로 형태 변경
    return regExp.test(val);
  },
  name(key, val, option) {
    if (!option) return 'option(길이)이 설정되지 않았습니다.';
    if (option.length < 2) return 'option(길이) 값은 2개 여야 합니다.';
    const regExp = new RegExp(`^([^\\<\\>ㄱ-ㅣ]|[\\w]){${Number(option[0])},${Number(option[1])}}$`);
    return regExp.test(val);
  },
  id(key, val, option) {
    if (!option) return 'option(길이)이 설정되지 않았습니다.';
    if (option.length < 2) return 'option(길이) 값은 2개 여야 합니다.';
    const regExp = new RegExp(`^([-_a-z\\d]){{Number(option[0])},${Number(option[1])}}$`);
    return regExp.test(val);
  },
};

class Validator {
  constructor() {
    this.validates = new Map();
    return this;
  }

  setup(key, expression) {
    const validates = expression.replace(/'/g, '').split('|');
    const keyword = validates[0];
    const option = validates[1] ? validates[1].split(',') : null;
    this.validates.set(key, { keyword, option });
  }

  validate(key, value) {
    const validates = this.validates.get(key);
    if (!validates) return null;
    if (validateFns.hasOwnProperty(validates.keyword)) {
      return validateFns[validates.keyword](key, value, validates.option);
    }
  }
}

export default new Validator();
