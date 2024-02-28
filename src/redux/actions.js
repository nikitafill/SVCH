export const setEmployees = (employees) => ({ 
    type: 'SET_EMPLOYEES', 
    payload: employees 
});
export const addEmployee = (employee) => ({ 
    type: 'ADD_EMPLOYEE', 
    payload: employee 
});
export const editEmployee = (employee) => ({ 
    type: 'EDIT_EMPLOYEE', 
    payload: employee 
});
export const deleteEmployee = (employeeId) => ({ 
    type: 'DELETE_EMPLOYEE', 
    payload: employeeId 
});
export const setProducts = (products) => ({
    type: 'SET_PRODUCTS',
    payload: products,
});
export const selectProduct = (product) => ({
    type: 'SELECT_PRODUCT',
    payload: product,
});
export const unselectProduct = () => ({
    type: 'UNSELECT_PRODUCT',
});
export const addProduct = (product) => ({
    type: 'ADD_PRODUCT',
    payload: product,
});
export const updateProduct = (product) => ({
    type: 'UPDATE_PRODUCT',
    payload: product,
});
export const deleteProduct = (productId) => ({
    type: 'DELETE_PRODUCT',
    payload: productId,
});
export const updateEditedProduct = (editedProduct) => ({
    type: 'UPDATE_EDITED_PRODUCT',
    payload: editedProduct,
});