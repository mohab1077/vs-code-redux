import { useEffect } from "react";
import type { menupo } from "../interfaces/menu_position"
import { useDispatch } from "react-redux";
import { delallfile, delfile } from "../app/features/fileSlice";
import type { Ifile } from "../interfaces/folder_files";

interface Iclose{
    menuPos:menupo | null
    setMenuPos:React.Dispatch<React.SetStateAction<menupo | null>>,
    file:Ifile
}

function Closemenue({menuPos,setMenuPos,file}:Iclose) {
  
  const closeMenu = () => setMenuPos(null);
  const dispatch = useDispatch()
  const handelclose =()=>{
    dispatch(delfile(file))
  }
   const handelcloseall =()=>{
    dispatch(delallfile())
  }

  useEffect(() => {
    if (menuPos) {
      const handleClickOutside = () => closeMenu();
      window.addEventListener("click", handleClickOutside);
      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }
  }, [menuPos]);

    return (
        <div
          style={{
            position: "absolute",
            top: menuPos?.y,
            left: menuPos?.x,
            background: "#333",
            color: "white",
            padding: "5px",
            borderRadius: "4px",
            zIndex: 1000,
          }}
          onClick={closeMenu}
        >
          <div className="hover:bg-gray-700 p-1 cursor-pointer"onClick={handelclose} >close</div>
          <div className="hover:bg-gray-700 p-1 cursor-pointer" onClick={handelcloseall}>close All</div>
         
        </div>
    )
 
}

export default Closemenue
