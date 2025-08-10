import { useSelector } from "react-redux"
import type { RootState } from "../app/store"



function Filee() {

  const data = useSelector((state: RootState) => state.file.clickedfile)

  return (
    <div className={`bg-black w-full h-screen ${!data ? 'flex justify-center items-center' : ''}`}>
      {data ?
        <p className="text-amber-100">{data.content}</p>
        :
        <img src="/icons/vscode.svg" alt="" className='h-56 w-48' />
      }
    </div>
  )
}

export default Filee
