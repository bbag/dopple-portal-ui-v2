import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

import { RouterLink } from 'vue-router'

import { labels, statuses } from './data'
import { useProductsStore, type IProduct, type IProductVersion } from '@/stores/products'
import ProductTableColumnHeader from './ProductTableColumnHeader.vue'
import ProductTableRowActions from './ProductTableRowActions.vue'
// import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { IconStar, IconStarFilled } from '@tabler/icons-vue'

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
function toggleFavorite(workspace: string, name: string) {
  const product = useProductsStore().products.find(
    (p) => p.name === name && p.workspace === workspace
  )

  if (product && product.isFavorite) {
    product.isFavorite = false
    toast('✖ Removed from favorites.', {
      description: `${product.title} has been removed from your favorites.`
      // action: {
      //   label: 'Undo',
      //   onClick: () => console.log('Undo')
      // }
    })
  } else if (product && !product.isFavorite) {
    product.isFavorite = true
    toast('⭐ Added to favorites!', {
      description: `${product.title} has been added to your favorites.`
      // action: {
      //   label: 'Undo',
      //   onClick: () => console.log('Undo')
      // }
    })
  }
}

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'isFavorite',
    meta: { displayName: 'Favorite' },
    header: ({ column }) => h(ProductTableColumnHeader, { column, title: '' }),
    cell: ({ row }) =>
      h(
        'button',
        {
          variant: 'ghost',
          size: 'icon-xs',
          class: row.original.isFavorite
            ? 'w-6 h-6 p-0 flex items-center justify-center text-amber-400 hover:text-amber-500'
            : 'w-6 h-6 p-0 flex items-center justify-center text-slate-300 hover:text-slate-400',
          onClick: () => toggleFavorite(row.getValue('workspace'), row.getValue('name'))
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
  {
    id: 'thumbnail',
    header: ({ column }) => h(ProductTableColumnHeader, { column, title: '' }),
    cell: ({ row }) =>
      h(Popover, {}, [
        h(
          PopoverTrigger,
          { class: 'font-medium flex items-center w-8' },
          h(
            // IconInfo,
            // { class: 'text-slate-400 h-4 w-4 mx-auto' }
            'img',
            {
              src: row.original.thumbnail,
              class: 'h-8 w-8 mx-auto rounded-sm border object-cover'
            }
          )
        ),
        h(
          PopoverContent,
          { class: 'w-72', align: 'center', side: 'right' },
          h('img', { src: row.original.thumbnail, class: 'w-full h-auto' })
        )
      ]),
    enableSorting: false,
    enableHiding: false
  },
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
  {
    accessorKey: 'title',
    meta: { displayName: 'Title' },
    header: ({ column }) => h(ProductTableColumnHeader, { column, title: 'Title' }),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)
      return h(RouterLink, { to: `products/${row.original.name}`, class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('title')),
        label ? h(Badge, { variant: 'outline', class: 'bg-background' }, () => label.label) : null
      ])
    },
    enableHiding: false
  },
  // {
  //   accessorKey: 'id',
  //   header: ({ column }) => h(ProductTableColumnHeader, { column, title: 'Product ID' }),
  //   cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('id')),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'name',
    meta: { displayName: 'Name' },
    header: ({ column }) => h(ProductTableColumnHeader, { column, title: 'Name' }),
    cell: ({ row }) => h('div', { class: 'w-30 font-mono' }, row.getValue('name')),
    enableSorting: true
  },
  {
    accessorKey: 'workspace',
    meta: { displayName: 'Workspace' },
    header: ({ column }) => h(ProductTableColumnHeader, { column, title: 'Workspace' }),
    cell: ({ row }) => h('div', { class: 'w-30 font-mono' }, row.getValue('workspace')),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: true
  },
  {
    accessorKey: 'versions',
    meta: { displayName: 'Version' },
    header: ({ column }) => h(ProductTableColumnHeader, { column, title: 'Version' }),
    // cell: ({ row }) => {
    //   const label = labels.find((label) => label.value === row.original.label)
    //   return h(RouterLink, { to: `products/${row.original.name}`, class: 'flex space-x-2' }, [
    //     h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('title')),
    //     label ? h(Badge, { variant: 'outline', class: 'bg-background' }, () => label.label) : null
    //   ])
    // },
    cell: ({ row }) => {
      const currentVersion = row
        .getValue<Array<IProductVersion>>('versions')
        .find((version) => version.isDefault)
      return h('div', { class: 'w-10 text-right' }, currentVersion?.draftVersion?.toString())
    },
    enableSorting: false
  },
  {
    accessorKey: 'status',
    meta: { displayName: 'Status' },
    header: ({ column }) => h(ProductTableColumnHeader, { column, title: 'Status' }),
    cell: ({ row }) => {
      console.log('------------------- STATUS ROW -------------------')
      console.log(row.getValue('status'))
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
    header: ({ column }) => h(ProductTableColumnHeader, { column, title: 'Date Created' }),
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
    header: ({ column }) => h(ProductTableColumnHeader, { column, title: 'Date Modified' }),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'whitespace-nowrap' },
        dateFormatter.format(row.getValue<Date>('dateModified'))
      ),
    enableSorting: true
  },
  // {
  //   accessorKey: 'priority',
  //   header: ({ column }) => h(ProductTableColumnHeader, { column, title: 'Priority' }),
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
    id: 'actions',
    cell: ({ row }) => h(ProductTableRowActions, { row })
  }
]
