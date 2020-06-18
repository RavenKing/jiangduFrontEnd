import Vue from 'vue'


       function notifySomething(word,detail,type) {
        Vue.notify({
                group: 'foo',
                title: word,
                text: detail,
                type: type
            });
        }


        export {notifySomething}