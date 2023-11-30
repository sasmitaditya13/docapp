import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
      email : "",
      token: "" ,
      docid : "",
      projectid:"",
      pname:"",
      owname:"",
      delta:"",

    },
    reducers: {
      handledoc :(state) => {
        
      },
      gettoken: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        fetch('http://127.0.0.1:8000/docapp/token/', {
            method: 'POST',
            body: JSON.stringify({
              "username":state.email,
              "password":"123"
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
          })
             .then((response) => response.json())
             .then((data) => {
                console.log(data);
                console.log(data.token);
                state.token = data.token;
             })
             .catch((err) => {
                console.log(err.message);
             }); 
      },

      getemail: (state,action) => {
        state.email = action.payload;
        console.log(state.email);
      },
      getowner: (state,action) => {
        state.owname = action.payload;
        console.log(state.owname);
      },
      

      openproject: (state,action) => {
        let token = 'Token '+ state.token;
        fetch('http://127.0.0.1:8000/docapp/project/', {
            method: 'GET',
            body: JSON.stringify({
              "pname":action.payload,
              "user":state.owname
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': token
              },
          })
             .then((response) => response.json())
             .then((data) => {
                console.log(data);
                console.log(data.id);
                state.projectid = data.id;
                state.pname = action.payload;
             })
             .catch((err) => {
                console.log(err.message);
             }); 
      },

      createproject: (state,action) => {
        state.pname = action.payload
        let token = 'Token '+ state.token;
        fetch('http://127.0.0.1:8000/docapp/start/project/', {
            method: 'POST',
            body: JSON.stringify({
              "pname":action.payload,
              "user":state.email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': token
              },
          })
             .then((response) => response.json())
             .then((data) => {
                console.log(data);
                console.log(data.id);
                state.projectid = data.id;
                state.pname = action.payload;
             })
             .catch((err) => {
                console.log(err.message);
             }); 
      },

      opendocument: (state,action) => {
           
      }
      }
    }
  )
export const {getemail,gettoken,openproject,createproject,getowner} = counterSlice.actions;
export const store = configureStore({
    reducer: counterSlice.reducer
  })