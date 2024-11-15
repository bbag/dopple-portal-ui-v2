<script setup lang="ts">
import { ref } from 'vue'

type GltfItem = GltfItemWithoutCheckbox | GltfItemWithCheckbox

interface GltfItemWithoutCheckbox {
    name: string,
    has_checkbox: false,
    children?: GltfItem[]
}

interface GltfItemWithCheckbox {
    name: string,
    checkbox_state: 'allowed' | 'disallowed' | 'empty',
    has_checkbox?: true,
    rgb?: string,
    children?: GltfItem[]
}

const gltfs: GltfItem[] = [
    {
        name: 'boat.gltf',
        checkbox_state: 'allowed',
        children: [
            {
                name: 'Nodes',
                has_checkbox: false,
                children: [
                    {
                        name: 'Hull-Bottom_Trim',
                        checkbox_state: 'allowed',
                        children: [
                            {
                                name: 'Hull-Bottom_Trim-group',
                                has_checkbox: false,
                                children: [
                                    {
                                        name: 'Hull-Bottom_Trim-Ebony',
                                        rgb: '41, 39, 41',
                                        checkbox_state: 'empty',
                                    },
                                    {
                                        name: 'Hull-Bottom_Trim-SharkGray',
                                        rgb: '102, 97, 94',
                                        checkbox_state: 'empty',
                                    },
                                    {
                                        name: 'Hull-Bottom_Trim-White',
                                        rgb: '253, 252, 252',
                                        checkbox_state: 'empty',
                                    },
                                    {
                                        name: 'Hull-Bottom_Trim-Red',
                                        rgb: '220, 6, 12',
                                        checkbox_state: 'empty',
                                    },
                                    {
                                        name: 'Hull-Bottom_Trim-Neon',
                                        rgb: '206, 255, 0',
                                        checkbox_state: 'empty',
                                    },
                                    {
                                        name: 'Hull-Bottom_Trim-RefreshingBlue',
                                        rgb: '0, 133, 202',
                                        checkbox_state: 'empty',
                                    },
                                    {
                                        name: 'Hull-Bottom_Trim-MidnightgBlue',
                                        rgb: '25, 48, 77',
                                        checkbox_state: 'empty',
                                    },
                                    {
                                        name: 'Hull-Bottom_Trim-Violet',
                                        rgb: '88, 3, 187',
                                        checkbox_state: 'empty',
                                    },
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Cameras',
                has_checkbox: false,
                children: []
            },
            {
                name: 'Positioning',
                has_checkbox: false,
                children: [
                    {
                        name: 'default',
                        checkbox_state: 'empty'
                    }
                ]
            },
            {
                name: 'Animations',
                has_checkbox: false,
                children: []
            }
        ]
    }
]

const configProperties = ref([
    {
        id: Math.random(),
        name: 'color',
        options: [
            {
                id: Math.random(),
                name: 'red',

            }
        ]
    }
])
</script>

<template>
    <div class="p-4">
        Config Mode stuff coming soon...
    </div>
</template>