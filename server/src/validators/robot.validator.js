
import { body, param } from 'express-validator';

export const robotIdValidator = [
    param('robotId')
        .isInt({ min: 1 })
        .withMessage('robotId must be a positive integer')
        .toInt(),
];

export const createRobotValidator = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('name is required')
        .isLength({ max: 100 })
        .withMessage('name must have at most 100 characters'),

    body('model')
        .trim()
        .notEmpty()
        .withMessage('model is required')
        .isLength({ max: 100 })
        .withMessage('model must have at most 100 characters'),

    body('serialNumber')
        .trim()
        .notEmpty()
        .withMessage('serialNumber is required')
        .isLength({ max: 50 })
        .withMessage('serialNumber must have at most 50 characters'),

    body('status')
        .optional()
        .isIn(['available', 'assigned', 'maintenance', 'offline'])
        .withMessage('status is invalid'),

    body('batteryLevel')
        .optional()
        .isInt({ min: 0, max: 100 })
        .withMessage('batteryLevel must be an integer between 0 and 100')
        .toInt(),
];
