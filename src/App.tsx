
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import './App.css'
import Folder from './componants/Folder'
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';
import Filee from './componants/Filee';
import SideBar from './componants/SideBar';


function App() {
  const data = useSelector((state: RootState) => state.file.folder)
  return (
    
  <PanelGroup autoSaveId="persistence" direction="horizontal">
    <Panel className= 'bg-white pt-3' minSize={15}>
      <div >
        {data.map((a) => (
          <Folder file={a} />
        ))}
      </div>
    </Panel>

    <PanelResizeHandle className="border-l-gray-700 border-l-4 w-fit h-screen" />

    <Panel minSize={20}>
      <SideBar/>
      <Filee/>
    </Panel>
  </PanelGroup>
);

}

export default App
