import { useDispatch } from "react-redux"
import type { Ifile } from "../interfaces/folder_files"
import Image from "./Image"
import { addfile } from "../app/features/fileSlice"
interface Ifolder {
    file: Ifile
}

function Folder(file: Ifolder) {
  const dispatch = useDispatch()
  const handeladd = ()=>{
    dispatch(addfile(file.file))
  }

    return (
        <>
            <div className="ml-4 pr-2.5">
                <div className="flex">
                <Image name={file.file.name}/>
                {file.file.isfolder ? <h6>{file.file.name}</h6> : <h6 className="cursor-pointer" onClick={handeladd}>{file.file.name}</h6> }
                </div>

                {file.file.isopen ? (file.file.children ? file.file.children.map((a) => <Folder file={a} />)
                    : undefined) :undefined}
            </div>

        </>

    )
}

export default Folder
