const initState = {
    name: '越祈'
}

const userInfo = (state=initState, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return { ...state, ...action.payload }

        case 'CLEAR_USER':
            return { ...state, ...initState }
        default: 
            return state;
    }
}

export default userInfo;