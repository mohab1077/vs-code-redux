import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../app/store"
import Image from "./Image"
import type { Ifile } from "../interfaces/folder_files"
import { addfile, delfile } from "../app/features/fileSlice"
import { useState } from "react"
import type { menupo } from "../interfaces/menu_position"
import Closemenue from "./Closemenue"


function SideBar() {
  const [menuPos, setMenuPos] = useState<menupo| null>(null);
  const data = useSelector((state: RootState) => state.file.barfile)
  const dispatch = useDispatch()

   const handelclick = (file:Ifile)=>{
     dispatch(addfile(file))
   }
   const handelclose = (file:Ifile)=>{
    dispatch(delfile(file))
   }

   const handleRightClick = (e: React.MouseEvent)=>{
     e.preventDefault(); 
     setMenuPos({ x: e.pageX, y: e.pageY });
   }

   

    return (
      <div className="flex space-x-0.5 border-1 border-b-emerald-50">
        {data.map((file)=>(
            <div className="border-1 border-b-amber-950 w-40 flex items-center justify-center cursor-pointer"
            onContextMenu={handleRightClick} >
                <div onClick={()=>handelclick(file)} className="flex">
                <Image name={file.name}/>
                <h6>{file.name}</h6>
                </div>
                <div className="pl-5">
                    <div onClick={()=>handelclose(file)}>
                   <Image name="a.close"/> 
                   </div>
                </div>
                 {menuPos && <Closemenue menuPos={menuPos} setMenuPos={setMenuPos} file={file}/>}
            </div>
            
           

            ))}
           
      </div>


   

    )
}

export default SideBar
