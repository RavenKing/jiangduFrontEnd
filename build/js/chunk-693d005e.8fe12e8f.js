(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-693d005e"],{8300:function(e,n,o){"use strict";var d=o("8f99"),a=o.n(d);a.a},"8d76":function(e,n,o){"use strict";o.r(n);var d=function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",[o("vue-tree-list",{attrs:{model:e.data,"default-tree-node-name":"new node","default-leaf-node-name":"new leaf","default-expanded":!1},on:{click:e.onClick,"change-name":e.onChangeName,"delete-node":e.onDel,"add-node":e.onAddNode}},[o("span",{staticClass:"icon",attrs:{slot:"addTreeNodeIcon"},slot:"addTreeNodeIcon"},[e._v("📂")]),o("span",{staticClass:"icon",attrs:{slot:"addLeafNodeIcon"},slot:"addLeafNodeIcon"},[e._v("＋")]),o("span",{staticClass:"icon",attrs:{slot:"editNodeIcon"},slot:"editNodeIcon"},[e._v("📃")]),o("span",{staticClass:"icon",attrs:{slot:"delNodeIcon"},slot:"delNodeIcon"},[e._v("✂️")]),o("span",{staticClass:"icon",attrs:{slot:"leafNodeIcon"},slot:"leafNodeIcon"},[o("sui-icon",{attrs:{name:"home"}})],1),o("span",{staticClass:"icon",attrs:{slot:"treeNodeIcon"},slot:"treeNodeIcon"},[o("sui-icon",{attrs:{name:"building outline"}})],1)]),o("pre",[e._v("\r\n    "+e._s(e.newTree)+"\r\n    ")])],1)},a=[],t=o("95d5"),s={components:{VueTreeList:t["VueTreeList"]},data:function(){return{newTree:{},data:new t["Tree"]([{name:"Node 1",id:1,pid:0,dragDisabled:!0,addTreeNodeDisabled:!0,addLeafNodeDisabled:!0,editNodeDisabled:!0,delNodeDisabled:!0,children:[{name:"Node 1-2",id:2,isLeaf:!0,pid:1}]},{name:"Node 2",id:3,pid:0,disabled:!0},{name:"Node 3",id:4,pid:0}])}},methods:{onDel:function(e){console.log(e),e.remove()},onChangeName:function(e){console.log(e)},onAddNode:function(e){console.log(e)},onClick:function(e){console.log(e)},addNode:function(){var e=new t["TreeNode"]({name:"new node",isLeaf:!1});this.data.children||(this.data.children=[]),this.data.addChildren(e)},getNewTree:function(){var e=this;function n(e){var o={};for(var d in e)"children"!==d&&"parent"!==d&&(o[d]=e[d]);if(e.children&&e.children.length>0){o.children=[];for(var a=0,t=e.children.length;a<t;a++)o.children.push(n(e.children[a]))}return o}e.newTree=n(e.data)}}},i=s,l=(o("8300"),o("2877")),c=Object(l["a"])(i,d,a,!1,null,null,null);n["default"]=c.exports},"8f99":function(e,n,o){}}]);
//# sourceMappingURL=chunk-693d005e.8fe12e8f.js.map