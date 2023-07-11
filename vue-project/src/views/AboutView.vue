<template>
  <div>
    <button @click="createElement">{{ text }}</button>

    <div ref="plumbContainer" id="plumb-container">
      <div class="line-wrap" style="margin-left: 70px;">
        <div ref="source" class="endpoint item-1">New</div>
        <div ref="target" class="endpoint item-2">儲存</div>
        <!-- <div ref="target" class="state-item item-3">Saved</div>
        <div ref="target" class="state-item item-4">Unlocking</div>
        <div ref="target" class="state-item item-5">取消留單</div>
        <div ref="target" class="state-item item-6">寄出交易指示</div>
        <div ref="target" class="state-item item-7">Verifying</div>
        <div ref="target" class="state-item item-8">儲存</div>
        <div ref="target" class="state-item item-9">儲存</div>
        <div ref="target" class="state-item item-10">Locked</div>
        <div ref="target" class="state-item item-11">解圈</div>
        <div ref="target" class="state-item item-12">是否有圈存</div>
        <div ref="target" class="state-item item-13">Cancelled</div>
        <div ref="target" class="state-item item-14">Unlocking</div>
        <div ref="target" class="state-item item-15">繼續</div>
        <div ref="target" class="state-item item-16">紙本/電話</div>
        <div ref="target" class="state-item item-17">繼續</div>
        <div ref="target" class="state-item item-18">BOChecking</div>
        <div ref="target" class="state-item item-19">BOApprove/Reject</div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, reactive, onMounted } from 'vue';
  import jsPlumb from 'jsplumb'
  export default {
    data() {
      return {
        text: '555',
        isEditing: false,
        instance: null,
        connection: null
      };
    },
    mounted() {
      onMounted(() => {
      const instance = jsPlumb.getInstance();
      instance.setContainer(this.$el);

      // 创建连接线
      instance.connect({
        source: this.$refs.source,
        target: this.$refs.target,
        endpoint: 'Blank',
        paintStyle: {
          strokeWidth: 2,
          stroke: '#666',
          arrowWidth: 12,
          arrowHeight: 10,
          // 使用箭头样式
          connector: ['Flowchart', { stub: [0, 20], gap: 0, cornerRadius: 5, alwaysRespectStubs: true }],
          // 箭头样式
          endpoints: ['Blank', 'Arrow'],
        },
        });
      });
      // this.instance = jsPlumb.getInstance();
      // this.initializeJsPlumb();
    },
    methods: {
      createElement() {
        console.log(222);
        const str = `<div class="state-item item-3"></div>`;
        const range = document.createRange();
        const fragment = range.createContextualFragment(str);
        document.querySelector('#plumb-container').append(fragment);
        this.initializeJsPlumb('.item-3');
      },
      initializeJsPlumb(elementName) {
        const container = this.$refs.plumbContainer;
        const instance = jsPlumb.getInstance();
        instance.setContainer(container);
        let relations = [
            ["item-1", "item-2"],
            // ["item-2", "item-3"],
            // ["item-3", "item-4"],
            // ["item-3", "item-5"],
            // ["item-3", "item-6"],
            // ["item-6", "item-7"],
            // ["item-7", "item-8"],
            // ["item-8", "item-3"],
            // ["item-5", "item-12"],
            // ["item-12", "item-13"],
            // ["item-12", "item-14"],
            // ["item-19", "item-14"],
            // ["item-15", "item-14"],
            // ["item-16", "item-15"],
            // ["item-16", "item-17"],
            // ["item-17", "item-18"],
            // ["item-18", "item-19"],
        ];
        // jsPlumb.ready(() => {
        //   instance.connect({
        //     source: 'source',
        //     target: 'target',
        //     endpoint: 'Blank',
        //     paintStyle: {
        //       strokeWidth: 2,
        //       stroke: '#666',
        //       arrowWidth: 12,
        //       arrowHeight: 10,
        //       // 使用箭头样式
        //       connector: ['Flowchart', { stub: [0, 20], gap: 0, cornerRadius: 5, alwaysRespectStubs: true }],
        //       // 箭头样式
        //       endpoints: ['Blank', 'Arrow'],
        //     },
        //   });
          // for (const item of relations) {
          //     instance.connect(
          //       {
          //         source: item[0],
          //         target: item[1],
          //         endpoint: 'Blank',
          //         paintStyle: {
          //           strokeWidth: 2,
          //           stroke: '#666',
          //           arrowWidth: 12,
          //           arrowHeight: 10,
          //           // 使用箭头样式
          //           connector: ['Flowchart', { stub: [0, 20], gap: 0, cornerRadius: 5, alwaysRespectStubs: true }],
          //           // 箭头样式
          //           endpoints: ['Blank', 'Arrow'],
          //         },
          //       }
          //     );
          // }
          // 初始化连接
          // instance.connect({
          //   isSource: true,
          //   isTarget: true,
          //   connector: "Bezier",
          // });
        
          // const sourceEndpoint = {
          //   endpoint: 'Dot',
          //   anchors: ["Right"],
          //   isSource: true,
            
          // };
          // const targetEndpoint = {
          //   endpoint: 'Dot',
          //   anchors: ["Right"],
          //   cssClass:'custom-endpoint',
          //   isTarget: true,
          //   };
          // if(!!elementName) {
          //   instance.addEndpoint(document.querySelector(elementName), targetEndpoint);
          //   instance.draggable(document.querySelector(elementName));
          // }

          // instance.addSourceSelector('.item-1', {
          //   endpoint:"Rectangle",
          //   anchor:"Continuous"
          // })
          // instance.addSourceSelector('.item-2', {
          //   anchor:"Continuous"
          // })
          // instance.addEndpoint(document.querySelector('.item-1'), sourceEndpoint);
          // instance.addEndpoint(document.querySelector('.item-2'), targetEndpoint);
          // 设置节点可拖动
          // for (let index = 0; index < 19; index++) {
          //   instance.draggable(document.querySelector(`.item-${index+1}`));
          // }
        // });
      },
      startEditing() {
        if (!this.isEditing) {
          this.isEditing = true;
          this.instance.selectEndpoints({ element: document.querySelector('.draggable') }).setEnabled(false);
          this.connection = this.instance.connect({
            source: document.querySelector('.draggable'),
            target: document.querySelector('.draggable'),
            anchors: ['Right', 'Left'],
            paintStyle: { stroke: 'transparent' },
            hoverPaintStyle: { stroke: 'transparent' },
            overlays: [
              ['Label', { label: '<text-edit class="input-edit" v-model="text" @blur="finishEditing"></text-edit>', location: 0.5, cssClass: 'overlay-edit' }]
            ]
          });
          this.$nextTick(() => {
            document.querySelector('.input-edit').focus();
          });
        }
      },
      finishEditing() {
        this.isEditing = false;
        this.instance.selectEndpoints({ element: document.querySelector('.draggable') }).setEnabled(true);
        this.connection.removeOverlay('Label');
      }
    }
  }
</script>


<style lang="scss">
.endpoint {
  width: 100px;
  height: 50px;
  background-color: lightblue;
  text-align: center;
  line-height: 50px;
  margin-left: 100px;
  cursor: move;
}
  #plumb-container {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }
  .state-item {
    width: 80px;
    height: 40px;
    color: #606266;
    background: #f6f6f6;
    border: 2px solid rgba(0, 0, 0, 0.05);
    text-align: center;
    line-height: 40px;
    font-family: sans-serif;
    border-radius: 4px;
    margin-right: 60px;
    // position: absolute;
  }
  .line-wrap {
    display: flex;
    margin-bottom: 40px;
  }
  .custom-endpoint{
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background-color: #fa0101;
  }
  .draggable {
    position: absolute;
    width: 100px;
    height: 50px;
    background-color: lightblue;
    text-align: center;
    line-height: 50px;
    cursor: move;
  }

  .input-edit {
    width: 100%;
    border: none;
    outline: none;
  }

  .overlay-edit {
    position: absolute;
    top: -10px;
    left: -20px;
    width: 140px;
    height: 70px;
    border: 1px dashed gray;
    background-color: white;
    text-align: center;
    line-height: 50px;
    cursor: text;
  }
</style>
