<template>
    <div class="container">

        <div class="monitor-box">
            <h2 class="monitor-box__title">連線資訊</h2>
            <div class="monitor-box__row">
                <p class="monitor-box__row_title">SQL Server: </p>
                <p class="monitor-box__row_text">192.168.0.1</p>
                <p class="monitor-box__row_connect">connect</p>
            </div>
            <div class="monitor-box__row">
                <p class="monitor-box__row_title">Kafka:</p>
                <p class="monitor-box__row_text">192.168.0.1</p>
                <p class="monitor-box__row_disconnect">disconnect</p>
            </div>
            <div class="monitor-box__row">
                <p class="monitor-box__row_title">SFTP:</p>
                <p class="monitor-box__row_text"> volatility-Bespoke.2014-01-27.csv</p>
                <p class="monitor-box__row_connect">connect</p>
            </div>
            <div class="monitor-box__row">
                <p class="monitor-box__row_title">Redis:</p>
                <p class="monitor-box__row_text">127.0.0.1</p>
                <p class="monitor-box__row_disconnect">disconnect</p>
            </div>
            <div class="monitor-box__row">
                <p class="monitor-box__row_title">RFA: </p>
                <p class="monitor-box__row_text">volatility-Bespoke.2014-01-27.csv</p>
                <p class="monitor-box__row_connect">connect</p>
            </div>
        </div>
        <div class="monitor-box">
            <h2 class="monitor-box__title">RIC更新</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">RIC</th>
                    <th scope="col">Price</th>
                    <th scope="col">XXXX</th>
                    <th scope="col">crateTime</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    
    </div>
<template>
        
</template>

</template>

<script>
export default {
    data() {
      return {
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
}
</script>
<style lang="scss" scoped>
.monitor-box{
    border: 2px solid #616161;
    position: relative;
    margin-top: 100px;
    padding: 15px;
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
</style>