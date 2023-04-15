class Storage {
    static get(key: string) {
        return localStorage.getItem(`nik19ta_${key}`);
    };

    static set(key: string, payload: any) {
        return localStorage.setItem(`nik19ta_${key}`, payload);
    };

    static delete(key: string) {
        return localStorage.removeItem(`nik19ta_${key}`);
    };
};

export default Storage;