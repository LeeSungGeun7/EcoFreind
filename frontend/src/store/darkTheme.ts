import { create } from 'zustand';


interface Darkmode {
    darkmode : boolean ; 
    setDarkMode : (darkmode: boolean) => void;
}

export const useDarkmode = create<Darkmode>((set)=>(
    {
        darkmode : false , 
        setDarkMode : (darkmode) => set({darkmode})
    }
)
)




