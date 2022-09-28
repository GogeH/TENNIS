import { createAction } from '@reduxjs/toolkit';
import { ApproveReq, RequestWithWeb3Provider } from 'types/requests';

import actionTypes from './actionTypes';

export const approve = createAction<ApproveReq>(actionTypes.APPROVE);
export const getTokenBalance = createAction<RequestWithWeb3Provider>(actionTypes.GET_TOKEN_BALANCE);
