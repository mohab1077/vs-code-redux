import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { js as jsBeautify } from "js-beautify";
import { useRef } from "react";
import { updateFileContent } from "../app/features/fileSlice";



function Filee() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.file.clickedfile);
  const content = data?.content ?? "";
  const code = useRef<string>("")




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

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();

    dispatch(updateFileContent({ con: code, id: data?.id }))

  }

  return (
    <>

      <div
        className={`bg-black w-full h-full ${!data ? "flex justify-center items-center" : "bg-zinc-900"
          }`}
        onContextMenu={handleRightClick}
      >
        {data && 
        <div className="w-full flex justify-end p-2 border-b-2 border-amber-50 ">
        <button className="col bg-gray-500 hover:bg-gray-600 text-white font-semibold py-1 px-1 rounded shadow-md transition-colors duration-300 cursor-pointer " onClick={handleRightClick}>
          save
        </button>
        </div>
         }
        

        {data ? (
          <pre className="h-full w-full">
            <code
              className="text-amber-100 outline-none h-full w-full"
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
    </>
  );
}

export default Filee;