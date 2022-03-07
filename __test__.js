import React from 'react' ;
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import RegistrationOptionsForm from '../Components/RegistrationOptions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as redux from 'react-redux';
import moment from 'moment';

configure({adapter: new Adapter()});

const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});
afterAll(() => {
  console.error = originalError;
});

const mockStore = configureMockStore([thunk]);

describe('<RegistrationOptionsForm />', () => {
    
    it('to be called on submit options', () => {
        let constArray = [];
        let location = {
          state:{
            registrationValue : {
              userID: '900',
              firstName: 'xyz',
              lastName: 'lmn',
              email: 'a@d.com',
              phoneNumber: '1234567890',
              dob: moment(new Date()).format('YYYY-MM-DD'),
              memberSSN: '123456789',
              memberSystemId: '123',
              address: '',
              city:'',
              state:'',
              postalCode: '',
              secQs1: 'a',
              answer1: 'a',
              secQs2: 'a',
              answer2: 'a',
              secQs3: 'a',
              answer3: 'a',
              memberID:'55000'
            }
          }
        }
        const store = mockStore({
            sharedState: { appConfigDropdown: ['a', 'b'] },
            registrationState: {
              validateRegistrationOptions: true,
              registrationOptions: 
              [{"id":"19001960004000150","fdos":"2018-12-31T00:00:00.000+0000","renderingProvider":"JEN BOOLE","renderingProviderTypeDesc":"Physician (MD)","descOfService":"LEVOTHYROXINE SODIUM"},
              {"id":"19001300070006630","fdos":"2018-12-22T00:00:00.000+0000","renderingProvider":"General Hospital","renderingProviderTypeDesc":null,"descOfService":null},
              {"id":"19099300040015610","fdos":"2019-03-20T00:00:00.000+0000","renderingProvider":null,"renderingProviderTypeDesc":null,"descOfService":null},
              {"id":"19337817010000060","fdos":"2019-09-24T00:00:00.000+0000","renderingProvider":"FedEx","renderingProviderTypeDesc":"Ground Ambulance Service","descOfService":"Ambulance or Transportation Related Services"},
              {"id":"1909930004001561020","fdos":"2019-03-20T00:00:00.000+0000","renderingProvider":null,"renderingProviderTypeDesc":null,"descOfService":null}
            ]},
            registrationQuestion:
                [{"id":"19001960004000150","fdos":"2018-12-31T00:00:00.000+0000","renderingProvider":"JEN BOOLE","renderingProviderTypeDesc":"Physician (MD)","descOfService":"LEVOTHYROXINE SODIUM"},
                {"id":"19001300070006630","fdos":"2018-12-22T00:00:00.000+0000","renderingProvider":"General Hospital","renderingProviderTypeDesc":null,"descOfService":null},
                {"id":"19099300040015610","fdos":"2019-03-20T00:00:00.000+0000","renderingProvider":null,"renderingProviderTypeDesc":null,"descOfService":null},
                {"id":"19337817010000060","fdos":"2019-09-24T00:00:00.000+0000","renderingProvider":"FedEx","renderingProviderTypeDesc":"Ground Ambulance Service","descOfService":"Ambulance or Transportation Related Services"},
                {"id":"1909930004001561020","fdos":"2019-03-20T00:00:00.000+0000","renderingProvider":null,"renderingProviderTypeDesc":null,"descOfService":null}
              ]            
          });
        const component = mount(
            <Provider store={store}>
                <RegistrationOptionsForm history={constArray} location={location}/>
            </Provider>
        );
        const spy = jest.spyOn(redux, 'useDispatch')
        spy.mockReturnValue(jest.fn());
        component.find('#check-nota').at(0).simulate('click', {target: {value: '123456'}});
        expect(component.find('.btn-primary').exists()).toEqual(true)
        component.find('.btn-primary').at(0).simulate('click');
        component.update();
    });

    it('click on cancel', () => {
      let constArray = [];
      let location = {
        state:{
          registrationValue : {
            userID: '900',
            firstName: 'xyz',
            lastName: 'lmn',
            email: 'a@d.com',
            phoneNumber: '1234567890',
            dob: moment(new Date()).format('YYYY-MM-DD'),
            memberSSN: '123456789',
            memberSystemId: '123',
            address: '',
            city:'',
            state:'',
            postalCode: '',
            secQs1: 'a',
            answer1: 'a',
            secQs2: 'a',
            answer2: 'a',
            secQs3: 'a',
            answer3: 'a',
            memberID:'55000'
          }
        }
      }
      const store = mockStore({
          sharedState: { appConfigDropdown: ['a', 'b'] },
          registrationState: {validateRegistrationOptions: true}
        });
      const component = mount(
          <Provider store={store}>
              <RegistrationOptionsForm history={constArray} location={location}/>
          </Provider>
      );
      const spy = jest.spyOn(redux, 'useDispatch')
      spy.mockReturnValue(jest.fn());
      // component.find('#check-nota').last().simulate('change', {target: {value: '123456'}});
      expect(component.find('.btn-transparent').exists()).toEqual(true)
      component.find('.btn-transparent').at(0).simulate('click');
      component.update();
  });
})
