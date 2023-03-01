import { CounterState } from "./Reducers/counterReducer";
import { SampleState } from "./Reducers/sample";

export interface AppState{
    sample:SampleState
    counter:CounterState
}