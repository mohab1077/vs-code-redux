import { useDispatch } from "react-redux"
import type { Ifile } from "../interfaces/folder_files"
import Image from "./Image"
import { addfile } from "../app/features/fileSlice"
import { useState } from "react"
import type { menupo } from "../interfaces/menu_position"
import Foldermenue from "./Foldermenue"
interface Ifolder {
    file: Ifile
}

function Folder(file: Ifolder) {

const [menuPos, setMenuPos] = useState<menupo| null>(null);
  const dispatch = useDispatch()
  const handeladd = ()=>{
    dispatch(addfile(file.file))
  }
  const handleRightClick = (e: React.MouseEvent)=>{
     e.preventDefault(); 
     setMenuPos({ x: e.pageX, y: e.pageY });
   }

    return (
        <>
            <div className="ml-4 pr-2.5">
                <div className="flex space-x-1">
                <Image name={file.file.name} id={file.file.id}/>
                {file.file.isfolder ? <h6 onContextMenu={handleRightClick} className="cursor-pointer">{file.file.name}</h6> : <h6 className="cursor-pointer" onClick={handeladd}>{file.file.name}</h6> }
               
                </div>

                {file.file.isopen ? (file.file.children ? file.file.children.map((a) => <Folder file={a} />)
                    : undefined) :undefined}
            </div>
             {menuPos && <Foldermenue menuPos={menuPos} setMenuPos={setMenuPos} file={file.file}/>}

        </>

    )
}

export default Folder
