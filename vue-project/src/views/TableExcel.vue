<template>
        <table>
            <tr>
                <td>classId</td>
                <td>x</td>
                <td>y</td>
            </tr>
            <tr v-for="item in SearchList">
                <td>
                    <input type="text" title="classId" v-model="item.classId">
                </td>
                <td>
                    <input type="text" title="x" v-model="item.x">
                </td>
                <td>
                    <input type="text" title="y" v-model="item.y">
                </td>
            </tr>
        </table>
            
        <table>
            <tr>
                <td>x</td>
                <td>x</td>
                <td>y</td>
            </tr>
            <tr class="one">
                <td>我是第一行 <button @click="openCollapse">按我</button></td>
                <td>x</td>
                <td>y</td>
            </tr>
            <tr class="two">
                <td>我是第一行的裡面</td>
                <td>x</td>
                <td>y</td>
            </tr>
            <tr>
                <td>我是第二行</td>
                <td>x</td>
                <td>y</td>
            </tr>
        </table>
</template>
    
<script setup >
     import { onMounted, nextTick, ref , reactive} from 'vue'

    const SearchList = reactive([]) ;
    for (let index = 0; index <= 10; index++) {
        SearchList.push({classId: "", x: "", y: ""});
    }

    document.addEventListener("paste", e=> {
        e.preventDefault();
        e.stopPropagation();

        let paste = (e.clipboardData || window.clipboardData).getData("text");
        console.log(paste);
        let arr = paste.split("\r\n");

        let list = arr.map(item => {
            return item.split("\t").filter(con => con);
        }).filter(item => item.length);

        console.log(list);

        let trIndex = e.target.parentNode.parentNode.rowIndex;

        let searchList = [...SearchList];

        if(e.target.title == 'classId') {
            list.forEach((item, index) => {
                searchList[index +trIndex -1] = {};
                searchList[index +trIndex -1].classId = item[0];
                searchList[index +trIndex -1].x = item[1];
                searchList[index +trIndex -1].y = item[2];
            }); 
        } else if(e.target.title == 'x') {
            list.forEach((item, index) => {
                searchList[index +trIndex -1] = {};
                searchList[index +trIndex -1].classId = "";
                searchList[index +trIndex -1].x = item[0];
                searchList[index +trIndex -1].y = item[1];
            }); 
        } else if(e.target.title == 'y') {
            list.forEach((item, index) => {
                searchList[index +trIndex -1] = {};
                searchList[index +trIndex -1].classId = "";
                searchList[index +trIndex -1].x = "";
                searchList[index +trIndex -1].y = item[0];
            }); 
        }

        SearchList.splice(0 , SearchList.length, ...searchList);
    })

    const openCollapse = (e) => {
        console.log(e);
        document.querySelector('.two').classList.toggle('open')
    }
</script>
    
<style lang="scss">
    table, td{
        border: 1px solid #000;
    }

    td{
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        input{
            width: 100%;
            height: 100%;
            border: 0;
            padding: 0 10px;
        }
    }

    .two {
        display: none;
        transition: height .4s ease-out;
        &.open{
            display: table-row;
        }
    }
</style>