const initialState = {
    employees: [],
    products: [],
    selectedProduct: null,
    editedProduct: {},
  };
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_EMPLOYEES':
        return { ...state, employees: action.payload };
      case 'ADD_EMPLOYEE':
        return { ...state, employees: [...state.employees, action.payload] };
      case 'EDIT_EMPLOYEE':
        return {
          ...state,
          employees: state.employees.map((employee) =>
            employee.id === action.payload.id ? action.payload : employee
          ),
        };
      case 'DELETE_EMPLOYEE':
        return {
          ...state,
          employees: state.employees.filter((employee) => employee.id !== action.payload),
        };
      case 'SET_PRODUCTS':
        return { ...state, products: action.payload };
      case 'SELECT_PRODUCT':
        return { ...state, selectedProduct: action.payload };
      case 'UNSELECT_PRODUCT':
        return { ...state, selectedProduct: null };
      case 'ADD_PRODUCT':
        return {
          ...state,
          products: [...state.products, action.payload],
        };
      case 'UPDATE_PRODUCT':
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === action.payload.id ? action.payload : product
          ),
        };
      case 'DELETE_PRODUCT':
        return {
          ...state,
          products: state.products.filter((product) => product.id !== action.payload),
        };
      case 'UPDATE_EDITED_PRODUCT':
        return {
          ...state,
          editedProduct: action.payload,
        };
      default:
        return state;  
    }
  };
  
  export default rootReducer;