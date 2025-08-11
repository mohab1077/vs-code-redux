import { useSelector } from "react-redux"
import type { RootState } from "../app/store"
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { js as jsBeautify } from 'js-beautify';



  function Filee() {

  const data = useSelector((state: RootState) => state.file.clickedfile)
  const content = data?.content ?? "";
 
  const formattedCode = jsBeautify(content, {
    indent_size: 2,
    space_in_empty_paren: true,
  });

   const highlightedCode = hljs.highlightAuto( formattedCode).value;

   const codeWithLines = highlightedCode
    .split("\n")
    .map((line, i) => {
      return `<span class="line-number">${i + 1}</span> ${line}`;
    })
    .join("\n");
  
  return (
    <div className={`bg-black w-full h-full ${!data ? 'flex justify-center items-center' : ' bg-zinc-900'}`}>
      {data ?
      
        <pre>
        <code
          className="text-amber-100"
          dangerouslySetInnerHTML={{ __html: codeWithLines }}
        />
      </pre>
        :
        <img src="/icons/vscode.svg" alt="" className='h-56 w-48' />
      }
    </div>
  )
}

export default Filee
