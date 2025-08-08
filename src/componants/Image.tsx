
interface Img{
  name:string
}

function Image({name}:Img) {

    const split = name.split(".")[1]
    console.log(split)

    return (
      <div>
        {split ? <img src={`/icons/${split}.svg`} alt="" className="h-7 w-7" /> : <img src="/icons/folder-default-open.svg" alt="" className="h-7 w-7" /> }
        
      </div>

    )
}

export default Image;
