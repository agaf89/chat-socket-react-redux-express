import {useCallback} from 'react'

export const useMessage = () => {
    return useCallback ( (text, classes) => {
        if (classes){
            window.M.toast({html: text, classes: 'danger'})
        }
        if (window.M && text && !classes) {
            window.M.toast({html: text})
        }
    },[])
}