import { useEffect } from "react";
import type { menupo } from "../interfaces/menu_position"
import { useDispatch } from "react-redux";
import { updateFileContent } from "../app/features/fileSlice";


interface Iclose{
    menuPos:menupo | null
    setMenuPos:React.Dispatch<React.SetStateAction<menupo | null>>,
    reff:React.RefObject<string>
    
}

function Formatmenue({menuPos,setMenuPos,reff}:Iclose) {
  
  const closeMenu = () => setMenuPos(null);
  const dispatch = useDispatch()
  const handelformate =()=>{
    dispatch(updateFileContent(reff))
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
          <div className="hover:bg-gray-700 p-1 cursor-pointer"onClick={handelformate} >format code</div>
          
         
        </div>
    )
 
}

export default Formatmenue
