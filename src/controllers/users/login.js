const { sendOne, sendNotFound, sendError, sendResponse } = require('../../middleware/requests-helpers');
const { User } = require('../../models/user/user');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../../../config');



const login = async (req, res, next) => {
    const { body: { email, password } } = req;
    try {
        const user = await User.findOne({ email });

        if (user) {
            const match = await user.comparePassword(password, user.password);

            if (match) {
                jwt.sign({
                    id: user._id,
                    name: user.email
                }, SECRET, { expiresIn: 36000 },
                    (err, token) => {

                        if (err) TE(err);

                        return sendOne(res, {
                            login: match,
                            token: `Bearer ${token}`,
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            fullName: user.firstName + ' ' + user.lastName,
                            email: user.email,
                            mobNo: user.mobNo
                        });
                    }
                );
            } else {
                return sendResponse(res, { message: 'Incorrect Password!! Too many attempts will permanently block you. :)' }, 204);
            }
        }
        else
            return sendNotFound(res);
    } catch (error) {
        next(error);
    }

};

module.exports = { login };