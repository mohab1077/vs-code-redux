import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { js as jsBeautify } from "js-beautify";

import { useRef, useState } from "react";
import type { menupo } from "../interfaces/menu_position";
import Formatmenue from "./Formatmenue";



function Filee() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.file.clickedfile);
  const content = data?.content ?? "";
  const code=useRef<string>("")
  const [menuPos, setMenuPos] = useState<menupo| null>(null);
  

 
  const formattedCode = jsBeautify(content, {
    indent_size: 2,
    space_in_empty_paren: true,
  });

  
  const highlightedCode = hljs.highlightAuto(formattedCode).value;

 
  /*const codeWithLines = highlightedCode
    .split("\n")
    .map((line, i) => {
      return `<span class="line-number">${i + 1}</span> ${line}`;
    })
    .join("\n");*/

  
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;
    code.current = text;
    
  };

  const handleRightClick = (e: React.MouseEvent)=>{
     e.preventDefault(); 
     setMenuPos({ x: e.pageX, y: e.pageY });
   }

  return (
    <div
      className={`bg-black w-full h-full ${
        !data ? "flex justify-center items-center" : "bg-zinc-900"
      }`}
      onContextMenu={handleRightClick}
    >
      {menuPos && <Formatmenue menuPos={menuPos} setMenuPos={setMenuPos} reff={code} />}
      {data ? (
        <pre>
          <code
            className="text-amber-100 outline-none"
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            style={{
              display: "block",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          />
        </pre>
      ) : (
        <img src="/icons/vscode.svg" alt="" className="h-56 w-48" />
      )}
      
    </div>
  );
}

export default Filee;
