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

   if(data.length==0){
    return
   }

    return (
      <div className="flex space-x-0.5  border-b-2 border-b-gray-700 h-8">
        {data.map((file)=>(
            <div className="border-r-1 border-b-amber-950 w-fit flex items-center justify-center cursor-pointer hover:bg-gray-100"
            onContextMenu={handleRightClick} >
                <div onClick={()=>handelclick(file)} className="flex pl-3 ">
                <Image name={file.name} id={file.id}/>
                <h6>{file.name}</h6>
                </div>
                <div className="pl-5">
                    <div onClick={()=>handelclose(file)} className="pr-1 hover:bg-gray-200">
                   <Image name="a.close" id={file.id}/> 
                   </div>
                </div>
                 {menuPos && <Closemenue menuPos={menuPos} setMenuPos={setMenuPos} file={file}/>}
            </div>
            
           

            ))}
           
      </div>


   

    )
}

export default SideBar
