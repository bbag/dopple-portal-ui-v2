import '@tanstack/vue-table'

declare module '@tanstack/vue-table' {
  interface ColumnMeta {
    displayName?: string
  }
}
