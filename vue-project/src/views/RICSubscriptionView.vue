<template>
        <div class="monitor-box">
            <h2 class="monitor-box__title">覆核通過申請</h2>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">System Code</span>
                <input type="text" class="form-control" v-model="applySubscription.source" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">申請人</span>
                <input type="text" class="form-control" v-model="applySubscription.modifyUser" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">備註</span>
                <input type="text" class="form-control" v-model="applySubscription.desc" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <button  class="btn btn-primary" @click="approvalSubscriptionFn('Y')">送出
                
            </button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">RIC</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="item in SearchList">
                        <td>
                            <input type="text" title="ric" v-model="item.ric" @paste="getRicApplyPaste">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="monitor-box">
            <h2 class="monitor-box__title">覆核退回申請</h2>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">System Code</span>
                <input type="text" class="form-control" v-model="applySubscription.source" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">申請人</span>
                <input type="text" class="form-control" v-model="applySubscription.modifyUser" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">備註</span>
                <input type="text" class="form-control" v-model="applySubscription.desc" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <button  class="btn btn-primary" @click="approvalSubscriptionFn('N')">送出
                
            </button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">RIC</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="item in SearchList">
                        <td>
                            <input type="text" title="ric" v-model="item.ric" @paste="getRicApplyPaste">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>
    
<script setup>
    import { onMounted, nextTick, ref , reactive, onBeforeMount, computed} from 'vue'
    import axios from 'axios'
     const SearchList = reactive([{ric: ""}]) ;
     const approvalSubscription = reactive({
        source: '',
        modifyUser: '',
        approval: 'Y',
        desc: '',
        ric: [],
    })
    
    const approvalSubscriptionFn = (approval) => {
        console.log(approvalSubscription);
        approvalSubscription.approval = approval;
        const jsonObj = JSON.stringify(applySubscription);
        axios.post('http://jdm-dev.tpdrg.com:8088/SymbolList/approval', jsonObj).then(e => {
            console.log(e);
        })
    }

    const getRicApplyPaste = (e) => {
        console.log(e);
        let paste = (e.clipboardData || window.clipboardData).getData("text");
        console.log(paste);
        let arr = paste.split("\r\n");

        let list = arr.map(item => {
            return item.split("\t").filter(con => con);
        }).filter(item => item.length);

        console.log(list);
        approvalSubscription.ric = list;
        let trIndex = e.target.parentNode.parentNode.rowIndex;

        let searchList = [...SearchList];

        if(e.target.title == 'ric') {
            list.forEach((item, index) => {
                searchList[index +trIndex -1] = {};
                searchList[index +trIndex -1].ric = item[0];
            }); 
        }
        SearchList.splice(0 , SearchList.length, ...searchList);
    }
</script>
    
<style lang="scss" scoped>
p{
    margin: 0;
}
td{
    position: relative;
    padding: 0 0 0 15px;
}
.monitor-box{
    border: 2px solid #616161;
    position: relative;
    margin-top: 100px;
    padding: 30px 15px;
    background-color: rgb(245, 245, 245);
    &__title{
        position: absolute;
        font-size: 38px;
        left: 50%;
        transform: translate(-50%);
        top: -25px;
        background-color: #fff;
        z-index: 88;
    }
    &__row{
        display: flex;
        align-items: center;
        width: 100%;
        &_title{
            flex-basis: 20%;
            width: 100%;
        }
        &_text{
            flex-basis: 40%;
            width: 100%;
        }
        &_connect{
            width: 100%;
            flex-basis: 40%;
            color: #83e66a;
            margin: 0 auto;
        }
        &_disconnect{
            width: 100%;
            flex-basis: 40%;
            margin: 0 auto;
            color: #ee2a2a;
        }
    }

}

.ric-row{
    display: flex;
    align-items: center;
}

.ric__add-icon{
    font-size: 20px;
    font-style: initial;
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
}
.ric-dropdown{
    display: flex;
    align-items: center;
    margin: 0 auto;
    p{
        margin: 0 10px 0 0;
    }
}

.ric-form-check{
    display: flex;
    justify-content: end;
    .form-check{
        margin: 0 30px;
    }   
}

    
.dropdown{
 margin: 0 10px;
 display: flex;
 align-items: center;
}

.sub{
    display: none;
    &.open{
        display: table-row;
    }
}

</style>