import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Ifile } from '../../interfaces/folder_files'
import { data } from '../../static_data/file_folder'
import { faker } from "@faker-js/faker";


export interface CounterState {
  folder: Ifile[],
  clickedfile:Ifile|null,
  barfile:Ifile[]
}

const initialState: CounterState = {
  folder: data,
  clickedfile:null,
  barfile:[]

}

function findFileByName(files: Ifile[], targetName: string): Ifile | undefined {
    for (const file of files) {
        if (file.id === targetName) {
            file.isopen = !file.isopen
            return file; // وجدناه
        }

        // إذا لديه children نبحث بداخلهم
        if (file.children && file.children.length > 0) {
            const found = findFileByName(file.children, targetName);
            if (found) return found;
        }
    }
    return undefined; // لم نجد أي نتيجة
}

function findFile_push(files: Ifile[], targetName: string,newf:Ifile): Ifile | undefined {
    for (const file of files) {
        if (file.id === targetName) {
            file.children?.push(newf)
            return file; // وجدناه
        }

        // إذا لديه children نبحث بداخلهم
        if (file.children && file.children.length > 0) {
            const found = findFile_push(file.children, targetName,newf);
            if (found) return found;
        }
    }
    return undefined; // لم نجد أي نتيجة

  }


export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
   
    isopenfolder: (state, action: PayloadAction<string>) => {
      findFileByName(state.folder,action.payload)
      
    },
     addfile: (state, action: PayloadAction<Ifile>) => {
      state.clickedfile=action.payload
      const exists = state.barfile.some(item => item.id === action.payload.id);
      if(!exists){
        state.barfile.push(action.payload)
      }
      
    },
    delfile: (state, action: PayloadAction<Ifile>) => {
     state.barfile = state.barfile.filter((file)=>file.id!=action.payload.id)
     if(state.clickedfile?.id===action.payload.id){
      const length = state.barfile.length
      state.clickedfile=state.barfile[length-1]
     }
    },
    delallfile: (state) => {
    state.clickedfile=null
    state.barfile=[]
    },
    newfolder: (state, action: PayloadAction<{dadname:string , sonname:string }>) => {
     const id = faker.string.uuid()
     const newfolder : Ifile={name:action.payload.sonname , isfolder:true, isopen:true ,children:[],id:id}
     findFile_push(state.folder,action.payload.dadname,newfolder)

    },
    newfile: (state, action: PayloadAction<{dadname:string , sonname:string }>) => {
     const id = faker.string.uuid()
     const newfolder : Ifile={name:action.payload.sonname , isfolder:false, isopen:true,id:id }
     findFile_push(state.folder,action.payload.dadname,newfolder)
    },
  },
})

// Action creators are generated for each case reducer function
export const {  delfile,addfile,isopenfolder,delallfile,newfolder,newfile } = fileSlice.actions

export default fileSlice.reducer