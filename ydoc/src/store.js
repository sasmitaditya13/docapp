import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { input } from '@nextui-org/react';
import { data } from 'autoprefixer';
axios.defaults.headers.common['Content-type'] = `application/json; charset=UTF-8`;
export const gettoken = createAsyncThunk('counterSlice/token',async(username) => {
  try {
    let password = "123"
    const res = await axios.post('http://127.0.0.1:8000/docapp/token/', {username,password})
    console.log(res)
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const createproject = createAsyncThunk('counterSlice/createproject', async({pname,user,token}) => {
  try {
    console.log({pname,user,token})
    const res = await axios.post('http://127.0.0.1:8000/docapp/start/project/', {pname,user}, {headers:{'Authorization': token}} )
    console.log(res.data)
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const deleteproject = createAsyncThunk('counterSlice/deleteproject', async({project,token}) => {
  try {
    const res = await axios.delete('http://127.0.0.1:8000/docapp/start/project/' + project + "/", {headers:{'Authorization': token}} )
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const openproject = createAsyncThunk('counterSlice/openproject',async({pname,user,token})=>{
  try{
    console.log({pname,user,token})
    const res = await axios.get('http://127.0.0.1:8000/docapp/project/',{params: {pname,user}} , {headers:{'Authorization': token}})
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const opendocument = createAsyncThunk('counterSlice/opendocument',async({docname,project,token})=>{
  try{
    const res = await axios.get('http://127.0.0.1:8000/docapp/docs/',{params:{docname,project}}, {headers:{'Authorization': token}})
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const updatedocument = createAsyncThunk('counterSlice/updatedocument',async({docid,delta,token})=>{
  try{
    const res = await axios.patch('http://127.0.0.1:8000/docapp/start/document/'+docid+"/",{"delta": delta}, {headers:{'Authorization': token}})
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const createdocument = createAsyncThunk('counterSlice/createdocument',async({docname,project,token})=>{
  try{
    const res = await axios.post('http://127.0.0.1:8000/docapp/start/document/',{"docname":docname , "project":[project] , "delta":"{}", "text":"{}"}, {headers:{'Authorization': token}})
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const getrole = createAsyncThunk('counterSlice/getrole',async({project,token})=>{
  try{
    const res = await axios.get('http://127.0.0.1:8000/docapp/roles/',{"project": project}, {headers:{'Authorization': token}})
    return res.data
  } catch(err){
    console.log(err)
  }
})




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
      dname:"",
      role:"",
      readonly : true,

    },
    reducers: {
      logout: (state) => {
      state.email = "";
      state.token= "";
      state.docid = "";
      state.projectid="";
      state.pname="";
      state.owname="";
      state.delta="";
      state.dname="";
      state.role="";
      state.readonly = true;
      },
      middletoken: (state) => {
        console.log(state.token)
      },
      getemail: (state,action) => {
        state.email = action.payload;
        console.log(state.email);
      },
      getowner: (state,action) => {
        state.owname = action.payload;
        console.log(state.owname);
      },
      
      createrole: (state,action1,action2) => {
        let token = 'Token '+ state.token;
        fetch('http://127.0.0.1:8000/docapp/start/projectrole/', {
            method: 'POST',
            body: JSON.stringify({
              "project":state.projectid,
              "user":action1.payload,
              "role":action2.payload
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
                window.alert("Role created successfully")
             })
             .catch((err) => {
                console.log(err.message);
             });
      },
      },
    extraReducers: (builder) => {
      builder
      .addCase(gettoken.fulfilled, (state,action)  => {
        state.token = 'Token ' + action.payload.token;
        console.log(state.token)
      })
      .addCase(gettoken.rejected, (state,action) => {
        window.alert("Not Registered");
      })
      .addCase(createproject.fulfilled , (state,action) => {
        state.projectid = action.payload.id
        state.pname = action.payload.pname
        console.log(state.projectid)
        state.role = "O"
      })
      .addCase(createproject.rejected , (state,action) => {
        window.alert("Unexpected error");
      })
      .addCase(openproject.fulfilled , (state,action) => {
        console.log(action.payload)
        state.projectid = action.payload.id
        state.pname = action.payload.pname
      })
      .addCase(openproject.rejected , (state,action)=> {
        window.alert("Error");
      })
      .addCase(opendocument.fulfilled , (state,action) => {
          state.docid = action.payload.id;
          state.dname = action.payload.docname;
          state.delta = data.delta;
          state.readonly = false;
      })
      .addCase(opendocument.rejected , (state,action)=> {
        window.alert("Error");
      })
      .addCase(updatedocument.rejected , (state,action)=> {
        window.alert("Error");
      })
      .addCase(updatedocument.fulfilled , (state,action)=>{
        console.log("Saved");
      })
      .addCase(getrole.fulfilled, (state,action) => {
        state.role = action.payload.role;
      })
      .addCase(createdocument.fulfilled , (state,action) => {
        state.docid = action.payload.id;
        state.dname = action.payload.docname;
        state.readonly = false;
      })
      .addCase(createdocument.rejected , (state,action)=> {
        console.log("error");
      })
      .addCase(deleteproject.fulfilled , (state,action)=>{
        state.projectid = "";
        state.pname = "";
        state.docid = "";
        state.projectid="";
        state.pname="";
        state.owname="";
        state.delta="";
        state.dname="";
        state.role="";
        state.readonly = true;
      })
    }
    }
  )
export const {getemail,getowner,middletoken,createrole,logout} = counterSlice.actions;
export const store = configureStore({
    reducer: counterSlice.reducer
  })
















  // openproject: (state,action) => {
      //   let token = 'Token '+ state.token;
      //   fetch('http://127.0.0.1:8000/docapp/project/', {
      //       method: 'GET',
      //       body: JSON.stringify({
      //         "pname":action.payload,
      //         "user":state.owname
      //       }),
      //       headers: {
      //           'Content-type': 'application/json; charset=UTF-8',
      //           'Authorization': token
      //         },
      //     })
      //        .then((response) => response.json())
      //        .then((data) => {
      //           console.log(data);
      //           console.log(data.id);
      //           state.projectid = data.id;
      //           state.pname = action.payload;
      //        })
      //        .catch((err) => {
      //           console.log(err.message);
      //        }); 
      // },

      // createproject: (state,action) => {
      //   state.pname = action.payload
      //   console.log(state.token)
      //   let token = 'Token '+ state.token;
      //   console.log(token);
      //   fetch('http://127.0.0.1:8000/docapp/start/project/', {
      //       method: 'POST',
      //       body: JSON.stringify({
      //         "pname":action.payload,
      //         "user":state.email
      //       }),
      //       headers: {
      //           'Content-type': 'application/json; charset=UTF-8',
      //           'Authorization': token
      //         },
      //     })
      //        .then((response) => response.json())
      //        .then((data) => {
      //           console.log(data);
      //           console.log(data.id);
      //           state.projectid = data.id;
      //           state.pname = action.payload;
      //             fetch('http://127.0.0.1:8000/docapp/start/projectrole/', {
      //               method: 'POST',
      //               body: JSON.stringify({
      //                 "user":state.email,
      //                 "project":state.projectid,
      //                 "role":"Owner"
      //               }),
      //               headers: {
      //                   'Content-type': 'application/json; charset=UTF-8',
      //                   'Authorization': token
      //                },
      //             })
      //                 .then((response) => response.json())
      //                 .then((data) => {
      //                 console.log(data);
      //                 console.log(data.id);
      //                 state.owname = state.email;
      //                 state.pname = action.payload;
      //        })
      //        .catch((err) => {
      //           window.alert(err.message);
      //        }); 
      //        })
      //        .catch((err) => {
      //           window.alert(err.message);
      //        }); 
      // },

      // opendocument: (state,action) => {
      //   let token = 'Token '+ state.token;
      //   fetch('http://127.0.0.1:8000/docapp/docs/', {
      //     method: 'GET',
      //     body: JSON.stringify({
      //       "docname":action.payload,
      //       "project":state.projectid
      //     }),
      //     headers: {
      //         'Content-type': 'application/json; charset=UTF-8',
      //         'Authorization': token
      //       },
      //   })
      //      .then((response) => response.json())
      //      .then((data) => {
      //         console.log(data);
      //         console.log(data.id);
      //         state.docid = data.id;
      //         state.dname = action.payload;
      //         state.delta = data.delta;
      //      })
      //      .catch((err) => {
      //         console.log(err.message);
      //      }); 
      // },
      // updatedocument: (state,action) => {
      //   let token = 'Token '+ state.token;
      //   state.delta = action.payload
      //   fetch(('http://127.0.0.1:8000/docapp/docs/'+state.docid+"/"), {
      //     method: 'PATCH',
      //     body: JSON.stringify({
      //       "delta":state.delta
      //     }),
      //     headers: {
      //         'Content-type': 'application/json; charset=UTF-8',
      //         'Authorization': token
      //       },
      //   })
      //      .then((response) => response.json())
      //      .then((data) => {
      //         console.log(data);
      //         console.log(data.id);
      //      })
      //      .catch((err) => {
      //         console.log(err.message);
      //      }); 
      // },