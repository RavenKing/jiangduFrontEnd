<template>
  <wl-container>
    <div class="map">
      <sui-dimmer v-if="dimmerShow" active inverted>
        <sui-loader>Loading...</sui-loader>
      </sui-dimmer>
      <div class="mapInput">
        <div class="mapItemSelect-1">
          <sui-dropdown
            class="w100"
            placeholder="选择单位"
            selection
            :options="unitoptions"
            v-model="unitId"
            :loading="selectLoading1"
            search
            fluid
          ></sui-dropdown>
        </div>
        <div class="mapItemSelect-1">
          <sui-dropdown
            class="w100"
            placeholder="选择地区"
            selection
            :options="addressList"
            v-model="addressId"
            :loading="selectLoading2"
          ></sui-dropdown>
        </div>
        <!-- <div class="mapItemSelect">
          <sui-dropdown class="w100" placeholder="房屋类型" selection :options="housingList" v-model="housing" />
        </div>-->
        <!-- <div class="mapItemSelect">
          <sui-dropdown class="w100" placeholder="房屋用途" selection :options="natureList" v-model="nature" />
        </div>-->
        <!-- <div class="mapItemInput">
          <sui-input class="w100" placeholder="请输入楼房名字" v-model="enterAddress" />
        </div>-->
        <!-- <button type="button" @click="showgeolistApi">搜索</button> -->
      </div>
      <div ref="mapBox">
        <baidu-map
          id="mapid"
          :mapClick="false"
          class="bmView"
          :scroll-wheel-zoom="true"
          :center="center"
          :zoom="zoom"
          ak="4b9aafff64aae8f8b6aa93aa59e3d014"
        >
          <BaiduMapView></BaiduMapView>
          <BaiduMarkerClusterer>
             <!-- :averageCenter="true" -->
            <!-- animation="BMAP_ANIMATION_BOUNCE" -->
            <BaiduMarker
              :title="activeName"
              :class="{'bmActive': activeName == marker.name}"
              v-for="marker of markers"
              :key="marker.id"
              :position="{lng: marker.lon, lat: marker.lat}"
              @click="lookDetail(marker)"
              :icon="{url: marker.kind==1 ? require('./images/icon-1.png') :  marker.kind==2 ? require('./images/icon-2.png') :  require('./images/icon-3.png'),size:{width:39,height:25}}"
            ></BaiduMarker>
          </BaiduMarkerClusterer>
          <BaiduInfoWindow
            :position="{lng: infoWindow.info.lon, lat: infoWindow.info.lat}"
            :title="infoWindow.info.roomname"
            :show="infoWindow.show"
            @close="infoWindowClose"
            @open="infoWindowOpen"
          >
            地址：{{infoWindow.info.address}}
          </BaiduInfoWindow>
        </baidu-map>
      </div>
    </div>
  </wl-container>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BaiduMapView from "vue-baidu-map/components/map/MapView.vue";
import BaiduMarkerClusterer from "vue-baidu-map/components/extra/MarkerClusterer";
import BaiduInfoWindow from "vue-baidu-map/components/overlays/InfoWindow";
import BaiduMarker from "vue-baidu-map/components/overlays/Marker";
import {
  showgeolistApi,
  showunitbyroomidApi,
  getUnitApi,
  showunitroominfo
} from "@/api/roomDataAPI";
import { ModelSelect } from "vue-search-select";

