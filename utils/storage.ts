class Storage {
    static get(key: string) {
        if (typeof window === 'undefined') return "not use localStorage on server"
        
        return localStorage.getItem(`nik19ta_${key}`);
    };

    static set(key: string, payload: any) {
        if (typeof window === 'undefined') return "not use localStorage on server"
        return localStorage.setItem(`nik19ta_${key}`, payload);
    };

    static delete(key: string) {
        if (typeof window === 'undefined') return "not use localStorage on server"
        return localStorage.removeItem(`nik19ta_${key}`);
    };
}

export default Storage;