import type { Ifile } from "../interfaces/folder_files"
import Image from "./Image"
interface Ifolder {
    file: Ifile
}

function Folder(file: Ifolder) {



    return (
        <>
            <div className="ml-4 pr-2.5">
                <div className="flex">
                <Image name={file.file.name}/>
                <h6>{file.file.name}</h6>
                </div>
                {file.file.children ? file.file.children.map((a) => <Folder file={a} />)
                    : undefined}
            </div>

        </>

    )
}

export default Folder
