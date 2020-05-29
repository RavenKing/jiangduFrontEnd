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
    listRentRoomContractApi:hostname+'/listrentcontract',
    listLoanRoomContractApi:hostname+'/listloancontract',
    createAssignmentApi:hostname+'/assignroom',
    baiduMapCheck:"http://api.map.baidu.com/geoconv/v1/?from=1&to=5&ak=vWGxcQlbdPyDTihpzGpiVeXcha5fdmea",
    createBuildingApi:hostname+"/assignroombuilding",
    listBuildingApi:hostname+"/listroombuilding",
    createBuildingFloorApi:hostname+"/generatebuildingfloor",
    deleteBuildingApi:hostname+"/removeroombuilding",
    listBuildingFloorApi:hostname+"listbuildingfloor",
    uploadUrlApi:hostname+"/uploaddwg",
    getOSSURLApi:hostname+"/getpdf",
    updateFloorApi:hostname+"/editbuildingfloor",
    deleteBuildingFloorAssignmentApi:hostname+"/delassignroom"
}
export default constantsJinhui;