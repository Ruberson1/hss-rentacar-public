import { defineStore } from 'pinia';
import axios from "axios";
import swal from "sweetalert2";

export const useCategoryStore = defineStore({

    id: 'category',
    state: () => ({
        categories: null,
        category: null
    }),

    getters: {
        getCategories: (state: any) => state.categories,
        getCategory: (state: any) => state.category,
    },
    actions: {
        async handleFechtCategories() {
            try {
                const data = await axios.get('category/list');
                swal.close();
                this.categories = data.data;
            } catch (e) {
                swal.close();
                console.error(e);
            }
        },
        async handleGetCategoryById(categoryId: any) {
            try {
                const data = await axios.get(`/category/${categoryId}`);
                this.category = data.data;
                swal.close();
            } catch (e) {
                swal.close();
                console.error(e);
            }
        },
    }
});