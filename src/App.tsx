
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import './App.css'
import Folder from './componants/Folder'
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';
//import { data } from './static_data/file_folder'

function App() {
  const data = useSelector((state: RootState) => state.file.folder)
  return (
    
  <PanelGroup autoSaveId="persistence" direction="horizontal">
    <Panel>
      <div >
        {data.map((a) => (
          <Folder file={a} />
        ))}
      </div>
    </Panel>

    <PanelResizeHandle className="border-l-cyan-900 border-l-4 w-fit h-screen" />

    <Panel>
      <div className="bg-black w-full h-screen flex justify-center items-center">
        <img src="/icons/vscode.svg" alt="" className='h-56 w-48' />
      </div>
    </Panel>
  </PanelGroup>
);

}

export default App
