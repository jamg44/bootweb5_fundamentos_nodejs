
const i18n = require('../lib/i18nConfigure')();
i18n.setLocale('es'); // forzar otro idioma distinto al por defecto

console.log(i18n.__('Application title'));
