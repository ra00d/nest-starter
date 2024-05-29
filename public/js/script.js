import './deps/alpine.js';
import './carousel.js';
// window.onload = () => {
//   let theme = localStorage.getItem('theme') || 'dark';
//   document.documentElement.setAttribute('data-theme', theme);
// };
document.addEventListener('alpine:init', () => {
  const theme = localStorage.getItem('theme');

  document.documentElement.setAttribute('data-theme', theme);
  Alpine.data('theme', () => {
    return {
      changeTheme() {
        let theme = this.currentTheme;

        this.currentTheme = changeTheme(theme);
      },
      currentTheme: theme,
    };
  });
  Alpine.data('mailer', () => ({
    sendMail() {
      this.loading = true;
      this.idel = false;
      fetch('/mail')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .finally(() => {
          this.loading = false;
          this.idel = true;
        });
    },
    loading: false,
    idel: true,
  }));
});
function changeTheme(theme) {
  let cTheme;
  if (theme === 'light') {
    cTheme = 'dark';
  } else {
    cTheme = 'light';
  }
  localStorage.setItem('theme', cTheme);
  document.documentElement.setAttribute('data-theme', cTheme);
  document.getElementById('theme-controller').checked = cTheme === 'dark';
  /**
   * @type {HTMLInputElement}
   */
  const themeController = document.getElementById('theme-controller');
  themeController.value = cTheme;
  return cTheme;
}
