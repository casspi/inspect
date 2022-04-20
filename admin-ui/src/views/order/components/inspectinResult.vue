<template>
    <el-dialog
        title="检验结果"
        width="1000px"
        @update:visible="hide"
        :visible.sync="visible">
        <el-form :model="form" label-width="120px">
            <el-form-item label="检验结果">
                <el-input
                    v-model="form.result"
                    autocomplete="off"
                    maxlength="50"
                    show-word-limit>
                </el-input>
            </el-form-item>
            <el-form-item label="检验编号">
                <el-input
                    v-model="form.inspectionNumber"
                    autocomplete="off"
                    maxlength="50"
                    show-word-limit>
                </el-input>
            </el-form-item>
            <el-form-item label="检验时间">
                <el-date-picker
                    v-model="form.time"
                    type="datetime"
                    placeholder="选择检验时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="检验项">
                <div id="items">
                    <el-row class="item" v-for="(item,index) in form.items" :key="index" :gutter="10">
                        <el-col :span="1">
                            {{index+1}}
                        </el-col>
                        <el-col :span="5">
                            <el-input
                                v-model="item.name"
                                autocomplete="off"
                                placeholder="项目名"
                                maxlength="50">
                            </el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-input
                                v-model="item.value"
                                autocomplete="off"
                                placeholder="检验结果值">
                            </el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-input
                                v-model="item.acceptanceValue"
                                placeholder="检验参考值"
                                autocomplete="off">
                            </el-input>
                        </el-col>
                        <el-col :span="5" >
                            <el-select v-model="item.result" placeholder="结果判断">
                                <el-option label="偏低" value="1"></el-option>
                                <el-option label="正常" value="2"></el-option>
                                <el-option label="偏高" value="3"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="2">
                            <el-button v-if="index === 0" icon="el-icon-plus" type="primary" @click="handleAdd" plain circle></el-button>
                            <el-button v-else type="danger" icon="el-icon-delete" @click="handleDelete(index)" plain circle></el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="handleConfirm">确 定</el-button>
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
            form:{
                result: '',
                time: '',
                inspectionNumber: '',
                acceptanceValue:'',
                items:[
                    { name:'1', value: '', acceptanceValue: '', result: ''},
                ]
            }
        }
    },
    watch: {
        'form.items': {
            handler() {
                // this.sortableInit()
            },
            deep: true
        }
    },
    methods: {
        show(id) {
            this.visible = true
            this.id=id;
            this.$nextTick(()=>{
                this.sortableInit()
            })
            return new Promise((resolve,reject) => {
                this.resolve = resolve;
                this.reject = reject;
            })
        },

        look(id) {
            this.visible = true
            this.id=id;
            getOrderItem(id).then((response) => {
             console.log(response.data) ;
          });
            return new Promise((resolve,reject) => {
                this.resolve = resolve;
                this.reject = reject;
            })

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

            //this.resolve()
            //this.hide()
            saveResult({id:this.id,inspectionNumber:this.form.inspectionNumber,result:this.form.result,time:this.form.time,resultItems:JSON.stringify(this.form.items)}).then((response) => {
                console.log(response.data) ;
            });
        },
        //拖动排序
        sortableInit() {
            const that = this
            const el = document.getElementById('items')
            console.log(el)
            if(!el) return
            const sortable = new Sortable.create(el, {
                delay: 600,
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
                draggable: ".item"
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
    }
    .item{
        cursor: move;
        margin-bottom: 8px;
    }
</style>
