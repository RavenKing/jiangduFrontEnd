<template lang="html">
<div>
    <sui-form>
        <!-- <sui-form-fields>
            <sui-form-field>
                <label>总建筑面积</label>
                <sui-input placeholder="总建筑面积" v-model="singleRoom.space" disabled type="number" />
            </sui-form-field>
            <sui-form-field style="width:25%;">
                <label>公共面积</label>
                <sui-input placeholder="公共面积" v-model="singleRoom.space1" disabled type="number" />
            </sui-form-field>
            <sui-form-field style="width:25%;">
                <label>产证面积</label>
                <sui-input placeholder="产证面积" v-model="singleRoom.space2" disabled type="number" />
            </sui-form-field>
            <sui-form-field style="width:25%;">
                <label>无证面积</label>
                <sui-input placeholder="无证面积" v-model="singleRoom.space3" disabled type="number" />
            </sui-form-field>
        </sui-form-fields> -->
        <sui-form-fields inline>
            
            <sui-form-field style="width:33.33333%">
                <label style="margin-bottom:10px;display: block;">办公室面积(m²)</label>
                <sui-input style="width:100%;" placeholder="办公室面积" v-model="singleRoom.space7" disabled />
            </sui-form-field>
            
            <sui-form-field style="width:33.33333%">
                <label style="margin-bottom:10px;display: block;">办公室数量(个)</label>
                <sui-input style="width:100%;" placeholder="办公室数量" v-model="singleRoom.space8" disabled />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields inline>