export default {
  name: "mapPage",
  components: {
    BaiduMap,
    BaiduMapView,
    BaiduMarkerClusterer,
    BaiduInfoWindow,
    BaiduMarker,
    "model-select": ModelSelect
  },
  data() {
    return {
      iconInfo: "./images/i.jpg",
      addressList: [],
      selectLoading1: false,
      selectLoading2: false,
      unitId: undefined,
      dimmerShow: false,
      enterAddress: undefined, //输入搜索内容
      searchEnterAddress: undefined, //搜索地址
      center: { lng: 121.5747, lat: 30.8475 },
      zoom: 16,
      lng: undefined,
      lat: undefined,
      selectedLng: undefined,
      selectedLat: undefined,
      addressId: undefined,
      nature: "",
      housingList: [
        {
          text: "全部",
          value: ""
        },
        {
          text: "自有房屋",
          value: "1"
        },
        {
          text: "租赁房屋",
          value: "2"
        }
      ],
      natureList: [
        {
          text: "全部",
          value: ""
        },
        {
          text: "办公性",
          value: "1"
        },
        {
          text: "经营性",
          value: "2"
        }
      ],
      markers: [],
      infoWindow: {
        show: false,
        info: {
          name: undefined
        }
      },
      activeName: undefined,
      unitoptions: []
    };
  },
  watch: {
    unitId: function() {
      this.addressId = undefined;
      this.infoWindow.show = false;
      this.showunitroominfo();
    },
    addressId: function() {
      this.infoWindow.show = false;
      this.addressIdFn();
    }
  },
  mounted() {
    this.getUnitApi();
  },
  methods: {
    addressIdFn() {
      this.markers = [];
      this.addressList.map(r => {
        if (this.addressId == r.id) {
          this.markers.push(r);
        }
      });
      this.zoom = 16;
      if (this.markers && this.markers.length > 0) {
        this.center = { lng: this.markers[0].lon, lat: this.markers[0].lat };
      }
    },
    getUnitApi() {
      this.selectLoading1 = true;
      getUnitApi().then(data => {
        var res_data = data.data.data;
        for (var i = res_data.length - 1; i >= 0; i--) {
          this.unitoptions.push({
            text: res_data[i]["name"],
            value: res_data[i]["id"]
          });
        }
        this.unitId=data.data.data[0].id;
        this.zoom = 16;
        // this.showunitroominfo();
        this.selectLoading1 = false;
      });
    },
    showunitroominfo() {
      var payload = {
        unit_id: this.unitId
      };
      this.selectLoading2 = true;
      this.markers = [];
      showunitroominfo(payload)
        .then(result => {
          if (result.data.code == 0) {
            this.selectLoading2 = false;
            this.addressList = [];
            result.data.data.map(r => {
              this.addressList.push({ ...r, value: r.id, text: r.address });
              this.markers.push({
                ...r,
                lon: r.lon,
                lat: r.lat
              });
            });
            this.zoom = 16;
            // this.addressId=this.addressList[0].id;
            var _this=this;
            setTimeout(function(){
              _this.center = {
                lng: _this.markers[0].lon,
                lat: _this.markers[0].lat
              };
            },100);
          }
        })
        .catch(() => {});
    },
    infoWindowClose(e) {
      this.infoWindow.show = false;
    },
    infoWindowOpen(e) {
      this.infoWindow.show = true;
    },
    lookDetail(data, target) {
      this.activeName = data.name;
      this.infoWindow.show = true;
      this.infoWindow.info = data;
      this.$nextTick(() => {
        var obj = document.querySelector(".bmActive");
        var scrollTop = obj.offsetTop;
        this.$refs.mapBox.scrollTop = scrollTop - 180;
      });
    },
    showgeolistApi() {
      this.dimmerShow = true;
      var payload = {
        Type: this.housing,
        Kind: this.nature,
        Name: this.enterAddress
      };
      showgeolistApi(payload)
        .then(result => {
          if (result.data.code == 0) {
            this.markers = [];
            result.data.data.map(r => {
              if (r.lon && r.lat) {
                this.markers.push(r);
              }
            });
            this.zoom = 16;
            if (this.markers && this.markers.length > 0) {
              this.center = {
                lng: this.markers[0].lon,
                lat: this.markers[0].lat
              };
            }
          }
          this.dimmerShow = false;
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
.bmView {
  height: calc(100vh - 182px);
}
.bmHeight {
  height: 100%;
  width: 100%;
}
.map {
  position: relative;
}
.mapInput {
  padding: 15px;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  padding-right: 115px;
  z-index: 1;
}
.mapItemSelect {
  float: left;
  width: 20%;
  padding-right: 15px;
  box-sizing: border-box;
}
.mapItemSelect-1 {
  float: left;
  width: 35%;
  padding-right: 15px;
  box-sizing: border-box;
}
.mapItemInput {
  float: left;
  width: 60%;
  padding-right: 15px;
  box-sizing: border-box;
}
.mapInput::after {
  clear: both;
  display: block;
  content: "";
}
.mapInput button {
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
  background: #409eff;
  color: #ffffff;
  border: 0px;
  font-weight: bold;
}
.w100 {
  width: 100%;
}
.bmActive {
  position: relative;
}
.BMap_pop,
.BMap_shadow {
  margin-top: -25px;
}
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
</style>