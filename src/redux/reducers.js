const initialState = {
  products: [],
  selectedProduct: null,
  editedProduct: {},
  employees: [],
  groups: [],
  user: {
  }
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case 'SET_GROUPS':
      return { ...state, groups: action.payload };
    case 'ADD_GROUP':
      return { ...state, groups: [...state.groups, action.payload] };
    case 'EDIT_GROUP':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id === action.payload.id ? action.payload : group
        ),
      };
    case 'DELETE_GROUP':
      return {
        ...state,
        groups: state.groups.filter((group) => group.id !== action.payload),
      };
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group.id === action.payload.groupId) {
            return {
              ...group,
              members: [...group.members, action.payload.employee],
            };
          }
          return group;
        }),
      };

    case 'EDIT_EMPLOYEE':
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group.id === action.payload.groupId) {
            return {
              ...group,
              members: group.members.map((member) => {
                if (member.id === action.payload.employee.id) {
                  return action.payload.employee;
                }
                return member;
              }),
            };
          }
          return group;
        }),
      };

    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group.id === action.payload.groupId) {
            return {
              ...group,
              members: group.members.filter((member) => member.id !== action.payload.employeeId),
            };
          }
          return group;
        }),
      };

    case 'SET_USER_DATA':
      return {
        ...state,
        user: action.payload,
      };

    case 'UPDATE_USER_DATA':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    case 'CLEAR_USER_DATA':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default rootReducer;