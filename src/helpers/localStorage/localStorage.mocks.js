let store = {}

export const mockLocalStorage = () => ({
    getItem: function (key) {
        return store[key] || null;
    },
    setItem: function (key, value) {
        store[key] = value.toString();
    },
    clear: function () {
        store = {};
    }
});
