import { combineReducers } from "redux";
import items from './items'
import cards from "./cards";

export default combineReducers({ items, cards })