/**
 * @license
 * This app exhibits yFiles for HTML functionalities.
 * Copyright (c) 2023 by yWorks GmbH, Vor dem Kreuzberg 28,
 * 72070 Tuebingen, Germany. All rights reserved.
 *
 * yFiles demo files exhibit yFiles for HTML functionalities.
 * Any redistribution of demo files in source code or binary form, with
 * or without modification, is not permitted.
 *
 * Owners of a valid software license for a yFiles for HTML
 * version are allowed to use the app source code as basis for their
 * own yFiles for HTML powered applications. Use of such programs is
 * governed by the rights and conditions as set out in the yFiles for HTML
 * license agreement. If in doubt, please mail to contact@yworks.com.
 *
 * THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN
 * NO EVENT SHALL yWorks BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import 'yfiles/yfiles.css'
import { useContext, useLayoutEffect, useRef } from 'react'
import { GraphComponent, GraphEditorInputMode, GraphInputMode, GraphItemTypes, GraphViewerInputMode, StorageLocation } from 'yfiles'
import '../lib/yFilesLicense'
import { GraphComponentContext } from '../lib/GraphComponentContext'
import loadGraph from '../lib/loadGraph.ts'
// import { useGraphSearch } from '../lib/use-graph-search'
import { ContextMenuComponent } from './ContextMenuComponent'
import { useTooltips } from '../lib/use-tooltips'
import { NodeWithEdge } from '../App.tsx'

interface ReactGraphComponentProps {
  searchQuery: string,
  data: NodeWithEdge
}

export default function ReactGraphComponent({
  searchQuery,
  data
}: ReactGraphComponentProps) {
  // get hold of the GraphComponent
  const { graphComponent, graphComponentContainer } = useGraphComponent(data)

  // register tooltips on graph items
  // useTooltips(graphComponent)

  // register search on graph items
  // useGraphSearch(graphComponent, searchQuery)

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        className="graph-component-container"
        style={{ width: '100%', height: '100%' }}
        ref={graphComponentContainer}
      />
      {/* <ContextMenuComponent graphComponent={graphComponent.current} /> */}
    </div>
  )
}

function useGraphComponent(data: NodeWithEdge) {
  const graphComponentContainer = useRef<HTMLDivElement>(null)
  const graphComponent = useRef<GraphComponent>()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setGraphComponent] = useContext(GraphComponentContext)

  useLayoutEffect(() => {
    const gcContainer = graphComponentContainer.current
    if (!gcContainer) {
      return
    }

    // initialize the GraphComponent
    const gc = new GraphComponent()

    // register interaction
    gc.inputMode = new GraphEditorInputMode({
      allowEditLabel: false,
      allowEditLabelOnDoubleClick: false,
      allowReparentNodes: false,
      allowCreateEdge: false,
      allowCreateBend: false,
      allowCreateNode: false,
      allowClipboardOperations: false,
      allowGroupingOperations: false,
      allowGroupSelection: false,
      allowUndoOperations: false,
    })

    async function initializeGraph() {
      gc.graph = await loadGraph(data)

      gc.fitGraphBounds()
    }
    initializeGraph()

    graphComponent.current = gc

    // Update the context
    setTimeout(setGraphComponent, 0, gc)

    gc.div.style.width = '100%'
    gc.div.style.height = '100%'
    gcContainer.append(gc.div)

    return () => {
      gc.cleanUp()
      graphComponent.current = undefined
      gcContainer.innerHTML = ''
    }
  }, [graphComponentContainer, setGraphComponent])

  return { graphComponentContainer, graphComponent }
}
