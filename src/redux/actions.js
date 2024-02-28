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
export const setGroups = (groups) => ({
    type: 'SET_GROUPS',
    payload: groups,
});

export const addGroup = (group) => ({
    type: 'ADD_GROUP',
    payload: group,
});

export const editGroup = (group) => ({
    type: 'EDIT_GROUP',
    payload: group,
});

export const deleteGroup = (groupId) => ({
    type: 'DELETE_GROUP',
    payload: groupId,
});

export const addEmployee = (employee, groupId) => ({
    type: 'ADD_EMPLOYEE',
    payload: { employee, groupId },
});

export const editEmployee = (employee, groupId) => ({
    type: 'EDIT_EMPLOYEE',
    payload: { employee, groupId },
});

export const deleteEmployee = (employeeId, groupId) => ({
    type: 'DELETE_EMPLOYEE',
    payload: { employeeId, groupId },
});

export const setUserData = (userData) => ({
    type: 'SET_USER_DATA',
    payload: userData,
  });
  
  export const updateUserData = (updatedData) => ({
    type: 'UPDATE_USER_DATA',
    payload: updatedData,
  });
  
  export const clearUserData = () => ({
    type: 'CLEAR_USER_DATA',
  });