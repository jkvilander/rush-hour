import { create } from "zustand";

const useMenuStore = create((set) => ({
    visible: false,
    toggle: () => {
        set((state) => ({ visible: !state.visible }));
    },
}));

export default useMenuStore;