import React from "react";
import Config from './config.json'
import { currentTime } from "./helper";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import { useToast } from 'react-native-toast-notifications'

export const config = Config;

export interface ContextDataType {
    isLoading: boolean
}

const initiContextData = {
    isLoading: false,
} as ContextDataType

interface ContextType extends ContextDataType {
    update(attrib: Partial<ContextDataType>): void
    showToast(msg: string, type: string): void
    showLoading(show: boolean): void
    initStatus(): void
}

const Context = React.createContext<ContextType>(null!);

// export const storeData = async (value: any) => {
//     return AsyncStorage.setItem(config.appKey, JSON.stringify(value))
// }

// export const getData = async () => {
//     let init = {} as any
//     try {
//         const buf = await AsyncStorage.getItem(config.appKey)
//         if (buf) {
//             const json = JSON.parse(buf)
//             Object.entries(json).map(([k, value]) => {
//                 init[k] = value;
//             })
//         }
//     } catch (err) {
//     }
//     return init
// }

// const useFonts = async () => (
//     await Font.loadAsync({
//         'mono': require('@/assets/fonts/Poppins-Regular.ttf'),
//     })
// )

export const Provider = ({ children }: any) => {
    const [IsReady, SetIsReady] = React.useState(false);
    const [data, setData] = React.useState<ContextDataType>(initiContextData);
    // const en = locales.en;
    // const [L, setL] = React.useState(Locales.en);
    // const L = locales[data.lang]

    const update = (attrib: Partial<ContextDataType>) => {
        const _data = { ...data, ...attrib }
        setData(_data)
        // storeData(_data)
    }

    // const getError = (code:number, args?:{[key:string]:string|number}|string|number) => T("error."+code, args)

    const initStatus = () => {
        update({
            ...initiContextData
        })
    }

    const toast = useToast();

    const showToast = async (msg: string, type = "danger") => {
        // "normal" | "success" | "danger" | "warning" 
        if (msg.length > 30) msg = msg.substring(0, 25) + "...";
        toast.show(msg, {
            type: type,
            onPress: (id) => { toast.hide(id) },
            placement: "center",
            duration: 1500,
            animationType: "zoom-in",
            successColor: "#144858",
            dangerColor: "#62220e",
            warningColor: "#971c00",
            normalColor: "#5a1a6a"
        })
    }

    const showLoading = (show: boolean): void => {
        update({ isLoading: show });
    }

    return <Context.Provider value={{ 
        ...data, 
        showToast, 
        update, 
        initStatus,
        showLoading
    }}>
        {children}
    </Context.Provider>
};

export default Context;
