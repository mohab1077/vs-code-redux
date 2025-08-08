import type { Ifile } from "../interfaces/folder_files"
interface Ifolder {
    file: Ifile
}

function Folder(file: Ifolder) {



    return (
        <>
            <div className="ml-4 pr-2.5">

                <h6>{file.file.name}</h6>
                {file.file.children ? file.file.children.map((a) => <Folder file={a} />)
                    : undefined}
            </div>

        </>

    )
}

export default Folder
