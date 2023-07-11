<template>
    <h3>jsplumb使用</h3>
    <div id="container">
        <div>
            <div v-for="item in list1" :key="item.nodeId" :id="item.nodeId" name="joint">{{ item.name }}</div>
        </div>
        <div>
            <div v-for="item in list2" :key="item.nodeId" :id="item.nodeId" name="data">{{ item.name }}</div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
    import {ref, reactive,onMounted} from 'vue'  
    import jsPlumb from 'jsplumb'
    let $jsPlumb = jsPlumb.jsPlumb;
    let jsPlumb_instance: any; 
    const list1 = reactive([
        {name: "name1", nodeId: "name1", axis: '', type:''},
        {name: "name2", nodeId: "name2", axis: '', type:''},
        {name: "name3", nodeId: "name3", axis: '', type:''},
        {name: "name4", nodeId: "name4", axis: '', type:''},
        {name: "name5", nodeId: "name5", axis: '', type:''},
        {name: "name6", nodeId: "name6", axis: '', type:''}
    ]);
    const list2 = reactive([
        {name: 'data1', nodeId: 'data1'},
        {name: 'data2', nodeId: 'data2'},
        {name: 'data3', nodeId: 'data3'},
        {name: 'data4', nodeId: 'data4'},
        {name: 'data5', nodeId: 'data5'},
        {name: 'data6', nodeId: 'data6'}
    ]);
    onMounted(()=>{
        showPlumb();
    })
 
    const showPlumb = ()=> {
        jsPlumb_instance = $jsPlumb.getInstance({
            Container: 'container', 
            EndpointStyle: { fill: '#fff'}, 
            PaintStyle: {stroke: '#000', strokeWidth: 2}, 
            HoverPaintStyle: {stroke: '#1E90FF'}, 
            ConnectionOverlays: [ 
                ['Arrow', {
                    location: 1,
                    length: 10,
                    paintStyle: {
                        stroke: '#000',
                        fill: '#000'
                    }
                }]
            ],
            Connector: "Straight",
        },)
 
        console.log(jsPlumb_instance)
 
        jsPlumb_instance.batch(() => {
 
            for (let i = 0; i < list1.length; i++) {
                initLeaf(list1[i].nodeId, 'joint')
            }
            for (let i = 0; i < list2.length; i++) {
                initLeaf(list2[i].nodeId, 'data')
            }
        })
 
        const joint = document.getElementsByName('joint')
        const data = document.getElementsByName('data')
 
        jsPlumb_instance.setSourceEnabled(joint, true)
        jsPlumb_instance.setTargetEnabled(data, true)
        jsPlumb_instance.setDraggable(joint, false) 
        jsPlumb_instance.setDraggable(data, false) 
 
        jsPlumb_instance.bind('click',  (conn, originalEvent) => {
            jsPlumb_instance.deleteConnection(conn)
        })
 
    }
 
  
    const initLeaf = (id, type)=> {
        const ins = jsPlumb_instance;
        const elem = document.getElementById(id)
        if (type == 'joint') {
            ins.makeSource(elem, {
                anchor: 'AutoDefault',
                allowLoopback: false,
                maxConnections: 1
            })
        } else {
            ins.makeTarget(elem, {
                anchor: 'AutoDefault',
                allowLoopback: false,
                maxConnections: 1
            })
        }
    }
</script>
    
<style>
    #container {
    position: relative;
      margin-top: 20px;
      width: 100%;
      height: 300px;
      display: flex;
  }

 
  #container > div > div {
      line-height: 30px;
      margin: 0 0 17px 100px;
      background: #ef631e;
      color: #fff;
  }
</style>