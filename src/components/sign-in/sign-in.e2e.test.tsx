import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';

import {SignIn} from './sign-in';
import {Auth, mockFunction, error} from '../../mocks/test-data';
import {ReducerName} from '../../const';

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);
const store = mockStore({
  [ReducerName.USER]: {
    authorizationStatus: Auth.NO_AUTH,
  },
});
const onSubmit = jest.fn((...args) => [...args]);
const loginData = {
  email: `123@mail.ru`,
  password: `123`,
};

it(`Should call callback on SignIn component mount`, () => {

  const wrapper = Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn
            login={onSubmit}
            authStatus={Auth.NO_AUTH}
            setError={mockFunction}
            error={error}
          />
        </BrowserRouter>
      </Provider>
  );

  const {email, password} = loginData;
  const form = wrapper.find(SignIn).find(`.sign-in__form`);
  form.find(`#user-email`).instance().value = email;
  form.find(`#user-password`).instance().value = password;
  form.update();
  form.simulate(`submit`, {
    preventDefault: mockFunction,
  });

  expect(onSubmit.mock.calls.length).toBe(1);
  expect(onSubmit.mock.calls[0][0]).toMatchObject(loginData);
});

it(`Should call callback on submit without email`, () => {
  const onError = jest.fn((...args) => [...args]);

  const wrapper = Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn
            login={onSubmit}
            authStatus={Auth.NO_AUTH}
            setError={onError}
            error={error}
          />
        </BrowserRouter>
      </Provider>
  );

  const {password} = loginData;
  const form = wrapper.find(SignIn).find(`.sign-in__form`);
  form.find(`#user-email`).instance().value = ``;
  form.find(`#user-password`).instance().value = password;
  form.update();
  form.simulate(`submit`, {
    preventDefault: mockFunction,
  });

  expect(onError.mock.calls.length).toBe(1);
  expect(onError.mock.calls[0][0]).toBe(`Введите email`);
});

it(`Should call callback on submit without password`, () => {
  const onError = jest.fn((...args) => [...args]);

  const wrapper = Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn
            login={onSubmit}
            authStatus={Auth.NO_AUTH}
            setError={onError}
            error={error}
          />
        </BrowserRouter>
      </Provider>
  );

  const {email} = loginData;
  const form = wrapper.find(SignIn).find(`.sign-in__form`);
  form.find(`#user-email`).instance().value = email;
  form.find(`#user-password`).instance().value = ``;
  form.update();
  form.simulate(`submit`, {
    preventDefault: mockFunction,
  });

  expect(onError.mock.calls.length).toBe(1);
  expect(onError.mock.calls[0][0]).toBe(`Введите пароль`);
});
