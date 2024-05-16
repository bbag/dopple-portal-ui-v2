<script setup lang="ts">
import { ref } from 'vue'

import { permissions, roles, useClientStore } from '@/stores/client'

import LayoutMain from '@/components/layouts/LayoutMain.vue'
import MemberSettingsPanel from '@/components/sections/team-settings/MemberSettingsPanel.vue'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { IconCircleCheck, IconSettings } from '@tabler/icons-vue'

const inviteMember = ref({
  email: '',
  role: 'Viewer'
})
</script>

<template>
  <LayoutMain>
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Team</h1>
      <div class="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Organization</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="whitespace-nowrap">Org Name</TableHead>
                  <TableHead class="w-full">Client ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{{ useClientStore().client.orgName }}</TableCell>
                  <TableCell class="font-mono">{{ useClientStore().client.clientId }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Members</CardTitle>
            <CardDescription>Add, edit, or remove members on your team.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead class="w-full">Role</TableHead>
                  <TableHead>Manage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  v-for="(person, i) in useClientStore().client.members"
                  :key="person.email"
                >
                  <Sheet>
                    <TableCell class="font-medium whitespace-nowrap">
                      {{ person.name }}
                    </TableCell>
                    <TableCell class="whitespace-nowrap">
                      {{ person.email }}
                    </TableCell>
                    <TableCell>
                      {{ person.role }}
                    </TableCell>
                    <TableCell class="text-center">
                      <SheetTrigger>
                        <Button variant="outline" size="icon">
                          <IconSettings class="w-5 h-5" />
                        </Button>
                      </SheetTrigger>
                    </TableCell>
                    <SheetContent class="flex flex-col max-w-sm md:max-w-[32rem]">
                      <SheetHeader>
                        <SheetTitle>Member Settings</SheetTitle>
                      </SheetHeader>
                      <Separator />
                      <ScrollArea class="-m-2">
                        <MemberSettingsPanel :personIndex="i" />
                      </ScrollArea>
                      <Separator />
                      <SheetFooter>
                        <SheetClose as-child>
                          <Button> Save changes </Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add Member</CardTitle>
            <CardDescription>
              Add members to your team. They will receive an invitation email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid w-full gap-4 grid-cols-[5fr,2fr]">
              <div class="grid w-full items-center gap-1.5">
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  v-model="inviteMember.email"
                  class="w-full"
                />
              </div>
              <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for="role">Role</Label>
                <Select v-model="inviteMember.role">
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem v-for="role in roles" :key="role.title" :value="role.title">
                        {{ role.title }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div class="mt-4">
              <Button>Send Invite</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Roles &amp; Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permission</TableHead>
                  <TableHead v-for="role in roles" :key="role.title" class="text-center">
                    {{ role.title }}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="permission in permissions" :key="permission.text">
                  <TableCell>
                    {{ permission.text }}
                  </TableCell>
                  <TableCell v-for="role in roles" :key="role.title">
                    <IconCircleCheck
                      class="w-5 h-5 text-green-500 mx-auto"
                      v-if="permission.allowedRoles.includes(role.title)"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  </LayoutMain>
</template>

<style scoped></style>
