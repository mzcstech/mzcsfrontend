import * as actionType from './actionType'
import { SERVER_URL } from '../../../constants.js';
// import store from '../../../store/index.js'
// import axios from 'axios'

const getDataListType =(data,page,rowsPerPage,total)=>(
  {
    type:actionType.GET_DATALIST,
    dataList:data,
    page:page,
    rowsPerPage:rowsPerPage,
    total:total,
})
export const getDatalist = () =>{
   return (dispatch)=>{
        let followUpVo   = new FormData();
        // followUpVo.append("pageNum", this.props.page + 1)
        // followUpVo.append("pageSize", this.props.rowsPerPage)
        // followUpVo.append("parentId",Neweparent))
        fetch(SERVER_URL + '/privilege/list' , {
          mode: "cors",
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json,text/plain,*/*'
          },  
          body: followUpVo
        })  
          .then((response) => response.json())
          .then((responseData)  => {
            console.log(responseData,'responseData')
              if(responseData.status !== 500){
                  const data = responseData.data.list
                  const page = responseData.data.pageNum - 1 
                  const rowsPerPage = responseData.data.pageSize
                  const total = responseData.data.total
                  dispatch(getDataListType(data,page,rowsPerPage,total))
              }else{
                alert('无子节点数据')
              }
          })
          .catch(err => console.error(err));
   }
}


