export interface Ifile{
    name:string,
    isfolder:boolean,
    isopen?:boolean,
    content?:string,
    children?:Ifile[]
}