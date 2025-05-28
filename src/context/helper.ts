// import { JSHmac, CONSTANTS } from "react-native-hash";
// import config from './config.json'

export const getUserIdNumber = (uid: string) => {
    return (Number.parseInt((uid?.substring(1) || '0'), 16) || 0)
}

export const NF = (n: string | number, p = 0) => {
    if (p === 0) return Number(n).toLocaleString('en')
    const x = String(n).split('.')
    const s = Number(x[1] || 0).toFixed(p)
    return Number(x[0]).toLocaleString('en') + s.slice(s.lastIndexOf('.'))
}

export const currentTime = () => Math.round(+new Date().getTime() / 1e3)
export const isHex = (hex: string) => /^0x[a-f0-9A-F]+$/.test(hex)
export const validateEmail = (email: string): boolean => email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null;
export const validateUsername = (username: string): boolean => /^[a-zA-Z0-9]{6,20}$/.test(username);

export const emailEllipse = (email: string) => {
    if (!email) return '';
    const p = email.lastIndexOf('@');
    return email.slice(0, 3) + '***@' + (p > 8 ? email.slice(p + 1) : email.slice(-8));
}

export const getUpdatedTime = (origin: string | undefined, y: number | string, m: number | string, d: number | 'start' | 'end') => {
    let i = new Date(origin || '');
    if (isNaN(i as any)) i = new Date();
    let yy = Number(y || i.getFullYear());
    let mm = Number(m || i.getMonth()) + 1;
    let dd = 0;
    if (d === 'start') {
        dd = 1;
    } else if (d === 'end') {
        const date = new Date(yy, mm, 0);
        dd = date.getDate();
    } else {
        dd = d;
    }
    return [yy, ('0' + mm).slice(-2), ('0' + dd).slice(-2)].join('-');
}

export const formatBytes = (bytes: any, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const getTruncatedNumber = (number: number, decimalPlaces: number): number => {
    if (number === undefined) return 0;
    return Math.round(number * 10 ** decimalPlaces) / (10 ** decimalPlaces);
    
}

export const getFormattedDate = (date: number) => {
    return new Date(date * 1000).toLocaleDateString()
}