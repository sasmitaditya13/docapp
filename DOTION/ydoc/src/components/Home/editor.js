import Quill from 'quill';
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { QuillBinding } from 'y-quill'
import QuillCursors from 'quill-cursors'
import { WebsocketProvider } from 'y-websocket'
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { gettoken,getemail,openproject,createproject ,getowner} from "../../store.js";
import { Button, Input } from '@nextui-org/react';
export default function Editor() {
    const room = useSelector((state) => state.docid)
Quill.register('modules/cursors', QuillCursors)
const quill = new Quill(document.getElementById('editor'), {
  modules: {
    cursors: true,
    toolbar: true,
    history: {
      // Local undo shouldn't undo changes
      // from remote users
      userOnly: true
    }
  },
  placeholder: 'Start collaborating...',
  theme: 'snow' // 'bubble' is also great
})

// A Yjs document holds the shared data
const ydoc = new Y.Doc()
const provider = new WebsocketProvider('ws://localhost:1234', room, ydoc)

provider.on('status', event => {
  console.log(event.status) // logs "connected" or "disconnected"
})
// Define a shared text type on the document
const ytext = ydoc.getText('quill')
// console.log(ytext.toDelta())
console.log(room)
// "Bind" the quill editor to a Yjs text type.
const binding = new QuillBinding(ytext, quill, provider.awareness)
// Remove the selection when the iframe is blurred
window.addEventListener('blur', () => { quill.blur()})
// If you want to stat measuring performance in your app, pass a function
// to log result (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vital
return(
<Button variant= 'ghost' className='my-5 left-0'>Save document</Button>
);
}