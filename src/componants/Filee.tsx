import { useSelector } from "react-redux"
import type { RootState } from "../app/store"
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";


function Filee() {

  const data = useSelector((state: RootState) => state.file.clickedfile)
  const content = data?.content ?? "";
   const highlightedCode = hljs.highlightAuto(content).value;
  
  return (
    <div className={`bg-gray-900 w-full h-screen ${!data ? 'flex justify-center items-center' : ''}`}>
      {data ?
      
        <pre>
        <code
          className="text-amber-100"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
        :
        <img src="/icons/vscode.svg" alt="" className='h-56 w-48' />
      }
    </div>
  )
}

export default Filee
