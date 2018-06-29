import UserStore from './user';

export const store = { 
    userInfo: new UserStore() 
}

export const createStoreMap = () => {
    return {
        userStore: new UserStore(),
    }
}