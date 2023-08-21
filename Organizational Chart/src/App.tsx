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

import { useState } from 'react'
import './App.css'
import logo from './assets/yWorksLogo.png'
import ReactGraphComponent from './components/ReactGraphComponent'
import Toolbar from './components/Toolbar'
import { GraphComponent } from 'yfiles'
import { GraphComponentContext } from './lib/GraphComponentContext'
import ReactGraphOverviewComponent from './components/GraphOverviewComponent'
import { UserInputDialog } from './components/UserInputDialog'

export type NodeType={id:number,name:string,filterd:boolean}
export type EdgeType={id:number,fromNode:number,toNode:number,percentage:Number}
export type NodeWithEdge={nodes:NodeType[],edges:EdgeType[]}
const data:NodeWithEdge = {
  nodes:[
    {id:1,name:'uniliver-usa',filterd:false},
    {id:2,name:'uniliver-bd',filterd:true},
    {id:3,name:'uniliver-ind',filterd:false},
    {id:4,name:'uniliver-pak',filterd:false},
    {id:5,name:'uniliver-sl',filterd:false}
  ],
  edges:[
    {id:1,fromNode:1,toNode:2,percentage:100},
    {id:1,fromNode:1,toNode:3,percentage:100},
    {id:1,fromNode:2,toNode:4,percentage:60},
    {id:1,fromNode:3,toNode:4,percentage:40},
    {id:1,fromNode:4,toNode:5,percentage:10},
    {id:1,fromNode:3,toNode:5,percentage:10},
    {id:1,fromNode:2,toNode:5,percentage:20},
    {id:1,fromNode:1,toNode:5,percentage:60}
  ]
}

function App() {
  const graphComponentState = useState<GraphComponent | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')

  return (
    <div className="app">
      <GraphComponentContext.Provider value={graphComponentState}>
        <div className="header">
          <div className="title">Organizational Chart</div>
          <Toolbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <UserInputDialog />
        <div className="main">
          <ReactGraphComponent searchQuery={searchQuery} data={data}/>
        </div>
        <div style={{ position: 'absolute', left: '20px', top: '68px' }}>
          <ReactGraphOverviewComponent />
        </div>
        <div style={{ position: 'absolute', bottom: '20px', right: '15px' }}>
          <a
            href="https://yworks.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: '10px' }}
          >
            <img
              src={logo}
              style={{ height: '50px', width: '50px' }}
              alt="yWorks Logo"
            />
          </a>
        </div>
      </GraphComponentContext.Provider>

<div>
  <button>A</button>
  <button>B</button>
  <button>C</button>
</div>

    </div>
  )
}

export default App
