function dealWorkFlow (arr) { // 构造扁平化结构，去除所有next节点
    let tempArr = arr
    // 构造map解构
    tempMap = new Map
    let newArr = []
    getReviewArr(tempArr,tempMap)
    tempMap.forEach((item,key)=>{ // 添加进数组
        newArr.push({...item})
    })
    newArr.forEach(item=>{
        item.NextReviewConfig = []
    })
    return newArr
}

function getReviewArr(arr, tempMap, parentid = 0){ // 构造map结构
    /* 
        arr 树结构数据源数组
        tempMap map结构
        parentid 为自定义父节点，可由后端定义，此处为自行添加
    */
    arr.forEach(item => { // 循环进入map结构
        let tempArr = []
        if(tempMap.has(item.ReviewNodeID)){
            tempMap.get(item.ReviewNodeID).push({...item, pid: parentid,})
        } else {
            tempMap.set(item.ReviewNodeID, [{...item, pid: parentid,}])
        }
        if(item.NextReviewConfig){
            that.getReviewArr(item.NextReviewConfig, tempMap, item.ReviewNodeID)
        }
    })
}

// arr 示例结构
const data = [
    {
        DefReviewerID: 2,
        DefReviewerName: "张华",
        NextReviewConfig: [
            {
                DefReviewerID: 3,
                DefReviewerName: "金华111",
                NextReviewConfig: null,
                ReviewName: "审批人",
                ReviewNodeID: 2,
                ReviewType: 2,
                ReviewValue: 3,
                ActualReviewerID: 2,
                ActualReviewerName: "张金华"
            }
        ],
        ReviewName: "审批人",
        ReviewNodeID: 1,
        ReviewType: 2,
        ReviewValue: 3,
        ActualReviewerID: 2,
        ActualReviewerName: "张金华"
    },
    
]
