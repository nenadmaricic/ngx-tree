import { Component, ViewChild, ChangeDetectorRef } from '@angular/core'
import { TreeNode, TreeComponent } from '@e-cloud/ngx-tree'

@Component({
    selector: 'demo-simple',
    templateUrl: './simple.component.html',
    styleUrls: ['./simple.component.scss'],
})
export class SimpleComponent {

    title = 'demo'

    nodes: any[]

    asyncChildren = [
        {
            name: 'child2.1',
            subTitle: 'new and improved',
        },
        {
            name: 'child2.2',
            subTitle: 'new and improved2',
        },
    ]

    customOptions = {
        // displayField: 'subTitle',
        isExpandedField: 'expanded',
        idField: 'uuid',
        getChildren: this.getChildren.bind(this),
        useVirtualScroll: true,
        referenceItemHeight: 22,
        allowDrag: (node) => {
            // console.log('allowDrag?');
            return true
        },
        allowDrop: (node, to) => {
            // console.log('allowDrop?');
            // if (node.id === to.parent.id || node.parent === to.parent) {
            //     return false
            // }

            return true
        },
    }

    @ViewChild(TreeComponent, { static: false }) private tree: TreeComponent

    constructor(public cdr: ChangeDetectorRef) {
        // this.generateData(4)
        this.nodes = [
            {
                expanded: true,
                name: `root expanded 1`,
                subTitle: 'the root',
                children: [
                    {
                        name: 'child1',
                        subTitle: 'a good child',
                        hasChildren: false,
                    },
                    {
                        name: 'child2',
                        subTitle: 'a bad child',
                        hasChildren: false,
                    },
                ],
            },
            {
                expanded: true,
                name: `root expanded 2`,
                subTitle: 'the root',
                children: [
                    {
                        name: 'child1',
                        subTitle: 'a good child',
                        hasChildren: false,
                    },
                    {
                        name: 'child2',
                        subTitle: 'a bad child',
                        hasChildren: false,
                    },
                ],
            },
        ]
    }

    regenerateData() {
        this.generateData(Math.floor(Math.random() * 5))
    }

    generateData(seed: number) {
        this.nodes = [
            {
                expanded: true,
                name: `[${seed}]root expanded 1`,
                subTitle: 'the root',
                children: [
                    {
                        name: 'child1',
                        subTitle: 'a good child',
                        hasChildren: false,
                    },
                    {
                        name: 'child2',
                        subTitle: 'a bad child',
                        hasChildren: false,
                    },
                ],
            },
            {
                expanded: true,
                name: `[${seed}]root expanded 2`,
                subTitle: 'the root',
                children: [
                    {
                        name: 'child1',
                        subTitle: 'a good child',
                        hasChildren: false,
                    },
                    {
                        name: 'child2',
                        subTitle: 'a bad child',
                        hasChildren: false,
                    },
                ],
            },
            {
                name: `[${seed}]async root`,
                hasChildren: true,
            },
            {
                expanded: true,
                name: `[${seed}]root2`,
                subTitle: 'the second root',
                children: [
                    {
                        name: 'child2.1',
                        subTitle: 'new and improved',
                        uuid: '11',
                        hasChildren: false,
                    },
                    {
                        expanded: true,
                        name: 'child2.2',
                        subTitle: 'new and improved2',
                        children: [
                            {
                                uuid: 1001,
                                name: 'subsub',
                                subTitle: 'subsub',
                                hasChildren: false,
                            },
                            {
                                expanded: true,
                                name: 'root 3',
                                subTitle: 'the second root',
                                children: [
                                    {
                                        name: 'child2.1',
                                        subTitle: 'new and improved',
                                        uuid: '111',
                                        hasChildren: false,
                                    },
                                    {
                                        expanded: true,
                                        name: 'child2.2',
                                        subTitle: 'new and improved2',
                                        children: [
                                            {
                                                uuid: 10011,
                                                name: 'subsub',
                                                subTitle: 'subsub',
                                                hasChildren: false,
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                expanded: true,
                                name: 'root 4',
                                subTitle: 'the second root',
                                children: [
                                    {
                                        name: 'child2.1',
                                        subTitle: 'new and improved',
                                        uuid: '112',
                                        hasChildren: false,
                                    },
                                    {
                                        expanded: true,
                                        name: 'child2.2',
                                        subTitle: 'new and improved2',
                                        children: [
                                            {
                                                uuid: 10012,
                                                name: 'subsub',
                                                subTitle: 'subsub',
                                                hasChildren: false,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]

        for (let i = 0; i < seed * 5; i++) {
            this.nodes.push({
                expanded: i === 0,
                name: `[${seed}]root Dynamic${i}`,
                subTitle: `[${seed}]root created dynamically ${i}`,
                children: new Array((i + 1) * seed * 500).fill(null).map((item, n) => ({
                    name: `[${seed}]child Dynamic${i}.${n}`,
                    subTitle: `[${seed}]child created dynamically ${i}`,
                    hasChildren: false,
                })),
            })
        }
    }

    getChildren(node: TreeNode) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.asyncChildren.map((c) => {
                return Object.assign({}, c, {
                    hasChildren: node.level < 5,
                })
            })), 1000)
        })
    }

    childrenCount(node: TreeNode): string {
        return node && node.children ? `(${node.children.length})` : ''
    }

    log($event) {
        console.log($event)
    }

    expandAll() {
        this.tree.treeModel.expandAll()
    }

    collapseAll() {
        this.tree.treeModel.collapseAll()
    }

    add() {
        let parent = this.tree.treeModel.getActiveNode()
        if (!parent) {
            parent = this.tree.treeModel.virtualRoot
        }
        if (parent) {
            const elem: any = {
                name: (new Date()).toString()
            }
            parent.data.children = parent.data.children || []
            parent.data.children.splice(0, 0, elem)
            parent.addChild(elem, 0, false)
        }
    }

    remove() {
        const toRemove = this.tree.treeModel.getActiveNode()
        if (toRemove) {
            const elem: any = toRemove.data
            const parentData = toRemove.parent.data
            const index = parentData.children.indexOf(elem)
            parentData.children.splice(index, 1)

            toRemove.remove(false)
        }
    }

    expand() {
        const node = this.tree.treeModel.getActiveNode()
        if (node) {
            node.expand().then((r) => {
                console.log('expanded')
                this.cdr.markForCheck()
            }, (err) => {
                console.log(err)
            })
        }
    }

    collapse() {
        const node = this.tree.treeModel.getActiveNode()
        if (node) {
            node.collapse()
            this.cdr.markForCheck()
        }
    }
}
