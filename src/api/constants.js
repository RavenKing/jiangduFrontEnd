const hostname= "";
const constantsJinhui = {
    LoginURL:hostname+"/login",
    roomGetAPI:hostname+"/listroom",
    roomCreateAPI:hostname+'/createroom',
    updateRoomAPI:hostname+'/editroom',
    deleteRoomAPI:hostname+'/delroom',
    rentRoomGetAPI:hostname+'/listrentroom',
    roomRentCreateAPI:hostname+'/createrentroom',
    deleteRentRoomAPI:hostname+'/delrentroom',
    updateRentRoomAPI:hostname+'/editrentroom',
    unitGetApi:hostname+'/listunit',
    leaderRoomGetApi: hostname+'/listleaderroom',
    leaderUnitByIdGetApi: hostname+'/listunitbyid',
    unitCreateApi:hostname+'/createunit',
    deleteUnitApi:hostname+'/delunit',
    updateUnitApi:hostname+'/editunit',
    employeeGetApi:hostname+'/listemployee',
    employeeCreateApi:hostname+'/createemployee',
    deleteEmployeeApi:hostname+'/delemployee',
    updateEmployeeApi:hostname+'/editemployee',
    createRentContractApi:hostname+'createrentcontract',
    createLoanContractApi:hostname+'createloancontract',
    deleteRentContractApi:hostname+'/delrentcontract',
    deleteLoanContractApi:hostname+'/delloancontract',
    listRoomAssignmentApi:hostname+'/listroomassignment',
    listRentRoomAssignmentApi:'/listrentroomassignment',
    listRentRoomContractApi:hostname+'/listrentcontract',
    listLoanRoomContractApi:hostname+'/listloancontract',
    createAssignmentApi:hostname+'/assignfloorroom',
    createAssignmentRentApi:hostname+'/assignrentroom',
    baiduMapCheck:"http://api.map.baidu.com/geoconv/v1/?from=1&to=5&ak=vWGxcQlbdPyDTihpzGpiVeXcha5fdmea",
    createBuildingApi:hostname+"/assignroombuilding",
    assignroomApi:hostname+"/assignroom",
    listBuildingApi:hostname+"/listroombuilding",
    createBuildingFloorApi:hostname+"/generatebuildingfloor",
    deleteBuildingApi:hostname+"/removeroombuilding",
    listBuildingFloorApi:hostname+"listbuildingfloor",
    uploadUrlApi:hostname+"/uploaddwg",
    getOSSURLApi:hostname+"/getpdf",
    updateFloorApi:hostname+"/editbuildingfloor",
    deleteBuildingFloorAssignmentApi:hostname+"/delassignroom",
    deleteRentRoomAssignmentApi: hostname+"/delassignrentroom",
    assignRentRoomApi: hostname+"/assignrentroom",
    //MR request
    getMRAPI:"/listmr",
    updateMRAPI:"",
    deleteMRAPI:"",
    createMRAPI:"/createmr",
    editMRAPI:"/editmr",
    getRoomByIDApi:"/getroombyid",
    createMCApi:"/createproj",
    getMCAPI:"/listproj",
    updateMCApi:"/editproj",
    approveMRApi:"/approvemr",
    rejectMRApi:"/rejectmr",
    delleaderroomApi:"/delleaderroom",
    // deleteRentRoomAssignmentApi:"/delassignroom",
    createLeaderAssignApi:"/assignleaderroom",
    editRentContractDetailApi:"/editrentcontractdetail",
    delProjectApi:"/delproj",
    delStepApi:"/delprojectdetail",
    markStepApi:"/markprojectdetail",
    editStepApi:"/editprojectdetail",
    editRentContractApi:"/editrentcontract",
    listLoanAssignmentApi:"/listloanassignment",
    deleteLoanAssignmentApi:"/delloanassignment",
    uploadZiliaoFileApi:"/upload",
    createLoanAssignmentApi:"/createloanassignment",
    editLoanAssignmentApi:"/editloanassignment",

    //20200801
    getroomnumApi:"/dashboard/getroomnum",	//资产数量
    getroomspaceApi:"/dashboard/getroomspace",	//资产面积
    getunitnumApi:"/dashboard/getunitnum",	//单位数量
    getmrnumApi:"/dashboard/getmrnum",		//维修请求
    roomusagerate1Api:"/dashboard/roomusagerate1", // 办公使用率 资产空置率
    roomusagerate2Api:"/dashboard/roomusagerate2", // 经营使用率 出租房空置率
    loanamtApi:"/dashboard/loanamt", // 出租/租金 总额  收入/支出
    roomspagcerate1Api:"/dashboard/roomspagcerate1", //土地面积（有证/无证） 有证/全部 数量 
    roomspagcerate2Api:"/dashboard/roomspagcerate2", //建筑面积（有证/无证） 有证/全部 数量

    //20200803
    showgeolistApi:"/geo/showgeolist",
    showunitbyroomidApi:"/geo/showunitbyroomid",
    
    getFloorByIdApi:"/getfloorbyid",
    showunitroominfo:"geo/showunitroominfo" //详细地址
}
export default constantsJinhui;