// @flow strict

const jwt = require('jsonwebtoken');
import type { Request, Response } from 'express';

const jwtSecret = process.env.JWT_SECRET;


exports.verify = async (req: Request, res: Response) => {
    const token = req.header('x-auth-token');
    if (!token){
		return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        jwt.verify(token, jwtSecret);
        return res
            .status(200)
            .json({ msg: 'Token valid!'});
    } catch(err){
        return res
            .status(401)
            .json({ msg: 'Token is not valid' });
    }
    
}
