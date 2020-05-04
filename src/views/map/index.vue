<template>
<baidu-map class="map" :center="{lng: 121.468, lat: 30.924}" :zoom="15">
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <bm-marker :position="{lng: 121.468, lat: 30.924}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}" />
    </bm-marker>
</baidu-map>
</template>

<style>
.map {
    width: 100%;
    height: 400px;
}
</style>
