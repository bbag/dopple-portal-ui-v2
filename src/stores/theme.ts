import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

import { IconDeviceDesktop, IconMoon, IconSun, type Icon } from '@tabler/icons-vue';

export interface ITheme {
  label: 'Light' | 'Dark' | 'System';
  value: 'light' | 'dark' | 'system';
  icon: Icon;
}

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<string>('system');

  const themes = ref<ITheme[]>([
    {
      label: 'Light',
      value: 'light',
      icon: IconSun
    },
    {
      label: 'Dark',
      value: 'dark',
      icon: IconMoon
    },
    {
      label: 'System',
      value: 'system',
      icon: IconDeviceDesktop
    }
  ]);

  // Update the theme value in local storage and on the <html> element when the theme changes
  watch(
    () => currentTheme.value,
    (newTheme) => {
      switch (newTheme) {
        case 'light':
          localStorage.theme = 'light';
          document.documentElement.classList.remove('dark');
          break;
        case 'dark':
          localStorage.theme = 'dark';
          document.documentElement.classList.add('dark');
          break;
        case 'system':
          localStorage.removeItem('theme');
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
      }
    }
  );

  return { currentTheme, themes };
});
