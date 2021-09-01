import Vue from "vue";
import { localDel } from "@/util/storage"; // 导入存储函数
import global from "@/global/index";
function goToLogin() {
    const project_key = global.project_key;
    localDel(project_key);
}
function tagFilter(itemCategory, targetCategory) {
    return itemCategory["TAG_CATEGORY"] == targetCategory;
}

function notifySomething(word, detail, type) {
    Vue.notify({
        group: "foo",
        title: word,
        text: detail,
        type: type,
    });
}

export { notifySomething, goToLogin, tagFilter };
