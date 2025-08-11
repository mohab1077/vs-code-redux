export interface Ifile{
    id:string
    name:string,
    isfolder:boolean,
    isopen?:boolean,
    content?:string,
    children?:Ifile[]
}