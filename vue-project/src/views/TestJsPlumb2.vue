<template>
    <div class="main">
        
      <ul  class="main-left" >
        <li v-for="item in menuList" :key="item.id" :draggable="true" @dragend="handleDragend($event, item)">{{item.label}}</li>
      </ul>
      <div class="main-right" @dragover.prevent ref="efContainerRef" id="efContainer">
        <div v-for="(item, index) in nodeList" :key="item.nodeId"  class="node-info flow-node-drag" @dblclick ="openPopup(index)"
          :style="item.nodeContainerStyle" :id="item.nodeId" :ref="el => nodeRef[index] = el"
          @mouseup="handleMouseup($event, item)">
          <TextEdit v-if="item.OverlayIsOpen"  :text-name="item.label" @change-text="getTextData($event, item)"></TextEdit>
          <div class="node-info-label">{{item.label}}</div>
          <!-- <span class="node-drag"></span> -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, nextTick, ref } from 'vue'
  import { jsPlumb, jsPlumbInstance } from 'jsplumb'
  import TextEdit from '../components/TextEdit.vue';

  
  
  const menuList = ref([ 
    {    label: 'New',    id: '1' },  
    {    label: '儲存',    id: '2' },  
    {    label: 'Saved',    id: '3' }, 
    {    label: 'Unlocking',    id: '4' },
    {    label: '取消留單',    id: '5' },
    {    label: '寄出交易指示',    id: '6' },
    {    label: 'Verifying',    id: '7' },
    {    label: '解圈',    id: '8' },
    {    label: '是否有圈存',    id: '9' },
    {    label: 'Cancelled',    id: '10' },
    {    label: '繼續',    id: '11' },
    {    label: '紙本/電話',    id: '12' },
    {    label: 'BOChecking',    id: '13' },
    {    label: 'BOApprove/Reject',    id: '14' },
    ])
  
  const deff = {
      jsplumbSetting: {
        Anchors: 'AutoDefault',
        anchor: 'AutoDefault',
        Container: 'efContainer',
        // Connector: ['Bezier', {curviness: 100}],
        // Connector: ['Straight', { stub: 20, gap: 1 }],
        Connector: ['Flowchart', { stub: 30, gap: 1, alwaysRespectStubs: false, midpoint: 0.5, cornerRadius: 10 }],
        // Connector: ['StateMachine', {margin: 5, curviness: 10, proximityLimit: 80}],
        ConnectionsDetachable: false,
        DeleteEndpointsOnDetach: false,
        Endpoint: ['Blank', { Overlays: '' }],
        EndpointStyle: { fill: '#1879ffa1', outlineWidth: 1 },
        LogEnabled: true,
        /**
           */
        PaintStyle: {
          stroke: '#E0E3E7',
          strokeWidth: 1,
          
          outlineStroke: 'transparent',
          outlineWidth: 10,
        },
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        ConnectionOverlays: [
          ['Custom', {
            create() {
              const el = document.createElement('div')
              el.innerHTML = '<select id=\'myDropDown\'><option value=\'foo\'>foo</option><option value=\'bar\'>bar</option></select>'
              return el
            },
            location: 0.7,
            id: 'customOverlay',
          }],
        ],
        /**
           *
           */
        Overlays: [
          ['Arrow', {
            width: 10,
            length: 8, 
            location: 1, 
            direction: 1, 
            foldback: 0.623,
          }],
          // ['Diamond', {        //     events: {        //         dblclick: function (diamondOverlay, originalEvent) {        //             console.log('double click on diamond overlay for : ' + diamondOverlay.component)        //         }        //     }        // }],
          ['Label', {          label: '',          location: 0.1,          cssClass: 'aLabel',        }],
  
        ],
        RenderMode: 'canvas',
        HoverPaintStyle: { stroke: '#b0b2b5', strokeWidth: 1 },
        // EndpointHoverStyle: {fill: 'red'}
        Scope: 'jsPlumb_DefaultScope', 
      },
      jsplumbConnectOptions: {
        isSource: true,
        isTarget: true,
        // anchor: 'Continuous',
        // anchor: ['Continuous', { faces: ['left', 'right'] }],
        labelStyle: {
          cssClass: 'flowLabel',
        },
        // overlays: [
        //   ['Custom', {
        //     create(component) {
        //       const el = document.createElement('div')
        //       el.innerHTML = '<select id=\'myDropDown\'><option value=\'foo\'>foo</option><option value=\'bar\'>bar</option></select>'
        //       return el
        //     },
        //     location: 0.7,
        //     id: 'customOverlay',
        //   }],
        // ],
      },
      jsplumbSourceOptions: {
        // filter: '.node-drag',
        // filterExclude: false,
        // anchor: 'AutoDefault',
        // allowLoopback: false,
        // maxConnections: -1,
        endpoint:"Dot",
        anchor: "Continuous",
        paintStyle: {
          strokeWidth: 1
        },
      },
      // jsplumbSourceOptions2: {
      //   filter: '.node-drag',
      //   filterExclude: false,
      //   // anchor: 'Continuous',
      //   allowLoopback: true,
      //   connector: ['Flowchart', { curviness: 50 }],
      //   connectorStyle: {
      //     stroke: 'red',
      //     strokeWidth: 1,
      //     outlineStroke: 'transparent',
      //     outlineWidth: 10,
      //   },
      //   connectorHoverStyle: { stroke: 'red', strokeWidth: 2 },
      // },
      jsplumbTargetOptions: {
        // filter: '.node-drag',
        // filterExclude: false,
        // anchor: 'AutoDefault',
        // allowLoopback: false,
        // dropOptions: { hoverClass: 'ef-drop-hover' },
        endpoint:"Dot",
        anchor: "Continuous",
        paintStyle: {
          strokeWidth: 1
        },
      },
    }
  
  const nodeList = ref([])
  const efContainerRef = ref()
  const nodeRef = ref([])
  let plumbIns
  
  const jsPlumbInit = () => {
    plumbIns.importDefaults(deff.jsplumbSetting)
  }
  
  const handleDragend = (ev, node) => {
    const evClientX = ev.clientX
    const evClientY = ev.clientY
    const efContainer = efContainerRef.value
    const containerRect = efContainer.getBoundingClientRect()
    let left = evClientX - efContainer.offsetLeft
    let top = evClientY - efContainer.offsetTop
    left -= 51
    top -= 19
    const nodeId = `${node.id}_${Date.now()}`
    const nodeInfo = {
      label: node.label,
      id: nodeId,
      nodeId,
      nodeContainerStyle: {
        left: left + 'px',
        top: top + 'px'
      },
      OverlayIsOpen:false,
      draggableStatus: true
    }
    nodeList.value.push(nodeInfo)
    nextTick(() => {
      plumbIns.makeSource(nodeId, deff.jsplumbSourceOptions)
      plumbIns.makeTarget(nodeId, deff.jsplumbTargetOptions)
      // plumbIns.draggable(nodeId);
      // setTimeout(()=> {
      //   plumbIns.draggable(nodeId,  false);
      // })
      // plumbIns.draggable(nodeId,  {
      //   start: function(event) {
      //     const element = event.el;
          
      //     clearTimeout(timeoutId);
      //   },
      //   stop: function(event) {
      //     const element = event.el;
      //     timeoutId = setTimeout(function() {
      //         plumbIns.makeSource(nodeId, deff.jsplumbSourceOptions)
      //         plumbIns.makeTarget(nodeId, deff.jsplumbTargetOptions)
      //     }, 1000); 
          
      //   }
      // })
    })
  }
  
  const handleMouseup = (ev, data) => { 
    nodeRef.value.forEach(node => {
      if (node.id === data.nodeId) {
        data.nodeContainerStyle.left = node.style.left
        data.nodeContainerStyle.top = node.style.top
      }
      // if(data.draggableStatus) {
      //   jsPlumb.unmakeSource(data.nodeId);
      //   jsPlumb.unmakeTarget(data.nodeId);
   
      //   // jsPlumb.draggable(data.nodeId);
      // } else {
      //   // jsPlumb.unmakeDraggable(data.nodeId);
      //   jsPlumb.makeSource(data.nodeId, deff.jsplumbSourceOptions);
      //   jsPlumb.makeTarget(data.nodeId, deff.jsplumbTargetOptions);
      // }
    })

    nodeList.value.forEach(el => {
      // plumbIns.makeSource(el.nodeId, deff.jsplumbSourceOptions)
      // plumbIns.makeTarget(el.nodeId, deff.jsplumbTargetOptions)
      jsPlumb.unmakeSource(el.nodeId);
      jsPlumb.unmakeTarget(el.nodeId);
    });
    
  }
  
  const openPopup = (idx) => {
    console.log('openPopup');
    console.log(nodeList);
    nodeList.value[idx].OverlayIsOpen = true;
    
  }

  const getTextData = (event, item) => {
    console.log(event);
    item.label = event;
    item.OverlayIsOpen = false;
  }
  onMounted(() => {
    plumbIns = jsPlumb.getInstance();
    plumbIns.bind('click',  (conn, originalEvent) => {
        console.log(conn);
        console.log(originalEvent);
    })
    jsPlumbInit()
  })
  
  </script>
  
  <style>
  body {
    margin: 0;
  }
    .item {
      width: 150px;
      height: 50px
    }
    #source {
      border: 2px solid red;
    }
    #target {
      border: 2px solid blue;
    }
    .main {
      display: flex;
      height: 100vh;
      width: 100%;
    }
    ul {
      list-style: none;
      padding-left: 0;
      width: 120px;
      background: #eee;
      text-align: center;
    }
    ul > li {
      height: 40px;
      line-height: 40px;
    }
    .main-right {
      border: 1px solid #ccc;
      flex: 1;
      margin-left: 15px;
      position: relative;
      background: #f4f4f4;
    }
    .node-info {
      position: absolute;
    }
    .node-info-label {
      width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      border: 1px solid #e5e7eb;
      background: #fff;
      border-radius: 4px;
    }
    .node-info-label:hover {
      cursor: pointer;
      background: #f4eded;
    }
    .node-info-label:hover + .node-drag {
      /* background: red; */
      display: inline-block;
    }
    .node-drag {
      display: none;
      width: 10px;
      height: 10px;
      border-radius: 20px;
      border: 1px solid #ccc;
      position: absolute;
      right: 0px;
      top: 0px;
    }
    .node-drag:hover {
      display: inline-block;
    }
  </style>
  