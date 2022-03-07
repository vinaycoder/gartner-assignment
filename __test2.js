import React from "react"
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import thunk from 'redux-thunk'
import moxios from 'moxios';
import "babel-polyfill"
import {ptpSearchAction,mueSearchAction,resetPtpAction,getTPtpDetails ,getTMueDetails, mueUpdateSave,ptpUpdateAction,resetDetailsTPInquiry,resetMueAction} from '../action'
import * as actionTypes from '../actionTypes'
import SearchForm from "../Components/PtpSearchForm"
import * as redux from "react-redux";
jest.mock("../Components/PtpSearchTable", (props) => (props) => (
    <div id="test">Hello World</div>
  ));
const middlewares = [thunk]
 
 /**
    * describe() is used to handle rendering PTP Search Component.
    * get element selector from componen using expect method of jest
    * @Date 03-03-2021
    * @author Vinay Kumar
 */

 //api sucees and error method
const mockSuccess = data => ({ status: 200, response: data })
const mockError = data => ({ status: 500, response: data })
describe('dispatch mock', function () {
    it('should mock dispatch', function () {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);
        useDispatchSpy.mockClear();
    })
});
describe('selector mock', function () {
    it('should mock useSelector', function () {
        const useSelectorSpy = jest.spyOn(redux, 'useSelector');
        const mockSelectorFn = jest.fn()
        useSelectorSpy.mockReturnValue(mockSelectorFn);
        useSelectorSpy.mockClear();
    })
}); 
describe('Procedure to Procedure Edits Search Form Component', () => {
  
  const mockStore = configureStore(middlewares)
  let store, wrapper
 
  // intitial state for component
  const initialState = {}
 
  // intitial props for component
  const componentProps = {
    handleChangesPtp: jest.fn(),
    searchCheck: jest.fn(),
    spinnerLoader : true,
    ptpValue:{
        sourceProcCode:"A4",
        sourceProcCodeStart: true,
        targetProcCode:"A4",
        targetProcCodeStart: true,
        nccTypeCode: "-1"
      },
    appDrodown:[{key:'PRV',value:'Practitioner'}],
    errors:{
        showFirstProcErr  :true,
        showSecondProcErr :true,
    }
  }
  const componentProps1 = {
    handleChangesPtp: jest.fn(),
    searchCheck: jest.fn(),
    spinnerLoader : false,
    ptpValue:{
        sourceProcCode:"A4",
        sourceProcCodeStart: true,
        targetProcCode:"A4",
        targetProcCodeStart: true,
        nccTypeCode: "-1"
    },
    errors:{
        showFirstProcErr  :false,
        showSecondProcErr :false,
    },
    appDrodown:false
  }
  //beforeEach Run before testcases is run  
 
  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = shallow(<Provider store={store}><Router><SearchForm  {...componentProps} /></Router></Provider>).dive().dive().dive().dive().dive().dive()
    //console.log(wrapper.debug())
  })
  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = shallow(<Provider store={store}><Router><SearchForm  {...componentProps1} /></Router></Provider>).dive().dive().dive().dive().dive().dive()
    //console.log(wrapper.debug())
  })
 
  //expect used for assert the component and match the output with testing condition

   describe('Render Procedure to Procedure Edits Search Form Component' , ()=>{

    it('should render First Procedure Code without error', () => {
      const component = wrapper.find("#first-proc-code")
      expect(component.length).toBe(1);
    })
    it('should render Second Procedure Code without error', () => {
        const component = wrapper.find("#second-procedure-code")
        expect(component.length).toBe(1);
    })
    it('should render First Start With without error', () => {
        const component = wrapper.find("#StartsWith-first-proc-code")
        expect(component.length).toBe(1);
    })
    it('should render Second Start With without error', () => {
        const component = wrapper.find("#StartsWith-second-proc-code")
        expect(component.length).toBe(1);
    })
    it('should render NCCI Type Code without error', () => {
        const component = wrapper.find("#ncci-type-code")
        expect(component.length).toBe(1);
    })
    it('should render Search  button without error', () => {
        const component = wrapper.find("#search-btn")
        expect(component.length).toBe(1);
    })
    it('should render Reset button without error', () => {
        const component = wrapper.find("#reset-btn")
        expect(component.length).toBe(1);
    })

   })

   describe('Procedure To Procedure getDetails API test cases', function () {
    const reqBody = {
       "firstProcedureCode":"A4",
       "secondProcedureCode":"A4",
       "typeCode":null,
       "firstProcCodeStartWith":true,
       "secondProcCodeStartWith":true
   }
    const reqBodErr = {
       "firstProcedureCode":"A4XX",
       "secondProcedureCode":"A4XX",
       "typeCode":null,
       "firstProcCodeStartWith":true,
       "secondProcCodeStartWith":true
   }
   const resObject = {success: true }
   beforeEach(function () {
     moxios.install()
   })
   afterEach(function () {
     moxios.uninstall()
   })
   it('should be success the getDetails api call', () => {
      moxios.wait(() => {        
      let request = moxios.requests.mostRecent()
      request.respondWith(mockSuccess({success: true,status:"OK",data:{success: true }}));
      
    })
    const dispatchPtpDetails = {
           type: actionTypes.PTP_DETAILS,
           tpInquiryDetailsData : resObject
       }       
     return store.dispatch(getTPtpDetails(reqBody))
       .then(() => {
         const actions = store.getActions()
         expect(actions[0]).toEqual(dispatchPtpDetails);
       })
   }) 
  
    it('should be success without data', () => {
      moxios.wait(() => {        
      let request = moxios.requests.mostRecent()
      request.respondWith(mockSuccess({success: true,status:"NO",message:{success: true }}));
      
    })
    const dispatchPtpDetails = {
           type: actionTypes.PTP_DETAILS,
           tpInquiryDetailsData : resObject
       }       
     return store.dispatch(getTPtpDetails(reqBody))
       .then(() => {
         const actions = store.getActions()
         expect(actions[0]).toEqual(dispatchPtpDetails);
       })
   }) 
  
   it('should be fail the getDetails api call', () => {
     const errResponse = {
      message: "no data found"
   }
  
     moxios.wait(() => {
       let request = moxios.requests.mostRecent()
       request.respondWith(mockError(errResponse))
     })
  
     return store.dispatch(getTPtpDetails(reqBodErr))
       .then(() => {
         const actions = errResponse
         expect(actions).toEqual(errResponse);
       })
  
   })
  
  })
  describe('Procedure To Procedure update API test cases', function () {
  
    const reqBody = {
       "auditUserID": "NCCI",
       "auditTimeStamp": "2021-02-16T00:00:00.000+0000",
       "addedAuditUserID": "NCCI",
       "addedAuditTimeStamp": "2021-02-20T00:00:00.000+0000",
       "id": "6034f3d59b44ef15a8b0f1ed",
       "firstProcedureCode": "A4209",
       "secondProcedureCode": "AA121",
       "typeCode": "PRV",
       "policyStatement": "Manually Procedure",
       "cleid": "D2",
       "beginDate": "2021-02-16T00:00:00.000+0000",
       "endDate": "2021-02-20T00:00:00.000+0000",
       "modifierCode": 8,
       "stateBypassInd": "NO",
       "firstProcDescription": "Non needle injection device",
       "secondProcDescription": "Non coring needle or stylet",
       "runId": null
   }
    const reqBodErr = {
       "auditUserID": "NCCI",
       "auditTimeStamp": "2021-02-16T00:00:00.000+0000",
       "addedAuditUserID": "NCCI",
       "addedAuditTimeStamp": "2021-02-20T00:00:00.000+0000",
       "id": "6xxxx",
       "firstProcedureCode": "A4209",
       "secondProcedureCode": "AA121",
       "typeCode": "PRV",
       "policyStatement": "Manually Procedure",
       "cleid": "D2",
       "beginDate": "2021-02-16T00:00:00.000+0000",
       "endDate": "2021-02-20T00:00:00.000+0000",
       "modifierCode": 8,
       "stateBypassInd": "NO",
       "firstProcDescription": "Non needle injection device",
       "secondProcDescription": "Non coring needle or stylet",
       "runId": null
   }
   
   const resObject = {success: true,status:"OK" }
   
   beforeEach(function () {
     // import and pass your custom axios instance to this method
     moxios.install()
   })
   
   afterEach(function () {
     // import and pass your custom axios instance to this method
     moxios.uninstall()
   })
  
   it('reset action',()=>{
    store.dispatch(resetPtpAction()) 
    store.dispatch(resetDetailsTPInquiry()) 
    store.dispatch(resetMueAction()) 
   }) 
   it(' should be success the update api call', () => { 
     moxios.wait(() => {     
       let request = moxios.requests.mostRecent()
       request.respondWith(mockSuccess(resObject));
       
     }) 
   const dispatchPtpUpdate  = {
       type:actionTypes.PTP_UPDATE,
       ptpUpdateDetails : resObject
     }
     return store.dispatch(ptpUpdateAction(reqBody))
     .then(() => {
       const actions = store.getActions()     
       expect(actions[0]).toEqual(dispatchPtpUpdate);
     })
   })
  
   it('should be success without data', () => {
     let resNew={success: true,status:"NO",message:{success: true }};
    moxios.wait(() => {        
    let request = moxios.requests.mostRecent()
    request.respondWith(mockSuccess(resNew));
    
  })
  const dispatchPtpUpdate  = {
    type:actionTypes.PTP_UPDATE,
    ptpUpdateDetails : resNew
  }   
   return store.dispatch(ptpUpdateAction(reqBody))
     .then(() => {
       const actions = store.getActions()     
     })
  }) 
   
   it('should be fail the update api call', () => {
     const errResponse = {
      message: "no data found"
     }
   
     moxios.wait(() => {
       let request = moxios.requests.mostRecent()
       request.respondWith(mockError(errResponse))
     })
   
     return store.dispatch(ptpUpdateAction(reqBodErr))
       .then(() => {
         const actions = store.getActions()
         expect(errResponse).toEqual(errResponse);
       })
   }) 
   
   })
  
  describe('Procedure To Procedure Search API test cases', function () {
  
      const reqBody = {
         "firstProcedureCode":"A4",
         "secondProcedureCode":"A4",
         "typeCode":null,
         "firstProcCodeStartWith":true,
         "secondProcCodeStartWith":true
     }
      const reqBodErr = {
         "firstProcedureCode":"A4XX",
         "secondProcedureCode":"A4XX",
         "typeCode":null,
         "firstProcCodeStartWith":true,
         "secondProcCodeStartWith":true
     }
  
     const resObject = {success: true,status:"OK" }
  
     beforeEach(function () {
       // import and pass your custom axios instance to this method
       moxios.install()
     })
   
     afterEach(function () {
       // import and pass your custom axios instance to this method
       moxios.uninstall()
     })
   
     it('should be success the api call', () => {
   
       moxios.wait(() => {
         
         let request = moxios.requests.mostRecent()
         request.respondWith(mockSuccess(resObject));
         
       })
   
         const dispatchPtpSearch = {
             type: actionTypes.PTP_SEARCH_TYPE,
             searchData: resObject
         }       
       return store.dispatch(ptpSearchAction(reqBody))
         .then(() => {
           const actions = store.getActions()
           expect(actions[0]).toEqual(dispatchPtpSearch);
         })
     }) 
  it('should be success without data', () => {
      let resNew={success: true,status:"NO",message:{success: true }};
     moxios.wait(() => {        
     let request = moxios.requests.mostRecent()
     request.respondWith(mockSuccess(resNew));
     
   })
   const dispatchPtpSearch = {
    type: actionTypes.PTP_SEARCH_TYPE,
    searchData: resNew
  } 
    return store.dispatch(ptpSearchAction(reqBody))
      .then(() => {
        const actions = store.getActions()     
      })
   }) 
     it('should be fail the api call', () => {
       const errResponse = {
        message: "no data found"
     }
  
       moxios.wait(() => {
         let request = moxios.requests.mostRecent()
         request.respondWith(mockError(errResponse))
       })
   
       return store.dispatch(ptpSearchAction(reqBodErr))
         .then(() => {
           const actions = errResponse
           expect(actions).toEqual(errResponse);
         })
   
     })
   
   })
   describe('Medically Unlikely Edits Search API test cases', function () {
  
     const reqBody = {
            sourceProcedureCode: "H1203", 
            ncciTypeCode: "PRV",
            startWiths: true
     }
     const reqBodErr = {
        sourceProcedureCode: "X1203", 
        ncciTypeCode: "PRVZ",
        startWiths: true
  }
  
    const resObject = {success: true }
  
    beforeEach(function () {
      // import and pass your custom axios instance to this method
      moxios.install()
    })
  
    afterEach(function () {
      // import and pass your custom axios instance to this method
      moxios.uninstall()
    })
  
    it('should be success the api call', () => {
  
      moxios.wait(() => {
        
        let request = moxios.requests.mostRecent()
        request.respondWith(mockSuccess(resObject));
        
      })
  
        const dispatchMueSearch = {
            type: actionTypes.MUE_SEARCH_TYPE,
            searchData: resObject
        }
  
      return store.dispatch(mueSearchAction(reqBody))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual(dispatchMueSearch);
        })
  
    })
  
    it('should be fail the api call', () => {
      const errResponse = {
       message: "no data found"
      }
      // const errorObject = error.response.data
  
      // error.response.data
  
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        request.respondWith(mockError(errResponse))
      })
  
      return store.dispatch(mueSearchAction(reqBodErr))
        .then(() => {
          const actions = store.getActions()
          expect(errResponse).toEqual(errResponse);
        })
    })  
  })
  
  describe('Medically Unlikely Edits update API test cases', function () {
  
   const reqBody = {
      "auditUserID": "NCCI",
      "auditTimeStamp": "2021-02-16T00:00:00.000+0000",
      "addedAuditUserID": "NCCI",
      "addedAuditTimeStamp": "2021-02-20T00:00:00.000+0000",
      "id": "60367416f2f36f412da5ed52",
      "hcpcsProcedureCode": "H1303",
      "maxUnitValue": 3,
      "typeCode": "OPH",
      "cleid": "20.50",
      "beginDate": "2021-02-22T00:00:00.000+0000",
      "endDate": "2021-03-30T00:00:00.000+0000",
      "publishIndicator": 1,
      "stateBypassInd": "YES",
      "hcpcsProcDescription": "Non coring needle or stylet",
      "runId": null
  }
   const reqBodErr = {
      sourceProcedureCode: "X1203", 
      ncciTypeCode: "PRVZ",
      startWiths: true
  }
  
  const resObject = {success: true }
  
  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install()
  })
  
  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall()
  })
  
  it('should be success the update api call', () => {
  
    moxios.wait(() => {
      
      let request = moxios.requests.mostRecent()
      request.respondWith(mockSuccess(resObject));
      
    })
  
  const dispatchMueUpdate  = {
      type:actionTypes.MUE_UPDATE,
      mueUpdateDetails : resObject
    }
  
    return store.dispatch(mueUpdateSave(reqBody))
      .then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual(dispatchMueUpdate);
      })
  
  })
  
  it('should be fail the update api call', () => {
    const errResponse = {
     message: "no data found"
    }
  
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith(mockError(errResponse))
    })
  
    return store.dispatch(mueUpdateSave(reqBodErr))
      .then(() => {
        const actions = store.getActions()
        expect(errResponse).toEqual(errResponse);
      })
  })  
  })
  
  
  describe('Procedure To Procedure getDetails API test cases', function () {
    const reqBody = {
       "firstProcedureCode":"A4",
       "secondProcedureCode":"A4",
       "typeCode":null,
       "firstProcCodeStartWith":true,
       "secondProcCodeStartWith":true
   }
    const reqBodErr = {
       "firstProcedureCode":"A4XX",
       "secondProcedureCode":"A4XX",
       "typeCode":null,
       "firstProcCodeStartWith":true,
       "secondProcCodeStartWith":true
   }
   const resObject = {success: true }
   beforeEach(function () {
     moxios.install()
   })
   afterEach(function () {
     moxios.uninstall()
   })
   it('should be success the getDetails api call', () => {
      moxios.wait(() => {        
      let request = moxios.requests.mostRecent()
      request.respondWith(mockSuccess({success: true,status:"OK",data:{success: true }}));
      
    })
    const dispatchPtpDetails = {
           type: actionTypes.MUE_DETAILS,
           tpInquiryDetailsData: resObject
       }       
     return store.dispatch(getTMueDetails(reqBody))
       .then(() => {
         const actions = store.getActions()
         expect(actions[0]).toEqual(dispatchPtpDetails);
       })
   }) 
  
    it('should be success without data', () => {
      moxios.wait(() => {        
      let request = moxios.requests.mostRecent()
      request.respondWith(mockSuccess({success: true,status:"NO",message:{success: true }}));
      
    })
    const dispatchPtpDetails = {
      type: actionTypes.MUE_DETAILS,
      tpInquiryDetailsData: resObject
       }       
     return store.dispatch(getTMueDetails(reqBody))
       .then(() => {
         const actions = store.getActions()
         expect(actions[0]).toEqual(dispatchPtpDetails);
       })
    }) 
  
   it('should be fail the getDetails api call', () => {
     const errResponse = {
      message: "no data found"
   }
  
     moxios.wait(() => {
       let request = moxios.requests.mostRecent()
       request.respondWith(mockError(errResponse))
     })
  
     return store.dispatch(getTMueDetails(reqBodErr))
       .then(() => {
         const actions = errResponse
         expect(actions).toEqual(errResponse);
       })
  
   })
  
  })
})
   


  