<!--             
            <sui-form-field style="width:33.33333%">
                <label style="margin-bottom:10px;display: block;">服务用房面积(m²)</label>
                <sui-input style="width:100%;" placeholder="服务用房面积" v-model="singleRoom.space2" disabled />
            </sui-form-field> -->
            <!-- <label>土地面积</label>
            <sui-form-field>
                <sui-input placeholder="土地面积" v-model="singleRoom.tudispace" disabled />
            </sui-form-field>
            <label>建筑面积</label>
            <sui-form-field>
                <sui-input placeholder="建筑面积" v-model="singleRoom.jianzhuspace" disabled />
            </sui-form-field> -->
            
            <sui-form-field style="width:33.33333%">
                <label style="margin-bottom:10px;display: block;">设备用房面积(m²)</label>
                <sui-input style="width:100%;" placeholder="设备用房面积" v-model="singleRoom.space28" disabled />
            </sui-form-field>
            <!-- <sui-form-field>
                <label>设备用房使用面积</label>
                <sui-input placeholder="设备用房使用面积" v-model="singleRoom.space29" disabled />
            </sui-form-field> -->
            
            <sui-form-field style="width:33.33333%">
                <label style="margin-bottom:10px;display: block;">附属用房面积(m²)</label>
                <sui-input style="width:100%;" placeholder="附属用房面积" v-model="singleRoom.space40" disabled />
            </sui-form-field>
        </sui-form-fields>

        <sui-form-fields inline>
            <sui-form-field style="width:33.33333%">
                <label style="margin-bottom:10px;display: block;">业务用房面积(m²)</label>
                <sui-input style="width:100%;" placeholder="业务用房面积" v-model="singleRoom.space25" disabled />
            </sui-form-field>
            <sui-form-field style="width:33.33333%">
                <label style="margin-bottom:10px;display: block;">其他用房面积(m²)</label>
                <sui-input style="width:100%;" placeholder="其他用房面积" v-model="singleRoom.space24" disabled />
            </sui-form-field>
            
            <!-- <sui-form-field style="width:33.33333%">
                <label style="margin-bottom:10px;display: block;">业务用房类型</label>
                <sui-input style="width:100%;" placeholder="业务用房类型" v-model="singleRoom.space24" disabled />
            </sui-form-field> -->
        </sui-form-fields>

        <!-- <div v-show="singleRoom.space8&&singleRoom.space7&&singleRoom.space8>0&&singleRoom.space7>0">
            <div is="sui-divider" horizontal>
                <h4 is="sui-header">
                    <i class="bar chart icon"></i>
                    办公室
                </h4>
            </div>
            <sui-form-fields>
                <sui-form-field style="width:25%;">
                    <label>会议室面积</label>
                    <sui-input placeholder="会议室面积" v-model="singleRoom.space9" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>会议室数量</label>
                    <sui-input placeholder="会议室数量" v-model="singleRoom.space10" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>接待室面积</label>
                    <sui-input placeholder="接待室面积" v-model="singleRoom.space11" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>档案室面积</label>
                    <sui-input placeholder="档案室面积" v-model="singleRoom.space12" disabled type="number" />
                </sui-form-field>
            </sui-form-fields>
            <sui-form-fields>
                <sui-form-field style="width:25%;">
                    <label>图书资料室面积</label>
                    <sui-input placeholder="图书资料室面积" v-model="singleRoom.space13" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>文印室面积</label>
                    <sui-input placeholder="文印室面积" v-model="singleRoom.space15" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>机关信息网络房面积</label>
                    <sui-input placeholder="机关信息网络房面积" v-model="singleRoom.space14" disabled type="number" />
                </sui-form-field>
            </sui-form-fields>
            <sui-form-fields>
                <sui-form-field style="width:25%;">
                    <label>机要保密室面积</label>
                    <sui-input placeholder="机要保密室面积" v-model="singleRoom.space16" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>收发室面积</label>
                    <sui-input placeholder="收发室面积" v-model="singleRoom.space17" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>储藏室面积</label>
                    <sui-input placeholder="储藏室面积" v-model="singleRoom.space18" disabled type="number" />
                </sui-form-field>
            </sui-form-fields>
            <sui-form-fields>
                <sui-form-field style="width:25%;">
                    <label>医务室面积</label>
                    <sui-input placeholder="医务室面积" v-model="singleRoom.space19" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>值班室面积</label>
                    <sui-input placeholder="值班室面积" v-model="singleRoom.space20" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>开水间面积</label>
                    <sui-input placeholder="开水间面积" v-model="singleRoom.space21" disabled type="number" />
                </sui-form-field>
            </sui-form-fields>
            <sui-form-fields>
                <sui-form-field style="width:25%;">
                    <label>卫生间面积</label>
                    <sui-input placeholder="卫生间面积" v-model="singleRoom.space22" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>物业及工勤人员用房面积</label>
                    <sui-input placeholder="物业及工勤人员用房面积" v-model="singleRoom.space23" disabled type="number" />
                </sui-form-field>

            </sui-form-fields>
        </div> -->
        <!-- <div>
            <div is="sui-divider" horizontal>
                <h4 is="sui-header">
                    <i class="bar chart icon"></i>
                    业务用房
                </h4>
            </div>
            <sui-form-fields>
                <sui-form-field style="width:25%;">
                    <label>业务用房名称</label>
                    <sui-input placeholder="业务用房名称" v-model="singleRoom.space24" disabled />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>业务用房面积</label>
                    <sui-input placeholder="业务用房面积" v-model="singleRoom.space25" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>业务用房使用面积</label>
                    <sui-input placeholder="业务用房使用面积" v-model="singleRoom.space26" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>业务用房使用用途</label>
                    <sui-input placeholder="业务用房使用用途" v-model="singleRoom.space24" disabled />
                </sui-form-field>
            </sui-form-fields>
        </div> -->
        <!-- <div v-show="singleRoom.space28&&singleRoom.space29&&singleRoom.space28>0&&singleRoom.space29>0">
            <div is="sui-divider" horizontal>
                <h4 is="sui-header">
                    <i class="bar chart icon"></i>
                    设备用房
                </h4>
            </div>
            <sui-form-fields>

                <sui-form-field style="width:25%;">
                    <label>变配电间面积</label>
                    <sui-input placeholder="变配电间面积" v-model="singleRoom.space30" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>锅炉房面积</label>
                    <sui-input placeholder="锅炉房面积" v-model="singleRoom.space31" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>通讯机房面积</label>
                    <sui-input placeholder="通讯机房面积" v-model="singleRoom.space32" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>电梯机房</label>
                    <sui-input placeholder="电梯机房" v-model="singleRoom.space33" disabled />
                </sui-form-field>
            </sui-form-fields>
            <sui-form-fields>
                <sui-form-field style="width:25%;">
                    <label>空调机房</label>
                    <sui-input placeholder="空调机房" v-model="singleRoom.space34" disabled />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>建筑智能化系统设备</label>
                    <sui-input placeholder="建筑智能化系统设备" v-model="singleRoom.space35" disabled />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>水泵房面积</label>
                    <sui-input placeholder="水泵房面积" v-model="singleRoom.space36" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>水箱房面积</label>
                    <sui-input placeholder="水箱房面积" v-model="singleRoom.space37" disabled type="number" />
                </sui-form-field>

            </sui-form-fields>
            <sui-form-fields>

                <sui-form-field style="width:25%;">
                    <label>中水处理房</label>
                    <sui-input placeholder="中水处理房" v-model="singleRoom.space38" disabled />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>设备用房其他用房面积</label>
                    <sui-input placeholder="设备用房其他用房面积" v-model="singleRoom.space39" disabled type="number" />
                </sui-form-field>
            </sui-form-fields>
        </div>
        <div v-show="singleRoom.space40&&singleRoom.space40>0">
            <div is="sui-divider" horizontal>
                <h4 is="sui-header">
                    <i class="bar chart icon"></i>
                    附属用房
                </h4>
            </div>
            <sui-form-fields>
                <sui-form-field style="width:25%;">
                    <label>食堂面积</label>
                    <sui-input placeholder="食堂面积" v-model="singleRoom.space41" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>汽车库位数量</label>
                    <sui-input placeholder="汽车库位数量" v-model="singleRoom.space42" disabled />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>汽车库位面积</label>
                    <sui-input placeholder="汽车库位面积" v-model="singleRoom.space43" disabled type="number" />
                </sui-form-field>
            </sui-form-fields>
            <sui-form-fields>

                <sui-form-field style="width:25%;">
                    <label>自行车库位数量</label>
                    <sui-input placeholder="自行车库位数量" v-model="singleRoom.space44" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>自行车库位面积</label>
                    <sui-input placeholder="自行车库位面积" v-model="singleRoom.space45" disabled type="number" />
                </sui-form-field>
            </sui-form-fields>
            <sui-form-fields>
                <sui-form-field style="width:25%;">
                    <label>电动/摩托车库位数量</label>
                    <sui-input placeholder="电动/摩托车库位数量" v-model="singleRoom.space46" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>电动/摩托车库位面积</label>
                    <sui-input placeholder="电动/摩托车库位面积" v-model="singleRoom.space47" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>人防设置</label>
                    <sui-input placeholder="人防设置" v-model="singleRoom.space48" disabled />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>消防设施</label>
                    <sui-input placeholder="消防设施" v-model="singleRoom.space49" disabled />
                </sui-form-field>
            </sui-form-fields>
            <sui-form-fields>
                <sui-form-field style="width:25%;">
                    <label>警卫用房人数</label>
                    <sui-input placeholder="警卫用房人数" v-model="singleRoom.space50" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>警卫用房面积</label>
                    <sui-input placeholder="警卫用房面积" v-model="singleRoom.space51" disabled type="number" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <label>附属用房其他面积</label>
                    <sui-input placeholder="附属用房其他面积" v-model="singleRoom.space52" disabled type="number" />
                </sui-form-field>
            </sui-form-fields>
        </div> -->
    </sui-form>
</div>
</template>

<script>
export default {
    props: ['singleRoom'],
    name: 'mianji-form',
    data() {
        return {
            disabled: false,
            zoomlevel: 14
        };
    },
    methods: {},
    created() {
        if (this.singleRoom.roomname == undefined) {
            this.singleRoom.roomname = ""
        }
    }
};
</script>

<style>
.BMap_cpyCtrl {
    display: none;
}

.anchorBL {
    display: none;
}

.map {
    width: 100%;
    height: 400px;
}
</style>
