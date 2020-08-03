<template>
  <wl-container>
    <div class="map" ref="mapBox">
      <sui-dimmer v-if="dimmerShow" active inverted>
        <sui-loader>Loading...</sui-loader>
      </sui-dimmer>
      <div class="mapInput">
        <div class="mapItemSelect">
          <sui-dropdown class="w100" placeholder="房屋类型" selection :options="housingList" v-model="housing" />
        </div>
        <div class="mapItemSelect">
          <sui-dropdown class="w100" placeholder="房屋用途" selection :options="natureList" v-model="nature" />
        </div>
        <div class="mapItemInput">
          <sui-input class="w100" placeholder="请输入楼房名字" v-model="enterAddress" />
        </div>
        <button type="button" @click="showgeolistApi">搜索</button>
      </div>
       <baidu-map class="bmView" :scroll-wheel-zoom="true" :center="center" :zoom="zoom" ak="4b9aafff64aae8f8b6aa93aa59e3d014">
         <BaiduMapView></BaiduMapView>
         <BaiduMarkerClusterer :averageCenter="true">
           <BaiduMarker :title="activeName" :class="{'bmActive': activeName == marker.name}" v-for="marker of markers" :key="marker.id" :position="{lng: marker.lon, lat: marker.lat}" @click="lookDetail(marker)"></BaiduMarker>
          </BaiduMarkerClusterer>
         <BaiduInfoWindow :position="{lng: infoWindow.info.lon, lat: infoWindow.info.lat}" :title="infoWindow.info.name" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
           json：{{infoWindow.info}}
         </BaiduInfoWindow>
       </baidu-map>
    </div>
  </wl-container>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BaiduMapView from "vue-baidu-map/components/map/MapView.vue";
import BaiduMarkerClusterer from  'vue-baidu-map/components/extra/MarkerClusterer';
import BaiduInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow';
import BaiduMarker from 'vue-baidu-map/components/overlays/Marker';
import { showgeolistApi,showunitbyroomidApi } from "@/api/roomDataAPI";

export default {
  name: "mapPage",
  components: {
    BaiduMap,
    BaiduMapView,
    BaiduMarkerClusterer,
    BaiduInfoWindow,
    BaiduMarker
  },
  data() {
    return {
      dimmerShow:false,
      enterAddress:undefined, //输入搜索内容
      searchEnterAddress:undefined, //搜索地址
      center: {lng: 121.48054, lat: 31.235929},
      zoom: 13,
      lng:undefined,
      lat:undefined,
      selectedLng:undefined,
      selectedLat:undefined,
      housing:'',
      nature:'',
      housingList:[{
        text: "全部",
        value: ''
      },{
        text: "自有房屋",
        value: "1"
      },
      {
        text: "租赁房屋",
        value: "2"
      }],
      natureList:[{
        text: "全部",
        value: ''
      },{
        text: "办公性",
        value: "1"
      },
      {
        text: "经营性",
        value: "2"
      }],
      markers:[],
      infoWindow:{
        show:false,
        info:{
          name:undefined
        }
      },
      activeName:undefined
    }
  },
  mounted() {
  },
  methods: {
    infoWindowClose(e){
      this.infoWindow.show =false;
    },
    infoWindowOpen(e){
      this.infoWindow.show =true;
    },
    lookDetail(data, target){
      this.activeName=data.name;
      this.infoWindow.show =true;
      this.infoWindow.info=data;
      this.$nextTick(()=>{ //滚动到指定元素位置
        var obj=document.querySelector(".bmActive");
        var scrollTop=obj.offsetTop;
        this.$refs.mapBox.scrollTop=scrollTop-180;
      })
    },
    showgeolistApi(){
      this.dimmerShow=true;
      var payload={
        Type:this.housing,
        Kind:this.nature,
        Name:this.enterAddress
      };
      showgeolistApi(payload).then((result) => {
        if (result.data.code == 0) {
          this.markers=[];
          result.data.data.map(r=>{
            if(r.lon && r.lat){
              this.markers.push(r);
            }
          });
          this.zoom=13;
          if(this.markers && this.markers.length>0){
            this.center={lng: this.markers[0].lon, lat: this.markers[0].lat}
          }
          console.log(this.center);
        }
        this.dimmerShow=false;
      }).catch(() => {});
    }
  }
};
</script>

<style>
.bmView{
  height: 100vh;
}
.bmHeight{
  height: 100%;
  width: 100%;
}
.map{
  position: relative;
}
.mapInput{
  padding: 15px;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  padding-right: 115px;
  z-index: 1;
}
.mapItemSelect{
  float: left;
  width: 20%;
  padding-right: 15px;
  box-sizing: border-box;
}
.mapItemInput{
  float: left;
  width: 60%;
  padding-right: 15px;
  box-sizing: border-box;
}
.mapInput::after{
  clear: both;
  display: block;
  content: '';
}
.mapInput button{
  width: 100px;
  position: absolute;
  right: 15px;
  top: 15px;
  height: 38px;
  text-align: center;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 0 15px;
  z-index: 1;
  outline: none;
  cursor: pointer;
  background: #409EFF;
  color: #ffffff;
  border: 0px;
  font-weight: bold;
}
.w100{
  width: 100%;
}
.bmActive{
  position: relative;
}
.BMap_pop,.BMap_shadow{
  margin-top: -25px;
}
</style>