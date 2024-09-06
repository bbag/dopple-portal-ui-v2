import { defineStore } from 'pinia'

export type TEditorState = 'Empty' | 'Partial' | 'Populated'

// export const useEditorStateStore = defineStore('editorStates', () => {
//   const editorStates: TEditorState[] = ['Empty', 'Partial', 'Populated']
//   const currentEditorState = ref<TEditorState>('Empty')
//   return { currentEditorState, editorStates }
// })

export const useEditorStateStore = defineStore('editorStates', {
  state: () => ({
    editorStates: ['Empty', 'Partial', 'Populated'] as TEditorState[],
    currentEditorState: 'Empty' as TEditorState
  })
})
