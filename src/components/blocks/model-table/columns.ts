import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

import { RouterLink } from 'vue-router'

import { statuses } from './data'
import { useModelsStore, type IModel, type IModelVersion } from '@/stores/models'
import ModelTableColumnHeader from './ModelTableColumnHeader.vue'
import ModelTableRowActions from './ModelTableRowActions.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { IconStar, IconStarFilled } from '@tabler/icons-vue'
import IconGltfEditor from '@/assets/icons/gltf-editor.svg'

import { toast } from 'vue-sonner'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
})

/** */
function toggleFavorite(workspace: string, shortId: string) {
  const model = useModelsStore().models.find(
    (m) => m.shortId === shortId && m.workspace === workspace
  )

  if (model && model.isFavorite) {
    model.isFavorite = false
    toast('✖ Removed from favorites.', {
      description: `${model.name} has been removed from your favorites.`
      // action: {
      //   label: 'Undo',
      //   onClick: () => console.log('Undo')
      // }
    })
  } else if (model && !model.isFavorite) {
    model.isFavorite = true
    toast('⭐ Added to favorites!', {
      description: `${model.name} has been added to your favorites.`
      // action: {
      //   label: 'Undo',
      //   onClick: () => console.log('Undo')
      // }
    })
  }
}

export const columns: ColumnDef<IModel>[] = [
  {
    accessorKey: 'isFavorite',
    meta: { displayName: 'Favorite' },
    header: ({ column }) => h(ModelTableColumnHeader, { column, title: '' }),
    cell: ({ row }) =>
      h(
        'button',
        {
          variant: 'ghost',
          size: 'icon-xs',
          class: row.original.isFavorite
            ? 'w-6 h-6 p-0 flex items-center justify-center text-amber-400 hover:text-amber-500'
            : 'w-6 h-6 p-0 flex items-center justify-center text-slate-300 hover:text-slate-400',
          onClick: () => toggleFavorite(row.getValue('workspace'), row.getValue('shortId'))
        },
        row.original.isFavorite
          ? h(IconStarFilled, { class: 'h-4 w-4' })
          : h(IconStar, { class: 'h-4 w-4' })
      ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false
    // enableHiding: false
  },
  // {
  //   id: 'thumbnail',
  //   header: ({ column }) => h(ModelTableColumnHeader, { column, title: '' }),
  //   cell: ({ row }) =>
  //     h(Popover, {}, [
  //       h(
  //         PopoverTrigger,
  //         { class: 'font-medium flex items-center w-8' },
  //         h(
  //           // IconInfo,
  //           // { class: 'text-slate-400 h-4 w-4 mx-auto' }
  //           'img',
  //           {
  //             src: row.original.thumbnail,
  //             class: 'h-8 w-8 mx-auto rounded-sm border object-cover'
  //           }
  //         )
  //       ),
  //       h(
  //         PopoverContent,
  //         { class: 'w-72', align: 'center', side: 'right' },
  //         h('img', { src: row.original.thumbnail, class: 'w-full h-auto' })
  //       )
  //     ]),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  // {
  //   id: 'select',
  //   header: ({ table }) =>
  //     h(Checkbox, {
  //       checked:
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate'),
  //       'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
  //       ariaLabel: 'Select all',
  //       class: 'translate-y-0.5'
  //     }),
  //   cell: ({ row }) =>
  //     h(Checkbox, {
  //       checked: row.getIsSelected(),
  //       'onUpdate:checked': (value) => row.toggleSelected(!!value),
  //       ariaLabel: 'Select row',
  //       class: 'translate-y-0.5'
  //     }),
  //   enableSorting: false
  // },
  // {
  //   accessorKey: 'id',
  //   header: ({ column }) => h(ModelTableColumnHeader, { column, title: 'Model ID' }),
  //   cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('id')),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'name',
    meta: { displayName: 'Name' },
    header: ({ column }) => h(ModelTableColumnHeader, { column, title: 'Name' }),
    cell: ({ row }) =>
      h(RouterLink, { to: `models/${row.original.shortId}` }, [
        h('span', { class: 'w-full max-w-full truncate font-mono' }, row.getValue('name'))
      ]),
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: 'workspace',
    meta: { displayName: 'Workspace' },
    header: ({ column }) => h(ModelTableColumnHeader, { column, title: 'Workspace' }),
    cell: ({ row }) => h('div', { class: 'w-30 font-mono' }, row.getValue('workspace')),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: true
  },
  {
    accessorKey: 'versions',
    meta: { displayName: 'Latest Version' },
    header: ({ column }) =>
      h(ModelTableColumnHeader, { column, class: 'text-center', title: 'Latest Version' }),
    // cell: ({ row }) => {
    //   const label = labels.find((label) => label.value === row.original.label)
    //   return h(RouterLink, { to: `models/${row.original.name}`, class: 'flex space-x-2' }, [
    //     h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('title')),
    //     label ? h(Badge, { variant: 'outline', class: 'bg-background' }, () => label.label) : null
    //   ])
    // },
    cell: ({ row }) => {
      const currentVersion = row
        .getValue<Array<IModelVersion>>('versions')
        .find((version) => version.isDefault)
      return h('div', { class: 'text-center' }, currentVersion?.draftVersion?.toString())
    },
    enableSorting: false
  },
  {
    accessorKey: 'status',
    meta: { displayName: 'Status' },
    header: ({ column }) => h(ModelTableColumnHeader, { column, title: 'Status' }),
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue('status'))
      if (!status) return null
      return h('div', { class: 'flex w-[6rem] items-center' }, [
        status.icon && h(status.icon, { class: 'mr-2 h-4 w-4' }),
        h('span', status.label)
      ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: 'dateCreated',
    meta: { displayName: 'Date Created' },
    header: ({ column }) => h(ModelTableColumnHeader, { column, title: 'Date Created' }),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'whitespace-nowrap' },
        dateFormatter.format(row.getValue<Date>('dateCreated'))
      ),
    enableSorting: true
  },
  {
    accessorKey: 'dateModified',
    meta: { displayName: 'Date Modified' },
    header: ({ column }) => h(ModelTableColumnHeader, { column, title: 'Date Modified' }),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'whitespace-nowrap' },
        dateFormatter.format(row.getValue<Date>('dateModified'))
      ),
    enableSorting: true
  },
  {
    accessorKey: 'shortId',
    meta: { displayName: 'Short ID' },
    header: ({ column }) => h(ModelTableColumnHeader, { column, title: 'Short ID' }),
    cell: ({ row }) => h('span', { class: 'font-mono' }, row.getValue('shortId')),
    enableSorting: true
  },
  // {
  //   accessorKey: 'priority',
  //   header: ({ column }) => h(ModelTableColumnHeader, { column, title: 'Priority' }),
  //   cell: ({ row }) => {
  //     const priority = priorities.find((priority) => priority.value === row.getValue('priority'))

  //     if (!priority) return null

  //     return h('div', { class: 'flex items-center' }, [
  //       priority.icon && h(priority.icon, { class: 'mr-2 h-4 w-4 text-muted-foreground' }),
  //       h('span', {}, priority.label)
  //     ])
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   }
  // },
  {
    accessorKey: 'edit',
    meta: { displayName: 'Edit glTF' },
    header: ({ column }) => h(ModelTableColumnHeader, { column, title: 'Edit glTF' }),
    cell: ({ row }) =>
      h(RouterLink, { to: `editor/${row.original.shortId}` }, [
        h(Button, { size: 'sm', variant: 'outline' }, [
          // h(IconGltfEditor, { class: 'mr-3 h-5 w-5 text-slate-600' }),
          h('span', 'Open in glTF Editor')
        ])
      ]),
    enableHiding: false,
    enableSorting: false
  },
  {
    id: 'actions',
    cell: ({ row }) => h(ModelTableRowActions, { row })
  }
]
