import api from "../config/api";

export const fetchCategories = () => api.get('/categories');
export const fetchColors = () => api.get('/colors');
export const fetchCurrencies = () => api.get('/currencies');
export const fetchMadeFrom = () => api.get('/madefrom');
export const fetchUnits = () => api.get('/units');
export const fetchUsages = () => api.get('/usages');
export const fetchSizeUnits = () => api.get('/size-units');
export const fetchwarehouse = () =>  api.get('/warehouse');

