import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Ifile } from '../../interfaces/folder_files'
import { data } from '../../static_data/file_folder'


export interface CounterState {
  folder: Ifile[]
}

const initialState: CounterState = {
  folder: data,
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
  },
})

// Action creators are generated for each case reducer function
export const {  isopenfolder } = fileSlice.actions

export default fileSlice.reducer