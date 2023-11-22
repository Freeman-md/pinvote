import { param, query } from "express-validator";

export const validateQuery = (value) => {
    // If the value is an array, validate each element
    if (Array.isArray(value)) {
        return value.map((element) => query(element).trim().notEmpty().escape());
    }

    // If the value is a single string, validate it
    return query(value).trim().notEmpty().escape();
};

export const validateParam = (value) => {
    // If the value is an array, validate each element
    if (Array.isArray(value)) {
        return value.map((element) => param(element).trim().notEmpty().escape());
    }

    // If the value is a single string, validate it
    return param(value).trim().notEmpty().escape();
};