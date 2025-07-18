// import { type VariantProps, cva } from 'class-variance-authority'

// export { default as Button } from './Button.vue'

// export const buttonVariants = cva(
//   'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
//   {
//     variants: {
//       variant: {
//         default:
//           'bg-brand-500 dark:bg-brand-300 text-primary-foreground hover:bg-brand-500/90 dark:hover:bg-brand-300/90',
//         blue: 'bg-blue-500 dark:bg-blue-300 text-primary-foreground hover:bg-blue-500/90 dark:hover:bg-blue-300/90',
//         success:
//           'bg-green-500 dark:bg-green-400 text-primary-foreground hover:bg-green-400/90 dark:hover:bg-green-300/90',
//         destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
//         outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
//         secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
//         ghost: 'hover:bg-accent hover:text-accent-foreground',
//         link: 'text-primary underline-offset-4 hover:underline'
//       },
//       size: {
//         default: 'h-10 px-4 py-2',
//         xs: 'h-6 rounded-sm px-2 text-xs',
//         sm: 'h-8 rounded-md px-3',
//         lg: 'h-11 rounded-md px-8',
//         icon: 'h-10 w-10',
//         'icon-xs': 'h-6 w-6 rounded-sm',
//         'icon-sm': 'h-8 w-8 rounded-sm'
//       }
//     },
//     defaultVariants: {
//       variant: 'default',
//       size: 'default'
//     }
//   }
// )

// export type ButtonVariants = VariantProps<typeof buttonVariants>

import { type VariantProps, cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'relative inline-flex items-center justify-center shrink-0 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-brand-500 dark:bg-brand-300 border border-brand-500 dark:border-brand-300 text-primary-foreground hover:bg-brand-500/90 hover:border-brand-500/90 dark:hover:bg-brand-300/90 dark:hover:border-brand-300/90',
        blue: 'bg-blue-500 dark:bg-blue-300 border border-blue-500 dark:border-blue-300 text-primary-foreground hover:bg-blue-400 hover:border-blue-400 dark:hover:bg-blue-100 dark:hover:border-blue-100',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-6 rounded-sm px-2 text-xs',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        'icon-xs': 'h-6 w-6 rounded-sm',
        'icon-sm': 'h-8 w-8 rounded-sm'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
