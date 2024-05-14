<script lang="ts" setup>
import { ref } from 'vue';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { IconBrightness, IconLogout, IconSettings, IconUsers, IconWorld } from '@tabler/icons-vue';
import IconWorkspaces from '@/assets/icons/workspaces.svg';

// Themes
import { useThemeStore } from '@/stores/theme';
const themes = useThemeStore().themes;
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8">
          <AvatarImage src="/foo.png" alt="User avatar" />
          <AvatarFallback>DU</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">Demo User</p>
          <p class="text-xs leading-none text-muted-foreground">demouser@dopple.io</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <IconSettings class="w-5 h-5 mr-2 text-muted-foreground" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconWorkspaces class="w-5 h-5 mr-2 text-muted-foreground" />
          Workspaces
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconUsers class="w-5 h-5 mr-2 text-muted-foreground" />
          Team
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconWorld class="w-5 h-5 mr-2 text-muted-foreground" />
          Domains
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <IconBrightness class="w-5 h-5 mr-2 text-muted-foreground" />
            Theme ({{ useThemeStore().currentTheme }})
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup v-model="useThemeStore().currentTheme">
                <DropdownMenuRadioItem
                  v-for="theme in themes"
                  :key="theme.value"
                  :value="theme.value"
                >
                  <component :is="theme.icon" class="mr-2 h-4 w-4 mr-2 text-muted-foreground" />
                  {{ theme.label }}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <IconLogout class="w-5 h-5 mr-2 text-muted-foreground" />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
