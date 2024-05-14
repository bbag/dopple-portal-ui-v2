import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export interface IWorkspace {
  name: string;
  dateCreated: Date;
  dateModified: Date;
}

export const useWorkspacesStore = defineStore('workspaces', () => {
  const currentWorkspace = ref<string>('');

  const workspaces = computed<IWorkspace[]>(() => [
    {
      name: 'crate-barrel-assets',
      dateCreated: new Date('2024-01-22T07:26:51'),
      dateModified: new Date('2024-03-29T08:16:47')
    },
    {
      name: 'demo-assets',
      dateCreated: new Date('2023-11-09T11:12:41'),
      dateModified: new Date('2024-04-21T12:52:09')
    },
    {
      name: 'rh-assets',
      dateCreated: new Date('2024-01-02T10:06:08'),
      dateModified: new Date('2024-03-28T15:39:20')
    },
    {
      name: 'test-workspace',
      dateCreated: new Date('2024-03-19T07:30:15'),
      dateModified: new Date('2024-04-14T09:22:53')
    },
    {
      name: 'empty-workspace',
      dateCreated: new Date('2024-04-01T09:28:59'),
      dateModified: new Date('2024-04-09T11:04:11')
    }
  ]);

  function addNewWorkspace(name: string) {
    workspaces.value.push({
      name: name || 'new-workspace',
      dateCreated: new Date(),
      dateModified: new Date()
    });
  }

  return { addNewWorkspace, currentWorkspace, workspaces };
});
