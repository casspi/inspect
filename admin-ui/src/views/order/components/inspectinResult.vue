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
            <el-form-item label="检验时间">
                <el-date-picker
                    v-model="form.time"
                    type="datetime"
                    placeholder="选择检验时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="检验项">
                <el-row style="margin-bottom: 8px" v-for="(item,index) in form.items" :key="item" :gutter="10">
                    <el-col span="6">
                        <el-input
                            v-model="item.name"
                            autocomplete="off"
                            placeholder="项目名"
                            maxlength="50">
                        </el-input>
                    </el-col>
                    <el-col span="5">
                        <el-input
                            v-model="item.value"
                            autocomplete="off"
                            placeholder="检验结果值"
                            type="number"
                            step="0.01">
                        </el-input>
                    </el-col>
                    <el-col span="5">
                        <el-input
                            v-model="item.acceptanceValue"
                            placeholder="检验参考值"
                            autocomplete="off"
                            type="number">
                        </el-input>
                    </el-col>
                    <el-col span="5" >
                        <el-select v-model="item.result" placeholder="结果判断">
                            <el-option label="偏低" value="1"></el-option>
                            <el-option label="偏高" value="2"></el-option>
                            <el-option label="偏高" value="2"></el-option>
                        </el-select>
                    </el-col>
                    <el-col span="2">
                        <el-button v-if="index === 0" icon="el-icon-plus" type="primary" @click="handleAdd" plain circle></el-button>
                        <el-button v-else type="danger" icon="el-icon-delete" @click="handleDelete(index)" plain circle></el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            visible: false,
            resolve: '',
            reject: '',
            data: null,
            form:{
                result: '',
                time: '',
                acceptanceValue:'',
                items:[
                    { name:'', value: '', acceptanceValue: '', result: ''}
                ]
            }
        }
    },
    methods: {
        show(data) {
            console.log(data)
            this.data = data
            this.visible = true
            return new Promise((resolve,reject) => {
                this.resolve = resolve
                this.reject = reject
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
            this.resolve()
            this.hide()
        }
    }
}
</script>
