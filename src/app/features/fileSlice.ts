import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Ifile } from '../../interfaces/folder_files'
import { data } from '../../static_data/file_folder'


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
        if (file.name === targetName) {
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

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
   
    isopenfolder: (state, action: PayloadAction<string>) => {
      findFileByName(state.folder,action.payload)
      
    },
     addfile: (state, action: PayloadAction<Ifile>) => {
      state.clickedfile=action.payload
      const exists = state.barfile.some(item => item.name === action.payload.name);
      if(!exists){
        state.barfile.push(action.payload)
      }
      
    },
    delfile: (state, action: PayloadAction<Ifile>) => {
     state.barfile = state.barfile.filter((file)=>file.name!=action.payload.name)
     if(state.clickedfile?.name===action.payload.name){
      const length = state.barfile.length
      state.clickedfile=state.barfile[length-1]
     }
    },
  },
})

// Action creators are generated for each case reducer function
export const {  delfile,addfile,isopenfolder } = fileSlice.actions

export default fileSlice.reducer