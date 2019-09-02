import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import isFunction from 'lodash-es/isFunction'
import { DragAndDropEvent, TreeNode, TreeUIOptions } from '../../models'

@Component({
    selector: 'ngx-tree-node-drop-slot',
    templateUrl: './tree-node-drop-slot.component.html',
    styleUrls: ['./tree-node-drop-slot.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeNodeDropSlotComponent {
    @Input() node: TreeNode
    @Input() options: TreeUIOptions
    @Input() dropIndex: number

    allowDrop = (element: TreeNode, $event: DragEvent) =>
        isFunction(this.options.allowDrop)
            ? this.options.allowDrop(element, {
                parent: this.node,
                index: this.dropIndex,
            }, $event)
            : this.options.allowDrop

    onDrop($event: DragAndDropEvent) {
        this.node.mouseAction('drop', $event.event, {
            from: $event.element,
            to: { parent: this.node, index: this.dropIndex },
        })
    }
}
