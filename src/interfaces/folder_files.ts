export interface Ifile{
    name:string,
    isfolder:boolean,
    content?:string,
    children?:Ifile[]
}