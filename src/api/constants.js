const hostname = "/api";
const jiangduPre = "/test"
const recommendApi = "/recommendApi"
const constantsJinhui = {
    renameBuildingApi: "/renamebuilding",
    getroomunitinfo: "/getroomunitinfo",
    deleteFloorApi: "/removebuildingfloor",
    getCurrentAssignApi: "/getcurrentassign",
    //deleteRoomAssignDetail:""
    LoginURL: jiangduPre + "/users/login",
    deletePolicyTageApi: jiangduPre + "/policys/deleteTags",
    addTageApi: jiangduPre + "/policys/addTags",
    blacklistApi: jiangduPre + "/users/updateStatus",
    userApi: jiangduPre + "/users/register",
    tagsApi: jiangduPre + "/tags",
    policyApi: jiangduPre + "/policys",
    policyTagsApi:jiangduPre+"/policys/policyTags",
    roomGetAPI: hostname + "/policys",
    getCompanysApi: jiangduPre + "/users/getCompanyInfo",
    postRecommendList: jiangduPre + "/recommendLists",
    recommendPolicyApi: recommendApi + "/recommendCompany",
    historicalPolicyCompanyApi: jiangduPre + "/historical/latest/policy/companies",
    talentsApi: jiangduPre + "/talents",
    recommendFinApi:recommendApi+"/reFICompany",
    finApi: jiangduPre + "/fins",
    postFinApi: jiangduPre + "/fins/add",
    addFinTagApi: jiangduPre + "/fins/addTags",
    deleteFinTagApi: jiangduPre + "/fins/deleteTags",
    getFinTagApi: jiangduPre + "/fins/finTags",
    assetApi: jiangduPre + "/assets",
    recommendASApi:recommendApi+"/reASCompany",
    postAssetApi: jiangduPre + "/assets/add",
    addAssetTagApi: jiangduPre + "/assets/addTags",
    deleteAssetTagApi: jiangduPre + "/assets/deleteTags",
    getAssetTagApi: jiangduPre + "/assets/assetTags",
    talentTagsApi: jiangduPre + "/talents/tags",
    addTalentTagApi: jiangduPre + "/talents/addTags",
    deleteTalentTagApi: jiangduPre + "/talents/deleteTags",
    /// tech
    techApi: jiangduPre + "/techs",
    addTechTagApi: jiangduPre + "/techs/addTags",
    deleteTechTagApi: jiangduPre + "/techs/deleteTags",
    getTechTagApi: jiangduPre + "/techs/techTags",
    recommendTECHApi:recommendApi+"/reTECHCompany",

    roomCreateAPI: hostname + '/createroom',
    updateRoomAPI: hostname + '/editroom',
    deleteRoomAPI: hostname + '/delroom',
    rentRoomGetAPI: hostname + '/listrentroom',
    roomRentCreateAPI: hostname + '/createrentroom',
    deleteRentRoomAPI: hostname + '/delrentroom',
    updateRentRoomAPI: hostname + '/editrentroom',
    unitGetApi: hostname + '/listunit',
    leaderRoomGetApi: hostname + '/listleaderroom',
    leaderUnitByIdGetApi: hostname + '/listunitbyid',
    unitCreateApi: hostname + '/createunit',
    deleteUnitApi: hostname + '/delunit',
    updateUnitApi: hostname + '/editunit',
    employeeGetApi: hostname + '/listemployee',
    employeeCreateApi: hostname + '/createemployee',
    deleteEmployeeApi: hostname + '/delemployee',
    updateEmployeeApi: hostname + '/editemployee',
    createRentContractApi: hostname + 'createrentcontract',
    createLoanContractApi: hostname + 'createloancontract',
    deleteRentContractApi: hostname + '/delrentcontract',
    deleteLoanContractApi: hostname + '/delloancontract',
    listRoomAssignmentApi: hostname + '/listroomassignment',
    listRentRoomAssignmentApi: '/listrentroomassignment',
    listRentRoomContractApi: hostname + '/listrentcontract',
    listLoanRoomContractApi: hostname + '/listloancontract',
    createAssignmentApi: hostname + '/assignfloorspace',
    createAssignmentRentApi: hostname + '/assignrentroom',
    baiduMapCheck: "http://api.map.baidu.com/geoconv/v1/?from=1&to=5&ak=vWGxcQlbdPyDTihpzGpiVeXcha5fdmea",
    createBuildingApi: hostname + "/assignroombuilding",
    assignroomApi: hostname + "/assignunitfloor",
    listBuildingApi: hostname + "/listroombuilding",
    createBuildingFloorApi: hostname + "/generatebuildingfloor",
    deleteBuildingApi: hostname + "/removeroombuilding",
    listBuildingFloorApi: hostname + "listbuildingfloor",
    uploadUrlApi: hostname + "/uploaddwg",
    getOSSURLApi: hostname + "/getpdf",
    updateFloorApi: hostname + "/editbuildingfloor",
    deleteBuildingFloorAssignmentApi: hostname + "/unassignunitfloor",
    deleteRentRoomAssignmentApi: hostname + "/delassignrentroom",
    assignRentRoomApi: hostname + "/assignrentroom",
    getleaderroombyunitApi: hostname + "/getunitrooms",
    getRoomStatApi: hostname + "/getroomstat",
    //MR request
    getMRAPI: "/listmr",
    updateMRAPI: "",
    deleteMRAPI: "",
    createMRAPI: "/createmr",
    editMRAPI: "/editmr",
    getRoomByIDApi: "/getroombyid",
    createMCApi: "/createproj",
    getMCAPI: "/listproj",
    updateMCApi: "/editproj",
    approveMRApi: "/approvemr",
    rejectMRApi: "/rejectmr",
    delleaderroomApi: "/delunitroom",
    // deleteRentRoomAssignmentApi:"/delassignroom",
    createLeaderAssignApi: "/assignleaderroom",
    editRentContractDetailApi: "/editrentcontractdetail",
    delProjectApi: "/delproj",
    delStepApi: "/delprojectdetail",
    markStepApi: "/markprojectdetail",
    editStepApi: "/editprojectdetail",
    editRentContractApi: "/editrentcontract",
    listLoanAssignmentApi: "/listnewcr",
    deleteLoanAssignmentApi: "/delnewcr",
    uploadZiliaoFileApi: "/upload",
    createLoanAssignmentApi: "/createnewcr",
    editLoanAssignmentApi: "/editnewcr",

    //20200801
    getroomnumApi: "/dashboard/getroomnum", //资产数量
    getroomspaceApi: "/dashboard/getroomspace", //资产面积
    getunitnumApi: "/dashboard/getunitnum", //单位数量
    getmrnumApi: "/dashboard/getmrnum", //维修请求
    roomusagerate1Api: "/dashboard/roomusagerate1", // 办公使用率 资产空置率
    roomusagerate2Api: "/dashboard/roomusagerate2", // 经营使用率 出租房空置率
    loanamtApi: "/dashboard/loanamt", // 出租/租金 总额  收入/支出
    roomspagcerate1Api: "/dashboard/roomspagcerate1", //土地面积（有证/无证） 有证/全部 数量 
    roomspagcerate2Api: "/dashboard/roomspagcerate2", //建筑面积（有证/无证） 有证/全部 数量

    //20200803
    showgeolistApi: "/geo/showgeolist",
    showunitbyroomidApi: "/geo/showunitbyroomid",

    renameFloorApi: "/renamefloor",
    getFloorByIdApi: "/getfloorbyid",
    showunitroominfo: "geo/showunitroominfo", //详细地址

    //2020 0827
    listPatrolApi: "/listpatrol",
    createPatrolApi: "/createpatrol",
    editPatrolApi: "/editpatrol",
    deletePatrolApi: "/delpatrol",
    exportroomApi: "/exportroom",
    listloanassignmentbyidr: "/listloanassignmentbyid",
    assignRoomDetail: "/assignfloordetail",

    //rent
    addrentApi: "addrentinfo",
    listrentApi: "listrentinfo",
    editrentApi: "editrentinfo",
    removerentApi: "delrentinfo",
    createKaipiaoApi: "addtaxinfo",
    searchunit: "/searchunit",
    changeRoomTypeApi: "/changeroomtype"
}
export default constantsJinhui;