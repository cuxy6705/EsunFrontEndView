<template>
    <div class="container">
        <div class="monitor-box">
            <h2 class="monitor-box__title">RIC管理</h2>
            <div class="ric-dropdown">
                <div class="dropdown">
                    <p>模式:</p>
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        管理
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">管理</a></li>
                        <li><a class="dropdown-item" href="#">審核申請</a></li>
                        <li><a class="dropdown-item" href="#">審核取消</a></li>
                    </ul>
                </div>
                <button class="btn btn-primary">儲存</button>
            </div>
            <div class="ric-row">
                <p>系統代碼:</p>
                <input type="text" v-model="sourceValue">
            </div>
            <div class="ric-row">
                <p>RIC:</p>
                <input type="text" v-model="ricValue">
            </div>
            <div class="ric-row">
                <p>訂閱:</p>
                <input type="text" v-model="subscriptionValue">
            </div>
            <button class="btn btn-primary" @click="updateGrid">查詢</button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">序號 </th>
                        <th scope="col">系統代碼</th>
                        <th scope="col">RIC <i class="sort-icon" @click="sortRic('num')">O</i> </th>
                        <th scope="col">訂閱狀況</th>
                        <th scope="col">覆核日</th>
                        <th scope="col">審核人員</th>
                        <th scope="col">變更人員</th>
                        <th scope="col">備註</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in displayedRicGrid">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.SOURCE }}</td>
                        <td>{{ item.RIC }}</td>
                        <td>{{  item.SUBSCRIPITON }}</td>
                        <td>{{  item.VERIFY_DATE }}</td>
                        <td>{{ item.CREATE_USER }}</td>
                        <td>{{ item.MODIFY_USER }}</td>
                        <td>{{ item.DESC }}</td>
                    </tr>
                </tbody>
            </table>
            <nav>
                <ul class="pagination">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
                    </li>
                    <li class="page-item" v-for="page in pages" :key="page" :class="{ active: currentPage === page }">
                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
                    </li>
                </ul>
            </nav>
        </div>

        <div class="monitor-box">
            <h2 class="monitor-box__title">RIC申請訂閱畫面</h2>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">System Code</span>
                <input type="text" class="form-control" v-model="applySubscription.source" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">申請人</span>
                <input type="text" class="form-control" v-model="applySubscription.createUser" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">備註</span>
                <input type="text" class="form-control" v-model="applySubscription.desc" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <button  class="btn btn-primary" @click="applySubscriptionFn">送出
                
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
            <h2 class="monitor-box__title">RIC取消訂閱畫面</h2>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">System Code</span>
                <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">申請人</span>
                <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" @change="changeAllType">
                                <label class="form-check-label" for="flexCheckChecked">
                                    全選
                                </label>
                            </div>
                        </th>
                        <th scope="col">RIC</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in checkList">
                        <td>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" :checked="item.type" id="flexCheckChecked">
                            </div>
                        </td>
                        <td>
                            {{item.label}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
    
</template>
    
<script setup>
    import { onMounted, nextTick, ref , reactive, onBeforeMount, computed} from 'vue'
    import axios from 'axios'

    const SearchList = reactive([{ric: ""}]) ;
    const checkList = reactive([
        {label: "123", type: false},
        {label: "123", type: false},
        {label: "123", type: false},
        {label: "123", type: false},
    ]) ;
    const applySubscription = reactive({
        source: '',
        createUser: '',
        subscription: 'Y',
        desc: '',
        ric: [],
    })
    let ricGrid = reactive([]);
    const sourceValue = ref('');
    const ricValue = ref('');
    const subscriptionValue = ref('');
    const currentPage = ref(1);
    const pageSize = ref(100);
    const totalPages = computed(() => Math.ceil(ricGrid.length / pageSize.value));

    onMounted(()=> {
        axios.post('http://jdm-dev.tpdrg.com:8088/SymbolList/getGrid', {}).then(e => {
            let d = JSON.parse(e.data.Data);
            Object.assign(ricGrid, d);
            console.log(ricGrid);
        })
    });

    const updateGrid = () => {
        console.log(sourceValue.value);
        console.log(ricValue.value);
        console.log(subscriptionValue.value);
        const data = {
            ric: ricValue.value,
        }
        console.log(data);
        axios.post('http://jdm-dev.tpdrg.com:8088/SymbolList/getGrid', {
            params: data
        }).then(e => {
            let d = JSON.parse(e.data.Data);
            Object.assign(ricGrid, d)
            // ricGrid = [...ricGrid,  d ];
            // ricGrid.push(data);
            console.log(ricGrid.length);
        })
    }

    const sortRic = (str) => {
        ricGrid.sort((a, b) => a.RIC.localeCompare(b.RIC));
        console.log(ricGrid);
        
    }
    // const openCollapse = (e) => {
    //     console.log(e.target.parentElement.parentElement.nextElementSibling);
    //     let el = e.target.parentElement.parentElement.nextElementSibling;
    //     el.classList.toggle('open')
    // }

    const changeAllType = (e) => {
        console.log(e.target.checked);
        checkList.map(item => {
            return item.type = e.target.checked;
        })
    }

    const displayedRicGrid = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return ricGrid.slice(start, end);
    });

    const pages = computed(() => {
      const pages = [];
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i);
      }
      return pages;
    });

    const changePage= (page) => {
      currentPage.value = page;
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    }

    const nextPage= () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    }

    const applySubscriptionFn = () => {
        console.log(applySubscription);
        const jsonObj = JSON.stringify(applySubscription);
        axios.post('http://localhost:8080/SymbolList/upSubscription', jsonObj).then(e => {
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
        applySubscription.ric = list;
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