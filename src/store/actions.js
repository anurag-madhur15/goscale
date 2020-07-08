import { GET_DATA } from './actionTypes';

export const getData = (data) => {

    return {
        type: GET_DATA,
        dataList: data
    };
};