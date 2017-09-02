import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserTestingModule } from '@angular/platform-browser/testing'
import { Observable } from 'rxjs/Observable'

import { TreeVirtualScroll } from '../../services/tree-virtual-scroll.service'
import { TreeViewportComponent } from './tree-viewport.component'

describe('TreeViewportComponent', () => {
    let component: TreeViewportComponent
    let fixture: ComponentFixture<TreeViewportComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                imports: [
                    BrowserTestingModule,
                ],
                declarations: [TreeViewportComponent],
                providers: [
                    TreeVirtualScroll,
                ]
            })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(TreeViewportComponent)
        component = fixture.componentInstance
        component.treeModel = {
            scrollIntoView$: Observable.of({ node: {} })
        } as any
        fixture.detectChanges()
    })

    it('should be created', () => {
        expect(component).toBeTruthy()
    })
})
