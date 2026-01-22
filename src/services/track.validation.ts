import {Errors} from "../errors/errors";

export enum TrackFieldValidationStatus {
    OK,
    NOT_STRING,
    EMPTY,
}

export function validateField(value: unknown): TrackFieldValidationStatus {
    if (typeof value !== "string") {
        return TrackFieldValidationStatus.NOT_STRING;
    }

    if (value.length === 0) {
        return TrackFieldValidationStatus.EMPTY;
    }

    return TrackFieldValidationStatus.OK;
}

export function assertFieldIsValid(
    status: TrackFieldValidationStatus,
    fieldName: string
): void {
    if (status === TrackFieldValidationStatus.NOT_STRING) {
        throw Errors.validation(`${fieldName} must be a string`);
    }

    if (status === TrackFieldValidationStatus.EMPTY) {
        throw Errors.validation(`${fieldName} must not be empty`);
    }
}

export function assertValidId(id: number): void {
    if (!Number.isInteger(id) || id <= 0) {
        throw Errors.validation("id must be a positive integer");
    }
}

