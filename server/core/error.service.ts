import { now } from "./date.service";

let recordedErrors: RecordedError[] = [];

export function recordError(errorStatus: number, errorMessage: string) {
    recordedErrors.push({
        timestamp: now(),
        errorStatus,
        errorMessage
    })
}

export function getRecordedErrors() {
    return recordedErrors
}

export function clearRecordedErrors() {
    recordedErrors = []
}

export interface RecordedError {
    timestamp: Date;
    errorStatus: number;
    errorMessage: string;
}


