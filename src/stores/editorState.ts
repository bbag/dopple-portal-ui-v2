import { defineStore } from 'pinia'

export type TEditorState = 'Empty' | 'Populated' | 'Has Notifications'

// export const useEditorStateStore = defineStore('editorStates', () => {
//   const editorStates: TEditorState[] = ['Empty', 'Partial', 'Populated']
//   const currentEditorState = ref<TEditorState>('Empty')
//   return { currentEditorState, editorStates }
// })

export const useEditorStateStore = defineStore('editorState', {
  state: () => ({
    states: ['Populated', 'Empty', 'Has Notifications'] as TEditorState[],
    currentEditorState: 'Populated' as TEditorState
  })
})
