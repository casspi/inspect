<template>
    <el-dialog
        :title="computedTitle"
        width="1000px"
        @update:visible="hide"
        :visible.sync="visible">
        <el-form :model="form" label-width="120px">
            <el-form-item label="检验员">
                <el-input
                    v-model="form.inspectionPersonal"
                    autocomplete="off"
                    maxlength="50"
                    show-word-limit
                    :readonly="type === 3">
                </el-input>
            </el-form-item>
            <el-form-item label="检验结果">
                <el-input
                    v-model="form.result"
                    autocomplete="off"
                    maxlength="50"
                    show-word-limit
                    :readonly="type === 3">
                </el-input>
            </el-form-item>
            <el-form-item label="检验编号">
                <el-input
                    v-model="form.inspectionNumber"
                    autocomplete="off"
                    maxlength="50"
                    show-word-limit
                    :readonly="type === 3">
                </el-input>
            </el-form-item>
            <el-form-item label="送检时间">
                <el-date-picker
                    v-model="form.inspectionSendTime"
                    type="datetime"
                    :readonly="type === 3"
                    placeholder="选择送检时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="检验时间">
                <el-date-picker
                    v-model="form.time"
                    type="datetime"
                    :readonly="type === 3"
                    placeholder="选择检验时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="检验结果">
                <div id="items">
                <el-row class="row-header">
                    <el-col :span="1">序号</el-col>
                    <el-col :span="5">项目名</el-col>
                    <el-col :span="4">检验结果值</el-col>
                    <el-col :span="4">检验参考值</el-col>
                    <el-col :span="4">单位</el-col>
                    <el-col :span="4">结果判断</el-col>
                    <el-col :span="2" v-if="type !== 3">操作</el-col>
                </el-row>
                <el-row class="item" :class="[1,2].includes(type)?'sortable-item':''" v-for="(item,index) in form.items" :key="index" :gutter="10">
                    <el-col :span="1">
                        {{index+1}}
                    </el-col>
                    <el-col :span="5">
                        <el-input
                            v-model="item.name"
                            autocomplete="off"
                            placeholder="项目名"
                            :readonly="type === 3"
                            maxlength="50">
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-input
                            v-model="item.value"
                            autocomplete="off"
                            :readonly="type === 3"
                            placeholder="检验结果值">
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-input
                            v-model="item.acceptanceValue"
                            placeholder="检验参考值"
                            :readonly="type === 3"
                            autocomplete="off">
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-input
                            v-model="item.unit"
                            placeholder="单位"
                            :readonly="type === 3"
                            autocomplete="off">
                        </el-input>
                    </el-col>
                    <el-col :span="4" >
                        <el-select v-model="item.result" placeholder="结果判断" :disabled="type === 3">
                            <el-option label="偏低" value="1"></el-option>
                            <el-option label="正常" value="2"></el-option>
                            <el-option label="偏高" value="3"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2" v-if="type !== 3">
                        <el-button v-if="index === 0" icon="el-icon-plus" type="primary" @click="handleAdd" plain circle></el-button>
                        <el-button v-else type="danger" icon="el-icon-delete" @click="handleDelete(index)" plain circle></el-button>
                    </el-col>
                </el-row>
            </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false" v-if="type != 3">取 消</el-button>
            <el-button type="primary" @click="handleConfirm" v-if="type != 3">确 定</el-button>
            <el-button type="primary" @click="handleConfirm" v-if="type == 3">关 闭</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { saveResult,getOrderItem } from "@/api/order/orderItem";
import Sortable from 'sortablejs'

export default {
    data() {
        return {
            visible: false,
            resolve: '',
            reject: '',
            data: null,
            id:'',
            type: 1,
            form:{
                result: '',
                time: '',
                inspectionNumber: '',
                acceptanceValue:'',
                items:[
                    { name:'', value: '', acceptanceValue: '', unit:'', result: ''},
                ]
            }
        }
    },
    computed: {
        computedTitle(){
            const title = {
                1: '录入结果',
                2: '补录结果',
                3: '查看结果',
            }
            return title[this.type]
        }
    },
    methods: {
        show(id, type) {
            this.visible = true
            this.id=id;
            this.type = type
            if([1,2].includes(type)){
                this.$nextTick(()=>{
                    this.sortableInit()
                })
            }
            if([2,3].includes(type)){
                this.detail(id,type)
            }
            return new Promise((resolve,reject) => {
                this.resolve = resolve;
                this.reject = reject;
            })
        },
        //获取详情
        detail(id,type) {
            getOrderItem(id).then((res) => {
                console.log("type  ",type);
                const { data } = res;
                const { resultItems: items, result, inspectionResultTime,inspectionSendTime,inspectionPersonal, inspectionNumber} = data;
                let items1 = items;
                if(items==null&&type==2){ //补录时 若是items==null了  页面无新增表单了
                items1=[
                    { name:'', value: '', acceptanceValue: '', unit:'', result: ''},
                ];
                }
                console.log("items1: ",items1);
                this.form = {
                    inspectionNumber, result, time: new Date(inspectionResultTime).toUTCString(), items:items1,inspectionSendTime:new Date(inspectionSendTime).toUTCString(),inspectionPersonal
                }
                console.log("dddd:  ",this.form);
            });
        },
        hide() {
            this.visible = false
            this.reject()
        },
        handleAdd() {
            this.form.items.push({ name:'', value: '', acceptanceValue: '', result: '' })
        },
        handleDelete(index){
            this.form.items.splice(index, 1)
        },
        //提交
        handleConfirm(){
            console.log(this.form.items);
            if([1,2].includes(this.type)){
                saveResult({id:this.id,
                    inspectionNumber:this.form.inspectionNumber,
                    result:this.form.result,
                    time:this.form.time,
                    inspectionPersonal:this.form.inspectionPersonal,
                    inspectionSendTime:this.form.inspectionSendTime,
                    resultItems:JSON.stringify(this.form.items)}).then((response) => {
                    console.log(response.data) ;
                    this.resolve()
                    this.hide()
                });
            }else {
                this.resolve()
                this.hide()
            }
        },
        //拖动排序
        sortableInit() {
            const that = this
            const el = document.getElementById('items')
            if(!el) return
            const sortable = new Sortable.create(el, {
                delay: 500,
                animation: 1000,
                onEnd: function (evt) {
                    if(evt.newIndex === evt.oldIndex) return
                    let _items = JSON.parse(JSON.stringify(that.form.items))
                    _items.splice(evt.newIndex, 1, ..._items.splice(evt.oldIndex, 1, _items[evt.newIndex]))
                    that.form.items = []
                    that.$nextTick(()=>{
                        that.form.items = _items
                    })
                },
                forceFallback: true,
                draggable: ".sortable-item"
            })
        }
    }
}
</script>
<style lang="scss">
    #items{
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currentlynot supported by any browser */
        //margin-left: 120px;
        line-height: 36px;
    }
    .item{
        &.sortable-item{
            cursor: move;
        }
        margin-bottom: 8px;

    }
    .row-header{
        font-weight: bolder;
    }
</style>
