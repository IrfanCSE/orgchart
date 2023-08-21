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

import { project } from './Projection'
import {
  buildEdgeCreator,
  buildEdgesSourceData,
  buildGraph,
  buildLabelConfiguration,
  buildNodeCreator,
  buildNodesSourceData,
} from './GraphBuilder'
import { arrange } from './Layout'
import { NodeWithEdge } from '../App'

/**
 * This is automatically generated source code. It is largely undocumented and not necessarily
 * instructive, nor the best way to solve a given task. If you want to learn more about the
 * yFiles API, as a starting point, please consider the more instructive source code tutorial and
 * more than 200 examples on https://live.yworks.com - you will also find the complete sources to
 * these demos for you to play with as part of the evaluation package and online at
 * https://github.com/yWorks/yfiles-for-html-demos/
 * The API documentation is also available online, here: https://docs.yworks.com/yfileshtml - Enjoy!
 */
export default async function loadGraph(data:NodeWithEdge) {
  const labelConfiguration = await buildLabelConfiguration({
    textBinding: (item) => item.name,
    placement: () => 'center',
    fill: () => '#ffffff',
  })
  const nodeCreator = await buildNodeCreator([labelConfiguration], {
    x: () => 0,
    y: () => 0,
    width: () => 100,
    height: () => 50,
    styleProvider: 'ShapeNodeStyle',
    fill: () => '#CF2979',
    shape: () => 'round-rectangle',
    stroke: () => '#821A4C',
    template:'',
  })
  const nodeCreatorFilterd = await buildNodeCreator([labelConfiguration], {
    x: () => 0,
    y: () => 0,
    width: () => 100,
    height: () => 50,
    styleProvider: 'ShapeNodeStyle',
    fill: () => '#ced129',
    shape: () => 'round-rectangle',
    stroke: () => '#82841a',
    template:'',
  })
  const labelConfiguration2 = await buildLabelConfiguration({
    textBinding: (item) => item.percentage+'%',
    placement: () => 'center',
    fill: () => '#821A4C',
  })
  const edgeCreator = await buildEdgeCreator([labelConfiguration2], {
    stroke: () => '2px rgb(129,78,120)',
    sourceArrow: () => 'none',
    targetArrow: () => 'triangle',
  })

  const out = await project<NodeWithEdge>(data, { binding: (item) => item.nodes.filter(x=>!x.filterd) })
  const out_filterd = await project<NodeWithEdge>(data, { binding: (item) => item.nodes.filter(x=>x.filterd) })
  
  const nodesSource = await buildNodesSourceData(
    { data: out, nodeCreator },
    { idProvider: (item) => item.id }
  )
  const nodesSourceFilterd = await buildNodesSourceData(
    { data: out_filterd,nodeCreator:nodeCreatorFilterd },
    { idProvider: (item) => item.id }
  )
  const out2 = await project(data, { binding: (item) => item.edges })
  const edgesSource = await buildEdgesSourceData(
    { data: out2, edgeCreator },
    {
      idProvider: (item) => item.id,
      sourceIdProvider: (item) => item.fromNode,
      targetIdProvider: (item) => item.toNode,
    }
  )
  const graph = await buildGraph({
    nodesSources: [nodesSource,nodesSourceFilterd],
    edgesSources: [edgesSource],
  })
  const out3 = await arrange(graph, {
    worker: false,
    name: 'HierarchicLayout',
    properties: {
      layoutOrientation: 'top-to-bottom',
      integratedEdgeLabeling: false,
      nodeToNodeDistance: 50,
      minimumLayerDistance: 50,
      automaticEdgeGrouping: true,
      gridColumns: undefined,
      gridRows: undefined,
    },
  })

  return out3
}
