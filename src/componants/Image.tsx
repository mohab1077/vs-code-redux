import { useState } from "react";

interface Img {
  name: string
}

function Image({ name }: Img) {

  const split = name.split(".")[1]
  const [isopen, setisopen] = useState<boolean>(false)

   const handelopne = ()=>{
    setisopen(!isopen)
   }
  return (
    <div className="flex">
      {split ? (
        <img src={`/icons/${split}.svg`} alt="" className="h-7 w-7 " />
      ) : (
        isopen ? (
          <>
          <img src="/next.png" alt="" className="h-7 w-7 cursor-pointer" onClick={handelopne} />
          <img src="/icons/folder-default-open.svg" alt="" className="h-7 w-7" />
           </>
        ) : (
          <>
            <img src="/down-arrow.png" alt="" className="h-7 w-7 cursor-pointer" onClick={handelopne} />
            <img src="/icons/folder-default-open.svg" alt="" className="h-7 w-7" />
          </>
        )
      )}
    </div>

  )
}

export default Image;
