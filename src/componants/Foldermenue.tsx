import { useEffect, useRef, useState } from "react";
import type { menupo } from "../interfaces/menu_position"
import { useDispatch } from "react-redux";
import {  newfile, newfolder } from "../app/features/fileSlice";
import type { Ifile } from "../interfaces/folder_files";

interface Iclose{
    menuPos:menupo | null
    setMenuPos:React.Dispatch<React.SetStateAction<menupo | null>>,
    file:Ifile
}

function Foldermenue({menuPos,setMenuPos,file}:Iclose) {
  const [name,setname]=useState<string>("")
  const closeMenu = () => setMenuPos(null);
  const dispatch = useDispatch()
  const handelnewfolder = ()=>{
    dispatch(newfolder({dadname:file.id,sonname:name}))
  }
  const handelnewfile = ()=>{
    dispatch(newfile({dadname:file.id,sonname:name}))
  }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {  value } = e.target;
    setname(value)
  };

 const menuRef = useRef<HTMLDivElement>(null);
 useEffect(() => {
    if (menuPos) {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          closeMenu();
        }
      };
      window.addEventListener("click", handleClickOutside);
      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }
}, [menuPos]);

    return (
        <div style={{
            position: "absolute",
            top: menuPos?.y,
            left: menuPos?.x,
            background: "#333",
            color: "white",
            padding: "5px",
            borderRadius: "4px",
            zIndex: 1000,
          }} ref={menuRef}>
        <input type="text" value={name} onChange={handleChange} className="border-2 border-amber-50 rounded-md w-25"  />
        <div
          onClick={closeMenu}
        >
          
          <div className="hover:bg-gray-700 p-1 cursor-pointer"onClick={handelnewfolder} >new folder</div>
          <div className="hover:bg-gray-700 p-1 cursor-pointer" onClick={handelnewfile}>new file</div>
         
        </div>
        </div>
    )
 
}

export default Foldermenue
